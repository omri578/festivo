// ===== STORAGE.JS - Games CRUD with localStorage =====

const STORAGE = {
  GAMES_KEY: 'festivo_games',

  getGames() {
    return JSON.parse(localStorage.getItem(this.GAMES_KEY) || '[]');
  },

  saveGames(games) {
    localStorage.setItem(this.GAMES_KEY, JSON.stringify(games));
  },

  getUserGames(userId) {
    return this.getGames().filter(g => g.userId === userId);
  },

  getGame(id) {
    return this.getGames().find(g => g.id === id) || null;
  },

  saveGame(gameData) {
    const games = this.getGames();
    const existing = games.findIndex(g => g.id === gameData.id);
    if (existing >= 0) {
      games[existing] = { ...games[existing], ...gameData, updatedAt: new Date().toISOString() };
    } else {
      games.push({
        ...gameData,
        id: gameData.id || 'g_' + Date.now(),
        createdAt: new Date().toISOString()
      });
    }
    this.saveGames(games);
    return gameData.id || games[games.length - 1].id;
  },

  deleteGame(id) {
    const games = this.getGames().filter(g => g.id !== id);
    this.saveGames(games);
  }
};

// Game type metadata
const GAME_TYPES = {
  trivia: {
    id: 'trivia',
    name: 'חידון',
    icon: '🧠',
    color: '#7c3aed',
    description: 'שאלות ותשובות מותאמות אישית עם טיימר ומגוון אפשרויות',
    tag: 'קלאסי'
  },
  'truth-dare': {
    id: 'truth-dare',
    name: 'אמת או אומץ',
    icon: '🔥',
    color: '#ff6b6b',
    description: 'קלפים מרגשים עם אמיתות ואתגרים מצחיקים',
    tag: 'חברתי'
  },
  'would-rather': {
    id: 'would-rather',
    name: 'מה עדיף?',
    icon: '⚡',
    color: '#ffd93d',
    description: 'דילמות מצחיקות ומביכות שיגרמו לכולם לצחוק',
    tag: 'מצחיק'
  },
  'most-likely': {
    id: 'most-likely',
    name: 'הכי סביר ש...',
    icon: '👆',
    color: '#6bcb77',
    description: 'מי מהחבר\'ה הכי סביר שיעשה דברים מגניבים ומביכים?',
    tag: 'קבוצתי'
  },
  'hot-seat': {
    id: 'hot-seat',
    name: 'כיסא חם',
    icon: '🪑',
    color: '#4ecdc4',
    description: 'שאלות ישירות ומסקרנות לשחקן שיושב על הכיסא החם',
    tag: 'אישי'
  },
  'emoji-riddles': {
    id: 'emoji-riddles',
    name: "חידות אמוג'י",
    icon: '🎭',
    color: '#ff9ff3',
    description: "נחש סרטים, שירים וביטויים מסדרת אמוג'ים מצחיקה",
    tag: 'יצירתי'
  },
  'never-have-i': {
    id: 'never-have-i',
    name: 'אני מעולם לא...',
    icon: '🙈',
    color: '#f59e0b',
    description: 'חשיפות מביכות ומצחיקות — מי עשה את זה ומי לא?',
    tag: 'חשיפה'
  },
  'complete-lyrics': {
    id: 'complete-lyrics',
    name: 'השלם את השיר',
    icon: '🎤',
    color: '#ec4899',
    description: 'הפסקנו את השיר באמצע — תמשיכו אם אתם יודעים!',
    tag: 'מוזיקה'
  },
  'five-seconds': {
    id: 'five-seconds',
    name: '5 שניות',
    icon: '⏱️',
    color: '#14b8a6',
    description: 'תציינו 3 דברים מהקטגוריה תוך 5 שניות — בלחץ!',
    tag: 'מהיר'
  },
  'who-am-i': {
    id: 'who-am-i',
    name: 'מי אני?',
    icon: '🎭',
    color: '#8b5cf6',
    description: 'רמזים, שאלות כן/לא — נחשו את הדמות הסודית!',
    tag: 'ניחוש'
  },
  'stop-game': {
    id: 'stop-game',
    name: 'סטופ!',
    icon: '🛑',
    color: '#ef4444',
    description: 'קטגוריות ואות — כולם ממלאים, המסך מראה את הקטגוריות והאות',
    tag: 'כתיבה'
  },
  'complete-story': {
    id: 'complete-story',
    name: 'השלם את הסיפור',
    icon: '📖',
    color: '#06b6d4',
    description: 'כל אחד מקליד משפט במחשב, הסיפור גדל ביחד — מצחיק ומפתיע!',
    tag: 'כתיבה'
  },
  'price-guess': {
    id: 'price-guess',
    name: 'כמה זה עולה?',
    icon: '💰',
    color: '#10b981',
    description: 'מציגים מוצר — כולם מנחשים מחיר ואז חושפים. מי הכי מדויק?',
    tag: 'ניחוש'
  }
};

// Format date nicely
function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString('he-IL', { day: 'numeric', month: 'long', year: 'numeric' });
}
