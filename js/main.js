function formatPrice(value) {
  if (value == null) return 'Цена по запросу';
  if (typeof value === 'string') return value + ' ₽';
  return value.toLocaleString('ru-RU') + ' ₽';
}

const ORDER_PHONE = 'tel:+79991234567';

function productCard(p, idx) {
  const badge = p.badge
    ? `<span class="card__badge">${p.badge}</span>`
    : '';
  return `
    <article class="card reveal" style="transition-delay:${(idx % 4) * 70}ms">
      ${badge}
      <div class="card__image">
        <img src="img/${productImage(p)}.svg" alt="${GROUPS[p.group]}" loading="lazy">
      </div>
      <div class="card__cat">${GROUPS[p.group]}${p.sub ? ' · ' + p.sub : ''}</div>
      <div class="card__name">${p.name}</div>
      ${p.desc ? `<div class="card__desc">${p.desc}</div>` : ''}
      <div class="card__bottom">
        <span class="card__price ${p.price == null ? 'card__price--na' : ''}">${formatPrice(p.price)}<span class="card__unit">${p.price == null ? '' : ' / ' + p.unit}</span></span>
        <a class="card__order" href="${ORDER_PHONE}">Заказать</a>
      </div>
    </article>`;
}

function renderProducts(category, target) {
  const list = category === 'all' ? PRODUCTS : PRODUCTS.filter((p) => p.group === category);
  target.innerHTML = list.map(productCard).join('');
  observeReveals(target);
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
  GROUP_ORDER.forEach((key) => chips.push({ key, label: GROUPS[key] }));
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
  const featured = PRODUCTS.filter((p) => p.badge === 'Хит');
  featuredGrid.innerHTML = featured.map(productCard).join('');
  observeReveals(featuredGrid);
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
                <img class="td-hover__img" src="img/${productImage(p)}.svg" alt="${GROUPS[p.group]}" loading="lazy">
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

  document.getElementById('downloadPrice').addEventListener('click', async () => {
    if (typeof html2canvas === 'undefined' || typeof window.jspdf === 'undefined') {
      alert('Для скачивания прайса в PDF нужно подключение к интернету. Попробуйте кнопку «Печать прайса» — в диалоге печати можно выбрать «Сохранить как PDF».');
      return;
    }
    const { jsPDF } = window.jspdf;

    const exportWrap = document.createElement('div');
    exportWrap.style.cssText =
      'position:fixed;left:-10000px;top:0;width:1000px;background:#fff;padding:32px;font-family:"Segoe UI",Arial,sans-serif;';
    exportWrap.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:18px;border-bottom:2px solid #a01624;padding-bottom:12px;">
        <div>
          <div style="font-size:26px;font-weight:800;color:#241b14;">Прайс-лист «Мясной домик»</div>
          <div style="font-size:13px;color:#666;margin-top:6px;">ИП Лаврухин М.Ю. • ИНН 672500023868<br>г. Рославль, ул. Карла Маркса 35 • Тел: +7 (999) 123-45-67</div>
        </div>
        <div style="font-size:13px;color:#666;text-align:right;">Актуальный прайс<br>за кг и за штуку</div>
      </div>`;

    const clone = document.getElementById('priceTable').cloneNode(true);
    clone.style.cssText = 'width:100%;border-collapse:collapse;font-size:13px;';
    clone.querySelectorAll('th,td').forEach((el) => {
      el.style.border = '1px solid #bbb';
      el.style.padding = '6px 10px';
      el.style.textAlign = 'left';
      el.style.verticalAlign = 'top';
    });
    clone.querySelectorAll('th').forEach((el) => {
      el.style.background = '#faf6f1';
      el.style.fontWeight = 'bold';
    });
    clone.querySelectorAll('.category-row td').forEach((el) => {
      el.style.background = '#f0e6d8';
      el.style.fontWeight = 'bold';
      el.style.fontSize = '12px';
      el.style.textTransform = 'uppercase';
    });
    clone.querySelectorAll('.subgroup-row td').forEach((el) => {
      el.style.background = '#faf3ea';
      el.style.fontStyle = 'italic';
    });
    clone.querySelectorAll('.td-num').forEach((el) => {
      el.style.textAlign = 'right';
      el.style.fontWeight = 'bold';
    });
    clone.querySelectorAll('.td-num--na').forEach((el) => {
      el.style.fontWeight = 'normal';
      el.style.color = '#666';
    });
    clone.querySelectorAll('.td-hover__img').forEach((el) => el.remove());
    exportWrap.appendChild(clone);
    document.body.appendChild(exportWrap);

    try {
      const canvas = await html2canvas(exportWrap, { scale: 2, backgroundColor: '#ffffff', useCORS: true });

      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const margin = 8;
      const imgW = pageW - margin * 2;
      const imgH = (canvas.height * imgW) / canvas.width;
      const imgData = canvas.toDataURL('image/jpeg', 0.92);

      let heightLeft = imgH;
      let position = margin;
      pdf.addImage(imgData, 'JPEG', margin, position, imgW, imgH);
      heightLeft -= pageH - margin * 2;

      while (heightLeft > 0) {
        position = heightLeft - imgH + margin;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', margin, position, imgW, imgH);
        heightLeft -= pageH - margin * 2;
      }

      pdf.save('price-myasnoy-domik.pdf');
    } finally {
      document.body.removeChild(exportWrap);
    }
  });
}

observeReveals(document);
