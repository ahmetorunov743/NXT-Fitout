// Логика 3-шагового калькулятора. Цены берутся из data/pricing.json,
// с возможными локальными правками из admin/calculator-edit.html (localStorage).

const CATEGORY_LABELS = {
  marble: 'Marble & Stone',
  wood: 'Wood & Furniture',
  metal: 'Metal Restoration',
  fitout: 'Fitout & Renovation',
};

const OBJECTS = {
  marble: [
    { value: 'floor', label: 'Floor' },
    { value: 'walls', label: 'Walls' },
    { value: 'stairs', label: 'Stairs' },
    { value: 'countertop', label: 'Countertop' },
    { value: 'decor', label: 'Large decor / handles' },
  ],
  wood: [
    { value: 'floor', label: 'Parquet / Floor' },
    { value: 'doors', label: 'Doors' },
    { value: 'furniture', label: 'Furniture' },
    { value: 'stairs', label: 'Stairs' },
  ],
  metal: [{ value: 'decor', label: 'Metal elements' }],
  fitout: [
    { value: 'apartment', label: 'Apartment' },
    { value: 'villa', label: 'Villa' },
    { value: 'office', label: 'Office' },
    { value: 'balcony', label: 'Balcony / Terrace' },
  ],
};

const TASKS = {
  marble: [
    { value: 'polishing', label: 'Polishing / Shine' },
    { value: 'crack_repair', label: 'Chip / crack removal' },
    { value: 'stain_removal', label: 'Stain removal' },
    { value: 'full_restoration', label: 'Full restoration' },
  ],
  wood: [
    { value: 'oil_coating', label: 'Oil / lacquer application' },
    { value: 'painting', label: 'Painting / tinting' },
    { value: 'scratch_repair', label: 'Scratch / dent repair' },
    { value: 'sanding', label: 'Sanding' },
  ],
  metal: [
    { value: 'polishing', label: 'Polishing / dullness removal' },
    { value: 'painting', label: 'Painting / protective coat' },
    { value: 'damage_repair', label: 'Damage repair' },
  ],
  fitout: [{ value: 'full_fitout', label: 'Full fitout / renovation' }],
};

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

async function init() {
  const res = await fetch('data/pricing.json');
  const base = await res.json();
  const overrides = Store.getPricingOverrides();
  state.pricing = base.map((item) => ({
    ...item,
    pricePerUnit: overrides[item.id] ?? item.pricePerUnit,
  }));

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

function selectCategory(category, btn) {
  state.category = category;
  state.object = '';
  state.task = category === 'fitout' ? 'full_fitout' : '';
  state.quantity = 1;
  document.querySelectorAll('.category-option').forEach((b) => b.classList.remove('selected'));
  btn.classList.add('selected');
  document.getElementById('to-step-1').disabled = false;

  // Заполняем select'ы объекта/задачи для следующего шага
  const objectSelect = document.getElementById('object-select');
  objectSelect.innerHTML = '<option value="">Select…</option>' +
    OBJECTS[category].map((o) => `<option value="${o.value}">${o.label}</option>`).join('');

  const taskField = document.getElementById('task-field');
  const quantityLabel = document.getElementById('quantity-label');
  if (category === 'fitout') {
    taskField.style.display = 'none';
    quantityLabel.textContent = 'Area (m²)';
  } else {
    taskField.style.display = '';
    const taskSelect = document.getElementById('task-select');
    taskSelect.innerHTML = '<option value="">Select…</option>' +
      TASKS[category].map((t) => `<option value="${t.value}">${t.label}</option>`).join('');
    quantityLabel.textContent = 'Quantity';
  }
  document.getElementById('quantity-input').value = 1;
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
    price.isMaxEstimate ? 'Max budget estimate' : 'Estimated price';
  document.getElementById('estimate-amount').textContent = `AED ${amount.toLocaleString()}`;
  document.getElementById('estimate-note').style.display = price.isMaxEstimate ? 'block' : 'none';
  state.lastEstimate = amount;
}

function onMediaChange(e) {
  state.files = Array.from(e.target.files || []);
  document.getElementById('media-count').textContent =
    state.files.length ? `${state.files.length} file(s) selected` : '';
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
