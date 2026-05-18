// ============================================
// 🐉 DRAGON PATTERNS - Main App Logic
// ============================================

const App = {
  state: {
    currentView: 'home',
    currentPattern: null,
    currentMode: null,        // 'learn' | 'practice'
    currentLevel: 1,
    currentFile: 0,
    currentClass: 0,           // for learn mode
    trialState: null
  },

  init() {
    this.bindNav();
    this.handleRoute();
    window.addEventListener('hashchange', () => this.handleRoute());
  },

  bindNav() {
    document.querySelectorAll('[data-route]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const route = el.dataset.route;
        window.location.hash = route;
      });
    });
  },

  handleRoute() {
    const hash = window.location.hash.slice(1) || 'home';
    const parts = hash.split('/');

    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
    });
    const activeLink = document.querySelector(`[data-route="${parts[0]}"]`);
    if (activeLink) activeLink.classList.add('active');

    if (hash === 'home' || hash === '') {
      this.renderHome();
    } else if (parts[0] === 'pattern' && parts[1]) {
      const patternId = parts[1];
      const mode = parts[2] || 'learn';
      this.renderPattern(patternId, mode, parts[3]);
    } else if (parts[0] === 'trial') {
      if (parts[1] === 'active') {
        Trial.renderActive();
      } else if (parts[1] === 'results') {
        Trial.renderResults();
      } else {
        Trial.renderIntro();
      }
    } else {
      this.renderHome();
    }

    window.scrollTo(0, 0);
  },

  // ============ HOME PAGE ============
  renderHome() {
    const app = document.getElementById('app');
    const patternsHTML = window.PATTERN_ORDER.map(id => {
      const p = window.PATTERNS_DATA[id];
      return `
        <div class="pattern-card" style="--card-color: ${p.color}" data-pattern="${id}">
          <div class="pattern-card-icon">${p.icon}</div>
          <div class="pattern-card-name">${p.name}</div>
          <div class="pattern-card-name-ar">${p.nameAr}</div>
          <span class="pattern-card-category">${p.categoryAr}</span>
          <div class="pattern-card-desc">${p.shortDesc}</div>
        </div>
      `;
    }).join('');

    app.innerHTML = `
      <div class="hero fade-in">
        <div class="hero-emoji">🐉</div>
        <h1 class="dragon-title">مملكة التنانين للتصميم</h1>
        <p class="hero-subtitle">10 أنماط تصميم • 4 مستويات صعوبة • اختبار محاكاة حقيقي</p>
        <div style="display: flex; gap: 1rem; justify-content: center; margin-top: 1.5rem; flex-wrap: wrap;">
          <button class="dragon-btn dragon-btn-gold" data-route-action="trial">
            🔥 ابدأ تحدي التنين (Mock Exam)
          </button>
        </div>
      </div>
      <div class="patterns-grid">
        ${patternsHTML}
      </div>
      <div style="text-align: center; padding: 2rem; color: var(--dragon-ash); font-size: 0.9rem;">
        🐲 صنع بعناية لمذاكرة CPIT 252 • ركز على القوالب • نجاحك مضمون 🔥
      </div>
    `;

    // Bind clicks
    app.querySelectorAll('.pattern-card').forEach(card => {
      card.addEventListener('click', () => {
        const pid = card.dataset.pattern;
        window.location.hash = `pattern/${pid}/learn`;
      });
    });
    app.querySelector('[data-route-action="trial"]').addEventListener('click', () => {
      window.location.hash = 'trial';
    });
  },

  // ============ PATTERN VIEW ============
  renderPattern(patternId, mode, levelOrSub) {
    const pattern = window.PATTERNS_DATA[patternId];
    if (!pattern) {
      this.renderHome();
      return;
    }

    this.state.currentPattern = patternId;
    this.state.currentMode = mode;

    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="pattern-detail fade-in" style="--pd-color: ${pattern.color}">
        <div class="pattern-header">
          <div class="pattern-header-icon">${pattern.icon}</div>
          <div class="pattern-header-text">
            <h1>${pattern.name} • ${pattern.nameAr}</h1>
            <div class="tagline">${pattern.tagline}</div>
            <div style="color: var(--dragon-ash); margin-top: 0.5rem; font-size: 0.9rem;">
              ${pattern.categoryAr} • ${pattern.category}
            </div>
          </div>
        </div>

        <div class="pattern-mode-tabs">
          <div class="mode-tab ${mode === 'learn' ? 'active' : ''}" data-mode="learn">
            📚 الشرح والكلاسات
          </div>
          <div class="mode-tab ${mode === 'practice' ? 'active' : ''}" data-mode="practice">
            ⚔️ التدريب (4 مستويات)
          </div>
        </div>

        <div id="mode-content"></div>
      </div>
    `;

    // Bind mode tabs
    app.querySelectorAll('.mode-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const newMode = tab.dataset.mode;
        window.location.hash = `pattern/${patternId}/${newMode}`;
      });
    });

    if (mode === 'learn') {
      Learn.render(pattern);
    } else if (mode === 'practice') {
      const levelId = parseInt(levelOrSub) || 1;
      Practice.render(pattern, levelId);
    }
  }
};

// ============ LEARN MODE ============
const Learn = {
  render(pattern) {
    this.currentClass = 0;
    const container = document.getElementById('mode-content');

    const sidebarItems = pattern.classes.map((cls, idx) => `
      <li class="learn-class-item ${idx === 0 ? 'active' : ''}" data-class-idx="${idx}">
        <span>${cls.name}</span>
        <span class="learn-class-item-type">${cls.role.split(' ')[0].toLowerCase()}</span>
      </li>
    `).join('');

    container.innerHTML = `
      <div class="learn-layout">
        <aside class="learn-sidebar">
          <div class="learn-sidebar-title">الكلاسات</div>
          <ul class="learn-class-list">
            ${sidebarItems}
          </ul>
        </aside>
        <main class="learn-content" id="learn-content-area">
          <div class="learn-intro">
            <h2>📜 شرح النمط</h2>
            <p>${pattern.intro}</p>
          </div>
          <div id="class-detail-area"></div>
        </main>
      </div>
    `;

    // Bind sidebar clicks
    container.querySelectorAll('.learn-class-item').forEach(item => {
      item.addEventListener('click', () => {
        const idx = parseInt(item.dataset.classIdx);
        this.currentClass = idx;
        container.querySelectorAll('.learn-class-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        this.renderClass(pattern, idx);
      });
    });

    this.renderClass(pattern, 0);
  },

  renderClass(pattern, idx) {
    const cls = pattern.classes[idx];
    const area = document.getElementById('class-detail-area');

    const methodsHTML = cls.methods.map((m, i) => `
      <div class="code-method-block" data-method-idx="${i}">
        <div class="code-method-header">
          <span class="code-method-name">${escapeHTML(m.name)}</span>
          <span class="code-method-toggle">▸</span>
        </div>
        <div class="code-method-body">
          <div class="code-method-purpose">
            <strong>💡 ليه نسويها؟</strong> ${m.purpose}
          </div>
          <div class="code-method-snippet">${syntaxHighlight(m.code)}</div>
        </div>
      </div>
    `).join('');

    area.innerHTML = `
      <div class="learn-class-name">${cls.name}</div>
      <div class="learn-class-role">${cls.roleAr}</div>
      <div class="learn-class-desc">${cls.desc}</div>

      <h3 style="margin: 1.5rem 0 0.75rem; color: var(--pd-color); font-size: 1.1rem;">
        🔍 الـ Methods والـ Fields (اضغط للتوسعة)
      </h3>
      ${methodsHTML}

      <h3 style="margin: 2rem 0 0.75rem; color: var(--pd-color); font-size: 1.1rem;">
        📜 الكود الكامل
      </h3>
      <div class="code-block">${syntaxHighlight(cls.fullCode)}</div>
    `;

    // Bind method toggles
    area.querySelectorAll('.code-method-header').forEach(header => {
      header.addEventListener('click', () => {
        header.parentElement.classList.toggle('expanded');
      });
    });

    // Auto-expand first method
    const first = area.querySelector('.code-method-block');
    if (first) first.classList.add('expanded');
  }
};

// ============ PRACTICE MODE ============
const Practice = {
  state: {
    level: 1,
    fileIdx: 0,
    userCode: {}  // key: "patternId-levelId-fileIdx" -> code
  },

  render(pattern, levelId) {
    this.state.level = levelId;
    this.state.fileIdx = 0;
    const container = document.getElementById('mode-content');

    const difficultyButtons = pattern.levels.map(lvl => `
      <div class="difficulty-btn ${lvl.id === levelId ? 'active' : ''}" data-d="${lvl.id}" data-level="${lvl.id}">
        <div class="difficulty-icon">${lvl.icon}</div>
        <div class="difficulty-name">${lvl.name}</div>
        <div class="difficulty-name-ar">${lvl.nameAr}</div>
        <div class="difficulty-stars">${lvl.stars}</div>
      </div>
    `).join('');

    container.innerHTML = `
      <div class="difficulty-bar">${difficultyButtons}</div>
      <div id="practice-area"></div>
    `;

    // Bind difficulty clicks
    container.querySelectorAll('.difficulty-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const lvl = parseInt(btn.dataset.level);
        window.location.hash = `pattern/${pattern.id}/practice/${lvl}`;
      });
    });

    this.renderLevel(pattern, levelId);
  },

  renderLevel(pattern, levelId) {
    const level = pattern.levels.find(l => l.id === levelId);
    if (!level) return;

    const area = document.getElementById('practice-area');

    // Files sidebar
    const filesHTML = level.files.map((f, idx) => `
      <div class="practice-file-item ${idx === this.state.fileIdx ? 'active' : ''}" data-file-idx="${idx}">
        <span>📄</span>
        <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${f.name}</span>
        <span class="practice-file-status ${f.status}">${f.status === 'ok' ? '✓' : '⏳'}</span>
      </div>
    `).join('');

    area.innerHTML = `
      <div class="practice-info">
        <div class="practice-info-title">
          ${level.icon} المستوى ${level.id}: ${level.name} (${level.nameAr})
        </div>
        <div class="practice-info-task">${level.task}</div>
      </div>

      <div class="practice-workspace">
        <aside class="practice-files">
          <div class="practice-files-title">الملفات (${level.files.length})</div>
          ${filesHTML}
        </aside>
        <div class="practice-editor-area" id="editor-area"></div>
      </div>
    `;

    // Bind file tabs
    area.querySelectorAll('.practice-file-item').forEach(item => {
      item.addEventListener('click', () => {
        this.state.fileIdx = parseInt(item.dataset.fileIdx);
        area.querySelectorAll('.practice-file-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        this.renderEditor(pattern, level);
      });
    });

    this.renderEditor(pattern, level);
  },

  renderEditor(pattern, level) {
    const file = level.files[this.state.fileIdx];
    const editorArea = document.getElementById('editor-area');
    const stateKey = `${pattern.id}-${level.id}-${this.state.fileIdx}`;
    const savedCode = this.state.userCode[stateKey];
    const initialCode = savedCode !== undefined ? savedCode : file.starter;

    if (file.readonly) {
      editorArea.innerHTML = `
        <div class="editor-header">
          <span class="filename">${file.name}</span>
          <span style="color: var(--dragon-ash); font-size: 0.85rem;">📌 ملف مرجعي (للقراءة)</span>
        </div>
        <div class="code-block" style="border-radius: 0 0 8px 8px; margin: -1rem 0 0;">
          ${syntaxHighlight(file.starter)}
        </div>
      `;
      return;
    }

    editorArea.innerHTML = `
      <div class="editor-header">
        <span class="filename">${file.name}</span>
        <span style="color: var(--dragon-ash); font-size: 0.85rem;">عدّل الكود ثم اضغط فحص 🔥</span>
      </div>
      <div class="editor-wrap">
        <textarea class="editor-textarea" id="practice-editor" spellcheck="false">${escapeHTML(initialCode)}</textarea>
      </div>

      <div class="practice-actions">
        <button class="dragon-btn dragon-btn-primary" id="check-btn">
          🔥 فحص الكود
        </button>
        <button class="dragon-btn dragon-btn-secondary" id="reset-btn">
          ↻ إعادة الكود الأصلي
        </button>
        <button class="dragon-btn dragon-btn-gold" id="solution-btn">
          👑 شوف الحل
        </button>
      </div>

      <div class="feedback-panel" id="feedback"></div>
    `;

    const textarea = document.getElementById('practice-editor');
    textarea.addEventListener('input', () => {
      this.state.userCode[stateKey] = textarea.value;
    });

    // Tab key in textarea
    textarea.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        textarea.value = textarea.value.substring(0, start) + '    ' + textarea.value.substring(end);
        textarea.selectionStart = textarea.selectionEnd = start + 4;
        this.state.userCode[stateKey] = textarea.value;
      }
    });

    document.getElementById('check-btn').addEventListener('click', () => {
      this.checkCode(pattern, level, file, textarea.value);
    });

    document.getElementById('reset-btn').addEventListener('click', () => {
      if (confirm('متأكد تبي ترجع للكود الأصلي؟ سيحذف اللي عدّلته!')) {
        textarea.value = file.starter;
        this.state.userCode[stateKey] = file.starter;
        document.getElementById('feedback').className = 'feedback-panel';
      }
    });

    document.getElementById('solution-btn').addEventListener('click', () => {
      if (confirm('متأكد تبي تشوف الحل؟')) {
        textarea.value = file.solution;
        this.state.userCode[stateKey] = file.solution;
        const fb = document.getElementById('feedback');
        fb.className = 'feedback-panel success show';
        fb.innerHTML = `
          <div class="feedback-title">👑 الحل المثالي</div>
          <p>هذا الحل النموذجي. حاول تفهمه وتطبقه بنفسك في مرات قادمة.</p>
        `;
      }
    });
  },

  checkCode(pattern, level, file, code) {
    const fb = document.getElementById('feedback');
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
      fb.className = 'feedback-panel success show';
      fb.innerHTML = `
        <div class="feedback-title">🔥 ممتاز! نجحت في هذا الملف</div>
        <p>كل الفحوصات نجحت. ${level.files.length > 1 ? 'انتقل للملف التالي.' : 'تقدر تجرب مستوى أصعب الحين!'}</p>
        ${this.getNextStepHTML(pattern, level)}
      `;
      // Mark file as ok in state visually
      const fileEl = document.querySelector(`.practice-file-item[data-file-idx="${this.state.fileIdx}"] .practice-file-status`);
      if (fileEl) {
        fileEl.textContent = '✓';
        fileEl.className = 'practice-file-status ok';
      }
    } else {
      fb.className = 'feedback-panel error show';
      fb.innerHTML = `
        <div class="feedback-title">⚠️ في ${errors.length} خطأ - حاول مرة ثانية</div>
        <ul class="feedback-list">
          ${errors.map(e => `<li>${e}</li>`).join('')}
        </ul>
        <p style="margin-top: 0.75rem; font-size: 0.85rem; opacity: 0.85;">
          💡 تذكر: التنين الحقيقي ما يستسلم. عدّل وحاول مرة ثانية!
        </p>
      `;
    }
  },

  getNextStepHTML(pattern, level) {
    const isLastFile = this.state.fileIdx === level.files.length - 1;
    const nextLevel = pattern.levels.find(l => l.id === level.id + 1);

    if (!isLastFile) {
      return `<button class="dragon-btn dragon-btn-success" style="margin-top: 0.75rem;" onclick="Practice.nextFile()">انتقل للملف التالي ←</button>`;
    } else if (nextLevel) {
      return `<button class="dragon-btn dragon-btn-success" style="margin-top: 0.75rem;" onclick="window.location.hash='pattern/${pattern.id}/practice/${nextLevel.id}'">انتقل لمستوى ${nextLevel.icon} ${nextLevel.nameAr} ←</button>`;
    } else {
      return `<button class="dragon-btn dragon-btn-gold" style="margin-top: 0.75rem;" onclick="window.location.hash='trial'">🔥 جرب تحدي التنين (Mock Exam)</button>`;
    }
  },

  nextFile() {
    const pattern = window.PATTERNS_DATA[App.state.currentPattern];
    const level = pattern.levels.find(l => l.id === this.state.level);
    if (this.state.fileIdx < level.files.length - 1) {
      this.state.fileIdx++;
      const items = document.querySelectorAll('.practice-file-item');
      items.forEach(i => i.classList.remove('active'));
      items[this.state.fileIdx].classList.add('active');
      this.renderEditor(pattern, level);
    }
  }
};

// ============ UTILITIES ============
function escapeHTML(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function syntaxHighlight(code) {
  if (!code) return '';
  let html = escapeHTML(code);

  // Comments (line and block)
  html = html.replace(/(\/\/[^\n]*)/g, '<span class="tk-cmt">$1</span>');
  html = html.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="tk-cmt">$1</span>');

  // Strings
  html = html.replace(/(&quot;[^&]*?&quot;)/g, '<span class="tk-str">$1</span>');

  // Annotations
  html = html.replace(/(@\w+)/g, '<span class="tk-ann">$1</span>');

  // Keywords
  const keywords = ['public', 'private', 'protected', 'static', 'final', 'abstract',
                    'class', 'interface', 'extends', 'implements', 'return', 'new',
                    'this', 'super', 'void', 'null', 'true', 'false', 'if', 'else',
                    'for', 'while', 'do', 'switch', 'case', 'break', 'continue',
                    'package', 'import', 'throws', 'throw', 'try', 'catch', 'finally'];
  const kwRegex = new RegExp('\\b(' + keywords.join('|') + ')\\b', 'g');
  html = html.replace(kwRegex, '<span class="tk-key">$1</span>');

  // Types (start with uppercase)
  html = html.replace(/\b(String|Integer|Boolean|Double|Float|Long|Char|Object|List|ArrayList|HashMap|Map|Set|Date|Exception|Builder|Runnable|ExecutorService|Executors|Thread|System|Math|Arrays|Collections|Iterator|LinkedList|Character|StringBuilder)\b/g,
    '<span class="tk-typ">$1</span>');

  // Numbers
  html = html.replace(/\b(\d+\.?\d*)\b/g, '<span class="tk-num">$1</span>');

  return html;
}

// Initialize app on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
