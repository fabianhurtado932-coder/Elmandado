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
    const btnLogin = document.getElementById('btn-login'); // EL BOTÓN CLAVE
    const btnLoadOrders = document.getElementById('btn-load-orders');


    // --- FUNCIÓN UTILITARIA: VERIFICAR SESIÓN ---
    function isUserLoggedIn() {
        // Devuelve true si el valor en localStorage es 'true', false en caso contrario.
        return localStorage.getItem('elmandado_session') === 'true';
    }


    // --- FUNCIÓN: ACTUALIZAR EL BOTÓN DEL ENCABEZADO ---
    function updateHeaderButton() {
        if (btnLogin) {
            const userIsLoggedIn = isUserLoggedIn(); // Usa la función utilitaria

            if (userIsLoggedIn) {
                // Estado: Sesión Iniciada -> Muestra CERRAR SESIÓN
                btnLogin.textContent = 'Cerrar sesión';
                btnLogin.classList.remove('btn-secondary');
                btnLogin.classList.add('btn-danger'); // Color de peligro/salida
                
                // Limpia y asigna solo el listener de Cerrar Sesión
                btnLogin.removeEventListener('click', redirigirLogin); 
                btnLogin.addEventListener('click', logout);
            } else {
                // Estado: Sesión Cerrada -> Muestra INICIAR SESIÓN
                btnLogin.textContent = 'Iniciar sesión demo';
                btnLogin.classList.remove('btn-danger');
                btnLogin.classList.add('btn-secondary');
                
                // Limpia y asigna solo el listener de Iniciar Sesión
                btnLogin.removeEventListener('click', logout); 
                btnLogin.addEventListener('click', redirigirLogin);
            }
        }
    }

    // --- FUNCIÓN: CERRAR SESIÓN ---
    function logout() {
        if (confirm("¿Estás seguro que deseas cerrar la sesión?")) {
            // Borra el indicador de sesión
            localStorage.removeItem('elmandado_session'); 
            alert('Sesión cerrada.');
            updateHeaderButton(); // Actualiza la interfaz
            // Al cerrar sesión, el carrito se queda, pero las acciones se bloquean
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
                <button class="btn btn-primary add-to-cart-btn" data-id="${product.id}">
                    <i class="fas fa-cart-plus"></i> Agregar
                </button>
            `;
            popularMenu.appendChild(productCard);
        });
    }

    // ⭐ MODIFICACIÓN CLAVE: Bloquear addToCart si no hay sesión
    function addToCart(productId) {
        if (!isUserLoggedIn()) {
            alert('🚨 Debes iniciar sesión para agregar productos al carrito.');
            redirigirLogin();
            return;
        }

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

    function removeFromCart(productId) {
        // Permitimos quitar productos del carrito incluso sin iniciar sesión
        cart = cart.filter(item => item.id !== productId);
        updateCartUI();
    }

    function updateCartUI() {
        if (!cartItemsList) return; 
        
        cartItemsList.innerHTML = '';
        let total = 0;
        const cartIsNotEmpty = cart.length > 0;
        const userIsLoggedIn = isUserLoggedIn(); // Verifica el estado actual

        if (cartIsNotEmpty) {
            emptyCartMessage.style.display = 'none';
            btnEmptyCart.disabled = false; // El botón de Vaciar siempre está disponible si hay items.
            
            // ⭐ REGLA CLAVE: El botón de Pagar solo se habilita si hay items Y si el usuario está logueado.
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
                        <small>${item.quantity} x $${item.price.toFixed(2)}</small>
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

    // ⭐ MODIFICACIÓN CLAVE: Bloquear checkout si no hay sesión
    function checkout() {
        if (!isUserLoggedIn()) {
            alert('🚨 Debes iniciar sesión para realizar el pago.');
            redirigirLogin();
            return;
        }
        
        alert(`¡Pago simulado exitoso!\nTotal: ${cartTotalValue.textContent}\nGracias por tu compra.`);
        emptyCart();
    }

    // --- LÓGICA DE LOGIN PARA login.html (GUARDA EL ESTADO DE SESIÓN) ---
    const loginForm = document.getElementById('login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault(); 
            
            // ** SIMULACIÓN DE LOGIN EXITOSO: GUARDA EL ESTADO **
            localStorage.setItem('elmandado_session', 'true'); 
            
            alert('✅ Inicio de sesión exitoso. Redirigiendo al menú principal.');
            
            // Redirección a la página principal
            window.location.href = "elmandado.html"; 
        });
    }

    // --- INICIALIZACIÓN DE LA PÁGINA PRINCIPAL ---
    if(popularMenu) {
        // Inicializa el estado del botón de Iniciar/Cerrar Sesión
        updateHeaderButton(); 
        
        // Asigna el resto de los eventos del carrito
        popularMenu.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-to-cart-btn')) {
                const productId = parseInt(e.target.dataset.id);
                // Llamada a la función modificada
                addToCart(productId); 
            }
        });
        cartItemsList.addEventListener('click', (e) => {
            if (e.target.closest('.item-remove')) {
                const productId = parseInt(e.target.closest('.item-remove').dataset.id);
                removeFromCart(productId);
            }
        });
        btnEmptyCart.addEventListener('click', emptyCart);
        // Evento de Pagar llama a la función modificada
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
        updateCartUI(); // Se llama para inicializar el estado del botón Pagar
    }

}); // Fin del DOMContentLoaded
