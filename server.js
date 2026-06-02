const express = require('express');
const Anthropic = require('@anthropic-ai/sdk');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const QUESTIONS = [
  "Tell me about your background and what draws you to this Marketing Manager role.",
  "Walk me through a marketing campaign you're most proud of — what was the strategy, execution, and result?",
  "Where do you see the biggest gaps or opportunities in our marketing, and how would you approach the first 90 days?"
];

app.get('/api/questions', (req, res) => {
  res.json({ questions: QUESTIONS });
});

app.post('/api/generate-poor-notes', async (req, res) => {
  const { answers, candidateName } = req.body;

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

    res.json({ poorNotes: message.content[0].text });
  } catch (error) {
    console.error('Error generating poor notes:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/generate-lavalier', async (req, res) => {
  const { poorNotes, answers, candidateName } = req.body;

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
      console.error('JSON parse error:', parseErr, '\nRaw:', message.content[0].text.slice(0, 200));
      return res.status(500).json({ error: 'Failed to parse evaluation' });
    }

    res.json({ evaluation });
  } catch (error) {
    console.error('Error generating Lavalier feedback:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`\n✦  Interview Bot running at http://localhost:${PORT}\n`);
  if (!process.env.ANTHROPIC_API_KEY) {
    console.warn('⚠  ANTHROPIC_API_KEY not set — copy .env.example to .env and add your key\n');
  }
});
