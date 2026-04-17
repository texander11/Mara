// ═══════════════════════════════════════════════
//  Super Hamburguesas Mara — Lógica de la app
// ═══════════════════════════════════════════════

// ─── DATOS DEL MENÚ ──────────────────────────────
const MENU = [
  // HAMBURGUESAS
  { id:1,  cat:'HAMBURGUESAS', name:'Hamburguesa simple',        price:8000,  emoji:'🍔', img:'simple.png',               ingredients:['condimentos','tomate','carne','huevo','queso'] },
  { id:2,  cat:'HAMBURGUESAS', name:'Hamburguesa especial',      price:9000,  emoji:'🍔', img:'especial.jpg',             ingredients:['condimentos','tomate','huevo','cebolla','queso'] },
  { id:3,  cat:'HAMBURGUESAS', name:'Hamburguesa con cheddar',   price:10000, emoji:'🍔', img:'con cheddar.png',          ingredients:['condimentos','tomate','cebolla','queso','huevo'] },
  { id:4,  cat:'HAMBURGUESAS', name:'Hamburguesa doble carne',   price:12000, emoji:'🍔', img:'doble.jpg',                ingredients:['condimentos','huevo','tomate','queso'] },
  { id:5,  cat:'HAMBURGUESAS', name:'Súper hamburguesa',         price:13000, emoji:'🍔', img:'super h.jpg',              ingredients:['condimentos','tomate','cebolla','queso','huevo'] },
  { id:6,  cat:'HAMBURGUESAS', name:'Doble carne con cheddar',   price:14000, emoji:'🍔', img:'doble.jpg',                ingredients:['condimentos','cheddar','huevo','tomate'] },
  { id:7,  cat:'HAMBURGUESAS', name:'Súper con cheddar',         price:15000, emoji:'🍔', img:'con cheddar.png',          ingredients:['condimentos','tomate','cebolla','cheddar','huevo'] },
  { id:8,  cat:'HAMBURGUESAS', name:'Triple carne',              price:18000, emoji:'🍔', img:'triple.jpeg',              ingredients:['condimentos','huevo','tomate','queso'] },
  // LOMITOS
  { id:9,  cat:'LOMITOS', name:'Lomito árabe mixto',             price:18000, emoji:'🌯', img:'lomito arabe.jpeg',        ingredients:[] },
  { id:10, cat:'LOMITOS', name:'Lomito árabe de pollo',          price:18000, emoji:'🌯', img:'arabe de pollo.jpg',       ingredients:[] },
  { id:11, cat:'LOMITOS', name:'Lomito árabe súper pollo',       price:20000, emoji:'🌯', img:'arabe de pollo.jpg',       ingredients:[] },
  { id:12, cat:'LOMITOS', name:'Lomito árabe mixto cheddar',     price:20000, emoji:'🌯', img:'arabe con cheddar.jpg',    ingredients:[] },
  { id:13, cat:'LOMITOS', name:'Lomito árabe de carne',          price:22000, emoji:'🌯', img:'arabe de carne.jpg',       ingredients:[] },
  { id:14, cat:'LOMITOS', name:'Lomito árabe carne cheddar',     price:24000, emoji:'🌯', img:'arabe con cheddar.jpg',    ingredients:[] },
  { id:15, cat:'LOMITOS', name:'Lomito árabe súper carne',       price:24000, emoji:'🌯', img:'arabe de carne.jpg',       ingredients:[] },
  // PIZZAS
  { id:16, cat:'PIZZAS', name:'Pepperoni',                       price:35000, emoji:'🍕', img:'pizza-pepperoni_web.jpg',  ingredients:[] },
  { id:17, cat:'PIZZAS', name:'Jamón y queso',                   price:35000, emoji:'🍕', img:'pizza jamon y queso.jpeg', ingredients:[] },
  { id:18, cat:'PIZZAS', name:'Catu pollo',                      price:35000, emoji:'🍕', img:'pizza catupollo.jpeg',     ingredients:[] },
  { id:19, cat:'PIZZAS', name:'Catu choclo',                     price:35000, emoji:'🍕', img:'pizza de queso.jpg',       ingredients:[] },
  // EXTRAS
  { id:20, cat:'EXTRAS', name:'Papas fritas',                    price:10000, emoji:'🍟', img:'papas.jpeg',               ingredients:[] },
  { id:21, cat:'EXTRAS', name:'Papas fritas cheddar',            price:15000, emoji:'🍟', img:'papas con cheddar.jpg',    ingredients:[] },
  { id:22, cat:'EXTRAS', name:'Aderezo extra',                   price:1000,  emoji:'🥫',                                 ingredients:[] },
  // CHAMBURREADOS
  { id:23, cat:'CHAMBURREADOS', name:'Mixto',                    price:10000, emoji:'🥪', img:'chamburreado mixto.jpeg',  ingredients:[] },
  { id:24, cat:'CHAMBURREADOS', name:'Pollo',                    price:10000, emoji:'🥪', img:'sandwich de lomito.jpeg',  ingredients:[] },
  { id:25, cat:'CHAMBURREADOS', name:'Súper pollo',              price:12000, emoji:'🥪', img:'sandwich de lomito.jpeg',  ingredients:[] },
  { id:26, cat:'CHAMBURREADOS', name:'Carne',                    price:13000, emoji:'🥪', img:'chamburreado mixto.jpeg',  ingredients:[] },
  { id:27, cat:'CHAMBURREADOS', name:'Súper carne',              price:14000, emoji:'🥪', img:'chamburreado mixto.jpeg',  ingredients:[] },
  { id:28, cat:'CHAMBURREADOS', name:'Cheddar',                  price:15000, emoji:'🥪', img:'chamburreado mixto.jpeg',  ingredients:[] },
];

// Clases CSS de color por categoría (definidas en styles.css)
const CATEGORY_COLORS = {
  HAMBURGUESAS:  'cat-HAMBURGUESAS',
  LOMITOS:       'cat-LOMITOS',
  PIZZAS:        'cat-PIZZAS',
  EXTRAS:        'cat-EXTRAS',
  CHAMBURREADOS: 'cat-CHAMBURREADOS',
};

const WHATSAPP_NUMBER = '595971954958';

// ─── ESTADO GLOBAL ───────────────────────────────
let cart          = [];
let currentView   = 'menu';
let activeCategory = 'HAMBURGUESAS';
let payMethod     = 'efectivo';
let deliveryType  = 'delivery'; // 'delivery' | 'takeaway'

// Estado del modal
let modalProduct    = null;
let modalQty        = 1;
let modalIngredients = []; // [{ name, checked }]

// ─── INICIALIZACIÓN ──────────────────────────────
function init() {
  loadCart();
  renderProductGrid(activeCategory);
  updateCartUI();
}

// ─── FORMATO DE PRECIO ───────────────────────────
function fmtPrice(n) {
  return n.toLocaleString('es-PY').replace(',', '.') + ' Gs';
}

// ─── NAVEGACIÓN ENTRE VISTAS ─────────────────────
function showView(name) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.getElementById('view-' + name).classList.add('active');
  currentView = name;

  // Resaltar ítem activo en la barra inferior
  ['menu', 'cart'].forEach(v => {
    const btn = document.getElementById('bnav-' + v);
    if (btn) {
      btn.classList.toggle('text-primary', v === name);
      btn.classList.toggle('text-on-surface-variant', v !== name);
    }
  });

  if (name === 'cart')    renderCart();
  if (name === 'payment') renderPayment();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ─── GRILLA DE PRODUCTOS ─────────────────────────
function renderProductGrid(cat) {
  const grid = document.getElementById('product-grid');
  const products = MENU.filter(p => p.cat === cat);
  grid.innerHTML = products.map(p => `
    <div class="group bg-surface-container-lowest rounded-xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
      <div class="w-full h-36 rounded-xl ${CATEGORY_COLORS[p.cat]} flex items-center justify-center text-7xl mb-4 overflow-hidden group-hover:scale-105 transition-transform duration-300">
        ${p.img
          ? `<img src="${p.img}" alt="${p.name}" class="w-full h-full object-cover rounded-xl"/>`
          : p.emoji
        }
      </div>
      <div class="flex-1 flex flex-col">
        <h3 class="font-headline font-bold text-on-surface text-base mb-1 leading-tight">${p.name}</h3>
        <p class="font-headline font-extrabold text-primary text-lg mb-4">${fmtPrice(p.price)}</p>
        <button onclick="openModal(${p.id})"
          class="mt-auto w-full py-3.5 bg-surface-container-low text-primary font-headline font-bold rounded-xl hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2 active:scale-95">
          <span class="material-symbols-outlined text-lg">add_circle</span>
          AGREGAR
        </button>
      </div>
    </div>
  `).join('');
}

function filterCategory(cat) {
  activeCategory = cat;
  document.querySelectorAll('.chip').forEach(c => {
    const isCat = c.dataset.cat === cat;
    c.classList.toggle('chip-active', isCat);
    c.classList.toggle('chip-inactive', !isCat);
  });
  renderProductGrid(cat);
}

// ─── MODAL DE PERSONALIZACIÓN ────────────────────
function openModal(productId) {
  const p = MENU.find(x => x.id === productId);
  if (!p) return;

  modalProduct     = p;
  modalQty         = 1;
  modalIngredients = p.ingredients.map(ing => ({ name: ing, checked: true }));

  document.getElementById('modal-category').textContent     = p.cat;
  document.getElementById('modal-name').textContent         = p.name;
  document.getElementById('modal-price-display').textContent = fmtPrice(p.price);
  document.getElementById('modal-qty').textContent          = '1';
  updateModalTotalPrice();

  // Área de ícono con color de categoría o imagen
  const iconArea = document.getElementById('modal-icon-area');
  if (p.img) {
    iconArea.className   = `w-full h-28 rounded-xl overflow-hidden mb-5`;
    iconArea.innerHTML   = `<img src="${p.img}" alt="${p.name}" class="w-full h-full object-cover"/>`;
  } else {
    iconArea.className   = `w-full h-28 rounded-xl flex items-center justify-center text-6xl mb-5 ${CATEGORY_COLORS[p.cat]}`;
    iconArea.textContent = p.emoji;
  }

  // Ingredientes con checkboxes
  const section   = document.getElementById('modal-ingredients-section');
  const container = document.getElementById('modal-ingredients');
  if (p.ingredients.length > 0) {
    section.classList.remove('hidden');
    container.innerHTML = modalIngredients.map((ing, i) => `
      <label class="flex items-center justify-between p-3 bg-surface-container-low rounded-xl cursor-pointer hover:bg-surface-container transition-colors">
        <span class="font-body font-semibold text-sm capitalize">${ing.name}</span>
        <input type="checkbox" ${ing.checked ? 'checked' : ''} onchange="toggleIngredient(${i})"
          class="w-5 h-5 rounded cursor-pointer"/>
      </label>
    `).join('');
  } else {
    section.classList.add('hidden');
    container.innerHTML = '';
  }

  // Mostrar overlay
  const overlay = document.getElementById('modal-overlay');
  const panel   = document.getElementById('modal-panel');
  overlay.classList.add('overlay-open');
  panel.classList.add('modal-open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const overlay = document.getElementById('modal-overlay');
  const panel   = document.getElementById('modal-panel');
  overlay.classList.remove('overlay-open');
  panel.classList.remove('modal-open');
  setTimeout(() => {
    document.body.style.overflow = '';
  }, 300);
}

function toggleIngredient(index) {
  modalIngredients[index].checked = !modalIngredients[index].checked;
}

function changeModalQty(delta) {
  modalQty = Math.max(1, modalQty + delta);
  document.getElementById('modal-qty').textContent = modalQty;
  updateModalTotalPrice();
}

function updateModalTotalPrice() {
  if (!modalProduct) return;
  document.getElementById('modal-total-price').textContent = fmtPrice(modalProduct.price * modalQty);
}

function addToCartFromModal() {
  if (!modalProduct) return;
  const removed = modalIngredients.filter(i => !i.checked).map(i => i.name);
  addToCart(modalProduct, modalQty, removed);
  closeModal();
  showToast(`¡${modalProduct.name} agregado!`);
}

// ─── CARRITO ─────────────────────────────────────
function addToCart(product, qty, removedIngredients) {
  // Agrupar si ya existe el mismo producto con los mismos ingredientes removidos
  const key      = product.id + '|' + removedIngredients.sort().join(',');
  const existing = cart.find(item => item.key === key);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({
      key,
      productId: product.id,
      name:      product.name,
      price:     product.price,
      emoji:     product.emoji,
      cat:       product.cat,
      qty,
      removed:   removedIngredients,
    });
  }
  saveCart();
  updateCartUI();
}

function removeFromCart(key) {
  cart = cart.filter(item => item.key !== key);
  saveCart();
  updateCartUI();
  renderCart();
}

function changeCartQty(key, delta) {
  const item = cart.find(i => i.key === key);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  saveCart();
  updateCartUI();
  renderCart();
}

function cartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function cartCount() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

function updateCartUI() {
  const count = cartCount();
  document.getElementById('cart-count-header').textContent = count;

  const badge     = document.getElementById('cart-badge');
  const bnavBadge = document.getElementById('bnav-badge');
  if (count > 0) {
    badge.textContent = count;
    badge.classList.remove('hidden');
    bnavBadge.textContent = count;
    bnavBadge.classList.remove('hidden');
  } else {
    badge.classList.add('hidden');
    bnavBadge.classList.add('hidden');
  }
}

function renderCart() {
  const itemsEl   = document.getElementById('cart-items');
  const emptyEl   = document.getElementById('cart-empty');
  const summaryEl = document.getElementById('cart-summary');

  if (cart.length === 0) {
    emptyEl.classList.remove('hidden');
    emptyEl.classList.add('flex');
    itemsEl.classList.add('hidden');
    summaryEl.classList.add('hidden');
    return;
  }

  emptyEl.classList.add('hidden');
  emptyEl.classList.remove('flex');
  itemsEl.classList.remove('hidden');
  summaryEl.classList.remove('hidden');

  itemsEl.innerHTML = cart.map(item => {
    const sinText = item.removed.length > 0
      ? '<span class="text-xs text-primary font-semibold">sin ' + item.removed.join(', sin ') + '</span>'
      : '';
    const subtotal = item.price * item.qty;
    return `
      <div class="bg-surface-container-low rounded-xl p-4 flex items-center gap-4 group hover:bg-surface-container transition-colors">
        <div class="w-16 h-16 rounded-xl ${CATEGORY_COLORS[item.cat]} flex items-center justify-center text-4xl flex-shrink-0">
          ${item.emoji}
        </div>
        <div class="flex-1 min-w-0">
          <h3 class="font-headline font-bold text-on-surface text-sm leading-tight">${item.name}</h3>
          ${sinText}
          <p class="font-headline font-extrabold text-primary text-base mt-1">${fmtPrice(subtotal)}</p>
        </div>
        <div class="flex flex-col items-end gap-2 flex-shrink-0">
          <button onclick="removeFromCart('${item.key}')" class="p-1.5 rounded-full hover:bg-error/10 text-on-surface-variant hover:text-error transition-colors">
            <span class="material-symbols-outlined text-lg">delete</span>
          </button>
          <div class="flex items-center bg-surface-container-lowest rounded-full px-1 py-0.5 shadow-sm">
            <button onclick="changeCartQty('${item.key}', -1)" class="qty-btn text-primary">
              <span class="material-symbols-outlined text-lg">remove</span>
            </button>
            <span class="font-headline font-bold text-sm w-7 text-center">${item.qty}</span>
            <button onclick="changeCartQty('${item.key}', 1)" class="qty-btn text-primary">
              <span class="material-symbols-outlined text-lg">add</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  const total = cartTotal();
  document.getElementById('cart-subtotal').textContent = fmtPrice(total);
  document.getElementById('cart-total').textContent    = fmtPrice(total);
}

// ─── PAGO ────────────────────────────────────────
function goToPayment() {
  if (cart.length === 0) {
    showToast('Tu carrito está vacío');
    return;
  }
  showView('payment');
}

function renderPayment() {
  const total = cartTotal();
  document.getElementById('payment-total').textContent = fmtPrice(total);

  const list = document.getElementById('payment-order-list');
  list.innerHTML = cart.map(item => {
    const sinText = item.removed.length > 0 ? ' (sin ' + item.removed.join(', ') + ')' : '';
    return `
      <div class="flex justify-between items-start gap-2">
        <span class="text-on-surface-variant flex-1">${item.qty}x ${item.name}${sinText}</span>
        <span class="font-bold text-on-surface flex-shrink-0">${fmtPrice(item.price * item.qty)}</span>
      </div>
    `;
  }).join('');

  // Resetear input de efectivo
  document.getElementById('cash-input').value = '';
  document.getElementById('change-amount').textContent = 'Gs. 0';
  document.getElementById('cash-error').classList.add('hidden');

  // Resetear slider de entrega
  deliveryType = 'delivery';
  document.getElementById('delivery-pill').classList.remove('to-takeaway');
  document.getElementById('btn-delivery').classList.replace('text-on-surface-variant', 'text-white');
  document.getElementById('btn-takeaway').classList.replace('text-white', 'text-on-surface-variant');
  document.getElementById('delivery-address-section').classList.remove('hidden');
  document.getElementById('delivery-address').value = '';
}

// ─── TIPO DE ENTREGA ─────────────────────────────
function selectDelivery(type) {
  deliveryType = type;
  const pill        = document.getElementById('delivery-pill');
  const btnDelivery = document.getElementById('btn-delivery');
  const btnTakeaway = document.getElementById('btn-takeaway');
  const addrSection = document.getElementById('delivery-address-section');

  if (type === 'delivery') {
    pill.classList.remove('to-takeaway');
    btnDelivery.classList.replace('text-on-surface-variant', 'text-white');
    btnTakeaway.classList.replace('text-white', 'text-on-surface-variant');
    addrSection.classList.remove('hidden');
  } else {
    pill.classList.add('to-takeaway');
    btnTakeaway.classList.replace('text-on-surface-variant', 'text-white');
    btnDelivery.classList.replace('text-white', 'text-on-surface-variant');
    addrSection.classList.add('hidden');
  }
  // Recalcular label del vuelto si hay monto ingresado
  if (document.getElementById('cash-input').value) calcChange();
}

function selectPayMethod(method) {
  payMethod = method;
  const efectivoCard   = document.getElementById('pay-efectivo');
  const transCard      = document.getElementById('pay-transferencia');
  const radioEfectivo  = document.getElementById('radio-efectivo');
  const radioTrans     = document.getElementById('radio-transferencia');
  const efectivoDetails = document.getElementById('efectivo-details');
  const transDetails   = document.getElementById('transferencia-details');

  if (method === 'efectivo') {
    efectivoCard.classList.add('selected');
    transCard.classList.remove('selected');
    radioEfectivo.classList.remove('border-outline-variant'); radioEfectivo.classList.add('border-primary');
    radioEfectivo.querySelector('div').classList.remove('scale-0');
    radioTrans.classList.remove('border-primary'); radioTrans.classList.add('border-outline-variant');
    radioTrans.querySelector('div').classList.add('scale-0');
    efectivoDetails.classList.remove('hidden');
    transDetails.classList.add('hidden');
  } else {
    transCard.classList.add('selected');
    efectivoCard.classList.remove('selected');
    radioTrans.classList.remove('border-outline-variant'); radioTrans.classList.add('border-primary');
    radioTrans.querySelector('div').classList.remove('scale-0');
    radioEfectivo.classList.remove('border-primary'); radioEfectivo.classList.add('border-outline-variant');
    radioEfectivo.querySelector('div').classList.add('scale-0');
    transDetails.classList.remove('hidden');
    efectivoDetails.classList.add('hidden');
  }
}

function calcChange() {
  const total  = cartTotal();
  const paid   = parseInt(document.getElementById('cash-input').value) || 0;
  const change = paid - total;
  const changeEl      = document.getElementById('change-amount');
  const errorEl       = document.getElementById('cash-error');
  const changeDisplay = document.getElementById('change-display');
  const changeLabel   = document.getElementById('change-label');

  // Actualizar label según tipo de entrega
  if (changeLabel) {
    changeLabel.textContent = deliveryType === 'delivery' ? 'Vuelto sin delivery:' : 'Tu Vuelto:';
  }

  if (paid > 0 && change < 0) {
    errorEl.classList.remove('hidden');
    changeDisplay.classList.remove('bg-tertiary-fixed');
    changeDisplay.classList.add('bg-error-container');
    changeEl.textContent = 'Gs. ' + Math.abs(change).toLocaleString('es-PY').replace(',', '.');
  } else {
    errorEl.classList.add('hidden');
    changeDisplay.classList.remove('bg-error-container');
    changeDisplay.classList.add('bg-tertiary-fixed');
    changeEl.textContent = 'Gs. ' + Math.max(0, change).toLocaleString('es-PY').replace(',', '.');
  }
}

function copyBankInfo(e) {
  e.stopPropagation();
  const info = 'Banco Familiar\nCuenta: 41-1062826\nTitular: Estelbina Lombardo de Rojas\nCI: 6.123.200';
  navigator.clipboard.writeText(info)
    .then(() => showToast('¡Datos copiados!'))
    .catch(() => showToast('No se pudo copiar'));
}

// ─── WHATSAPP ────────────────────────────────────
function sendWhatsApp() {
  if (cart.length === 0) { showToast('Tu carrito está vacío'); return; }

  const total = cartTotal();
  let paidAmount = 0;

  if (payMethod === 'efectivo') {
    paidAmount = parseInt(document.getElementById('cash-input').value) || 0;
    if (paidAmount < total) {
      document.getElementById('cash-error').classList.remove('hidden');
      document.getElementById('cash-input').focus();
      return;
    }
  }

  const isDelivery = deliveryType === 'delivery';
  const addr = isDelivery ? (document.getElementById('delivery-address').value || '').trim() : '';
  const fmt = n => n.toLocaleString('es-PY').replace(',', '.') + ' Gs';

  let lines = 'Hola, quiero hacer un pedido:\n\n';

  // Productos
  cart.forEach(item => {
    const sinText = item.removed.length > 0 ? ' (sin ' + item.removed.join(', ') + ')' : '';
    const qtyText = item.qty > 1 ? item.qty + 'x ' : '';
    lines += qtyText + item.name + sinText + '\n';
  });

  lines += '\n💰 Total productos: ' + fmt(total) + '\n';

  // Tipo de entrega
  if (isDelivery) {
    lines += '🛵 Entrega: Delivery\n';
    if (addr) lines += '📍 Dirección: ' + addr + '\n';
    lines += '⚠️ El costo del delivery se cobra aparte.\n';
  } else {
    lines += '🥡 Entrega: Para llevar\n';
  }

  lines += '\n';

  // Método de pago
  if (payMethod === 'efectivo') {
    const change = paidAmount - total;
    lines += 'Pago: Efectivo\n';
    lines += 'Pago con: ' + fmt(paidAmount) + '\n';
    if (isDelivery) {
      lines += 'Vuelto sin delivery: ' + fmt(change) + '\n';
      lines += '(El vuelto real depende del costo del delivery)';
    } else {
      lines += 'Vuelto: ' + fmt(change);
    }
  } else {
    lines += 'Pago: Transferencia\n';
    if (isDelivery) {
      lines += '⚠️ El precio de los productos es ' + fmt(total) + '. El delivery se cobra aparte.\n';
    }
    lines += '👉 Enviar comprobante aquí.';
  }

  const url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(lines);
  window.open(url, '_blank');
}

// ─── TOAST ───────────────────────────────────────
let toastTimer = null;
function showToast(msg) {
  const toast = document.getElementById('toast');
  document.getElementById('toast-msg').textContent = msg;
  toast.classList.remove('opacity-0', 'pointer-events-none', '-translate-y-2');
  toast.classList.add('opacity-100', 'translate-y-0');
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.add('opacity-0', '-translate-y-2');
    toast.classList.remove('opacity-100', 'translate-y-0');
    setTimeout(() => toast.classList.add('pointer-events-none'), 300);
  }, 2500);
}

// ─── LOCALSTORAGE ────────────────────────────────
function saveCart() {
  try { localStorage.setItem('mara_cart', JSON.stringify(cart)); } catch(e) {}
}
function loadCart() {
  try {
    const saved = localStorage.getItem('mara_cart');
    if (saved) cart = JSON.parse(saved);
  } catch(e) { cart = []; }
}

// ─── CERRAR MODAL AL HACER CLIC EN EL FONDO ──────
document.getElementById('modal-overlay').addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});

// ─── ARRANQUE ────────────────────────────────────
init();
