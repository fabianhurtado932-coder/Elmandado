document.addEventListener('DOMContentLoaded', () => {

    // --- DATOS INICIALES y VARIABLES DEL CARRITO ---
    const PRODUCTS = [
        { id: 1, name: "Pizza Margarita", price: 12000, img: "pizza_personal.jpeg" },
        { id: 2, name: "Hamburguesa Clásica", price: 8750, img: "hamburguesa_clasica.jpeg" },
        { id: 3, name: "Ensalada César", price: 7900, img: "ensalada_detox.jpeg" },
        { id: 4, name: "Sushi Box", price: 2000, img: "sushi_box.jpeg" }
    ];

    let cart = []; 

    // --- ELEMENTOS DEL DOM ---
    const popularMenu = document.getElementById('popular-menu');
    const cartItemsList = document.getElementById('cart-items');
    const cartTotalValue = document.getElementById('cart-total-value');
    const cartCount = document.getElementById('cart-count');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const btnCheckout = document.getElementById('btn-checkout');
    const btnEmptyCart = document.getElementById('btn-empty-cart');
    
    // Botones de acción
    const btnLogin = document.getElementById('btn-login'); 
    const btnLoadOrders = document.getElementById('btn-load-orders');


    // --- FUNCIÓN UTILITARIA: VERIFICAR SESIÓN ---
    function isUserLoggedIn() {
        return localStorage.getItem('elmandado_session') === 'true';
    }


    // --- FUNCIÓN: ACTUALIZAR EL BOTÓN DEL ENCABEZADO ---
    function updateHeaderButton() {
        if (btnLogin) {
            const userIsLoggedIn = isUserLoggedIn(); 

            if (userIsLoggedIn) {
                btnLogin.textContent = 'Cerrar sesión';
                btnLogin.classList.remove('btn-secondary');
                btnLogin.classList.add('btn-danger'); 
                
                btnLogin.removeEventListener('click', redirigirLogin); 
                btnLogin.addEventListener('click', logout);
            } else {
                btnLogin.textContent = 'Iniciar sesión demo';
                btnLogin.classList.remove('btn-danger');
                btnLogin.classList.add('btn-secondary');
                
                btnLogin.removeEventListener('click', logout); 
                btnLogin.addEventListener('click', redirigirLogin);
            }
        }
    }

    // --- FUNCIÓN: CERRAR SESIÓN ---
    function logout() {
        if (confirm("¿Estás seguro que deseas cerrar la sesión?")) {
            localStorage.removeItem('elmandado_session'); 
            alert('Sesión cerrada.');
            updateHeaderButton(); 
            updateCartUI(); 
        }
    }

    // --- FUNCIÓN: REDIRIGIR AL LOGIN (Se usa en elmandado.html) ---
    function redirigirLogin() {
        alert("Te redirigiré a la página de Login");
        window.location.href = "login.html"; 
    }


    // --- FUNCIONES Y EVENTOS DEL CARRITO MODIFICADOS ---

    function renderProducts() {
        if (!popularMenu) return; 
        
        popularMenu.innerHTML = '';
        PRODUCTS.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <img src="${product.img}" class="product-img" alt="${product.name}">
                <h4>${product.name}</h4>
                <p>$${product.price.toFixed(2)}</p>
                
                <div class="quantity-control-wrapper">
                    <input type="number" 
                           class="product-quantity-input" 
                           value="1" 
                           min="1" 
                           max="100" 
                           data-id="${product.id}">
                    <button class="btn btn-primary add-to-cart-btn" data-id="${product.id}">
                        <i class="fas fa-cart-plus"></i> Agregar
                    </button>
                </div>
            `;
            popularMenu.appendChild(productCard);
        });
    }

    function addToCart(productId, quantity) {
        if (!isUserLoggedIn()) {
            alert('🚨 Debes iniciar sesión para agregar productos al carrito.');
            redirigirLogin();
            return;
        }

        // Asegura que la cantidad es un número positivo
        quantity = parseInt(quantity);
        if (isNaN(quantity) || quantity < 1) {
            alert('La cantidad debe ser un número válido (mínimo 1).');
            return;
        }

        const product = PRODUCTS.find(p => p.id === productId);
        if (product) {
            const existingItem = cart.find(item => item.id === productId);

            if (existingItem) {
                existingItem.quantity += quantity; // Suma la cantidad seleccionada
            } else {
                cart.push({ ...product, quantity: quantity }); // Agrega con la cantidad seleccionada
            }

            updateCartUI();
            alert(`Se agregaron ${quantity} unidad(es) de "${product.name}" al carrito.`);
        }
    }

    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        updateCartUI();
    }
    
    function changeQuantity(productId, delta) {
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += delta;
            
            if (existingItem.quantity <= 0) {
                cart = cart.filter(item => item.id !== productId);
            }
            updateCartUI();
        }
    }

    function updateCartUI() {
        if (!cartItemsList) return; 
        
        cartItemsList.innerHTML = '';
        let total = 0;
        const cartIsNotEmpty = cart.length > 0;
        const userIsLoggedIn = isUserLoggedIn(); 

        if (cartIsNotEmpty) {
            emptyCartMessage.style.display = 'none';
            btnEmptyCart.disabled = false; 
            
            btnCheckout.disabled = !userIsLoggedIn; 
            if (!userIsLoggedIn) {
                btnCheckout.textContent = 'Pagar (Inicia sesión)';
            } else {
                btnCheckout.textContent = 'Pagar';
            }

            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;

                const cartItemDiv = document.createElement('div');
                cartItemDiv.className = 'cart-item';
                cartItemDiv.innerHTML = `
                    <div class="item-details">
                        <span>${item.name}</span>
                        <div class="item-quantity-control" data-id="${item.id}">
                            <button class="btn btn-secondary change-qty-btn" data-action="decrement" data-id="${item.id}">-</button>
                            <span class="qty-display">${item.quantity}</span>
                            <button class="btn btn-secondary change-qty-btn" data-action="increment" data-id="${item.id}">+</button>
                        </div>
                    </div>
                    <span>$${itemTotal.toFixed(2)}</span>
                    <button class="item-remove" data-id="${item.id}" title="Quitar">
                        <i class="fas fa-trash"></i>
                    </button>
                `;
                cartItemsList.appendChild(cartItemDiv);
            });
        } else {
            // Carrito vacío
            emptyCartMessage.style.display = 'block';
            btnCheckout.disabled = true;
            btnEmptyCart.disabled = true;
            btnCheckout.textContent = 'Pagar';
        }

        cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartTotalValue.textContent = `$${total.toFixed(2)}`;
    }

    function emptyCart() {
        if (confirm('¿Estás seguro que quieres vaciar el carrito?')) {
            cart = [];
            updateCartUI();
            alert('El carrito ha sido vaciado.');
        }
    }

    // ⭐ FUNCIÓN MODIFICADA: Ahora pide la selección entre Nequi o Efectivo
    function checkout() {
        if (!isUserLoggedIn()) {
            alert('🚨 Debes iniciar sesión para realizar el pago.');
            redirigirLogin();
            return;
        }
        
        // 1. Simulación de selección de método de pago
        const paymentMethod = prompt(
            `💵 Selecciona un método de pago para el total de ${cartTotalValue.textContent}:
            1. NEQUI
            2. EFECTIVO`
        );

        let paymentMessage = '';

        if (paymentMethod === '1') {
            paymentMessage = `¡Pago simulado exitoso vía NEQUI!\nTransferencia a la cuenta 300-123-4567.`;
        } else if (paymentMethod === '2') {
            paymentMessage = `¡Pago simulado exitoso con EFECTIVO!\nPaga ${cartTotalValue.textContent} al momento de la entrega.`;
        } else {
            alert('⚠️ Selección de pago no válida o cancelada. El pedido no fue procesado.');
            return; // Detiene el proceso si la selección es inválida
        }
        
        // 2. Proceso de finalización si el pago fue seleccionado correctamente
        alert(`${paymentMessage}\nGracias por tu compra.`);
        emptyCart(); // Vacía el carrito después del pago simulado
    }

    // --- LÓGICA DE LOGIN PARA login.html (GUARDA EL ESTADO DE SESIÓN) ---
    const loginForm = document.getElementById('login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault(); 
            
            localStorage.setItem('elmandado_session', 'true'); 
            
            alert('✅ Inicio de sesión exitoso. Redirigiendo al menú principal.');
            
            window.location.href = "elmandado.html"; 
        });
    }

    // --- INICIALIZACIÓN DE LA PÁGINA PRINCIPAL ---
    if(popularMenu) {
        updateHeaderButton(); 
        
        popularMenu.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-to-cart-btn')) {
                const btn = e.target;
                const productId = parseInt(btn.dataset.id);
                
                const card = btn.closest('.product-card');
                const quantityInput = card.querySelector(`.product-quantity-input[data-id="${productId}"]`);
                const quantity = quantityInput ? parseInt(quantityInput.value) : 1;
                
                addToCart(productId, quantity); 
                
                // Opcional: Reinicia el input a 1 después de agregar
                if(quantityInput) {
                    quantityInput.value = 1;
                }
            }
        });
        
        cartItemsList.addEventListener('click', (e) => {
            // Lógica para botón de basura (remover item completo)
            if (e.target.closest('.item-remove')) {
                const productId = parseInt(e.target.closest('.item-remove').dataset.id);
                removeFromCart(productId);
            }
            
            // Lógica para botones de cantidad (+ / -)
            const target = e.target.closest('.change-qty-btn');
            if (target) {
                const productId = parseInt(target.dataset.id);
                const action = target.dataset.action;
                
                if (action === 'increment') {
                    changeQuantity(productId, 1);
                } else if (action === 'decrement') {
                    changeQuantity(productId, -1);
                }
            }
        });
        
        btnEmptyCart.addEventListener('click', emptyCart);
        btnCheckout.addEventListener('click', checkout); 
        btnLoadOrders.addEventListener('click', () => {
             if (!isUserLoggedIn()) {
                 alert('🚨 Debes iniciar sesión para cargar tus pedidos.');
                 redirigirLogin();
                 return;
             }
             alert("Simulación: Solicitando datos de pedidos a GestorPedidos.");
        });

        renderProducts();
        updateCartUI(); 
    }

});