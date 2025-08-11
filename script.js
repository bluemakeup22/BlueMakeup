const products = [
    {id: 1, name: "Labial Mate", price: 25000, img: "https://via.placeholder.com/200x150.png?text=Labial+Mate"},
    {id: 2, name: "Rubor en Crema", price: 30000, img: "https://via.placeholder.com/200x150.png?text=Rubor+Crema"},
    {id: 3, name: "Base Líquida", price: 45000, img: "https://via.placeholder.com/200x150.png?text=Base+Liquida"},
    {id: 4, name: "Sombras 12 Colores", price: 60000, img: "https://via.placeholder.com/200x150.png?text=Sombras+12"},
    {id: 5, name: "Delineador Líquido", price: 20000, img: "https://via.placeholder.com/200x150.png?text=Delineador"},
    {id: 6, name: "Máscara de Pestañas", price: 28000, img: "https://via.placeholder.com/200x150.png?text=Mascara"}
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderProducts() {
    const container = document.getElementById("products");
    container.innerHTML = products.map(p => `
        <div class="product">
            <img src="${p.img}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p>$${p.price.toLocaleString()}</p>
            <button onclick="addToCart(${p.id})">Agregar al carrito</button>
        </div>
    `).join("");
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    renderCart();
}

function updateCartCount() {
    document.getElementById("cart-count").innerText = cart.length;
}

function renderCart() {
    const cartItems = document.getElementById("cart-items");
    const total = cart.reduce((sum, p) => sum + p.price, 0);
    cartItems.innerHTML = cart.map(p => `<li>${p.name} - $${p.price.toLocaleString()}</li>`).join("");
    document.getElementById("cart-total").innerText = total.toLocaleString();
}

function toggleCart() {
    document.getElementById("cart").classList.toggle("show");
}

function checkout() {
    const total = cart.reduce((sum, p) => sum + p.price, 0);
    const body = cart.map(p => `${p.name} - $${p.price}`).join("%0A") + `%0A%0ATotal: $${total}`;
    window.location.href = `mailto:bluemakeup22@gmail.com?subject=Pedido%20Blue%20Makeup&body=${body}`;
}

renderProducts();
updateCartCount();
renderCart();
