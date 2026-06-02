const Anthropic = require('@anthropic-ai/sdk');

const QUESTIONS = [
  "Tell me about your background and what draws you to this Marketing Manager role.",
  "Walk me through a marketing campaign you're most proud of — what was the strategy, execution, and result?",
  "Where do you see the biggest gaps or opportunities in our marketing, and how would you approach the first 90 days?"
];

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { poorNotes, answers, candidateName } = JSON.parse(event.body);
  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const qaText = QUESTIONS.map((q, i) =>
    `Q${i + 1}: ${q}\nAnswer: ${answers[i] || '[no answer provided]'}`
  ).join('\n\n');

  try {
    const message = await anthropic.messages.create({
      model: 'claude-opus-4-7',
      max_tokens: 3000,
      messages: [{
        role: 'user',
        content: `You are Lavalier, an AI talent assessment platform. Transform these rough interview notes into a structured evaluation for ${candidateName}, Marketing Manager candidate.

ROUGH NOTES:
${poorNotes}

ACTUAL INTERVIEW TRANSCRIPT:
${qaText}

Output ONLY a valid JSON object with this exact structure. Extract verbatim phrases from the candidate's actual answers for quotes. Be specific and evidence-based.

{
  "summary": "2-3 sentence balanced assessment connecting their background to the Marketing Manager role",
  "tags": {
    "strengths": ["3 strength tags, 2-4 words each"],
    "observations": ["3 observation tags, 2-4 words each"],
    "considerations": ["3 consideration tags, 2-4 words each"]
  },
  "keyTakeaways": [
    "4 specific bullet points — each 1-2 sentences with concrete details from their answers"
  ],
  "interviewStrengths": [
    {
      "title": "Strength title",
      "explanation": "2-3 sentences with specific examples from answers, connected to the role requirements.",
      "quotes": ["\"...verbatim excerpt from their answer...\"", "\"...verbatim excerpt...\"", "\"...verbatim excerpt...\""]
    }
  ],
  "observations": [
    {
      "title": "Observation title",
      "explanation": "2-3 sentences with specific examples.",
      "quotes": ["\"...verbatim excerpt...\"", "\"...verbatim excerpt...\"", "\"...verbatim excerpt...\""]
    }
  ],
  "thingsToConsider": [
    {
      "title": "Gap or concern title",
      "explanation": "2-3 sentences explaining why this matters for the Marketing Manager role.",
      "quotes": ["\"...verbatim excerpt that reveals this gap...\"", "\"...verbatim excerpt...\"", "\"...verbatim excerpt...\""]
    }
  ]
}

Include exactly 3 items each in interviewStrengths, observations, and thingsToConsider.
Output only the JSON object — no markdown, no explanation, no extra text.`
      }]
    });

    let evaluation;
    try {
      let text = message.content[0].text.trim();
      text = text.replace(/^```json\s*/i, '').replace(/\s*```$/, '');
      evaluation = JSON.parse(text);
    } catch (parseErr) {
      console.error('JSON parse error:', parseErr);
      return { statusCode: 500, body: JSON.stringify({ error: 'Failed to parse evaluation' }) };
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ evaluation })
    };
  } catch (error) {
    console.error('Error generating Lavalier feedback:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
