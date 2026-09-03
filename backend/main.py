from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import (
    CircuitData, SimulationResult, ExplainResultRequest, 
    DebugRequest, AIResponse, UserProgress, ChallengeRequest, ChallengeResponse
)
from learning_data import MOCK_USER_PROGRESS, COURSE_STRUCTURE, CHALLENGES
import ai_service
import httpx
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Egreen Quanta MVP Backend", version="1.0.0")

# Enable CORS for the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins for demo purposes
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

QUANTUM_ENGINE_URL = "http://localhost:8001"

@app.post("/api/simulate", response_model=SimulationResult)
async def simulate(circuit_data: CircuitData):
    """
    Proxy the simulation request to the Quantum Engine microservice.
    """
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{QUANTUM_ENGINE_URL}/simulate", 
                json=circuit_data.dict(),
                timeout=30.0
            )
            response.raise_for_status()
            return response.json()
    except httpx.HTTPStatusError as e:
        logger.error(f"Quantum engine error: {e.response.text}")
        raise HTTPException(status_code=e.response.status_code, detail=e.response.text)
    except httpx.RequestError as e:
        logger.error(f"Failed to connect to Quantum Engine: {e}")
        raise HTTPException(status_code=503, detail="Quantum engine is unreachable.")

@app.post("/api/explain-result", response_model=AIResponse)
def explain_result(request: ExplainResultRequest):
    """
    Get an AI explanation for a simulation result.
    """
    return ai_service.explain_result(request)

@app.post("/api/debug", response_model=AIResponse)
def debug_circuit(request: DebugRequest):
    """
    Debug a circuit or code snippet with AI.
    """
    return ai_service.debug_circuit(request)

@app.get("/api/progress", response_model=UserProgress)
def get_progress():
    """
    Get the mock user's progress.
    """
    return MOCK_USER_PROGRESS

@app.get("/api/courses")
def get_courses():
    """
    Get the mock course structure.
    """
    return COURSE_STRUCTURE

@app.post("/api/challenge/submit", response_model=ChallengeResponse)
def submit_challenge(request: ChallengeRequest):
    """
    Evaluate a submitted circuit for a challenge.
    """
    challenge = CHALLENGES.get(request.challenge_id)
    if not challenge:
        raise HTTPException(status_code=404, detail="Challenge not found.")
        
    # Basic static evaluation logic for MVP
    # Check if they used the expected gates
    gates_used = [op.gate.upper() for op in request.circuit.operations]
    passed = True
    for expected_gate in challenge["expected_gates"]:
        if expected_gate not in gates_used:
            passed = False
            
    if passed:
        MOCK_USER_PROGRESS.score += 50
        MOCK_USER_PROGRESS.overall_progress_percentage = min(100, MOCK_USER_PROGRESS.overall_progress_percentage + 10)
        return ChallengeResponse(passed=True, score=100, feedback="Great job! You correctly used the H and CNOT gates to create a Bell State.")
    else:
        return ChallengeResponse(passed=False, score=0, feedback="Not quite right. Make sure you are using the correct gates.")

@app.get("/health")
def health_check():
    return {"status": "healthy"}
