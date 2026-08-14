function formatPrice(value) {
  if (value == null) return 'Цена по запросу';
  if (typeof value === 'string') return value + ' ₽';
  return value.toLocaleString('ru-RU') + ' ₽';
}

const ORDER_PHONE = 'tel:+79991234567';

function productCard(p, idx, opts = {}) {
  const badgeText = opts.badge || p.badge || '';
  const badge = badgeText
    ? `<span class="card__badge">${badgeText}</span>`
    : '';
  const order = opts.order
    ? `<a class="card__order" href="${ORDER_PHONE}">Заказать</a>`
    : '';
  return `
    <article class="card">
      ${badge}
      <div class="card__image">
        <img src="img/${productImage(p)}" alt="${p.name} — купить в Рославле" loading="lazy">
      </div>
      <div class="card__cat">${GROUPS[p.group]}${p.sub ? ' · ' + p.sub : ''}</div>
      <div class="card__name">${p.name}</div>
      ${p.desc ? `<div class="card__desc">${p.desc}</div>` : ''}
      <div class="card__bottom">
        <span class="card__price ${p.price == null ? 'card__price--na' : ''}">${formatPrice(p.price)}<span class="card__unit">${p.price == null ? '' : ' / ' + p.unit}</span></span>
        ${order}
      </div>
    </article>`;
}

function renderProducts(category, target) {
  if (category === 'all') {
    let html = '';
    CATALOG_ORDER.forEach((key) => {
      const items = PRODUCTS.filter((p) => p.group === key);
      if (!items.length) return;
      html += `
        <div class="catalog__group">
          <h3 class="catalog__group-title">${GROUPS[key]}</h3>
          <div class="catalog__grid">${items.map(productCard).join('')}</div>
        </div>`;
    });
    target.innerHTML = html;
  } else {
    const list = PRODUCTS.filter((p) => p.group === category);
    target.innerHTML = `<div class="catalog__grid">${list.map(productCard).join('')}</div>`;
  }
}

function observeReveals(root) {
  const els = root.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('visible'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );
  els.forEach((el) => io.observe(el));
}

const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
if (burger && nav) {
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    nav.classList.toggle('open');
  });
  nav.addEventListener('click', (e) => {
    if (e.target.closest('.nav__link')) {
      burger.classList.remove('open');
      nav.classList.remove('open');
    }
  });
}

const filterBar = document.getElementById('filter');
const productsGrid = document.getElementById('products');
if (filterBar && productsGrid) {
  const chips = [{ key: 'all', label: 'Все товары' }];
  CATALOG_ORDER.forEach((key) => chips.push({ key, label: GROUPS[key] }));
  filterBar.innerHTML = chips
    .map(
      (chip) =>
        `<button class="chip${chip.key === 'all' ? ' chip--active' : ''}" data-category="${chip.key}">${chip.label}</button>`
    )
    .join('');

  filterBar.addEventListener('click', (e) => {
    const btn = e.target.closest('.chip');
    if (!btn) return;
    filterBar.querySelectorAll('.chip').forEach((c) => c.classList.remove('chip--active'));
    btn.classList.add('chip--active');
    renderProducts(btn.dataset.category, productsGrid);
  });

  renderProducts('all', productsGrid);
}

const featuredGrid = document.getElementById('featured');
if (featuredGrid) {
  const promoItems = [];
  if (typeof PROMO !== 'undefined') {
    if (PROMO.special != null) {
      const p = PRODUCTS.find((x) => x.id === PROMO.special);
      if (p) promoItems.push({ p, badge: 'Акция' });
    }
    (PROMO.hits || []).forEach((id) => {
      const p = PRODUCTS.find((x) => x.id === id);
      if (p) promoItems.push({ p, badge: 'Хит недели' });
    });
  }
  if (!promoItems.length) {
    const sec = featuredGrid.closest('section');
    if (sec) sec.style.display = 'none';
  } else {
    featuredGrid.innerHTML = promoItems
      .map((item, i) => productCard(item.p, i, { badge: item.badge }))
      .join('');
  }
}

const priceTableWrap = document.getElementById('priceTableWrap');
if (priceTableWrap) {
  function buildPriceTable() {
    let rows = '';
    GROUP_ORDER.forEach((key) => {
      const items = PRODUCTS.filter((p) => p.group === key);
      if (!items.length) return;
      rows += `<tr class="category-row"><td colspan="3">${GROUPS[key]}</td></tr>`;
      let prevSub = null;
      items.forEach((p, i) => {
        if (p.sub && p.sub !== prevSub) {
          rows += `<tr class="subgroup-row"><td colspan="3">${p.sub}</td></tr>`;
          prevSub = p.sub;
        }
        rows += `
          <tr>
            <td>${i + 1}</td>
            <td>
              <span class="td-hover">
                <span class="td-hover__name">${p.name}${p.price == null ? `<small class="td-cat">Цена по запросу</small>` : ''}</span>
                <img class="td-hover__img" src="img/${productImage(p)}" alt="${p.name} — цена в Рославле" loading="lazy">
              </span>
            </td>
            <td class="td-num ${p.price == null ? 'td-num--na' : ''}">${p.price == null ? 'по запросу' : formatPrice(p.price) + ' / ' + p.unit}</td>
          </tr>`;
      });
    });

    priceTableWrap.innerHTML = `
      <table class="price-table" id="priceTable">
        <thead>
          <tr><th>№</th><th>Наименование товара</th><th>Цена</th></tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>`;
  }

  buildPriceTable();

  document.getElementById('printPrice').addEventListener('click', () => {
    const head = document.title;
    document.title = 'Прайс-лист «Мясной домик»';
    window.print();
    document.title = head;
  });

  document.getElementById('downloadPrice').addEventListener('click', () => {
    if (typeof window.jspdf === 'undefined' || typeof window.jspdf.jsPDF === 'undefined' || typeof window.jspdf.jsPDF.API.autoTable !== 'function') {
      alert('Библиотеки для PDF не загрузились. Проверьте файлы в папке lib/. Попробуйте кнопку «Печать прайса».');
      return;
    }
    try {
      const { jsPDF } = window.jspdf;
      if (typeof window.PT_SANS_REGULAR_B64 !== 'string' || typeof window.PT_SANS_BOLD_B64 !== 'string') {
        alert('Шрифт для PDF не загрузился (lib/fonts.js). Попробуйте кнопку «Печать прайса».');
        return;
      }
      const doc = new jsPDF('p', 'mm', 'a4');
      doc.addFileToVFS('PT_Sans-Web-Regular.ttf', window.PT_SANS_REGULAR_B64);
      doc.addFont('PT_Sans-Web-Regular.ttf', 'PTSans', 'normal');
      doc.addFileToVFS('PT_Sans-Web-Bold.ttf', window.PT_SANS_BOLD_B64);
      doc.addFont('PT_Sans-Web-Bold.ttf', 'PTSans', 'bold');
    const m = 20;
    const pageW = doc.internal.pageSize.getWidth();

    doc.setFont('PTSans', 'bold');
    doc.setFontSize(24);
    doc.setTextColor(36, 27, 20);
    doc.text('Прайс-лист «Мясной домик»', m, 26);

    doc.setFont('PTSans', 'normal');
    doc.setFontSize(12);
    doc.setTextColor(90, 70, 51);
    doc.text('ИП Лаврухин М.Ю. • ИНН 672500023868', m, 34);
    doc.text('г. Рославль, ул. Карла Маркса 35 • Тел: +7 (999) 123-45-67', m, 40);
    doc.text('Актуальный прайс за кг и за штуку', pageW - m, 40, { align: 'right' });

    const rows = [];
    document.querySelectorAll('#priceTable tbody tr').forEach((tr) => {
      if (tr.classList.contains('category-row')) {
        rows.push({ type: 'category', cols: ['', tr.querySelector('td').textContent.trim(), ''] });
        return;
      }
      if (tr.classList.contains('subgroup-row')) {
        rows.push({ type: 'subgroup', cols: ['', tr.querySelector('td').textContent.trim(), ''] });
        return;
      }
      const cells = tr.querySelectorAll('td');
      const nameEl = cells[1].querySelector('.td-hover__name');
      const name = nameEl ? nameEl.textContent.trim() : cells[1].textContent.trim();
      const note = cells[1].querySelector('.td-cat');
      const noteText = note ? ` (${note.textContent.trim()})` : '';
      rows.push({
        type: 'item',
        cols: [cells[0].textContent.trim(), name + noteText, cells[2].textContent.trim()],
        na: cells[2].classList.contains('td-num--na')
      });
    });

    doc.autoTable({
      startY: 48,
      margin: { top: m, bottom: m, left: m, right: m },
      head: [['№', 'Наименование товара', 'Цена']],
      body: rows.map((r) => r.cols),
      theme: 'grid',
      styles: {
        font: 'PTSans',
        fontSize: 12,
        cellPadding: { top: 1.25, right: 5, bottom: 1.25, left: 5 },
        textColor: [36, 27, 20],
        lineColor: [201, 184, 164],
        lineWidth: 0.1
      },
      headStyles: {
        font: 'PTSans',
        fillColor: [250, 246, 241],
        textColor: [36, 27, 20],
        fontStyle: 'bold'
      },
      didParseCell(data) {
        const row = rows[data.row.index];
        if (!row) return;
        if (row.type === 'category') {
          data.cell.styles.fillColor = [240, 230, 216];
          data.cell.styles.font = 'PTSans';
          data.cell.styles.fontStyle = 'bold';
          data.cell.styles.fontSize = 11;
        } else if (row.type === 'subgroup') {
          data.cell.styles.fillColor = [250, 243, 234];
          data.cell.styles.font = 'PTSans';
          data.cell.styles.fontStyle = 'italic';
        } else if (row.na) {
          data.cell.styles.textColor = [138, 111, 90];
          data.cell.styles.fontStyle = 'normal';
        }
      }
    });

    doc.save('price-myasnoy-domik.pdf');
    } catch (err) {
      alert('Ошибка при создании PDF: ' + err.message + '\n\nОткройте консоль браузера (F12) и сообщите этот текст.');
    }
  });
}

observeReveals(document);

const modal = document.getElementById('callbackModal');
const callButtons = document.querySelectorAll('.js-call-btn');

function openModal() {
  if (!modal) return;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

if (modal) {
  callButtons.forEach((btn) => btn.addEventListener('click', openModal));
  modal.querySelectorAll('[data-modal-close]').forEach((el) => el.addEventListener('click', closeModal));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

function handleCallbackForm(form, successId) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    form.reset();
    const success = document.getElementById(successId);
    if (success) {
      success.hidden = false;
      setTimeout(() => {
        success.hidden = true;
      }, 4000);
    }
  });
}

const callbackForm = document.getElementById('callbackForm');
if (callbackForm) handleCallbackForm(callbackForm, 'formSuccess');

const modalCallbackForm = document.getElementById('modalCallbackForm');
if (modalCallbackForm) handleCallbackForm(modalCallbackForm, 'modalFormSuccess');

const PAGES = {
  home: ['home', 'hits', 'steps', 'order'],
  catalog: ['catalog'],
  price: ['price'],
  features: ['features'],
  reviews: ['reviews'],
  contacts: ['contacts'],
  privacy: ['privacy'],
};

const ID_TO_PAGE = {};
Object.entries(PAGES).forEach(([page, ids]) => {
  ids.forEach((id) => {
    ID_TO_PAGE[id] = page;
  });
});

const pageSections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav__link[href^="#"]');

function closeNav() {
  if (burger && nav) {
    burger.classList.remove('open');
    nav.classList.remove('open');
  }
}

function setNavActive(page) {
  navLinks.forEach((link) => {
    const id = link.getAttribute('href').slice(1);
    link.classList.toggle('nav__link--active', ID_TO_PAGE[id] === page);
  });
}

function showPage(page) {
  if (!PAGES[page]) return;
  pageSections.forEach((section) => {
    section.style.display = PAGES[page].includes(section.id) ? '' : 'none';
  });
  setNavActive(page);
  window.scrollTo(0, 0);
}

document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;
  const id = link.getAttribute('href').slice(1);
  const page = ID_TO_PAGE[id];
  if (page) {
    e.preventDefault();
    showPage(page);
    closeNav();
  }
});

function initMapTabs(root) {
  root.querySelectorAll('.map-tabs').forEach((tabs) => {
    const inputs = tabs.querySelectorAll('.map-tabs__input');
    const panels = tabs.querySelectorAll('.map-tabs__panel');
    const labels = tabs.querySelectorAll('.map-tabs__label');
    function select(value) {
      panels.forEach((p) => p.classList.toggle('active', p.dataset.map === value));
      labels.forEach((l) => l.classList.toggle('active', l.dataset.map === value));
      inputs.forEach((i) => {
        i.checked = i.value === value;
      });
    }
    inputs.forEach((i) => i.addEventListener('change', () => select(i.value)));
    const checked = tabs.querySelector('.map-tabs__input:checked');
    select(checked ? checked.value : 'yandex');
  });
}

initMapTabs(document);

showPage('home');
