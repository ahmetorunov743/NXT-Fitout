// Логика 3-шагового калькулятора. Цены берутся из data/pricing.json,
// с возможными локальными правками из admin/calculator-edit.html (localStorage).
// Тексты объектов/задач переведены (en/ru) — см. OBJECTS/TASKS ниже.

const OBJECTS = {
  marble: [
    { value: 'floor', en: 'Floor', ru: 'Пол' },
    { value: 'walls', en: 'Walls', ru: 'Стены' },
    { value: 'stairs', en: 'Stairs', ru: 'Ступени / лестница' },
    { value: 'countertop', en: 'Countertop', ru: 'Столешница' },
    { value: 'decor', en: 'Large decor / handles', ru: 'Крупный декор / ручки' },
  ],
  wood: [
    { value: 'floor', en: 'Parquet / Floor', ru: 'Паркет / пол' },
    { value: 'doors', en: 'Doors', ru: 'Двери' },
    { value: 'furniture', en: 'Furniture', ru: 'Мебель' },
    { value: 'stairs', en: 'Stairs', ru: 'Ступени' },
  ],
  metal: [{ value: 'decor', en: 'Metal elements', ru: 'Металлические элементы' }],
  fitout: [
    { value: 'apartment', en: 'Apartment', ru: 'Квартира' },
    { value: 'villa', en: 'Villa', ru: 'Вилла' },
    { value: 'office', en: 'Office', ru: 'Офис' },
    { value: 'balcony', en: 'Balcony / Terrace', ru: 'Балкон / терраса' },
  ],
};

const TASKS = {
  marble: [
    { value: 'polishing', en: 'Polishing / Shine', ru: 'Полировка / блеск' },
    { value: 'crack_repair', en: 'Chip / crack removal', ru: 'Удаление сколов / трещин' },
    { value: 'stain_removal', en: 'Stain removal', ru: 'Выведение пятен' },
    { value: 'full_restoration', en: 'Full restoration', ru: 'Полная реставрация' },
  ],
  wood: [
    { value: 'oil_coating', en: 'Oil / lacquer application', ru: 'Нанесение масла / лака' },
    { value: 'painting', en: 'Painting / tinting', ru: 'Покраска / тонировка' },
    { value: 'scratch_repair', en: 'Scratch / dent repair', ru: 'Устранение царапин / вмятин' },
    { value: 'sanding', en: 'Sanding', ru: 'Шлифовка' },
  ],
  metal: [
    { value: 'polishing', en: 'Polishing / dullness removal', ru: 'Полировка / устранение тусклости' },
    { value: 'painting', en: 'Painting / protective coat', ru: 'Покраска / защитный лак' },
    { value: 'damage_repair', en: 'Damage repair', ru: 'Устранение повреждений' },
  ],
  fitout: [{ value: 'full_fitout', en: 'Full fitout / renovation', ru: 'Полный фитаут / ремонт' }],
};

const DISTRICTS = [
  { en: 'Downtown Dubai', ru: 'Downtown Dubai' },
  { en: 'Palm Jumeirah', ru: 'Palm Jumeirah' },
  { en: 'Dubai Marina', ru: 'Dubai Marina' },
  { en: 'Business Bay', ru: 'Business Bay' },
  { en: 'Jumeirah', ru: 'Jumeirah' },
  { en: 'Arabian Ranches', ru: 'Arabian Ranches' },
  { en: 'Emirates Hills', ru: 'Emirates Hills' },
  { en: 'Dubai Hills Estate', ru: 'Dubai Hills Estate' },
  { en: 'Other', ru: 'Другой район' },
];

const state = {
  step: 0,
  category: null,
  object: '',
  task: '',
  quantity: 1,
  files: [],
  pricing: [],
};

document.addEventListener('DOMContentLoaded', init);
document.addEventListener('fitout:langchange', onLangChange);

async function init() {
  const res = await fetch('data/pricing.json');
  const base = await res.json();
  const overrides = Store.getPricingOverrides();
  state.pricing = base.map((item) => ({
    ...item,
    pricePerUnit: overrides[item.id] ?? item.pricePerUnit,
  }));

  renderDistricts();

  document.querySelectorAll('.category-option').forEach((btn) => {
    btn.addEventListener('click', () => selectCategory(btn.dataset.category, btn));
  });
  document.getElementById('to-step-1').addEventListener('click', () => goStep(1));
  document.getElementById('to-step-2').addEventListener('click', () => goStep(2));
  document.querySelectorAll('[data-back]').forEach((btn) => {
    btn.addEventListener('click', () => goStep(Number(btn.dataset.back)));
  });
  document.getElementById('object-select').addEventListener('change', onObjectOrTaskChange);
  document.getElementById('task-select').addEventListener('change', onObjectOrTaskChange);
  document.getElementById('quantity-input').addEventListener('input', onQuantityChange);
  document.getElementById('media-input').addEventListener('change', onMediaChange);
  ['name-input', 'phone-input'].forEach((id) =>
    document.getElementById(id).addEventListener('input', validateStep2)
  );
  document.getElementById('submit-btn').addEventListener('click', submitLead);
}

function renderDistricts() {
  const lang = getLang();
  const select = document.getElementById('district-select');
  const current = select.value;
  select.innerHTML = DISTRICTS.map((d, i) => `<option value="${d.en}">${d[lang]}</option>`).join('');
  if (current) select.value = current;
}

function selectCategory(category, btn) {
  state.category = category;
  state.object = '';
  state.task = category === 'fitout' ? 'full_fitout' : '';
  state.quantity = 1;
  document.querySelectorAll('.category-option').forEach((b) => b.classList.remove('selected'));
  btn.classList.add('selected');
  document.getElementById('to-step-1').disabled = false;

  renderObjectAndTaskSelects();
  document.getElementById('quantity-input').value = 1;
}

function renderObjectAndTaskSelects() {
  const category = state.category;
  if (!category) return;
  const lang = getLang();
  const t = I18N[lang];

  const objectSelect = document.getElementById('object-select');
  const prevObject = objectSelect.value;
  objectSelect.innerHTML = `<option value="">${t.select_placeholder}</option>` +
    OBJECTS[category].map((o) => `<option value="${o.value}">${o[lang]}</option>`).join('');
  if (prevObject) objectSelect.value = prevObject;

  const taskField = document.getElementById('task-field');
  const quantityLabel = document.getElementById('quantity-label');
  if (category === 'fitout') {
    taskField.style.display = 'none';
    quantityLabel.textContent = t.label_area;
    quantityLabel.removeAttribute('data-i18n');
  } else {
    taskField.style.display = '';
    const taskSelect = document.getElementById('task-select');
    const prevTask = taskSelect.value;
    taskSelect.innerHTML = `<option value="">${t.select_placeholder}</option>` +
      TASKS[category].map((tk) => `<option value="${tk.value}">${tk[lang]}</option>`).join('');
    if (prevTask) taskSelect.value = prevTask;
    quantityLabel.textContent = t.label_quantity;
    quantityLabel.removeAttribute('data-i18n');
  }
}

function onLangChange() {
  renderDistricts();
  if (state.category) renderObjectAndTaskSelects();
  updateEstimate();
}

function onObjectOrTaskChange() {
  state.object = document.getElementById('object-select').value;
  if (state.category !== 'fitout') {
    state.task = document.getElementById('task-select').value;
  }
  updateEstimate();
}

function onQuantityChange(e) {
  state.quantity = Number(e.target.value);
  updateEstimate();
}

function findPrice() {
  return state.pricing.find(
    (p) => p.category === state.category && p.object === state.object && p.task === state.task
  ) || null;
}

function updateEstimate() {
  const t = I18N[getLang()];
  const price = findPrice();
  const box = document.getElementById('estimate-box');
  const nextBtn = document.getElementById('to-step-2');

  const ready = state.category === 'fitout'
    ? state.object && state.quantity
    : state.object && state.task && state.quantity;
  nextBtn.disabled = !ready;

  if (!price || !state.quantity) {
    box.style.display = 'none';
    return;
  }
  const amount = Math.round(price.pricePerUnit * state.quantity);
  box.style.display = 'block';
  document.getElementById('estimate-label').textContent =
    price.isMaxEstimate ? t.estimate_label_max : t.estimate_label_normal;
  document.getElementById('estimate-amount').textContent = `AED ${amount.toLocaleString()}`;
  document.getElementById('estimate-note').textContent = t.estimate_note;
  document.getElementById('estimate-note').style.display = price.isMaxEstimate ? 'block' : 'none';
  state.lastEstimate = amount;
}

function onMediaChange(e) {
  state.files = Array.from(e.target.files || []);
  document.getElementById('media-count').textContent =
    state.files.length ? `${state.files.length}` : '';
}

function validateStep2() {
  const name = document.getElementById('name-input').value.trim();
  const phone = document.getElementById('phone-input').value.trim();
  document.getElementById('submit-btn').disabled = !(name && phone);
}

function goStep(step) {
  document.querySelectorAll('.step-panel').forEach((p) => p.classList.remove('active'));
  document.querySelector(`[data-step="${step}"]`).classList.add('active');
  document.querySelectorAll('[data-step-dot]').forEach((dot) => {
    dot.classList.toggle('active', Number(dot.dataset.stepDot) <= step);
  });
  document.querySelectorAll('[data-step-label]').forEach((label) => {
    label.classList.toggle('active', Number(label.dataset.stepLabel) <= step);
  });
  state.step = step;
}

function submitLead() {
  const name = document.getElementById('name-input').value.trim();
  const phone = document.getElementById('phone-input').value.trim();
  const district = document.getElementById('district-select').value;

  // Демо-сохранение в localStorage, видно в admin/leads.html в этом же браузере.
  Store.addLead({
    category: state.category,
    details: { object: state.object, task: state.task, quantity: state.quantity },
    estimatedAmount: state.lastEstimate || null,
    name,
    phone,
    district,
    mediaFiles: state.files.map((f) => f.name),
  });

  // Чтобы заявки реально доходили от любых посетителей сайта (а не только
  // в вашем браузере), подключите Formspree — как в WebCraft/Orvena —
  // раскомментируйте и вставьте свой endpoint:
  //
  // fetch('https://formspree.io/f/your-form-id', {
  //   method: 'POST',
  //   headers: { 'Accept': 'application/json' },
  //   body: new FormData(document.querySelector('#your-form'))
  // });

  document.querySelectorAll('.step-panel').forEach((p) => p.classList.remove('active'));
  document.querySelector('[data-step="success"]').classList.add('active');
}
