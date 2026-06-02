const QUESTIONS = [
  "Tell me about your background and what draws you to this Marketing Manager role.",
  "Walk me through a marketing campaign you're most proud of — what was the strategy, execution, and result?",
  "Where do you see the biggest gaps or opportunities in our marketing, and how would you approach the first 90 days?"
];

exports.handler = async () => {
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ questions: QUESTIONS })
  };
};
