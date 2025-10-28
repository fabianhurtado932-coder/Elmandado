const demoMenu = [
  { id: 1, name: 'Hamburguesa clásica', price: 30000, img: 'C:\Users\nanez\OneDrive\Documentos\parcial 1 fundamentos web\el_mandado\hamburguesa clasica.jpeg' },
  { id: 2, name: 'Pizza personal', price: 25000, img: 'C:\Users\nanez\OneDrive\Documentos\parcial 1 fundamentos web\el_mandado\pizza personal.jpeg' },
  { id: 3, name: 'Ensalada detox', price: 18000, img: 'C:\Users\nanez\OneDrive\Documentos\parcial 1 fundamentos web\el_mandado\ensalada detox.jpeg' },
  { id: 4, name: 'Sushi box', price: 40000, img: 'C:\Users\nanez\OneDrive\Documentos\parcial 1 fundamentos web\el_mandado\sushi box.jpeg' }
]; 



function renderCart() {
if (cart.length === 0) {
cartItems.innerHTML = '<p class="muted">Tu carrito está vacío.</p>';
cartCount.textContent = '0';
cartTotal.textContent = '$0.00';
return;
}


cartItems.innerHTML = '';
let total = 0;
cart.forEach(it => {
const row = document.createElement('div');
row.className = 'cart-row';
row.innerHTML = `
<div><strong>${it.name}</strong><div class="muted small">$ ${it.price.toLocaleString()} x ${it.qty}</div></div>
<div>
<button class="btn-ghost" onclick="changeQty(${it.id}, -1)">-</button>
<button class="btn-ghost" onclick="changeQty(${it.id}, 1)">+</button>
</div>
`;
cartItems.appendChild(row);
total += it.price * it.qty;
});


cartCount.textContent = cart.reduce((a, b) => a + b.qty, 0);
cartTotal.textContent = `$${total.toLocaleString()}`;
}


function changeQty(id, delta) {
const it = cart.find(c => c.id === id);
if (!it) return;
it.qty += delta;
if (it.qty <= 0) cart = cart.filter(c => c.id !== id);
renderCart();
}


function clearCart() {
cart = [];
renderCart();
notify('Carrito vaciado');
}


function loginDemo() {
user = { id: 1, name: 'Usuario Demo' };
loginBtn.textContent = `Conectado: ${user.name}`;
notify(`Sesión iniciada como ${user.name}`);
}


function checkout() {
if (cart.length === 0) return notify('El carrito está vacío.');
if (!user) return notify('Inicia sesión primero.');
notify('Procesando pago...');
setTimeout(() => {
notify('Pago confirmado');
clearCart();
}, 1500);
}


function notify(msg) {
const t = document.createElement('div');
t.className = 'toast';
t.textContent = msg;
toasts.appendChild(t);
setTimeout(() => t.remove(), 2500);
}


loginBtn.addEventListener('click', () => {
if (!user) loginDemo(); else notify('Ya estás conectado.');
});
checkoutBtn.addEventListener('click', checkout);
clearCartBtn.addEventListener('click', clearCart);
mockOrdersBtn.addEventListener('click', () => {
addToCart(1); addToCart(2);
});


renderMenu();
renderCart();