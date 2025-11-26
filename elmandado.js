document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // DATOS INICIALES
    // ----------------------------------------------------
    const PRODUCTS = [
        // Asegúrate de que estas rutas sean EXACTAS (incluyendo mayúsculas/minúsculas y extensión).
        { id: 1, name: "Pizza Personal", price: 12.50, imageUrl: "pizza_personal.jpeg" }, 
        { id: 2, name: "Hamburguesa Clásica", price: 8.75, imageUrl: "hamburguesa_clasica.jpeg" },
        { id: 3, name: "Ensalada Detox", price: 7.90, imageUrl: "ensalada_detox.jpeg" },
        { id: 4, name: "Sushi Box", price: 2.00, imageUrl: "sushi_box.jpeg" }, 
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
    const backendStatusDot = document.getElementById('backend-status-dot');
    let isUserLoggedIn = false; // Estado para la simulación
    
    // ----------------------------------------------------
    // FUNCIONES DE RENDERIZADO Y LÓGICA
    // ----------------------------------------------------

    /** Renderiza los productos del menú. */
    function renderProducts() {
        popularMenu.innerHTML = '';
        PRODUCTS.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <img src="${product.imageUrl}" alt="${product.name}" class="product-image"> 
                <h4>${product.name}</h4>
                <p>$${product.price.toFixed(2)}</p>
                
                <input type="number" 
                        class="product-quantity-input" 
                        value="1" 
                        min="1" 
                        data-id="${product.id}" 
                        style="width: 60px; margin: 0 auto 10px auto; text-align: center;">
                
                <button class="btn btn-primary add-to-cart-btn" data-id="${product.id}">
                    <i class="fas fa-cart-plus"></i> Agregar
                </button>
            `;
            popularMenu.appendChild(productCard);
        });
    }

    /** Agrega un producto al carrito. (Se mantiene igual) */
    function addToCart(productId, quantityToAdd) { 
        const product = PRODUCTS.find(p => p.id === productId);
        quantityToAdd = Math.max(1, parseInt(quantityToAdd)); 
        
        if (product) {
            const existingItem = cart.find(item => item.id === productId);
            
            if (existingItem) {
                existingItem.quantity += quantityToAdd;
            } else {
                cart.push({ ...product, quantity: quantityToAdd });
            }
            
            updateCartUI();
            alert(`Se agregaron ${quantityToAdd} unidad(es) de "${product.name}" al carrito.`);
        }
    }

    /** Actualiza la Interfaz de Usuario (UI) del carrito. (Se mantiene igual) */
    function updateCartUI() {
        cartItemsList.innerHTML = ''; 
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
        
        cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartTotalValue.textContent = `$${total.toFixed(2)}`;
    }
    
    /** 🔄 NUEVA FUNCIÓN MEJORADA: Simula el proceso de pago. */
    function checkout() {
        const total = cartTotalValue.textContent;
        const paymentOptions = `
        Selecciona el método de pago para el total ${total}:
        1. Efectivo (Simulación GestorPagos)
        2. Tarjeta de Crédito/Débito (Simulación GestorPagos)
        3. Nequi (Simulación GestorPagos)
        
        Ingresa el número de tu opción:
        `;
        
        let paymentChoice = prompt(paymentOptions);

        if (paymentChoice === null) {
            alert("Pago cancelado.");
            return;
        }

        paymentChoice = parseInt(paymentChoice.trim());
        let paymentMethod;

        switch(paymentChoice) {
            case 1:
                paymentMethod = "Efectivo";
                break;
            case 2:
                paymentMethod = "Tarjeta de Crédito/Débito";
                break;
            case 3:
                paymentMethod = "Nequi";
                break;
            default:
                alert("Opción no válida. Pago cancelado.");
                return;
        }

        // --- Simulación de Comunicación Microservicio ---
        alert(`Iniciando transacción: ${paymentMethod}`);
        
        // Simulación: Llamada al microservicio de Pagos
        alert(`📡 GestorPagos: Procesando pago de ${total} vía ${paymentMethod}.`);
        
        // Simulación: Llamada al microservicio de Pedidos
        alert(`📦 GestorPedidos: Generando nuevo pedido para el usuario.`);

        // Simulación: Llamada al microservicio de Notificaciones
        alert(`🔔 GestorNotificaciones: Enviando confirmación al usuario.`);
        
        // --- Finalización ---
        alert(`✅ ¡Transacción exitosa! El pedido ha sido confirmado. Método: ${paymentMethod}`);
        emptyCart(false); // Vacía sin preguntar de nuevo
    }
    
    // Función para remover un ítem (Mantenida)
    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId); 
        updateCartUI();
    }
    
    // Función para vaciar el carrito (Ajustada para usar en checkout)
    function emptyCart(askConfirmation = true) {
        if (askConfirmation && !confirm('¿Estás seguro que quieres vaciar el carrito?')) {
             return;
        }
        cart = [];
        updateCartUI();
        if (askConfirmation) {
            alert('El carrito ha sido vaciado.');
        }
    }


    // ----------------------------------------------------
    // MANEJADORES DE EVENTOS
    // ----------------------------------------------------

    // Evento de click para agregar al carrito (delegación de eventos)
    popularMenu.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart-btn')) {
            const productId = parseInt(e.target.dataset.id);
            const quantityInput = e.target.parentElement.querySelector(`.product-quantity-input[data-id="${productId}"]`);
            const quantity = quantityInput ? parseInt(quantityInput.value) : 1;
            addToCart(productId, quantity); 
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
    btnEmptyCart.addEventListener('click', () => emptyCart(true)); // Llama con confirmación

    // Evento para el proceso de pago
    btnCheckout.addEventListener('click', checkout);

    // Eventos de simulación (botones superiores)
    btnLogin.addEventListener('click', () => {
        isUserLoggedIn = !isUserLoggedIn;
        if (isUserLoggedIn) {
            btnLogin.textContent = 'Cerrar sesión demo';
            alert(`Simulación: Usuario 'Demo' ha iniciado sesión correctamente (Microservicio: GestorUsuarios).`);
        } else {
            btnLogin.textContent = 'Iniciar sesión demo';
            alert("Simulación: Sesión cerrada.");
        }
    });

    btnLoadOrders.addEventListener('click', () => {
        if (!isUserLoggedIn) {
            alert("¡Error! Necesitas iniciar sesión demo para cargar tus pedidos.");
            return;
        }

        backendStatusDot.textContent = 'Cargando pedidos...';
        
        setTimeout(() => {
            backendStatusDot.textContent = 'Conectado (demo)';
            alert(`Simulación: Se han cargado 5 pedidos recientes de GestorPedidos.`);
        }, 1500); 
    });


    // ----------------------------------------------------
    // INICIALIZACIÓN
    // ----------------------------------------------------
    renderProducts();
    updateCartUI(); // Inicializa el estado del carrito
});