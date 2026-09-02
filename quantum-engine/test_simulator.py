import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "healthy"}

@pytest.mark.parametrize("backend", ["qiskit", "cirq", "pennylane"])
def test_simulate_superposition(backend):
    payload = {
        "num_qubits": 1,
        "operations": [
            {"gate": "H", "target": 0}
        ],
        "shots": 1000,
        "backend": backend
    }
    response = client.post("/simulate", json=payload)
    assert response.status_code == 200, f"Failed for backend: {backend}. Details: {response.json()}"
    data = response.json()
    assert data["status"] == "success"
    assert "0" in data["counts"] or "1" in data["counts"]
    
    prob_0 = data["probabilities"].get("0", 0)
    prob_1 = data["probabilities"].get("1", 0)
    
    assert 0.4 < prob_0 < 0.6
    assert 0.4 < prob_1 < 0.6

@pytest.mark.parametrize("backend", ["qiskit", "cirq", "pennylane"])
def test_simulate_bell_state(backend):
    payload = {
        "num_qubits": 2,
        "operations": [
            {"gate": "H", "target": 0},
            {"gate": "CNOT", "control": 0, "target": 1}
        ],
        "shots": 1000,
        "backend": backend
    }
    response = client.post("/simulate", json=payload)
    assert response.status_code == 200, f"Failed for backend: {backend}. Details: {response.json()}"
    data = response.json()
    assert data["status"] == "success"
    
    prob_00 = data["probabilities"].get("00", 0)
    prob_11 = data["probabilities"].get("11", 0)
    
    assert 0.4 < prob_00 < 0.6
    assert 0.4 < prob_11 < 0.6
    
    assert data["counts"].get("01", 0) == 0
    assert data["counts"].get("10", 0) == 0

def test_simulate_invalid_gate():
    payload = {
        "num_qubits": 1,
        "operations": [
            {"gate": "INVALID", "target": 0}
        ],
        "shots": 100
    }
    response = client.post("/simulate", json=payload)
    assert response.status_code == 400
    data = response.json()
    assert "Unsupported gate: INVALID" in data["detail"]

def test_simulate_out_of_bounds_target():
    payload = {
        "num_qubits": 1,
        "operations": [
            {"gate": "H", "target": 1}
        ],
        "shots": 100
    }
    response = client.post("/simulate", json=payload)
    assert response.status_code == 400
    data = response.json()
    assert "Target qubit 1 out of bounds" in data["detail"]

def test_simulate_cnot_missing_control():
    payload = {
        "num_qubits": 2,
        "operations": [
            {"gate": "CNOT", "target": 1}
        ],
        "shots": 100
    }
    response = client.post("/simulate", json=payload)
    assert response.status_code == 400
    data = response.json()
    assert "CNOT gate requires a control qubit" in data["detail"]

def test_simulate_invalid_backend():
    payload = {
        "num_qubits": 1,
        "operations": [
            {"gate": "H", "target": 0}
        ],
        "shots": 100,
        "backend": "quantum_magic"
    }
    response = client.post("/simulate", json=payload)
    assert response.status_code == 400
    data = response.json()
    assert "Unsupported backend: quantum_magic" in data["detail"]
