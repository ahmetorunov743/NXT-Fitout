/**
 * ВАЖНО: это demo-хранилище на localStorage браузера.
 * Сайт полностью статический (HTML/CSS/JS, без сервера) — поэтому
 * "админка" и "CRM" здесь работают только в пределах одного браузера
 * на одном устройстве и НЕ синхронизируются между посетителями сайта
 * и владельцем. Это ограничение статического хостинга (GitHub Pages),
 * а не баг.
 *
 * Для реальной работы CRM/публикации кейсов между разными людьми
 * нужен один из вариантов (см. README.md):
 *  - принимать заявки через Formspree/Google Forms (как в WebCraft/Orvena)
 *    и вести кейсы вручную, редактируя data/cases.json и заливая на GitHub;
 *  - либо добавить лёгкий бэкенд (Cloudflare Worker + KV, Firebase, Supabase).
 */

const Store = {
  LEADS_KEY: 'fitout_leads',
  CASES_KEY: 'fitout_custom_cases',
  PRICING_KEY: 'fitout_pricing_overrides',
  AUTH_KEY: 'fitout_admin_authed',

  getLeads() {
    return JSON.parse(localStorage.getItem(this.LEADS_KEY) || '[]');
  },
  addLead(lead) {
    const leads = this.getLeads();
    const newLead = {
      ...lead,
      id: 'L' + Math.random().toString(36).slice(2, 10),
      createdAt: new Date().toISOString(),
      status: 'New',
    };
    leads.unshift(newLead);
    localStorage.setItem(this.LEADS_KEY, JSON.stringify(leads));
    return newLead;
  },
  updateLeadStatus(id, status) {
    const leads = this.getLeads().map((l) => (l.id === id ? { ...l, status } : l));
    localStorage.setItem(this.LEADS_KEY, JSON.stringify(leads));
  },

  getCustomCases() {
    return JSON.parse(localStorage.getItem(this.CASES_KEY) || '[]');
  },
  addCustomCase(item) {
    const cases = this.getCustomCases();
    cases.unshift({ ...item, id: 'C' + Math.random().toString(36).slice(2, 10) });
    localStorage.setItem(this.CASES_KEY, JSON.stringify(cases));
    return cases;
  },

  getPricingOverrides() {
    return JSON.parse(localStorage.getItem(this.PRICING_KEY) || '{}');
  },
  savePricingOverrides(overrides) {
    localStorage.setItem(this.PRICING_KEY, JSON.stringify(overrides));
  },

  isAuthed() {
    return sessionStorage.getItem(this.AUTH_KEY) === '1';
  },
  login(username, password) {
    // Demo-логин, задайте свои значения ниже. Это проверка на стороне
    // браузера — она НЕ защищает данные, только скрывает страницу от
    // случайных посетителей. Для настоящей защиты нужен сервер (см. README).
    const ADMIN_USER = 'ahmet_orunov';
    const ADMIN_PASS = '72a73n94s98m07a';
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      sessionStorage.setItem(this.AUTH_KEY, '1');
      return true;
    }
    return false;
  },
  logout() {
    sessionStorage.removeItem(this.AUTH_KEY);
  },
  requireAuth() {
    if (!this.isAuthed()) {
      window.location.href = 'login.html';
    }
  },
};
