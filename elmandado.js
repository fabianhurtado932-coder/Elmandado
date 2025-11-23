document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // DATOS INICIALES (Simulando una respuesta de backend)
    // ----------------------------------------------------
    const PRODUCTS = [
        { id: 1, name: "Pizza Margarita", price: 12.50 },
        { id: 2, name: "Hamburguesa Clásica", price: 8.75 },
        { id: 3, name: "Ensalada César", price: 7.90 },
        { id: 4, name: "Refresco Cola", price: 2.00 },
    ];
    
    let cart = []; // Array para almacenar los ítems del carrito
    
    // ----------------------------------------------------
    // ELEMENTOS DEL DOM
    // ----------------------------------------------------
    const popularMenu = document.getElementById('popular-menu');
    const cartItemsList = document.getElementById('cart-items');
    const cartTotalValue = document.getElementById('cart-total-value');
    const cartCount = document.getElementById('cart-count');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const btnCheckout = document.getElementById('btn-checkout');
    const btnEmptyCart = document.getElementById('btn-empty-cart');
    
    // Botones de simulación de backend
    const btnLogin = document.getElementById('btn-login');
    const btnLoadOrders = document.getElementById('btn-load-orders');

    // ----------------------------------------------------
    // FUNCIONES DEL CARRITO
    // ----------------------------------------------------

    // 1. Renderiza los productos en el menú
    function renderProducts() {
        popularMenu.innerHTML = '';
        PRODUCTS.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <h4>${product.name}</h4>
                <p>$${product.price.toFixed(2)}</p>
                <button class="btn btn-primary add-to-cart-btn" data-id="${product.id}">
                    <i class="fas fa-cart-plus"></i> Agregar
                </button>
            `;
            popularMenu.appendChild(productCard);
        });
    }

    // 2. Agrega un producto al carrito
    function addToCart(productId) {
        const product = PRODUCTS.find(p => p.id === productId);
        if (product) {
            const existingItem = cart.find(item => item.id === productId);
            
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ ...product, quantity: 1 });
            }
            
            updateCartUI();
            alert(`"${product.name}" agregado al carrito.`);
        }
    }

    // 3. Elimina un producto del carrito
    function removeFromCart(productId) {
        // Filtra para eliminar el ítem con el ID proporcionado
        cart = cart.filter(item => item.id !== productId); 
        updateCartUI();
    }

    // 4. Actualiza la Interfaz de Usuario (UI) del carrito
    function updateCartUI() {
        cartItemsList.innerHTML = ''; // Limpia la lista actual
        let total = 0;

        if (cart.length === 0) {
            emptyCartMessage.style.display = 'block';
            btnCheckout.disabled = true;
            btnEmptyCart.disabled = true;
        } else {
            emptyCartMessage.style.display = 'none';
            btnCheckout.disabled = false;
            btnEmptyCart.disabled = false;
            
            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;
                
                const cartItemDiv = document.createElement('div');
                cartItemDiv.className = 'cart-item';
                cartItemDiv.innerHTML = `
                    <div class="item-details">
                        <span>${item.name}</span>
                        <small>${item.quantity} x $${item.price.toFixed(2)}</small>
                    </div>
                    <span>$${itemTotal.toFixed(2)}</span>
                    <button class="item-remove" data-id="${item.id}" title="Quitar">
                        <i class="fas fa-trash"></i>
                    </button>
                `;
                cartItemsList.appendChild(cartItemDiv);
            });
        }
        
        // Actualiza el contador y el total
        cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartTotalValue.textContent = `$${total.toFixed(2)}`;
    }

    // 5. Vaciar el carrito
    function emptyCart() {
        if (confirm('¿Estás seguro que quieres vaciar el carrito?')) {
            cart = [];
            updateCartUI();
            alert('El carrito ha sido vaciado.');
        }
    }

    // 6. Simular el proceso de pago
    function checkout() {
        alert(`¡Pago simulado exitoso!\nTotal: ${cartTotalValue.textContent}\nGracias por tu compra.`);
        emptyCart(); // Vacía el carrito después del pago simulado
    }

    // ----------------------------------------------------
    // MANEJADORES DE EVENTOS
    // ----------------------------------------------------

    // Evento de click para agregar al carrito (delegación de eventos)
    popularMenu.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart-btn')) {
            const productId = parseInt(e.target.dataset.id);
            addToCart(productId);
        }
    });

    // Evento de click para eliminar del carrito (delegación de eventos)
    cartItemsList.addEventListener('click', (e) => {
        if (e.target.closest('.item-remove')) {
            const productId = parseInt(e.target.closest('.item-remove').dataset.id);
            removeFromCart(productId);
        }
    });

    // Evento para vaciar el carrito
    btnEmptyCart.addEventListener('click', emptyCart);

    // Evento para el proceso de pago
    btnCheckout.addEventListener('click', checkout);

    // Eventos de simulación (botones superiores)
    btnLogin.addEventListener('click', () => {
        alert("Simulación: Redirigiendo a la pantalla de Login/Registro de GestorUsuarios.");
    });
    
    btnLoadOrders.addEventListener('click', () => {
        alert("Simulación: Solicitando datos de pedidos a GestorPedidos.");
    });

    // ----------------------------------------------------
    // INICIALIZACIÓN
    // ----------------------------------------------------
    renderProducts();
    updateCartUI(); // Inicializa el estado del carrito
});