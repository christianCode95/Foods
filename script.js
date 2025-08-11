const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const toggleTheme = document.getElementById("toggleTheme");
const cart = document.getElementById('cart');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');

// Pegamos todos os itens clicáveis (comidas chinesas, bebidas e sobremesas)
const items = document.querySelectorAll('.cardapio-section .item');

let cartData = [];

// Função para formatar preço
function formatPrice(price) {
  return 'R$ ' + price.toFixed(2).replace('.', ',');
}

// Atualiza a lista e total do carrinho
function updateCart() {
  cartItems.innerHTML = '';

  let total = 0;
  cartData.forEach(({name, price}, index) => {
    total += price;

    // Item no carrinho com nome e preço
    const li = document.createElement('li');
    li.textContent = name;

    const span = document.createElement('span');
    span.textContent = formatPrice(price);

    // Para organizar nome e preço no li
    li.appendChild(span);
    cartItems.appendChild(li);
  });

  cartTotal.textContent = 'Total: ' + formatPrice(total);

  // Mostrar ou esconder carrinho dependendo se tem itens
  cart.style.display = cartData.length ? 'block' : 'none';
}

// Ao clicar em um item, adiciona no carrinho
items.forEach(item => {
  item.style.cursor = 'pointer';

  item.addEventListener('click', () => {
    const name = item.querySelector('h3').textContent;
    // Pega o preço no span e converte para número
    const priceStr = item.querySelector('span').textContent;
    const price = parseFloat(priceStr.replace('R$', '').replace(',', '.'));

    // Adiciona ao array
    cartData.push({name, price});
    updateCart();
  });
});

// Botão finalizar pedido
checkoutBtn.addEventListener('click', () => {
  if(cartData.length === 0) {
    alert('Seu carrinho está vazio!');
    return;
  }

  alert(`Você comprou ${cartData.length} item(s) por ${cartTotal.textContent.split(': ')[1]}!`);
  
  // Limpa carrinho
  cartData = [];
  updateCart();
});


menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

toggleTheme.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggleTheme.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});
