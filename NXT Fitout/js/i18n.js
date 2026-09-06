/**
 * Простой переключатель языка EN/RU для всего сайта.
 * Работает через атрибуты data-i18n="ключ" на HTML-элементах:
 * их текст подставляется из словаря ниже при загрузке страницы
 * и при нажатии на кнопку языка в шапке. Выбор языка запоминается
 * в браузере (localStorage) и одинаков на всех страницах сайта.
 *
 * Чтобы добавить новый переводимый кусок текста:
 * 1) добавьте в HTML data-i18n="my_key" на нужный элемент;
 * 2) добавьте my_key: "..." в оба объекта (en и ru) ниже.
 */

const I18N = {
  en: {
    nav_services: "Services",
    nav_calculator: "Calculator",
    nav_cases: "Our Cases",
    nav_about: "About",
    nav_contacts: "Contacts",
    btn_quote: "Get a Quote",
    geo_label: "📍 Dubai, UAE",

    hero_eyebrow: "Dubai, UAE",
    hero_title: "Premium stone, wood & fitout restoration in Dubai",
    hero_lead: "Officially contracted, quality-guaranteed, with full video documentation of every stage of the process.",
    badge_licensed: "Licensed & Insured in UAE",
    badge_projects: "Commercial & Residential Projects",
    badge_nda: "NDA & Privacy Guaranteed",

    services_title: "What we restore",
    service_marble_title: "Marble & Stone",
    service_marble_desc: "Floors, walls, staircases, countertops — polishing, crack repair, stain removal.",
    service_wood_title: "Wood & Furniture",
    service_wood_desc: "Parquet, doors, solid-wood furniture — oiling, painting, scratch repair.",
    service_metal_title: "Metal Restoration",
    service_metal_desc: "Brass and decorative metal elements — polishing, protective coating.",
    service_fitout_title: "Fitout & Renovation",
    service_fitout_desc: "Apartments, villas, offices — full-scope renovation and fitout.",

    calc_promo_title: "Get an instant estimate",
    calc_promo_sub: "Answer a few questions about your project — no technical terms required.",
    btn_open_calculator: "Open the calculator",

    about_title: "Recent work",
    view_all_cases: "View all cases →",

    footer_contact_label: "Contact",
    footer_legal_label: "Legal",
    footer_privacy: "Privacy Policy",
    footer_terms: "Terms of Service",
    footer_nda: "NDA available on request",
    footer_commercial_label: "Commercial details",
    footer_license: "Trade License: DED-000000",
    footer_jurisdiction: "Dubai Department of Economy & Tourism (DED)",
    footer_rights: "All rights reserved.",

    cases_title: "Our cases",
    cases_sub: "Video documentation and before/after photos from completed projects across Dubai.",
    filter_all: "all",
    filter_marble: "marble",
    filter_wood: "wood",
    filter_metal: "metal",
    filter_fitout: "fitout",
    empty_cases_msg: "No cases published in this category yet.",
    tag_before: "Before",
    tag_after: "After",
    label_volume: "Volume",
    label_duration: "Duration",
    unit_days: "days",

    calc_page_title: "Project calculator",
    calc_page_sub: "Get a fast, no-obligation estimate. Final pricing is confirmed after a site visit.",
    step_direction: "Direction",
    step_details: "Details",
    step_contact: "Contact",
    step1_heading: "What do you need done?",
    step2_heading: "Object & task",
    step3_heading: "Attach media & contact details",
    label_object: "Object",
    label_task: "Task",
    label_quantity: "Quantity",
    label_area: "Area (m²)",
    label_name: "Name",
    label_phone: "Phone / WhatsApp",
    label_district: "Dubai district",
    select_placeholder: "Select…",
    placeholder_name: "Name",
    placeholder_phone: "+971 WhatsApp number",
    dropzone_text: "📎 Attach photo or video of the object",
    btn_next: "Next →",
    btn_back: "← Back",
    btn_send: "Send for Review",
    estimate_label_max: "Max budget estimate",
    estimate_label_normal: "Estimated price",
    estimate_note: "This is a maximum indicative amount. The exact quote is prepared after an engineer's site visit or a video-based assessment.",
    success_title: "Request sent",
    success_text: "Our team will review your request and reach out on WhatsApp within one business day.",

    legal_updated: "Last updated: 2026",

    privacy_h1: "Privacy Policy",
    privacy_s1_h: "1. Scope",
    privacy_s1_b: "This Privacy Policy explains how NXT Fitout Technical Service FZE (\"we\", \"us\") collects, uses and protects personal data of visitors and clients in accordance with UAE Federal Decree-Law No. 45 of 2021 on the Protection of Personal Data (PDPL).",
    privacy_s2_h: "2. Data We Collect",
    privacy_s2_b: "Name, phone/WhatsApp number, project address or district, photos and videos of the property you submit through the calculator, and technical data such as IP address and browser type.",
    privacy_s3_h: "3. How We Use Data",
    privacy_s3_b: "To prepare quotes, schedule site visits, communicate about your project, and improve our services. We do not sell personal data to third parties.",
    privacy_s4_h: "4. Media Confidentiality",
    privacy_s4_b: "Photos and videos of client properties are stored securely and are only published in our portfolio with the client's explicit written consent. Faces of individuals are not published.",
    privacy_s5_h: "5. Your Rights",
    privacy_s5_b: "Under the PDPL you may request access, correction or deletion of your personal data at any time by contacting us at the details below.",
    privacy_s6_h: "6. Contact",
    privacy_s6_b: "NXT Fitout Technical Service FZE, Office 000, Building Name, Business Bay, Dubai, UAE. Email: info@yourcompany.ae",

    terms_h1: "Terms of Service",
    terms_s1_h: "1. Quotations",
    terms_s1_b: "Prices shown by the online calculator are maximum estimated amounts (Max Budget Estimate). A final quotation is issued only after a site visit or a video/photo-based assessment by our engineer.",
    terms_s2_h: "2. Measurement & Site Visit",
    terms_s2_b: "We schedule a free measurement visit within 1–3 business days of an accepted lead, subject to site access being provided by the client.",
    terms_s3_h: "3. Contract",
    terms_s3_b: "Works begin only after a written contract or signed quotation is accepted by the client, specifying scope, timeline, materials and payment schedule.",
    terms_s4_h: "4. Warranty",
    terms_s4_b: "Restoration and fitout works carry a workmanship warranty as stated in the signed contract, excluding damage from misuse, water ingress unrelated to our works, or third-party works.",
    terms_s5_h: "5. Cancellations",
    terms_s5_b: "Site visits may be rescheduled free of charge with 24 hours' notice. Cancellation terms after contract signature are set out in the contract.",
    nda_text: "NDA available on request — we can work without publishing photos of your property, blur identifying details, or exclude your project from our portfolio entirely.",
  },
  ru: {
    nav_services: "Услуги",
    nav_calculator: "Калькулятор",
    nav_cases: "Наши кейсы",
    nav_about: "О компании",
    nav_contacts: "Контакты",
    btn_quote: "Рассчитать стоимость",
    geo_label: "📍 Дубай, ОАЭ",

    hero_eyebrow: "Дубай, ОАЭ",
    hero_title: "Премиальная реставрация камня, дерева и фитаут в Дубае",
    hero_lead: "Официально, по договору, с гарантией качества и полной видеофиксацией каждого этапа работ.",
    badge_licensed: "Лицензировано и застраховано в ОАЭ",
    badge_projects: "Коммерческие и жилые объекты",
    badge_nda: "NDA и конфиденциальность гарантированы",

    services_title: "Что мы реставрируем",
    service_marble_title: "Мрамор и камень",
    service_marble_desc: "Полы, стены, лестницы, столешницы — полировка, удаление сколов, выведение пятен.",
    service_wood_title: "Дерево и мебель",
    service_wood_desc: "Паркет, двери, мебель из массива — нанесение масла, покраска, устранение царапин.",
    service_metal_title: "Реставрация металла",
    service_metal_desc: "Латунь и декоративные металлические элементы — полировка, защитное покрытие.",
    service_fitout_title: "Фитаут и ремонт",
    service_fitout_desc: "Квартиры, виллы, офисы — комплексный ремонт и фитаут.",

    calc_promo_title: "Получите расчёт стоимости",
    calc_promo_sub: "Ответьте на несколько вопросов о проекте — без сложных терминов.",
    btn_open_calculator: "Открыть калькулятор",

    about_title: "Недавние работы",
    view_all_cases: "Все кейсы →",

    footer_contact_label: "Контакты",
    footer_legal_label: "Юридическая информация",
    footer_privacy: "Политика конфиденциальности",
    footer_terms: "Условия предоставления услуг",
    footer_nda: "NDA по запросу",
    footer_commercial_label: "Реквизиты",
    footer_license: "Торговая лицензия: DED-000000",
    footer_jurisdiction: "Департамент экономики и туризма Дубая (DED)",
    footer_rights: "Все права защищены.",

    cases_title: "Наши кейсы",
    cases_sub: "Видеофиксация и фото «до/после» с завершённых объектов по всему Дубаю.",
    filter_all: "все",
    filter_marble: "мрамор",
    filter_wood: "дерево",
    filter_metal: "металл",
    filter_fitout: "фитаут",
    empty_cases_msg: "В этой категории пока нет опубликованных кейсов.",
    tag_before: "До",
    tag_after: "После",
    label_volume: "Объём",
    label_duration: "Срок",
    unit_days: "дн.",

    calc_page_title: "Калькулятор проекта",
    calc_page_sub: "Быстрый расчёт без обязательств. Точная стоимость подтверждается после выезда специалиста.",
    step_direction: "Направление",
    step_details: "Детали",
    step_contact: "Контакты",
    step1_heading: "Что нужно сделать?",
    step2_heading: "Объект и задача",
    step3_heading: "Медиа и контактные данные",
    label_object: "Объект",
    label_task: "Задача",
    label_quantity: "Количество",
    label_area: "Площадь (м²)",
    label_name: "Имя",
    label_phone: "Телефон / WhatsApp",
    label_district: "Район Дубая",
    select_placeholder: "Выберите…",
    placeholder_name: "Имя",
    placeholder_phone: "Номер WhatsApp (+971)",
    dropzone_text: "📎 Прикрепить фото или видео объекта",
    btn_next: "Далее →",
    btn_back: "← Назад",
    btn_send: "Отправить заявку",
    estimate_label_max: "Максимальная условная сумма",
    estimate_label_normal: "Ориентировочная цена",
    estimate_note: "Это максимальная ориентировочная сумма. Точная смета формируется после выезда инженера или оценки по видео.",
    success_title: "Заявка отправлена",
    success_text: "Наша команда рассмотрит заявку и свяжется с вами в WhatsApp в течение одного рабочего дня.",

    legal_updated: "Последнее обновление: 2026",

    privacy_h1: "Политика конфиденциальности",
    privacy_s1_h: "1. Область действия",
    privacy_s1_b: "Настоящая политика описывает, как NXT Fitout Technical Service FZE («мы») собирает, использует и защищает персональные данные посетителей и клиентов в соответствии с Федеральным законом ОАЭ № 45 от 2021 года о защите персональных данных (PDPL).",
    privacy_s2_h: "2. Какие данные мы собираем",
    privacy_s2_b: "Имя, номер телефона/WhatsApp, район/адрес объекта, фото и видео объекта, загруженные через калькулятор, а также технические данные (IP-адрес, тип браузера).",
    privacy_s3_h: "3. Как мы используем данные",
    privacy_s3_b: "Для подготовки сметы, организации выезда специалиста, коммуникации по проекту и улучшения сервиса. Мы не продаём персональные данные третьим лицам.",
    privacy_s4_h: "4. Конфиденциальность медиаматериалов",
    privacy_s4_b: "Фото и видео объектов клиентов хранятся защищённо и публикуются в портфолио только с письменного согласия клиента. Лица людей не публикуются.",
    privacy_s5_h: "5. Ваши права",
    privacy_s5_b: "В соответствии с PDPL вы можете запросить доступ, исправление или удаление ваших персональных данных, обратившись по контактам ниже.",
    privacy_s6_h: "6. Контакты",
    privacy_s6_b: "NXT Fitout Technical Service FZE, офис 000, здание, Business Bay, Дубай, ОАЭ. Email: info@yourcompany.ae",

    terms_h1: "Условия предоставления услуг",
    terms_s1_h: "1. Расчёт стоимости",
    terms_s1_b: "Суммы, показанные онлайн-калькулятором, являются максимальной ориентировочной оценкой. Точная смета формируется только после выезда инженера или оценки по фото/видео.",
    terms_s2_h: "2. Замер и выезд специалиста",
    terms_s2_b: "Бесплатный выезд на замер организуется в течение 1–3 рабочих дней после принятия заявки, при условии предоставления доступа к объекту.",
    terms_s3_h: "3. Договор",
    terms_s3_b: "Работы начинаются только после подписания договора или сметы, где указаны объём работ, сроки, материалы и график оплаты.",
    terms_s4_h: "4. Гарантия",
    terms_s4_b: "На работы по реставрации и фитауту предоставляется гарантия качества согласно условиям договора, за исключением повреждений из-за неправильной эксплуатации или работ третьих лиц.",
    terms_s5_h: "5. Отмена и перенос",
    terms_s5_b: "Выезд специалиста можно бесплатно перенести при уведомлении за 24 часа. Условия отмены после подписания договора указаны в договоре.",
    nda_text: "NDA по запросу — мы можем работать без публикации фото объекта, скрывать идентифицирующие детали или полностью исключить проект из портфолио.",
  },
};

function getLang() {
  return localStorage.getItem("fitout_lang") || "en";
}
function setLang(lang) {
  localStorage.setItem("fitout_lang", lang);
}

function applyI18n() {
  const lang = getLang();
  const dict = I18N[lang];
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (dict[key] != null) el.textContent = dict[key];
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.dataset.i18nPlaceholder;
    if (dict[key] != null) el.setAttribute("placeholder", dict[key]);
  });

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.textContent = lang === "en" ? "RU" : "EN";
  });

  // Сообщаем остальным скриптам (калькулятор, кейсы), что язык поменялся,
  // чтобы они могли перерисовать динамически создаваемый контент.
  document.dispatchEvent(new CustomEvent("fitout:langchange", { detail: { lang, dict } }));
}

document.addEventListener("DOMContentLoaded", () => {
  applyI18n();
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      setLang(getLang() === "en" ? "ru" : "en");
      applyI18n();
    });
  });
});
