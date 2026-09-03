// AI Tutor API Service
// Person 3 owns the AI backend. This is a MOCK adapter.
// INTEGRATION POINT: Replace mock implementations with real Person 3 API calls.
// The UI depends on the TutorResponse shape — do not change it without updating components.

export interface TutorMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  context?: TutorContext;
}

export interface TutorContext {
  lessonId?: string;
  lessonTitle?: string;
  circuitDescription?: string;
  simulationResult?: string;
}

export interface TutorResponse {
  message: string;
  suggestedFollowUps?: string[];
}

// MOCK — replace with real Person 3 API URL
const TUTOR_API_BASE = process.env.NEXT_PUBLIC_TUTOR_API_URL ?? null;

function mockDelay(ms: number = 1200): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Send a message to the AI Tutor.
 * MOCK: Returns canned educational responses until Person 3's API is ready.
 */
export async function sendTutorMessage(
  message: string,
  history: TutorMessage[],
  context?: TutorContext
): Promise<TutorResponse> {
  try {
    const response = await fetch('/api/debug', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        code_or_circuit: context?.circuitDescription || "General quantum question", 
        error_message: null, 
        question: message 
      })
    });
    
    if (!response.ok) {
      throw new Error(`Tutor message failed: ${response.statusText}`);
    }
    
    const data = await response.json();
    return {
      message: data.explanation,
      suggestedFollowUps: data.suggested_fix ? [data.suggested_fix] : []
    };
  } catch (error) {
    console.error('Failed to get tutor response:', error);
    return {
      message: "I'm having trouble connecting to my quantum brain right now. Please try again later.",
      suggestedFollowUps: []
    };
  }
}

/**
 * Get an AI explanation for a simulation result.
 * Calls Person 3's backend to explain the result.
 */
export async function explainSimulationResult(
  circuit: any,
  result: any,
  context?: TutorContext
): Promise<TutorResponse> {
  try {
    const response = await fetch('/api/explain-result', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        circuit, 
        result, 
        question: "Why did I get this result?" 
      })
    });
    
    if (!response.ok) {
      throw new Error(`Explanation failed: ${response.statusText}`);
    }
    
    const data = await response.json();
    return {
      message: data.explanation,
      suggestedFollowUps: data.suggested_fix ? [data.suggested_fix] : []
    };
  } catch (error) {
    console.error('Failed to explain result:', error);
    return {
      message: "I couldn't analyze this result. Please make sure the AI service is running.",
      suggestedFollowUps: []
    };
  }
}

void TUTOR_API_BASE; // suppress unused warning until integration
