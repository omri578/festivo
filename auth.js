// ===== AUTH.JS - Authentication with localStorage =====

const AUTH = {
  USERS_KEY: 'festivo_users',
  CURRENT_KEY: 'festivo_current_user',

  getUsers() {
    return JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]');
  },

  saveUsers(users) {
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  },

  getCurrentUser() {
    const data = localStorage.getItem(this.CURRENT_KEY);
    return data ? JSON.parse(data) : null;
  },

  setCurrentUser(user) {
    localStorage.setItem(this.CURRENT_KEY, JSON.stringify(user));
  },

  register(username, password) {
    if (!username || username.trim().length < 2) {
      return { ok: false, error: 'שם המשתמש חייב להכיל לפחות 2 תווים' };
    }
    if (!password || password.length < 4) {
      return { ok: false, error: 'הסיסמה חייבת להכיל לפחות 4 תווים' };
    }
    const users = this.getUsers();
    const exists = users.find(u => u.username.toLowerCase() === username.trim().toLowerCase());
    if (exists) {
      return { ok: false, error: 'שם המשתמש כבר תפוס, בחר שם אחר' };
    }
    const user = {
      id: 'u_' + Date.now(),
      username: username.trim(),
      password: password,
      createdAt: new Date().toISOString()
    };
    users.push(user);
    this.saveUsers(users);
    this.setCurrentUser({ id: user.id, username: user.username });
    return { ok: true, user };
  },

  login(username, password) {
    if (!username || !password) {
      return { ok: false, error: 'נא למלא את כל השדות' };
    }
    const users = this.getUsers();
    const user = users.find(
      u => u.username.toLowerCase() === username.trim().toLowerCase() && u.password === password
    );
    if (!user) {
      return { ok: false, error: 'שם משתמש או סיסמה שגויים' };
    }
    this.setCurrentUser({ id: user.id, username: user.username });
    return { ok: true, user };
  },

  logout() {
    localStorage.removeItem(this.CURRENT_KEY);
  },

  // Guard: redirect to login if not authenticated
  requireAuth() {
    const user = this.getCurrentUser();
    if (!user) {
      window.location.href = 'login.html';
      return null;
    }
    return user;
  },

  // Guard: redirect to dashboard if already logged in
  requireGuest() {
    const user = this.getCurrentUser();
    if (user) {
      window.location.href = 'dashboard.html';
    }
  }
};
