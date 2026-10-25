// Returns feedback for a chosen option index; invalid choices yield null (no feedback).
export function evaluateAnswer(question, choice) {
  const option = Number.isInteger(choice) ? question.options[choice] : undefined;
  if (!option) return null;
  return { correct: choice === question.answer, explanation: option.explanation };
}
