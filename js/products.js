const GROUPS = {
  sausages: 'Колбасы и готовая продукция',
  polufab: 'Полуфабрикаты домашние (заморозка)',
  kolbaski: 'Колбаски для жарки охлажденные',
  tushenka: 'Тушенка жб 330гр',
  farsh: 'Фарш охлажденный',
  subproduct: 'Субпродукты',
  kopchenosti: 'Копчености',
  salo: 'Сало соленое',
  svinina: 'Свинина половинками и в разруб'
};

const GROUP_ORDER = ['sausages', 'polufab', 'kolbaski', 'tushenka', 'farsh', 'subproduct', 'kopchenosti', 'salo', 'svinina'];

const CATALOG_ORDER = ['sausages', 'polufab', 'kolbaski', 'farsh', 'subproduct', 'kopchenosti', 'salo', 'svinina'];

const PRODUCTS = [
  { id: 1, name: 'Зельц свиной 0,5 в лотках (заморозка)', group: 'sausages', price: 150, unit: 'кг', badge: '' },
  { id: 2, name: 'Колбаса Боярская (жареная) свиная', group: 'sausages', price: 350, unit: 'кг', badge: '' },
  { id: 3, name: 'Колбаса боярская (жареная) куриная', group: 'sausages', price: 390, unit: 'кг', badge: '' },
  { id: 4, name: 'Колбаса Прима свинина', group: 'sausages', price: 450, unit: 'кг', badge: '' },
  { id: 5, name: 'Колбаса прима из лося', group: 'sausages', price: 490, unit: 'кг', badge: '' },
  { id: 6, name: 'Колбаски охотничьи из свинины (тонкие)', group: 'sausages', price: 490, unit: 'кг', badge: '' },
  { id: 7, name: 'Колбаса Кровяная Жареная с гречкой', group: 'sausages', price: 280, unit: 'кг', badge: '' },
  { id: 8, name: 'Колбаса кровяная жареная с печенью', group: 'sausages', price: 290, unit: 'кг', badge: '' },
  { id: 9, name: 'Колбаса чесночная', group: 'sausages', price: 410, unit: 'кг', badge: 'Хит' },
  { id: 10, name: 'Москвоская полукопченая', group: 'sausages', price: 465, unit: 'кг', badge: '' },
  { id: 11, name: 'Грудинка в/к', group: 'sausages', price: 390, unit: 'кг', badge: '' },
  { id: 12, name: 'Колбаски ветчинные', group: 'sausages', price: 460, unit: 'кг', badge: '' },
  { id: 13, name: 'Ребро вк мелкое', group: 'sausages', price: 340, unit: 'кг', badge: '' },
  { id: 14, name: 'Холодец 300гр. 1 шт', group: 'sausages', price: 70, unit: 'шт', badge: '' },

  { id: 15, name: 'Голубцы куриные', group: 'polufab', price: 340, unit: 'кг', badge: '' },
  { id: 16, name: 'Голубцы свиные', group: 'polufab', price: 290, unit: 'кг', badge: '' },
  { id: 17, name: 'Голубцы ленивые', group: 'polufab', price: 260, unit: 'кг', badge: '' },
  { id: 18, name: 'Котлеты куриные', group: 'polufab', price: 450, unit: 'кг', badge: '' },
  { id: 19, name: 'Котлеты свиные', group: 'polufab', price: 330, unit: 'кг', badge: '' },
  { id: 20, name: 'Котлеты печеночные', group: 'polufab', price: 300, unit: 'кг', badge: '' },
  { id: 21, name: 'Пельмени свиные (домашние) (лось)', group: 'polufab', price: '350/450', unit: 'кг', badge: '' },
  { id: 22, name: 'Перец фаршированный свиной', group: 'polufab', price: 350, unit: 'кг', badge: '' },
  { id: 23, name: 'Перец фаршированный куриный', group: 'polufab', price: 420, unit: 'кг', badge: '' },

  { id: 24, name: 'Колбаса печеночная', group: 'kolbaski', price: 300, unit: 'кг', badge: '' },
  { id: 25, name: 'Колбаса свиная', group: 'kolbaski', price: 430, unit: 'кг', badge: '' },
  { id: 26, name: 'Колбаски "Фуэт" свиная (тонкая)', group: 'kolbaski', price: 450, unit: 'кг', badge: '' },
  { id: 27, name: 'Колбаска свиная (тонкая)', group: 'kolbaski', price: 430, unit: 'кг', badge: '' },
  { id: 28, name: 'Колбаски из филе индейки', group: 'kolbaski', price: 460, unit: 'кг', badge: '' },
  { id: 29, name: 'Колбаски рубленные куриные', group: 'kolbaski', price: 460, unit: 'кг', badge: '' },
  { id: 30, name: 'Колбаски куриные тонкие', group: 'kolbaski', price: 460, unit: 'кг', badge: '' },

  { id: 31, name: 'Фарш котлетный (филе курицы) без лука', group: 'farsh', price: 460, unit: 'кг', badge: '' },
  { id: 32, name: 'Фарш свиной премиум 90/10', group: 'farsh', price: 390, unit: 'кг', badge: '' },

  { id: 33, name: 'Голова свиная (с языком,ушами и щековиной)', group: 'subproduct', price: 75, unit: 'кг', badge: '' },
  { id: 34, name: 'Уши(свиные) свежие (заморозка)', group: 'subproduct', price: 180, unit: 'кг', badge: '' },
  { id: 35, name: 'Шкура свиная', group: 'subproduct', price: 20, unit: 'кг', badge: '' },
  { id: 36, name: 'Кость свиная', group: 'subproduct', price: 50, unit: 'кг', badge: '' },
  { id: 37, name: 'Язык свиной', group: 'subproduct', price: 520, unit: 'кг', badge: '' },

  { id: 38, name: 'Уши свиные (целые)', group: 'kopchenosti', price: 310, unit: 'кг', badge: '' },
  { id: 39, name: 'Щечка копченая', group: 'kopchenosti', price: 320, unit: 'кг', badge: '' },
  { id: 40, name: 'Грудинка копченая', group: 'kopchenosti', price: 420, unit: 'кг', badge: '' },
  { id: 41, name: 'Карбонат ВК', group: 'kopchenosti', price: 600, unit: 'кг', badge: '' },
  { id: 42, name: 'Шея Вк', group: 'kopchenosti', price: 600, unit: 'кг', badge: '' },
  { id: 43, name: 'Уши свиные резаные вк', group: 'kopchenosti', price: 330, unit: 'кг', badge: '' },

  { id: 44, name: 'Шпик бутербродный (в батончиках)', group: 'salo', price: 240, unit: 'кг', badge: '' },
  { id: 45, name: 'Грудинка бутербродная (в батончиках)', group: 'salo', price: 310, unit: 'кг', badge: '' },
  { id: 46, name: 'Сало толстое 4+', group: 'salo', price: null, unit: 'кг', badge: '' },
  { id: 47, name: 'Сало копченое', group: 'salo', price: null, unit: 'кг', badge: '' },

  { id: 48, name: 'Половинка целиком 35-40кг (оппалка)', group: 'svinina', price: null, unit: 'кг', badge: '' },
  { id: 49, name: 'Половинка в разруб как в магазине', group: 'svinina', price: null, unit: 'кг', badge: '' },
];

function productImage(p) {
  const n = p.name.toLowerCase();
  if (n.includes('голова') && n.includes('свин')) return 'Pig Head.jpg';
  if (n.includes('язык')) return 'Svin_yazik.png';
  if (n.includes('кость')) return 'Svin_kosti.jpg';
  if (n.includes('шкура')) return 'Svin_shkura.png';
  if (n.includes('уши') && n.includes('рез')) return 'Ushi_rez_VK.jpg';
  if (n.includes('уши') && n.includes('целые')) return 'Ushi_celie_kopchen.jpg';
  if (n.includes('уши')) return 'Ushi_svin.jpg';
  if (n.includes('щечк')) return 'Shochki Kopchon.jpg';
  if (n.includes('фуэт')) return 'Fuet_pig_thinck.jpg';
  if (n.includes('индейк')) return 'kolbasa-file_indeyki.jpg';
  if (n.includes('рубл')) return 'kolbaski-rubl_chiken.jpg';
  if (n.includes('колбаски') && n.includes('курин')) return 'kolbaski_chiken_tonkie.jpg';
  if (n.includes('колбаса') && n.includes('печеночн')) return 'Kolbasa_pechen.jpg';
  if (n.includes('охотничь')) return 'охотничьи из свинины (тонкие).jpg';
  if (n.includes('кровяная') && n.includes('гречк')) return 'krovyanaya-kolbasa-s-grechkoi.jpg';
  if (n.includes('кровяная')) return 'krovyanaya-kolbasa-s-pechen.jpg';
  if (n.includes('чесночн')) return 'chesnochnaya.jpg';
  if (n.includes('москвоск')) return 'kolbasa-moskovskaya.jpg';
  if (n.includes('половинка') && n.includes('разруб')) return 'Svin_vrazrub.jpg';
  if (n.includes('половинка')) return 'Svin_polovin.jpeg';
  if (n.includes('сало') && n.includes('копчен')) return 'Shpik_kopch.jpg';
  if (n.includes('сало') && n.includes('толстое')) return 'Spick_solt.jpg';
  if (n.includes('шпик')) return 'Shpik_buter.jpg';
  if (n.includes('шея')) return 'Sheya_VK.jpg';
  if (n.includes('карбонат')) return 'Karbonat_VK.jpg';
  if (n.includes('грудинка') && n.includes('бутер')) return 'Grudinka_Buter.png';
  if (n.includes('грудинка') && n.includes('копчен')) return 'Grudinka_kopch.jpg';
  if (n.includes('грудинка')) return 'Grudinka VK.jpg';
  if (n.includes('ветчинн')) return 'Kolbascki_vetchinn.png';
  if (n.includes('ребро')) return 'Rebro VK melkoe.jpg';
  if (n.includes('холодец')) return 'Holodec.jpg';
  if (n.includes('колбаска') && n.includes('свиная')) return 'kolbasa-svinnaya_tonkie.jpg';
  if (n.includes('колбаса') && n.includes('свиная')) return 'kolbasa-svinnaya.jpg';
  if (n.includes('перец') && n.includes('курин')) return 'pepper_chiken.jpg';
  if (n.includes('перец')) return 'pepper.jpg';
  if (n.includes('зельц')) return 'Zelc.jpg';
  if (n.includes('боярск') && n.includes('курин')) return 'boyarscaya chiken.png';
  if (n.includes('боярск')) return 'Bayarskaya.jpg';
  if (n.includes('прима из лося')) return 'Prima-iz-losya.jpg';
  if (n.includes('прима')) return 'Prima.jpg';
  if (n.includes('голуб') && n.includes('ленив')) return 'Golubci leniv.png';
  if (n.includes('голуб') && n.includes('свин')) return 'golubcy svinye.jpg';
  if (n.includes('голуб')) return 'golubcy.jpg';
  if (n.includes('фарш котлетный')) return 'farsh.jpg';
  if (n.includes('фарш свиной')) return 'farsh-svinoy.jpg';
  if (n.includes('пельмени')) return 'pelmeni.jpg';
  if (n.includes('котлет') && n.includes('печеночн')) return 'cutlets_pechen.jpg';
  if (n.includes('котлет') && n.includes('курин')) return 'cutlets_chiken.jpg';
  if (n.includes('котлет')) return 'cutlets.jpg';
  if (n.includes('куриц') || n.includes('индейк')) return 'poultry.svg';
  if (p.group === 'sausages') return 'sausages.svg';
  if (p.group === 'kopchenosti') return 'sausages.svg';
  if (p.group === 'tushenka') return 'sausages.svg';
  if (p.group === 'salo') return 'sausages.svg';
  if (p.group === 'subproduct' || p.group === 'svinina') return 'pork.svg';
  return 'semi.svg';
}
