from pydantic import BaseModel, Field
from typing import List, Optional, Dict

class Operation(BaseModel):
    gate: str = Field(..., description="The quantum gate to apply (e.g., 'H', 'X', 'CNOT', 'M')")
    target: int = Field(..., description="The target qubit index")
    control: Optional[int] = Field(None, description="The control qubit index for multi-qubit gates")

class CircuitData(BaseModel):
    num_qubits: int = Field(..., description="Number of qubits in the circuit")
    operations: List[Operation] = Field(..., description="List of quantum operations")
    shots: int = Field(100, description="Number of simulation shots")
    backend: str = Field("qiskit", description="Simulator backend to use: 'qiskit', 'cirq', or 'pennylane'")

class SimulationResult(BaseModel):
    counts: Dict[str, int] = Field(..., description="Raw measurement counts")
    probabilities: Dict[str, float] = Field(..., description="Normalized probabilities")
    status: str = Field(..., description="Execution status (e.g., 'success', 'error')")
    message: Optional[str] = Field(None, description="Optional message or error details")
