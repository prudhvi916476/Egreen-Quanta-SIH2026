from fastapi import FastAPI, HTTPException
from models import CircuitData, SimulationResult
from simulator import simulate_circuit
import logging

logging.basicConfig(level=logging.INFO)

app = FastAPI(title="Egreen Quanta Quantum Engine API", version="1.0.0")

@app.post("/simulate", response_model=SimulationResult)
def simulate(circuit_data: CircuitData):
    result = simulate_circuit(circuit_data)
    if result.status == "error":
        raise HTTPException(status_code=400, detail=result.message)
    return result

@app.get("/health")
def health_check():
    return {"status": "healthy"}
