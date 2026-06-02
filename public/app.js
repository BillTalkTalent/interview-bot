/* ─── Logo helpers ───────────────────────────────────────────────── */
function logoSVG(dark) {
  const fill = dark ? '#1f1f1f' : '#ffffff';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 358.49 58.93">
    <path fill="${fill}" d="M116.27,44.07l-2,13.57h-31.86V1.76h14.13v42.31h19.72Z"/>
    <path fill="${fill}" d="M159.95,19.96v37.68h-12.38v-4.07c-2.56,3.19-6.23,5.11-11.02,5.11-9.98,0-18.12-8.54-18.12-19.48s8.22-19.4,18.12-19.4c4.31,0,7.74,1.6,10.3,4.31v-2.79l13.09-1.36ZM147.09,39.2c0-4.63-3.43-8.14-7.9-8.14s-7.98,3.51-7.98,8.14,3.43,8.06,7.98,8.06,7.9-3.51,7.9-8.06Z"/>
    <path fill="${fill}" d="M204.34,20.68l-12.85,36.97h-15.25l-12.77-36.97h14.21l6.23,23.23,6.15-23.23h14.29Z"/>
    <path fill="${fill}" d="M245.21,19.96v37.68h-12.38v-4.07c-2.56,3.19-6.23,5.11-11.02,5.11-9.98,0-18.12-8.54-18.12-19.48s8.22-19.4,18.12-19.4c4.31,0,7.74,1.6,10.3,4.31v-2.79l13.09-1.36ZM232.36,39.2c0-4.63-3.43-8.14-7.9-8.14s-7.98,3.51-7.98,8.14,3.43,8.06,7.98,8.06,7.9-3.51,7.9-8.06Z"/>
    <path fill="${fill}" d="M251.74,1.52l13.73-1.52v57.64h-13.73V1.52Z"/>
    <path fill="${fill}" d="M270.73,8.46c0-4.23,3.59-7.74,8.06-7.74s8.06,3.51,8.06,7.74-3.59,7.74-8.06,7.74-8.06-3.51-8.06-7.74ZM271.85,21.4l13.73-1.44v37.68h-13.73V21.4Z"/>
    <path fill="${fill}" d="M324.58,43.43l3.67,9.58c-4.39,3.35-10.62,5.83-17.01,5.83-11.9,0-20.84-8.54-20.84-19.64s8.54-19.72,20.12-19.72c9.98,0,18.12,6.63,19.08,18.28l-25.47,8.14c1.68,1.84,4.07,2.95,7.27,2.95,3.67,0,8.14-1.44,13.17-5.43ZM301.99,37.68l15.09-4.95c-1.36-2.08-3.67-3.35-6.39-3.35-4.71,0-8.06,3.43-8.7,8.3Z"/>
    <path fill="${fill}" d="M358.49,19.88v11.98c-6.63,0-10.46,2.87-10.46,9.98v15.81h-13.73V21.4l12.93-1.36v5.99c2.08-4.07,5.59-6.15,11.26-6.15Z"/>
    <path fill="#ff71a0" d="M21.14,53.64c12.82,9.07,29.1,6.11,37.73-6.09,2.95-4.17,4.52-8.83,4.82-13.51l-10.24-3.24-18.81,7.31-19.86-6.8-4.53-1.43c-1.24,9.49,2.96,18.14,10.9,23.75Z"/>
    <path fill="#18c66f" d="M10.24,29.89l18.81-7.34,19.86,6.81,4.53,1.44c1.24-9.49-2.96-18.14-10.9-23.75C29.72-2.02,13.45.93,4.82,13.13,1.87,17.31.29,21.96,0,26.65l10.24,3.24Z"/>
    <polygon fill="${fill}" points="10.24 29.89 29.05 22.55 48.91 29.37 53.44 30.81 34.64 38.12 14.77 31.32 10.24 29.89"/>
  </svg>`;
}

/* icon-only mark SVG for the side button */
function logoMarkSVG(size = 36) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill="#ff71a0" d="M22.5 57c13.6 9.6 30.9 6.5 40.1-6.5 3.1-4.4 4.8-9.4 5.1-14.3l-10.9-3.4-20 7.8-21.1-7.2-4.8-1.5c-1.3 10.1 3.1 19.2 11.6 25.1Z"/>
    <path fill="#18c66f" d="M10.9 31.7 31 24.3l21.1 7.2 4.8 1.5c1.3-10.1-3.1-19.3-11.6-25.2C31.6-1.8 13.8 1.4 4.6 14.5 1.5 18.9-.1 23.6.1 28.4l10.8 3.3Z"/>
    <polygon fill="rgba(255,255,255,0.18)" points="10.9,31.7 31,24.3 52.1,31.5 56.9,33 36.8,40.4 15.7,33.2"/>
  </svg>`;
}

/* inject logos into placeholders — called after DOM refs are set up */
function initLogos() {
  const get = id => document.getElementById(id);
  get('welcome-logo').innerHTML         = logoSVG(false);   // dark bg → white logo
  get('nav-logo-interview').innerHTML   = logoSVG(true);    // light nav → dark logo
  get('nav-logo-results').innerHTML     = logoSVG(true);    // light nav → dark logo
  get('loading-logo').innerHTML         = logoMarkSVG(40);
  get('lavalier-icon').innerHTML        = logoMarkSVG(30);
  get('pro-feedback-logo').innerHTML    = logoSVG(true);    // light card → dark logo
}

/* ─── State ──────────────────────────────────────────────────────── */
const state = {
  currentQ: 0,
  answers: new Array(3).fill(''),
  currentTranscript: '',
  isListening: false,
  candidateName: '',
  candidateEmail: '',
  stream: null,
  recognition: null,
  poorNotes: '',
  questions: [],
  speechAvailable: false,
  lavalierDone: false
};

/* ─── DOM refs ───────────────────────────────────────────────────── */
const $ = id => document.getElementById(id);

const els = {
  welcomeScreen:       $('welcome-screen'),
  interviewScreen:     $('interview-screen'),
  resultsScreen:       $('results-screen'),
  candidateInput:      $('candidate-name'),
  emailInput:          $('candidate-email'),
  startBtn:            $('start-btn'),
  startError:          $('start-error'),
  aiAvatar:            $('ai-avatar'),
  speakingBars:        $('speaking-bars'),
  qCounter:            $('q-counter'),
  progressFill:        $('progress-fill'),
  qPct:                $('q-pct'),
  currentQuestion:     $('current-question'),
  transcriptContent:   $('transcript-content'),
  transcriptMic:       $('transcript-mic'),
  transcriptFallback:  $('transcript-fallback'),
  fallbackInput:       $('fallback-input'),
  listenBtn:           $('listen-btn'),
  micLabel:            $('mic-label'),
  nextBtn:             $('next-btn'),
  nextLabel:           $('next-label'),
  skipBtn:             $('skip-btn'),
  resultsHeading:      $('results-heading'),
  notesLoading:        $('notes-loading'),
  poorNotesWrap:       $('poor-notes-wrap'),
  poorNotesBody:       $('poor-notes-body'),
  proFeedbackWrap:     $('pro-feedback-wrap'),
  proFeedbackBody:     $('pro-feedback-body'),
  lavalierPanel:       $('lavalier-panel'),
  lavalierBtn:         $('lavalier-btn'),
  demoCta:             $('demo-cta'),
  lavalierSent:        $('lavalier-sent'),
  lavalierSentMsg:     $('lavalier-sent-msg'),
  restartBtn:          $('restart-btn')
};

initLogos();

/* ─── Screen transitions ─────────────────────────────────────────── */
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  $(id).classList.add('active');
}

/* ─── Welcome screen setup ───────────────────────────────────────── */
els.candidateInput.addEventListener('input', () => {
  els.startBtn.disabled = els.candidateInput.value.trim().length < 2;
});
els.candidateInput.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !els.startBtn.disabled) startInterview();
});
els.startBtn.addEventListener('click', startInterview);

async function startInterview() {
  const name = els.candidateInput.value.trim();
  if (!name) return;

  state.candidateName = name;
  state.candidateEmail = els.emailInput.value.trim();
  els.startBtn.disabled = true;
  els.startBtn.textContent = 'Starting…';
  els.startError.style.display = 'none';

  // Load questions
  try {
    const res = await fetch('/api/questions');
    const data = await res.json();
    state.questions = data.questions;
  } catch {
    showError('Could not load interview questions. Is the server running?');
    return;
  }

  setupSpeechRecognition();
  showScreen('interview-screen');
  showQuestion(0);
  speakQuestion(state.questions[0]);
}

function showError(msg) {
  els.startError.textContent = msg;
  els.startError.style.display = 'block';
  els.startBtn.disabled = false;
  els.startBtn.innerHTML = 'Begin Interview';
}

/* ─── Speech Recognition ─────────────────────────────────────────── */
function setupSpeechRecognition() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) {
    state.speechAvailable = false;
    els.transcriptFallback.style.display = 'block';
    els.listenBtn.style.display = 'none';
    return;
  }
  state.speechAvailable = true;
  const r = new SR();
  r.continuous = true;
  r.interimResults = true;
  r.lang = 'en-US';

  let finalTranscript = '';
  let restartPending = false;

  r.onresult = e => {
    let interim = '';
    for (let i = e.resultIndex; i < e.results.length; i++) {
      const t = e.results[i].transcript;
      if (e.results[i].isFinal) finalTranscript += t + ' ';
      else interim = t;
    }
    state.currentTranscript = (finalTranscript + interim).trim();
    renderTranscript(state.currentTranscript, interim.length > 0);
  };

  r.onerror = err => {
    if (err.error === 'no-speech') return; // ignore
    console.warn('Speech error:', err.error);
  };

  r.onend = () => {
    if (state.isListening && !restartPending) {
      restartPending = true;
      setTimeout(() => {
        restartPending = false;
        if (state.isListening) try { r.start(); } catch {}
      }, 100);
    }
  };

  state.recognition = r;
  state._finalTranscript = () => finalTranscript;
  state._resetTranscript = () => { finalTranscript = ''; };
}

function renderTranscript(text, interim) {
  if (!text) {
    els.transcriptContent.innerHTML = '<span class="transcript-placeholder">Click "Start Speaking" then answer the question aloud…</span>';
    return;
  }
  els.transcriptContent.textContent = text;
  if (interim) els.transcriptMic.classList.add('active');
  else els.transcriptMic.classList.remove('active');
}

/* ─── Listen button ──────────────────────────────────────────────── */
els.listenBtn.addEventListener('click', () => {
  if (!state.speechAvailable) return;
  if (state.isListening) stopListening();
  else startListening();
});

function startListening() {
  state.isListening = true;
  els.listenBtn.classList.add('listening');
  els.micLabel.textContent = 'Listening… (click to pause)';
  els.transcriptMic.classList.add('active');
  try { state.recognition.start(); } catch {}
}

function stopListening() {
  state.isListening = false;
  els.listenBtn.classList.remove('listening');
  els.micLabel.textContent = 'Start Speaking';
  els.transcriptMic.classList.remove('active');
  try { state.recognition.stop(); } catch {}
}

/* ─── Question flow ──────────────────────────────────────────────── */
function showQuestion(index) {
  state.currentQ = index;
  const total = state.questions.length;
  const pct = Math.round(((index + 1) / total) * 100);

  els.qCounter.textContent = `Question ${index + 1} of ${total}`;
  els.progressFill.style.width = pct + '%';
  els.qPct.textContent = pct + '%';

  // Reset transcript first
  if (state.isListening) stopListening();
  state.currentTranscript = '';
  if (state._resetTranscript) state._resetTranscript();
  renderTranscript('', false);
  if (els.fallbackInput) els.fallbackInput.value = '';

  els.nextBtn.disabled = false;
  if (index === total - 1) {
    els.nextLabel.textContent = 'Finish Interview';
  } else {
    els.nextLabel.textContent = 'Next Question →';
  }

  // Typewriter then auto-start listening
  typewriter(els.currentQuestion, state.questions[index], 18, () => {
    if (state.speechAvailable && !state.isListening) {
      setTimeout(startListening, 300);
    }
  });
}

function typewriter(el, text, speed, onDone) {
  el.textContent = '';
  let i = 0;
  const go = () => {
    el.textContent += text[i++];
    if (i < text.length) setTimeout(go, speed);
    else if (onDone) onDone();
  };
  go();
}

/* ─── AI avatar speaking simulation ─────────────────────────────── */
function speakQuestion(text) {
  els.aiAvatar.classList.add('speaking');
  els.speakingBars.classList.add('active');
  setTimeout(() => {
    els.aiAvatar.classList.remove('speaking');
    els.speakingBars.classList.remove('active');
  }, 1200);
}

/* ─── Next / Skip buttons ────────────────────────────────────────── */
els.nextBtn.addEventListener('click', advanceQuestion);
els.skipBtn.addEventListener('click', () => {
  state.answers[state.currentQ] = '[Skipped]';
  if (state.isListening) stopListening();
  if (state.currentQ < state.questions.length - 1) {
    showQuestion(state.currentQ + 1);
    speakQuestion(state.questions[state.currentQ]);
  } else {
    finishInterview();
  }
});

function advanceQuestion() {
  // Save answer
  if (state.speechAvailable) {
    state.answers[state.currentQ] = state.currentTranscript || '';
  } else {
    state.answers[state.currentQ] = (els.fallbackInput?.value || '').trim() || '';
  }

  if (state.isListening) stopListening();

  if (state.currentQ < state.questions.length - 1) {
    showQuestion(state.currentQ + 1);
    setTimeout(() => speakQuestion(state.questions[state.currentQ]), 400);
  } else {
    finishInterview();
  }
}


/* ─── Finish interview & generate notes ─────────────────────────── */
async function finishInterview() {

  els.resultsHeading.textContent = 'Interview Notes';
  showScreen('results-screen');

  els.notesLoading.style.display = 'flex';
  els.poorNotesWrap.style.display = 'none';
  els.proFeedbackWrap.style.display = 'none';
  els.lavalierPanel.style.display = 'none';

  try {
    const res = await fetch('/api/generate-poor-notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answers: state.answers, candidateName: state.candidateName })
    });
    if (!res.ok) throw new Error(await res.text());
    const { poorNotes } = await res.json();
    state.poorNotes = poorNotes;
    showPoorNotes(poorNotes);
  } catch (err) {
    els.notesLoading.innerHTML = `<p style="color:var(--red)">Error: ${err.message}</p>`;
  }
}

function showPoorNotes(markdown) {
  els.notesLoading.style.display = 'none';
  els.poorNotesBody.innerHTML = marked.parse(markdown);
  els.poorNotesWrap.style.display = 'block';
  els.lavalierPanel.style.display = 'flex';
  els.lavalierBtn.disabled = false;
}

/* ─── Lavalier transformation ────────────────────────────────────── */
els.lavalierBtn.addEventListener('click', activateLavalier);

async function activateLavalier() {
  if (state.lavalierDone) return;
  els.lavalierBtn.disabled = true;
  els.lavalierBtn.innerHTML = '<div class="lav-spinner"></div>';

  try {
    const res = await fetch('/api/generate-lavalier', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        poorNotes: state.poorNotes,
        answers: state.answers,
        candidateName: state.candidateName,
        candidateEmail: state.candidateEmail
      })
    });
    if (!res.ok) throw new Error(await res.text());
    const { evaluation } = await res.json();

    // Dissolve out poor notes
    els.poorNotesWrap.classList.add('transforming');
    await delay(500);
    els.poorNotesWrap.style.display = 'none';
    els.poorNotesWrap.classList.remove('transforming');

    // Show professional feedback
    els.proFeedbackBody.innerHTML = renderEvaluation(evaluation);
    els.proFeedbackWrap.style.display = 'block';
    els.resultsHeading.textContent = 'Candidate Evaluation';
    els.demoCta.style.display = 'block';

    // Update Lavalier button to done state
    state.lavalierDone = true;
    els.lavalierBtn.innerHTML = `
      <div class="lavalier-icon-wrap">${logoMarkSVG(28)}</div>
      <span class="lavalier-text">APPLIED</span>`;
    els.lavalierBtn.classList.add('done');
    els.lavalierBtn.disabled = true;

    // Show sent confirmation
    if (state.candidateEmail) {
      els.lavalierSentMsg.textContent = `Results sent to ${state.candidateEmail}`;
    } else {
      els.lavalierSentMsg.textContent = 'Evaluation complete';
    }
    els.lavalierSent.style.display = 'flex';
  } catch (err) {
    els.lavalierBtn.disabled = false;
    els.lavalierBtn.innerHTML = `<div class="lavalier-icon-wrap">${logoMarkSVG(30)}</div><span class="lavalier-text">LAVALIER</span>`;
    alert('Error: ' + err.message);
  }
}

/* ─── Restart ────────────────────────────────────────────────────── */
els.restartBtn.addEventListener('click', () => {
  state.currentQ = 0;
  state.answers = new Array(3).fill('');
  state.currentTranscript = '';
  state.candidateName = '';
  state.candidateEmail = '';
  state.stream = null;
  state.poorNotes = '';
  state.lavalierDone = false;
  els.lavalierBtn.classList.remove('done');
  $('lavalier-icon').innerHTML = logoMarkSVG(30);
  els.lavalierBtn.innerHTML = `<div class="lavalier-icon-wrap">${logoMarkSVG(30)}</div><span class="lavalier-text">LAVALIER</span>`;
  els.candidateInput.value = '';
  els.emailInput.value = '';
  els.lavalierSent.style.display = 'none';
  els.demoCta.style.display = 'none';
  els.startBtn.disabled = true;
  showScreen('welcome-screen');
});

/* ─── Evaluation renderer ────────────────────────────────────────── */
function renderEvaluation(d) {
  const ICONS = {
    strength: `<svg class="eval-row-icon" viewBox="0 0 18 18" fill="none"><rect width="18" height="18" rx="5" fill="#dcfce7"/><polyline points="3.5,13 7,9 10,11 14.5,6" stroke="#16a34a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><polyline points="11,6 14.5,6 14.5,9.5" stroke="#16a34a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    observation: `<svg class="eval-row-icon" viewBox="0 0 18 18" fill="none"><rect width="18" height="18" rx="5" fill="#dbeafe"/><path d="M9 3.5C6.5 3.5 4.5 5.8 4.5 8.2C4.5 11 9 14.5 9 14.5C9 14.5 13.5 11 13.5 8.2C13.5 5.8 11.5 3.5 9 3.5Z" stroke="#2563eb" stroke-width="1.3"/><circle cx="9" cy="8" r="1.5" fill="#2563eb"/></svg>`,
    consideration: `<svg class="eval-row-icon" viewBox="0 0 18 18" fill="none"><rect width="18" height="18" rx="5" fill="#fee2e2"/><circle cx="9" cy="9" r="5.5" stroke="#dc2626" stroke-width="1.3"/><line x1="9" y1="6" x2="9" y2="10.2" stroke="#dc2626" stroke-width="1.5" stroke-linecap="round"/><circle cx="9" cy="12.3" r="0.9" fill="#dc2626"/></svg>`
  };

  const tagsRow = (type, label, tags) => `
    <div class="eval-tags-row">
      ${ICONS[type]}
      <span class="eval-tags-label">${label}</span>
      <span class="eval-tags-text">${tags.join(', ')}</span>
    </div>`;

  const chip = text => `<span class="eval-quote">${text}</span>`;

  const item = s => `
    <div class="eval-item">
      <div class="eval-item-title">${s.title}</div>
      <p class="eval-item-body">${s.explanation}</p>
      <div class="eval-quotes">${s.quotes.map(chip).join('')}</div>
    </div>`;

  return `
    <div class="eval-summary">
      <div class="eval-section-title">Summary &amp; Analysis</div>
      <p class="eval-summary-text">${d.summary}</p>
      ${tagsRow('strength', 'Interview strengths:', d.tags.strengths)}
      ${tagsRow('observation', 'Observations:', d.tags.observations)}
      ${tagsRow('consideration', 'Things to consider:', d.tags.considerations)}
    </div>
    <div class="eval-section">
      <div class="eval-section-title">Key Takeaways</div>
      <ul class="eval-takeaways">${d.keyTakeaways.map(t => `<li>${t}</li>`).join('')}</ul>
    </div>
    <div class="eval-section">
      <div class="eval-section-title">Interview Strengths</div>
      ${d.interviewStrengths.map(item).join('')}
    </div>
    <div class="eval-section">
      <div class="eval-section-title">Observations</div>
      ${d.observations.map(item).join('')}
    </div>
    <div class="eval-section">
      <div class="eval-section-title">Things to Consider</div>
      ${d.thingsToConsider.map(item).join('')}
    </div>`;
}

/* ─── Utils ──────────────────────────────────────────────────────── */
const delay = ms => new Promise(r => setTimeout(r, ms));
