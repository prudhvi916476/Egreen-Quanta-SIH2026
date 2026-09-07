import { Course, Module } from "../types";

/**
 * Demo course: Quantum Computing Fundamentals
 * Module structure for the Day 1 build
 */

export const moduleQuantumBasics: Module = {
  id: "module-quantum-basics",
  courseId: "course-quantum-fundamentals",
  title: "Quantum Computing Basics",
  description:
    "Build your foundation: learn what qubits are, how superposition works, and why entanglement matters.",
  lessonIds: ["lesson-qubits", "lesson-superposition", "lesson-entanglement"],
  order: 1,
};

export const courseQuantumFundamentals: Course = {
  id: "course-quantum-fundamentals",
  title: "Quantum Computing Fundamentals",
  description:
    "A beginner-friendly course that introduces the core concepts of quantum computing: qubits, superposition, entanglement, and basic quantum gates. No prior quantum physics knowledge is required.",
  level: "beginner",
  moduleIds: ["module-quantum-basics"],
  estimatedDurationMinutes: 53,
};
