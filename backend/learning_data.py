from models import UserProgress

# Mock User Data aligned with Egreen Quanta SIH Demo Story
MOCK_USER_PROGRESS = UserProgress(
    user_id="user_demo_sih",
    completed_lessons=["lesson-qubits", "lesson-superposition"],
    score=150,
    overall_progress_percentage=68,
    recent_experiments=["H-Gate Experiment (100 shots)", "Bell State Attempt"],
    recommended_topic="Learn Entanglement"
)

# Course Structure aligned with learning/courses/quantum-fundamentals.ts
COURSE_STRUCTURE = {
    "id": "course-quantum-fundamentals",
    "title": "Quantum Computing Fundamentals",
    "description": "A beginner-friendly course that introduces the core concepts of quantum computing: qubits, superposition, entanglement, and basic quantum gates.",
    "level": "beginner",
    "estimatedDurationMinutes": 53,
    "lessons": [
        {
            "id": "lesson-qubits",
            "title": "1. Qubits",
            "status": "completed",
            "duration": "15 min"
        },
        {
            "id": "lesson-superposition",
            "title": "2. Superposition",
            "status": "in-progress",
            "duration": "20 min"
        },
        {
            "id": "lesson-entanglement",
            "title": "3. Entanglement",
            "status": "available",
            "duration": "18 min"
        }
    ]
}

# Flagship SIH Challenge Definitions
_BELL_STATE_SPEC = {
    "id": "challenge-bell-state",
    "title": "Create a Bell State (|Φ⁺⟩)",
    "subtitle": "Construct your first entangled two-qubit quantum state using H and CNOT gates",
    "expected_qubits": 2,
    "expected_gates": ["H", "CNOT"],
    "points": 150
}

CHALLENGES = {
    "challenge-bell-state": _BELL_STATE_SPEC,
    "bell_state_1": _BELL_STATE_SPEC  # Backwards compatibility alias
}
