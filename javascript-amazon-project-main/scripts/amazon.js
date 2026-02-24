import { products } from "../data/products.js";
import { savedCart, AddtoCart } from "../data/cart.js";
import updateCartQuantity from "../utils/updateQuantity.js";

let html = "";
products.forEach((product) => {
  html += ` <div id="${product.id}" class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${product.getStarURL()}">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            ${product.getPrice()}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector" data-product-quantity="${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          ${product.extraInfoHTML()}

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary 
          js-add-to-cart" 
          data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>`;
});
document.querySelector(".products-grid").innerHTML = html;
document.querySelector(".cart-quantity").innerHTML = updateCartQuantity() || '';

function displayAddMessage(time, button) {
  const addMessage = button
    .closest(".product-container")
    .querySelector(".added-to-cart");
  clearTimeout(time);

  addMessage.classList.add("add-msg");
  time = setTimeout(() => {
    addMessage.classList.remove("add-msg");
  }, 2000);
}
document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  let time;
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;
    const select = document.querySelector(
      `.js-quantity-selector[data-product-quantity="${productId}"]`,
    );
    const selectedQuantity = parseInt(select.value);

    AddtoCart(productId, selectedQuantity);
    document.querySelector(".cart-quantity").innerHTML = updateCartQuantity() || '';
    // display added message
    displayAddMessage(time, button);
  });
});
