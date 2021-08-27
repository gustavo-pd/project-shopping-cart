function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function cartItemClickListener(event) {
  event.target.remove();
}

function createCartItemElement(sku, name, salePrice) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const getEmptyButton = document.getElementsByClassName('empty-cart')[0];
const getCart = document.querySelector('.cart__items');
const getLi = document.querySelectorAll('cart__item');

getEmptyButton.addEventListener('click', () => {
  getCart.innerHTML = '';
});

const addToCart = async (ItemID) => {
  const itemCart = await fetch(`https://api.mercadolibre.com/items/${ItemID}`);
  const itemCartJson = await itemCart.json();
  const getCartLocal = document.querySelector('.cart__items');
    getCartLocal.appendChild(createCartItemElement(
      itemCartJson.id, itemCartJson.title, itemCartJson.price,
      ));
};

function createProductItemElement(sku, name, image) {
  const section = document.createElement('section');
  const getSectionList = document.querySelector('.items');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const buttonToCart = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  buttonToCart.addEventListener('click', () => addToCart(sku));
  section.appendChild(buttonToCart);
  getSectionList.appendChild(section);
  return getSectionList;
}

const createListML = async (toSearch) => {
  const productList = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${toSearch}`);
  const productListJson = await productList.json();
    productListJson.results.forEach((product) => {
      createProductItemElement(product.id, product.title, product.thumbnail);
    });
};

window.onload = () => {
  createListML('computador');
};

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}
