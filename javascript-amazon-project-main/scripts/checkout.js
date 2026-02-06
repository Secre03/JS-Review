import { cart, removeFromCart, savedCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { calculateCents } from "../utils/money.js";
import { updateCartQuantity } from "../utils/updateQuantity.js";

function renderCartQuantity() {
  updateCartQuantity() || "";
}

renderCartQuantity();

let checkoutHTML = "";

cart.forEach((cartItem) => {
  const productId = cartItem.productId;
  let matchItem;
  products.forEach((product) => {
    if (product.id === productId) {
      matchItem = product;
    }
  });

  if (!matchItem) {
    return;
  }
  checkoutHTML += `
  <div class="cart-item-container js-cart-item-container-${matchItem.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchItem.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchItem.name}
                </div>
                <div class="product-price">
                  $${calculateCents(matchItem.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-link" data-product-id="${cartItem.productId}">
                    Update
                  </span>
                  <input class="quantity-input js-quantity-input-${cartItem.productId}" type="number" min="0"> 
                  <span class="save-quantity link-primary js-saved-link" data-product-id="${cartItem.productId}">Save</span>
                  
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${cartItem.productId}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${matchItem.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchItem.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchItem.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
 `;
});
document.querySelector(".order-summary").innerHTML = checkoutHTML;
document.querySelector(".js-items").innerHTML = `${updateCartQuantity()} items`;

document.querySelectorAll(".js-delete-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;
    removeFromCart(productId);
    const container = document.querySelector(
      `.js-cart-item-container-${productId}`,
    );
    container.remove();
    document.querySelector(".js-items").innerHTML =
      `${updateCartQuantity()} items`;
  });
});

document.querySelectorAll(".js-update-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;
    const container = document.querySelector(
      `.js-cart-item-container-${productId}`,
    );
    container.classList.add("is-editing-quantity");
  });
});

document.querySelectorAll(".js-saved-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;
    const container = document.querySelector(
      `.js-cart-item-container-${productId}`,
    );
    container.classList.remove("is-editing-quantity");
    const input = document.querySelector(`.js-quantity-input-${productId}`);
    let newVal = parseInt(input.value);

    for (let i = 0; i < cart.length; i++) {
      const cartItem = cart[i];
      if (!cartItem) return;
      if (cartItem.productId !== productId) continue;

      if (newVal <= 0) {
        const confirmation = confirm(
          "If the quantity is 0 the item will be deleted are you sure you want to remove this item?",
        );
        if (confirmation) {
          removeFromCart(productId);
          container.remove();
        } else {
          input.value = cartItem.quantity;
        }
      } else {
        cartItem.quantity = newVal;
        container.querySelector(".quantity-label").innerHTML = newVal;
      }
      break;
    }
    savedCart();
    renderCartQuantity();
    document.querySelector(".js-items").innerHTML =
      `${updateCartQuantity()} items`;
  });
});
