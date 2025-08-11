const products = [
  {id:1,name:'Labial Rojo',category:'labios',price:25000,img:'img/product1.jpg'},
  {id:2,name:'Sombras Nude',category:'ojos',price:40000,img:'img/product2.jpg'},
  {id:3,name:'Rubor Rosado',category:'rostro',price:30000,img:'img/product3.jpg'},
  {id:4,name:'Brocha Kabuki',category:'accesorios',price:15000,img:'img/product4.jpg'},
  {id:5,name:'Labial Mate',category:'labios',price:28000,img:'img/product5.jpg'},
  {id:6,name:'Delineador Negro',category:'ojos',price:20000,img:'img/product6.jpg'}
];

const offers = [1,5,3,2];

let cart = JSON.parse(localStorage.getItem('bm_cart')) || [];

function renderProducts(list = products){
  const container = document.getElementById('products');
  container.innerHTML = '';
  list.forEach(p=>{
    const el = document.createElement('article');
    el.className = 'product';
    el.innerHTML = `<img src="${p.img}" alt="${p.name}"><h4>${p.name}</h4><div class="p-meta"><strong>$${p.price.toLocaleString()}</strong><button class="add-btn" data-id="${p.id}">Agregar</button></div>`;
    container.appendChild(el);
  });
}

function renderOffers(){
  const row = document.getElementById('offersRow');
  row.innerHTML = '';
  offers.forEach(id=>{
    const p = products.find(x=>x.id===id);
    const el = document.createElement('div');
    el.className = 'offer-card';
    el.innerHTML = `<img src="${p.img}" alt=""><h4>${p.name}</h4><p>$${p.price.toLocaleString()}</p>`;
    row.appendChild(el);
  });
}

function updateCartCount(){ document.getElementById('cartCount').innerText = cart.length; }

document.addEventListener('click', (e)=>{
  if(e.target.matches('.add-btn')){
    const id = Number(e.target.dataset.id);
    const p = products.find(x=>x.id===id);
    cart.push(p);
    localStorage.setItem('bm_cart', JSON.stringify(cart));
    updateCartCount();
    alert('Producto agregado al carrito');
  }
});

// categories
document.querySelectorAll('#categoryMenu li').forEach(li=>{
  li.addEventListener('click', ()=>{
    document.querySelectorAll('#categoryMenu li').forEach(i=>i.classList.remove('active'));
    li.classList.add('active');
    const cat = li.dataset.cat;
    if(cat==='all') renderProducts();
    else renderProducts(products.filter(p=>p.category===cat));
  });
});

// search
document.getElementById('search').addEventListener('input', (e)=>{
  const q = e.target.value.toLowerCase();
  renderProducts(products.filter(p=>p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)));
});

// cart modal behaviour
const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');

cartBtn.addEventListener('click', ()=>{
  cartItems.innerHTML = '';
  let total = 0;
  cart.forEach((it, idx)=>{ total += it.price; cartItems.innerHTML += `<li>${it.name} - $${it.price.toLocaleString()} <button data-idx="${idx}" class="remove">Eliminar</button></li>` });
  cartTotal.innerText = `$${total.toLocaleString()}`;
  cartModal.style.display = 'flex';
});

closeCart.addEventListener('click', ()=> cartModal.style.display = 'none');

document.addEventListener('click', e=>{
  if(e.target.matches('.remove')){
    const i = Number(e.target.dataset.idx);
    cart.splice(i,1);
    localStorage.setItem('bm_cart', JSON.stringify(cart));
    updateCartCount();
    e.target.closest('li').remove();
  }
});

// checkout
document.getElementById('checkout').addEventListener('click', ()=>{
  if(cart.length===0){ alert('Carrito vacío'); return; }
  const summary = cart.map(it=>`${it.name} - $${it.price}`).join('%0D%0A');
  const total = cart.reduce((s,i)=>s+i.price,0);
  const body = `${summary}%0D%0ATotal: $${total}`;
  window.location.href = `mailto:bluemakeup22@gmail.com?subject=Pedido%20Blue%20Makeup&body=${body}`;
});

// init
renderProducts();
renderOffers();
updateCartCount();
