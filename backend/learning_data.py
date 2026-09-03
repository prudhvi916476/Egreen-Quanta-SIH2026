from models import UserProgress

# Mock User Data
MOCK_USER_PROGRESS = UserProgress(
    user_id="user_123",
    completed_lessons=["Qubits", "Superposition_Intro"],
    score=150,
    overall_progress_percentage=68,
    recent_experiments=["H-Gate", "Bell State Attempt"],
    recommended_topic="Learn Entanglement"
)

# Mock Course Structure
COURSE_STRUCTURE = {
    "title": "Quantum Computing Fundamentals",
    "lessons": [
        {"id": "l1", "title": "1. Qubits", "status": "completed"},
        {"id": "l2", "title": "2. Superposition", "status": "in-progress"},
        {"id": "l3", "title": "3. Entanglement", "status": "locked"}
    ]
}

# Mock Challenges
CHALLENGES = {
    "bell_state_1": {
        "title": "Create a Bell State",
        "expected_qubits": 2,
        "expected_gates": ["H", "CNOT"]
    }
}
