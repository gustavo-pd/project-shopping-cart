const getTotalPrice = document.querySelector('.total-price');
const getEmptyButton = document.getElementsByClassName('empty-cart')[0];
const getCart = document.querySelector('.cart__items');
const removeLoadMsg = document.querySelector('.loading');
let summValue = 0;

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

function summValorCart(itemPrice) {
  summValue += itemPrice;
  const summValueCor = parseFloat(summValue.toFixed(2));
  const summValue2 = Math.abs(summValueCor);
  getTotalPrice.innerHTML = summValue2;
}

function cartItemClickListener(event) {
  const textItem = event.target.innerHTML;
  const index = textItem.indexOf('$');
  const removePrice = textItem.slice(index + 1);
  summValorCart(-parseFloat(removePrice));
  event.target.remove();
}

function createCartItemElement(sku, name, salePrice) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

getEmptyButton.addEventListener('click', () => {
  getCart.innerHTML = '';
  getTotalPrice.innerHTML = 0;
  summValue = 0;
});

const addToCart = async (ItemID) => {
  const itemCart = await fetch(`https://api.mercadolibre.com/items/${ItemID}`);
  const itemCartJson = await itemCart.json();
  const getCartLocal = document.querySelector('.cart__items');
    getCartLocal.appendChild(createCartItemElement(
      itemCartJson.id, itemCartJson.title, itemCartJson.price,
      ));
  summValorCart(itemCartJson.price);
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
  removeLoadMsg.remove();
};

window.onload = () => {
  createListML('computador');
};

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}
