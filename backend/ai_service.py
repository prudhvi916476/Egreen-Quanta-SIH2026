import os
import google.generativeai as genai
from models import ExplainResultRequest, DebugRequest, AIResponse
import logging

logger = logging.getLogger(__name__)

# Initialize the Gemini API.
# Ensure the GEMINI_API_KEY environment variable is set before running the server.
api_key = os.environ.get("GEMINI_API_KEY")
if api_key:
    genai.configure(api_key=api_key)
else:
    logger.warning("GEMINI_API_KEY environment variable not found. AI features will fail.")

# Use Gemini 1.5 Flash for fast reasoning tasks.
try:
    model = genai.GenerativeModel('gemini-1.5-flash')
except Exception as e:
    logger.error(f"Failed to initialize model: {e}")
    model = None

def explain_result(request: ExplainResultRequest) -> AIResponse:
    if not model:
        return AIResponse(explanation="AI service is not configured. Missing API key.")
        
    circuit_desc = f"{request.circuit.num_qubits} qubits, shots: {request.circuit.shots}\n"
    circuit_desc += "Operations:\n"
    for op in request.circuit.operations:
        circuit_desc += f"- Gate {op.gate} on target {op.target}"
        if op.control is not None:
             circuit_desc += f" (controlled by {op.control})"
        circuit_desc += "\n"
        
    result_desc = f"Counts: {request.circuit.shots} total.\n"
    for state, count in request.result.counts.items():
        result_desc += f"|{state}>: {count} times\n"
        
    prompt = (
        "You are an expert AI tutor for a quantum computing learning platform. "
        "A student ran a quantum circuit and got the following result. "
        "Explain the result in simple, educational terms. Ground your explanation in the actual simulated counts provided below.\n\n"
        f"--- CIRCUIT ---\n{circuit_desc}\n"
        f"--- SIMULATION RESULT ---\n{result_desc}\n"
        f"--- STUDENT QUESTION ---\n{request.question}\n\n"
        "Please provide a clear and encouraging explanation. If the result involves probability (like a superposition), "
        "explain that sampling variation is why it might not be exactly 50/50."
    )
    
    try:
        response = model.generate_content(prompt)
        return AIResponse(explanation=response.text)
    except Exception as e:
        logger.error(f"Error calling Gemini: {e}")
        return AIResponse(explanation="I'm sorry, I couldn't generate an explanation right now due to a service error.")

def debug_circuit(request: DebugRequest) -> AIResponse:
    if not model:
        return AIResponse(explanation="AI service is not configured. Missing API key.")
        
    prompt = (
        "You are an expert AI tutor for quantum computing. "
        "A student is trying to write a quantum circuit or code, but encountered an issue or asked for debugging help.\n\n"
        f"--- CODE/CIRCUIT ---\n{request.code_or_circuit}\n"
        f"--- ERROR MESSAGE (if any) ---\n{request.error_message or 'None'}\n"
        f"--- STUDENT QUESTION ---\n{request.question}\n\n"
        "Provide an explanation of what went wrong and suggest a fix."
    )
    
    try:
        response = model.generate_content(prompt)
        return AIResponse(explanation=response.text, suggested_fix="Please refer to the explanation for the fix.")
    except Exception as e:
        logger.error(f"Error calling Gemini: {e}")
        return AIResponse(explanation="I'm sorry, I couldn't debug this right now due to a service error.")
