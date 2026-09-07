import { Lesson } from "../types";

const superpositionLesson: Lesson = {
  id: "lesson-superposition",
  moduleId: "module-quantum-basics",
  title: "Superposition",
  description:
    "Understand superposition, the Hadamard gate, and the 50/50 probability distribution through an interactive experiment.",

  learningObjectives: [
    {
      id: "lo-super-1",
      text: "Define superposition in your own words.",
    },
    {
      id: "lo-super-2",
      text: "Explain what the Hadamard (H) gate does to a qubit.",
    },
    {
      id: "lo-super-3",
      text: "Predict the theoretical probability distribution after applying the H gate.",
    },
    {
      id: "lo-super-4",
      text: "Compare experimental results with 100 shots vs 1000 shots and explain the difference.",
    },
  ],

  sections: [
    {
      id: "super-concept",
      title: "What is Superposition?",
      content:
        "Superposition is the ability of a qubit to be in a combination of |0> and |1> at the same time. Imagine flipping a coin — while it is in the air, it is neither heads nor tails. A qubit in superposition is in a similar state: it has not 'decided' yet. Only when you measure does it collapse to either |0> or |1>. Superposition is one of the key ingredients that gives quantum computers their power.",
    },
    {
      id: "super-hadamard",
      title: "The Hadamard (H) Gate",
      content:
        "The Hadamard gate is a single-qubit gate that puts a qubit into an equal superposition. If you start with |0> and apply the H gate, the qubit enters a state where it has a 50% chance of being measured as |0> and a 50% chance of being measured as |1>. In circuit notation, the H gate is drawn as a square with the letter 'H' inside it. It is one of the most commonly used gates in quantum computing and is the starting point for many quantum algorithms.",
    },
    {
      id: "super-probability",
      title: "The 50/50 Probability",
      content:
        "After applying the Hadamard gate to |0>, the theoretical probabilities are exactly 50% for |0> and 50% for |1>. This means if you run the same circuit many times and count the results, roughly half should be 0 and half should be 1. In practice, you need a sufficient number of shots (repetitions) to see the distribution approach this ideal. With too few shots, random variation can make the results look uneven.",
    },
  ],

  activities: [
    {
      id: "act-super-experiment",
      type: "experiment",
      title: "H Gate Experiment",
      description:
        "Apply the Hadamard gate to a qubit starting in |0>. Run the circuit and observe the measurement outcomes.",
      experimentId: "exp-hadamard-basic",
    },
    {
      id: "act-super-compare",
      type: "comparison",
      title: "Compare 100 Shots vs 1000 Shots",
      description:
        "Run the same H-gate circuit with 100 shots and then with 1000 shots. Record the percentage of |0> and |1> outcomes for each. Which run gives results closer to the theoretical 50/50? Why?",
      comparison: {
        labelA: "100 shots",
        labelB: "1000 shots",
      },
    },
  ],

  quizId: "quiz-superposition",
  estimatedDurationMinutes: 20,
};

export default superpositionLesson;
