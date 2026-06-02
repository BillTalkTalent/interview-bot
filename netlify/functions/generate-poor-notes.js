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

  const { answers, candidateName } = JSON.parse(event.body);
  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const qaText = QUESTIONS.map((q, i) =>
    `Q${i + 1}: ${q}\nA: ${answers[i] || '[candidate did not answer]'}`
  ).join('\n\n');

  try {
    const message = await anthropic.messages.create({
      model: 'claude-opus-4-7',
      max_tokens: 1400,
      messages: [{
        role: 'user',
        content: `You are a busy, slightly distracted hiring manager at a mid-size tech company who just finished back-to-back interviews. Write your raw, rushed interview notes for ${candidateName} who just interviewed for Marketing Manager.

Make the notes authentically imperfect and messy like a real person's quick scrawl:
- Write in first-person stream of consciousness
- Use abbreviations and shorthand (eg "poss", "def", "w/", "v good", "ngl", "tbh", "idk")
- Include vague, lazy observations ("seemed ok i guess", "not totally sure abt this", "energy kinda flat?")
- Use ~~strikethrough~~ for corrections (like ~~3 years~~ wait she said 5)
- Note irrelevant personal observations occasionally ("kept saying 'like'", "good eye contact at least", "spoke too fast")
- Be inconsistent: sometimes detailed, sometimes just a "?"
- Include 3-4 obvious typos spread throughout (campign, stragety, definitley, manger)
- Mix bullets (-), dashes (—), and run-on thoughts
- Show memory gaps ("what was that number she mentioned? 40% something?")
- Show some recency bias — remember later answers better than earlier ones
- Add a hasty overall vibe + next steps at the end (eg "2nd round?? check w/ [manager]")

Interview Q&A to base notes on:
${qaText}

Write the notes now. 550–650 words. Cover every question with messy detail — don't trail off early. Start with a header line then dive in. Authentically messy.`
      }]
    });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ poorNotes: message.content[0].text })
    };
  } catch (error) {
    console.error('Error generating poor notes:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
