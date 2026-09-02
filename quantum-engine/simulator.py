from qiskit import QuantumCircuit
from qiskit_aer import AerSimulator
import cirq
import pennylane as qml
from models import CircuitData, SimulationResult
import logging

logger = logging.getLogger(__name__)

SUPPORTED_GATES = {'H', 'X', 'Y', 'Z'}
SUPPORTED_MULTI_GATES = {'CNOT'}
SUPPORTED_MEASURE = {'M'}

def simulate_qiskit(circuit_data: CircuitData) -> SimulationResult:
    num_qubits = circuit_data.num_qubits
    qc = QuantumCircuit(num_qubits)
    
    for op in circuit_data.operations:
        gate = op.gate.upper()
        target = op.target
        
        if gate in SUPPORTED_GATES:
            if gate == 'H': qc.h(target)
            elif gate == 'X': qc.x(target)
            elif gate == 'Y': qc.y(target)
            elif gate == 'Z': qc.z(target)
        elif gate in SUPPORTED_MULTI_GATES:
            if gate == 'CNOT':
                qc.cx(op.control, target)
        elif gate in SUPPORTED_MEASURE:
            pass
        else:
            raise ValueError(f"Unsupported gate: {gate}")

    qc.measure_all()
    simulator = AerSimulator()
    job = simulator.run(qc, shots=circuit_data.shots)
    result = job.result()
    counts = result.get_counts(qc)
    
    total_shots = sum(counts.values())
    probabilities = {state: count / total_shots for state, count in counts.items()}
    
    return SimulationResult(counts=counts, probabilities=probabilities, status="success")

def simulate_cirq(circuit_data: CircuitData) -> SimulationResult:
    num_qubits = circuit_data.num_qubits
    qubits = cirq.LineQubit.range(num_qubits)
    circuit = cirq.Circuit()
    
    for op in circuit_data.operations:
        gate = op.gate.upper()
        target = op.target
        
        if gate in SUPPORTED_GATES:
            if gate == 'H': circuit.append(cirq.H(qubits[target]))
            elif gate == 'X': circuit.append(cirq.X(qubits[target]))
            elif gate == 'Y': circuit.append(cirq.Y(qubits[target]))
            elif gate == 'Z': circuit.append(cirq.Z(qubits[target]))
        elif gate in SUPPORTED_MULTI_GATES:
            if gate == 'CNOT':
                circuit.append(cirq.CNOT(qubits[op.control], qubits[target]))
        elif gate in SUPPORTED_MEASURE:
            pass
        else:
            raise ValueError(f"Unsupported gate: {gate}")

    circuit.append(cirq.measure(*qubits, key='result'))
    simulator = cirq.Simulator()
    result = simulator.run(circuit, repetitions=circuit_data.shots)
    
    measurements = result.measurements['result']
    counts_raw = {}
    for res in measurements:
        state = "".join(str(bit) for bit in res)
        counts_raw[state] = counts_raw.get(state, 0) + 1
        
    total_shots = sum(counts_raw.values())
    probabilities = {state: count / total_shots for state, count in counts_raw.items()}
    
    return SimulationResult(counts=counts_raw, probabilities=probabilities, status="success")

def simulate_pennylane(circuit_data: CircuitData) -> SimulationResult:
    num_qubits = circuit_data.num_qubits
    dev = qml.device("default.qubit", wires=num_qubits, shots=circuit_data.shots)
    
    @qml.qnode(dev)
    def circuit_func():
        for op in circuit_data.operations:
            gate = op.gate.upper()
            target = op.target
            
            if gate in SUPPORTED_GATES:
                if gate == 'H': qml.Hadamard(wires=target)
                elif gate == 'X': qml.PauliX(wires=target)
                elif gate == 'Y': qml.PauliY(wires=target)
                elif gate == 'Z': qml.PauliZ(wires=target)
            elif gate in SUPPORTED_MULTI_GATES:
                if gate == 'CNOT':
                    qml.CNOT(wires=[op.control, target])
            elif gate in SUPPORTED_MEASURE:
                pass
            else:
                raise ValueError(f"Unsupported gate: {gate}")
        return qml.counts()
        
    counts_raw = circuit_func()
    
    counts_str = {str(state): count for state, count in counts_raw.items()}
    
    total_shots = sum(counts_str.values())
    probabilities = {state: count / total_shots for state, count in counts_str.items()}
    
    return SimulationResult(counts=counts_str, probabilities=probabilities, status="success")

def simulate_circuit(circuit_data: CircuitData) -> SimulationResult:
    try:
        num_qubits = circuit_data.num_qubits
        if num_qubits <= 0:
            raise ValueError("Number of qubits must be greater than 0.")
            
        for op in circuit_data.operations:
            target = op.target
            if target >= num_qubits or target < 0:
                 raise ValueError(f"Target qubit {target} out of bounds for {num_qubits} qubits.")
            if op.gate.upper() == 'CNOT':
                control = op.control
                if control is None:
                    raise ValueError("CNOT gate requires a control qubit.")
                if control >= num_qubits or control < 0:
                    raise ValueError(f"Control qubit {control} out of bounds.")
                if control == target:
                    raise ValueError("Control and target qubits cannot be the same.")
                    
        backend = circuit_data.backend.lower()
        if backend == "qiskit":
            return simulate_qiskit(circuit_data)
        elif backend == "cirq":
            return simulate_cirq(circuit_data)
        elif backend == "pennylane":
            return simulate_pennylane(circuit_data)
        else:
            raise ValueError(f"Unsupported backend: {backend}")
            
    except Exception as e:
        logger.error(f"Simulation error: {e}")
        return SimulationResult(
            counts={},
            probabilities={},
            status="error",
            message=str(e)
        )
