import {
  cart,
  removeFromCart,
  savedCart,
  updateDeliveryOption,
} from "../data/cart.js";
import { products } from "../data/products.js";
import calculateCents from "../utils/money.js";
import updateCartQuantity from "../utils/updateQuantity.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
// this import is ESCM mode
import { deliveryOptions } from "../data/deliveryOprions.js";

// const today = dayjs();
// const deliveryDate = today.add(7, "days");

// console.log(deliveryDate.format("dddd, MMMM, D"));

function renderOrderSummary() {
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
    const deliveryOptionId = cartItem.deliveryOptionId;
    let deliveryOption;

    deliveryOptions.forEach((option) => {
      if (deliveryOptionId === option.id) {
        deliveryOption = option;
      }
    });
    const today = dayjs();
    const deliveryAdd = today.add(deliveryOption.deliveryDays, "days");
    const dateString = deliveryAdd.format("dddd, MMMM, D");

    checkoutHTML += `
  <div class="cart-item-container js-cart-item-container-${matchItem.id}">
            <div class="delivery-date">
              Delivery date: ${dateString}
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
                ${deliveryOptionHTML(matchItem, cartItem)}
                
              </div>
            </div>
          </div>
 `;
  });

  document.querySelector(".order-summary").innerHTML = checkoutHTML;

  function deliveryOptionHTML(matchItem, cartItem) {
    let html = "";

    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryAdd = today.add(deliveryOption.deliveryDays, "days");
      const dateString = deliveryAdd.format("dddd, MMMM, D");

      const priceString =
        deliveryOptions.priceCents === 0
          ? "Free"
          : `$${calculateCents(deliveryOption.priceCents)} - Shipping`;

      const isChecked = cartItem.deliveryOptionId === deliveryOption.id;

      html += `<div class="delivery-option js-delivery-option"
    data-product-id="${matchItem.id}"
    data-delivery-option-id="${deliveryOption.id}"
    >
        <input type="radio" ${isChecked ? "checked" : ""}
          class="delivery-option-input"
          name="delivery-option-${matchItem.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString}
          </div>
        </div>
      </div>`;
    });
    return html;
  }

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
    });
  });

  document.querySelector(".js-items").innerHTML =
    `${updateCartQuantity()} items`;

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
}
renderOrderSummary();