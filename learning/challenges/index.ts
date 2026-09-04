import {
  QuantumChallenge,
  CircuitData,
  ChallengeEvaluationResult,
  ChallengeRequirementResult,
} from "../types";
import bellStateChallenge from "./bell-state";

export const allChallenges: QuantumChallenge[] = [bellStateChallenge];

/** Look up a challenge by its ID */
export function getChallengeById(id: string): QuantumChallenge | undefined {
  return allChallenges.find((c) => c.id === id);
}

/** Look up a challenge associated with a lesson */
export function getChallengeByLessonId(
  lessonId: string
): QuantumChallenge | undefined {
  return allChallenges.find((c) => c.lessonId === lessonId);
}

/**
 * Validates a submitted quantum circuit against a challenge specification,
 * checking structure, gate parameters, ordering, and optional simulation counts.
 */
export function evaluateChallengeCircuit(
  challengeId: string,
  circuit: CircuitData,
  simulationCounts?: Record<string, number>
): ChallengeEvaluationResult {
  const challenge = getChallengeById(challengeId);
  if (!challenge) {
    throw new Error(`Challenge with ID "${challengeId}" was not found.`);
  }

  const ops = circuit.operations || [];
  const requirementResults: ChallengeRequirementResult[] = [];

  for (const req of challenge.requirements) {
    let passed = false;
    let message = "";

    switch (req.checkType) {
      case "qubit_count": {
        const min = req.minQubits ?? challenge.expectedQubits;
        passed = circuit.num_qubits >= min;
        message = passed
          ? `Qubit count (${circuit.num_qubits}) meets the minimum requirement of ${min}.`
          : `Circuit requires at least ${min} qubits, but found ${circuit.num_qubits}.`;
        break;
      }

      case "gate_present": {
        const gateUpper = req.gate?.toUpperCase();
        if (gateUpper === "H") {
          const hasH = ops.some(
            (op) => op.gate.toUpperCase() === "H" && op.target === 0
          );
          passed = hasH;
          message = passed
            ? "Hadamard (H) gate correctly applied to qubit 0."
            : "Missing Hadamard (H) gate on qubit 0.";
        } else if (gateUpper === "CNOT") {
          const hasCnot = ops.some(
            (op) =>
              (op.gate.toUpperCase() === "CNOT" || op.gate.toUpperCase() === "CX") &&
              op.control === 0 &&
              op.target === 1
          );
          passed = hasCnot;
          message = passed
            ? "CNOT gate correctly connected with control=q0 and target=q1."
            : "Missing CNOT gate with control=q0 and target=q1.";
        } else {
          passed = ops.some((op) => op.gate.toUpperCase() === gateUpper);
          message = passed
            ? `Gate ${req.gate} is present in circuit.`
            : `Expected gate ${req.gate} is missing.`;
        }
        break;
      }

      case "exact_sequence": {
        const hIndex = ops.findIndex(
          (op) => op.gate.toUpperCase() === "H" && op.target === 0
        );
        const cnotIndex = ops.findIndex(
          (op) =>
            (op.gate.toUpperCase() === "CNOT" || op.gate.toUpperCase() === "CX") &&
            op.control === 0 &&
            op.target === 1
        );

        passed = hIndex !== -1 && cnotIndex !== -1 && hIndex < cnotIndex;
        message = passed
          ? "Gates are ordered correctly: H gate executes before CNOT gate."
          : "Gate sequence error: H gate on q0 must be executed before CNOT(q0 -> q1).";
        break;
      }

      case "no_extra_qubits": {
        const maxQubits = req.minQubits ?? challenge.expectedQubits;
        passed = circuit.num_qubits <= maxQubits;
        message = passed
          ? `Circuit uses ${circuit.num_qubits} qubit(s), within the allowed maximum of ${maxQubits}.`
          : `Circuit uses ${circuit.num_qubits} qubits, but only ${maxQubits} are allowed for this challenge.`;
        break;
      }

      default:
        passed = true;
        message = "Requirement satisfied.";
    }

    requirementResults.push({
      requirementId: req.id,
      description: req.description,
      passed,
      message,
    });
  }

  // Optional simulation result distribution verification
  let simulationVerified = true;
  if (simulationCounts && Object.keys(simulationCounts).length > 0) {
    const totalShots = Object.values(simulationCounts).reduce(
      (a, b) => a + b,
      0
    );
    const count00 = simulationCounts["00"] || 0;
    const count11 = simulationCounts["11"] || 0;
    const countCross =
      (simulationCounts["01"] || 0) + (simulationCounts["10"] || 0);

    // In a Bell state |Φ⁺⟩, counts are concentrated on 00 and 11
    if (totalShots > 0 && (count00 + count11) / totalShots < 0.85) {
      simulationVerified = false;
    }
  }

  const allReqsPassed = requirementResults.every((r) => r.passed);
  const passed = allReqsPassed && simulationVerified;

  const passedCount = requirementResults.filter((r) => r.passed).length;
  const score = passed
    ? challenge.points
    : Math.round((passedCount / requirementResults.length) * (challenge.points * 0.5));

  const feedback = passed
    ? "Awesome work! You successfully constructed the Bell State |Φ⁺⟩. Both qubits are maximally entangled!"
    : "Your circuit is not quite a Bell State yet. Review the checklist of requirements and hints above, then try again.";

  return {
    challengeId,
    passed,
    score,
    maxScore: challenge.points,
    feedback,
    requirementResults,
  };
}

export { bellStateChallenge };
