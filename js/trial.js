// ============================================
// 🐉 DRAGON TRIAL - Mock Exam Logic
// ============================================

const Trial = {
  state: {
    questions: [],         // 2 randomly picked labs
    currentQ: 0,
    currentFile: 0,
    fileStates: {},        // key: "qIdx-fileIdx" -> {code, completed}
    startTime: null,
    duration: 2 * 60 * 60 * 1000,  // 2 hours in ms
    timerInterval: null,
    finished: false
  },

  // ============ INTRO SCREEN ============
  renderIntro() {
    this.cleanup();
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="trial-intro fade-in">
        <div class="trial-intro-icon">🐉</div>
        <h1>تحدي التنين الأعظم</h1>
        <p style="color: var(--dragon-ash); font-size: 1.15rem; margin-top: 0.5rem;">
          محاكاة كاملة لاختبار اللاب الحقيقي
        </p>

        <div class="trial-info-card">
          <h3>📜 التعليمات</h3>
          <ul>
            <li><strong>المدة:</strong> ساعتين (مثل الاختبار الحقيقي)</li>
            <li><strong>الأسئلة:</strong> 2 سؤال عشوائي من 10 لابات محتملة</li>
            <li><strong>التنقل:</strong> تقدر تتنقل بين السؤالين بحرية</li>
            <li><strong>التنقل بين الملفات:</strong> كل سؤال فيه عدة ملفات تقدر تحلها بأي ترتيب</li>
            <li><strong>الفحص:</strong> فحص فوري للكود (مثل JUnit في الاختبار)</li>
            <li><strong>الاستسلام:</strong> لو تعقدت، اضغط "استسلام" وراح أعطيك الحل وخطوات التفكير</li>
          </ul>
        </div>

        <div class="trial-info-card" style="border-color: var(--dragon-gold);">
          <h3 style="color: var(--dragon-red-bright);">🔥 نصائح من تنين قديم</h3>
          <ul style="list-style: none; padding-right: 0;">
            <li>⚡ اقرأ السيناريو كامل قبل ما تكتب أي حرف</li>
            <li>⚡ حدد الـ pattern من الكلمات المفتاحية</li>
            <li>⚡ ابدأ بالـ interface/abstract class</li>
            <li>⚡ لا تنسى @Override</li>
            <li>⚡ ركز على الـ access modifiers (private/public/static)</li>
          </ul>
        </div>

        <button class="dragon-btn dragon-btn-primary" id="start-trial-btn" style="font-size: 1.2rem; padding: 1rem 2.5rem; margin-top: 1rem;">
          🔥 ابدأ التحدي الآن
        </button>
        <button class="dragon-btn dragon-btn-secondary" data-action="back" style="margin-top: 1rem; margin-right: 1rem;">
          ← رجوع
        </button>
      </div>
    `;

    document.getElementById('start-trial-btn').addEventListener('click', () => this.start());
    app.querySelector('[data-action="back"]').addEventListener('click', () => {
      window.location.hash = 'home';
    });
  },

  // ============ START TRIAL ============
  start() {
    // Pick 2 random labs from different patterns
    const labs = [...window.TRIAL_LABS];
    const picked = [];
    const usedPatterns = new Set();

    while (picked.length < 2 && labs.length > 0) {
      const idx = Math.floor(Math.random() * labs.length);
      const lab = labs[idx];
      if (!usedPatterns.has(lab.pattern)) {
        picked.push(lab);
        usedPatterns.add(lab.pattern);
      }
      labs.splice(idx, 1);
    }

    this.state.questions = picked;
    this.state.currentQ = 0;
    this.state.currentFile = 0;
    this.state.fileStates = {};
    this.state.startTime = Date.now();
    this.state.finished = false;

    window.location.hash = 'trial/active';
  },

  // ============ ACTIVE TRIAL VIEW ============
  renderActive() {
    if (this.state.questions.length === 0) {
      window.location.hash = 'trial';
      return;
    }

    const app = document.getElementById('app');
    const questions = this.state.questions;

    app.innerHTML = `
      <div class="trial-header">
        <div class="trial-timer" id="trial-timer">
          <span>⏱️</span>
          <span id="timer-display">02:00:00</span>
        </div>
        <div class="trial-progress" id="q-tabs">
          ${questions.map((q, idx) => `
            <div class="trial-q-tab ${idx === this.state.currentQ ? 'active' : ''}" data-q-idx="${idx}">
              السؤال ${idx + 1}
            </div>
          `).join('')}
        </div>
        <div style="display: flex; gap: 0.5rem;">
          <button class="dragon-btn dragon-btn-secondary" id="surrender-btn">
            🏳️ استسلام
          </button>
          <button class="dragon-btn dragon-btn-success" id="finish-btn">
            ✓ إنهاء
          </button>
        </div>
      </div>

      <div class="trial-workspace fade-in" id="trial-workspace"></div>
    `;

    // Bind tabs
    app.querySelectorAll('.trial-q-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        this.state.currentQ = parseInt(tab.dataset.qIdx);
        this.state.currentFile = 0;
        app.querySelectorAll('.trial-q-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.renderQuestion();
      });
    });

    document.getElementById('surrender-btn').addEventListener('click', () => this.surrender());
    document.getElementById('finish-btn').addEventListener('click', () => this.finishTrial());

    this.startTimer();
    this.renderQuestion();
  },

  startTimer() {
    if (this.state.timerInterval) clearInterval(this.state.timerInterval);
    const update = () => {
      const elapsed = Date.now() - this.state.startTime;
      const remaining = this.state.duration - elapsed;
      const display = document.getElementById('timer-display');
      const timer = document.getElementById('trial-timer');
      if (!display || !timer) return;

      if (remaining <= 0) {
        display.textContent = '00:00:00';
        clearInterval(this.state.timerInterval);
        this.finishTrial(true);
        return;
      }

      const hours = Math.floor(remaining / 3600000);
      const mins = Math.floor((remaining % 3600000) / 60000);
      const secs = Math.floor((remaining % 60000) / 1000);
      display.textContent = `${String(hours).padStart(2,'0')}:${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`;

      timer.classList.remove('warning', 'danger');
      if (remaining < 10 * 60 * 1000) timer.classList.add('danger');
      else if (remaining < 30 * 60 * 1000) timer.classList.add('warning');
    };

    update();
    this.state.timerInterval = setInterval(update, 1000);
  },

  renderQuestion() {
    const ws = document.getElementById('trial-workspace');
    const q = this.state.questions[this.state.currentQ];
    const pattern = window.PATTERNS_DATA[q.pattern];

    const filesHTML = q.starterFiles.map((f, idx) => {
      const stateKey = `${this.state.currentQ}-${idx}`;
      const state = this.state.fileStates[stateKey];
      const isCompleted = state && state.completed;
      return `
        <div class="practice-file-item ${idx === this.state.currentFile ? 'active' : ''}" data-file-idx="${idx}">
          <span>📄</span>
          <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${f.name}</span>
          <span class="practice-file-status ${isCompleted ? 'ok' : 'todo'}">${isCompleted ? '✓' : '⏳'}</span>
        </div>
      `;
    }).join('');

    ws.innerHTML = `
      <div class="trial-q-card" style="border-color: ${pattern.color}">
        <div class="trial-q-title">
          ${pattern.icon} ${q.title}
          <span class="trial-q-grade" style="background: ${pattern.color}">${q.patternName}</span>
        </div>
        <div class="trial-q-scenario">
          <strong style="color: var(--dragon-gold);">📋 السيناريو:</strong><br>
          ${q.scenario}
        </div>
        <div class="trial-q-task">
          <div class="trial-q-task-title">🎯 المطلوب:</div>
          ${q.task}
        </div>
      </div>

      <div class="practice-workspace">
        <aside class="practice-files">
          <div class="practice-files-title">الملفات (${q.starterFiles.length})</div>
          ${filesHTML}
        </aside>
        <div class="practice-editor-area" id="trial-editor"></div>
      </div>
    `;

    ws.querySelectorAll('.practice-file-item').forEach(item => {
      item.addEventListener('click', () => {
        this.state.currentFile = parseInt(item.dataset.fileIdx);
        ws.querySelectorAll('.practice-file-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        this.renderTrialEditor();
      });
    });

    this.renderTrialEditor();
  },

  renderTrialEditor() {
    const q = this.state.questions[this.state.currentQ];
    const file = q.starterFiles[this.state.currentFile];
    const editor = document.getElementById('trial-editor');
    const stateKey = `${this.state.currentQ}-${this.state.currentFile}`;
    const saved = this.state.fileStates[stateKey];
    const code = saved && saved.code !== undefined ? saved.code : file.starter;

    editor.innerHTML = `
      <div class="editor-header">
        <span class="filename">${file.name}</span>
        <span style="color: var(--dragon-ash); font-size: 0.85rem;">سؤال ${this.state.currentQ + 1} / ملف ${this.state.currentFile + 1} من ${q.starterFiles.length}</span>
      </div>
      <div class="editor-wrap">
        <textarea class="editor-textarea" id="trial-textarea" spellcheck="false">${escapeHTML(code)}</textarea>
      </div>

      <div class="practice-actions">
        <button class="dragon-btn dragon-btn-primary" id="trial-check-btn">
          🔥 فحص الكود
        </button>
        <button class="dragon-btn dragon-btn-secondary" id="trial-reset-btn">
          ↻ إعادة
        </button>
      </div>

      <div class="feedback-panel" id="trial-feedback"></div>
    `;

    const textarea = document.getElementById('trial-textarea');
    textarea.addEventListener('input', () => {
      if (!this.state.fileStates[stateKey]) this.state.fileStates[stateKey] = {};
      this.state.fileStates[stateKey].code = textarea.value;
    });

    textarea.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        textarea.value = textarea.value.substring(0, start) + '    ' + textarea.value.substring(end);
        textarea.selectionStart = textarea.selectionEnd = start + 4;
        if (!this.state.fileStates[stateKey]) this.state.fileStates[stateKey] = {};
        this.state.fileStates[stateKey].code = textarea.value;
      }
    });

    document.getElementById('trial-check-btn').addEventListener('click', () => {
      this.checkTrialCode(file, textarea.value, stateKey);
    });

    document.getElementById('trial-reset-btn').addEventListener('click', () => {
      if (confirm('متأكد؟ سيحذف اللي عدّلته')) {
        textarea.value = file.starter;
        if (!this.state.fileStates[stateKey]) this.state.fileStates[stateKey] = {};
        this.state.fileStates[stateKey].code = file.starter;
        document.getElementById('trial-feedback').className = 'feedback-panel';
      }
    });
  },

  checkTrialCode(file, code, stateKey) {
    const fb = document.getElementById('trial-feedback');
    const errors = [];

    for (const check of file.checks) {
      let passed = false;
      if (check.type === 'contains') {
        passed = code.includes(check.value);
      } else if (check.type === 'not_contains') {
        passed = !code.includes(check.value);
      } else if (check.type === 'regex') {
        const flags = check.flags || '';
        const re = new RegExp(check.value, flags);
        passed = re.test(code);
      }
      if (!passed) errors.push(check.msg);
    }

    if (errors.length === 0) {
      if (!this.state.fileStates[stateKey]) this.state.fileStates[stateKey] = {};
      this.state.fileStates[stateKey].completed = true;
      this.state.fileStates[stateKey].code = code;

      fb.className = 'feedback-panel success show';
      fb.innerHTML = `
        <div class="feedback-title">🔥 ممتاز! الملف صحيح</div>
        <p>كل الفحوصات نجحت لهذا الملف. ${this.getProgressMessage()}</p>
      `;

      // Update file tab status visually
      const fileEl = document.querySelector(`.practice-file-item[data-file-idx="${this.state.currentFile}"] .practice-file-status`);
      if (fileEl) {
        fileEl.textContent = '✓';
        fileEl.className = 'practice-file-status ok';
      }
    } else {
      fb.className = 'feedback-panel error show';
      fb.innerHTML = `
        <div class="feedback-title">⚠️ في ${errors.length} نقطة تحتاج تعديل</div>
        <ul class="feedback-list">
          ${errors.map(e => `<li>${e}</li>`).join('')}
        </ul>
      `;
    }
  },

  getProgressMessage() {
    const q = this.state.questions[this.state.currentQ];
    const totalFiles = q.starterFiles.length;
    let completed = 0;
    for (let i = 0; i < totalFiles; i++) {
      const key = `${this.state.currentQ}-${i}`;
      if (this.state.fileStates[key] && this.state.fileStates[key].completed) completed++;
    }
    if (completed === totalFiles) {
      return '🎉 السؤال خلص كامل! انتقل للسؤال الثاني أو أنهي.';
    }
    return `أنجزت ${completed}/${totalFiles} ملف في هذا السؤال.`;
  },

  // ============ SURRENDER ============
  surrender() {
    const q = this.state.questions[this.state.currentQ];
    const modal = document.createElement('div');
    modal.className = 'modal-backdrop';
    modal.innerHTML = `
      <div class="modal">
        <button class="modal-close">×</button>
        <h2 class="modal-title">👑 حل ${q.title}</h2>
        <p style="text-align: center; color: var(--dragon-ash); margin-bottom: 1.5rem;">
          خطوات التفكير والحل النموذجي
        </p>

        <h3 style="color: var(--dragon-gold); margin-bottom: 1rem;">📋 خطوات التفكير:</h3>
        ${q.solutionSteps.map(step => `
          <div class="solution-step">
            <div class="solution-step-title">${step.title}</div>
            <div>${step.content}</div>
          </div>
        `).join('')}

        <h3 style="color: var(--dragon-gold); margin: 2rem 0 1rem;">💎 الحل النموذجي:</h3>
        ${q.starterFiles.map(f => `
          <div style="margin-bottom: 1.5rem;">
            <div style="background: var(--dragon-bg-light); padding: 0.5rem 1rem; border-radius: 6px 6px 0 0; color: var(--dragon-gold); font-family: var(--font-code);">
              📄 ${f.name}
            </div>
            <div class="code-block" style="border-radius: 0 0 6px 6px; margin: 0;">${syntaxHighlight(f.solution)}</div>
          </div>
        `).join('')}

        <div style="text-align: center; margin-top: 2rem;">
          <button class="dragon-btn dragon-btn-secondary" data-modal-close>إغلاق</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    const close = () => modal.remove();
    modal.querySelector('.modal-close').addEventListener('click', close);
    modal.querySelector('[data-modal-close]').addEventListener('click', close);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) close();
    });
  },

  // ============ FINISH ============
  finishTrial(timeout = false) {
    if (!timeout && !confirm('متأكد تبي تنهي الاختبار الحين؟')) return;

    this.state.finished = true;
    if (this.state.timerInterval) clearInterval(this.state.timerInterval);

    window.location.hash = 'trial/results';
  },

  // ============ RESULTS ============
  renderResults() {
    const app = document.getElementById('app');
    const questions = this.state.questions;

    if (questions.length === 0) {
      window.location.hash = 'trial';
      return;
    }

    // Calculate score
    let totalFiles = 0;
    let completedFiles = 0;
    const qResults = questions.map((q, qIdx) => {
      let qTotal = q.starterFiles.length;
      let qDone = 0;
      q.starterFiles.forEach((f, fIdx) => {
        const key = `${qIdx}-${fIdx}`;
        if (this.state.fileStates[key] && this.state.fileStates[key].completed) qDone++;
      });
      totalFiles += qTotal;
      completedFiles += qDone;
      return { q, total: qTotal, done: qDone };
    });

    const percentage = totalFiles > 0 ? Math.round((completedFiles / totalFiles) * 100) : 0;
    const elapsed = Math.floor((Date.now() - this.state.startTime) / 1000);
    const mins = Math.floor(elapsed / 60);
    const secs = elapsed % 60;

    const scoreDeg = (percentage / 100) * 360;

    let title, message, emoji;
    if (percentage === 100) {
      title = 'تنين أسطوري! 👑'; emoji = '🐉';
      message = 'أداء استثنائي! أنت جاهز تماماً للاختبار.';
    } else if (percentage >= 75) {
      title = 'محارب التنين! 🔥'; emoji = '🐲';
      message = 'أداء ممتاز. راجع النقاط اللي فاتت وستكون جاهز.';
    } else if (percentage >= 50) {
      title = 'تنين شجاع 💪'; emoji = '🦎';
      message = 'بداية جيدة! راجع الأنماط اللي تعثرت فيها وأعد المحاولة.';
    } else {
      title = 'بداية الرحلة 🥚'; emoji = '🐣';
      message = 'لا بأس! ارجع للشرح وقم بالتدريب على المستويات قبل المحاولة الثانية.';
    }

    app.innerHTML = `
      <div class="results-screen fade-in">
        <div style="font-size: 6rem; margin-bottom: 1rem;">${emoji}</div>
        <h1 class="dragon-title">${title}</h1>
        <p style="color: var(--dragon-ash); margin-top: 0.5rem; font-size: 1.1rem;">${message}</p>

        <div class="results-score-circle" style="--score-deg: ${scoreDeg}deg;">
          <div class="results-score-text">${percentage}%</div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 2rem 0;">
          <div class="trial-info-card" style="text-align: center; margin: 0;">
            <div style="font-size: 2rem; color: var(--dragon-gold);">${completedFiles}/${totalFiles}</div>
            <div>ملف مكتمل</div>
          </div>
          <div class="trial-info-card" style="text-align: center; margin: 0;">
            <div style="font-size: 2rem; color: var(--dragon-gold);">${mins}:${String(secs).padStart(2,'0')}</div>
            <div>دقيقة استغرقت</div>
          </div>
        </div>

        <h3 style="color: var(--dragon-gold); margin: 2rem 0 1rem;">📊 تفاصيل كل سؤال:</h3>
        ${qResults.map((r, idx) => `
          <div class="trial-info-card" style="text-align: right; margin: 1rem 0; border-color: ${r.done === r.total ? 'var(--dragon-success)' : 'var(--dragon-border)'};">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <div>
                <strong>السؤال ${idx + 1}:</strong> ${r.q.title}
                <div style="color: var(--dragon-ash); font-size: 0.9rem; margin-top: 0.25rem;">
                  ${r.q.patternName}
                </div>
              </div>
              <div style="font-size: 1.5rem; color: ${r.done === r.total ? 'var(--dragon-success)' : 'var(--dragon-gold)'};">
                ${r.done}/${r.total}
              </div>
            </div>
          </div>
        `).join('')}

        <div style="margin-top: 2rem; display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
          <button class="dragon-btn dragon-btn-primary" id="restart-btn">
            🔄 محاولة جديدة
          </button>
          <button class="dragon-btn dragon-btn-secondary" data-action="home">
            🏠 الرئيسية
          </button>
        </div>
      </div>
    `;

    document.getElementById('restart-btn').addEventListener('click', () => {
      this.start();
    });
    app.querySelector('[data-action="home"]').addEventListener('click', () => {
      window.location.hash = 'home';
    });
  },

  cleanup() {
    if (this.state.timerInterval) {
      clearInterval(this.state.timerInterval);
      this.state.timerInterval = null;
    }
  }
};
