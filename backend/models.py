from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

# Quantum Circuit Models (matching quantum-engine)
class Operation(BaseModel):
    gate: str
    target: int
    control: Optional[int] = None

class CircuitData(BaseModel):
    num_qubits: int
    operations: List[Operation]
    shots: int = 100
    backend: str = "qiskit"

class SimulationResult(BaseModel):
    counts: Dict[str, int]
    probabilities: Dict[str, float]
    status: str
    message: Optional[str] = None

# AI Models
class ExplainResultRequest(BaseModel):
    circuit: CircuitData
    result: SimulationResult
    question: Optional[str] = "Why did I get this result?"

class DebugRequest(BaseModel):
    code_or_circuit: str
    error_message: Optional[str] = None
    question: str = "Why is this failing?"

class AIResponse(BaseModel):
    explanation: str
    suggested_fix: Optional[str] = None

# Learning Models
class UserProgress(BaseModel):
    user_id: str
    completed_lessons: List[str]
    score: int
    overall_progress_percentage: int
    recent_experiments: List[str]
    recommended_topic: str

class ChallengeRequest(BaseModel):
    challenge_id: str
    circuit: CircuitData

class ChallengeResponse(BaseModel):
    passed: bool
    score: int
    feedback: str
