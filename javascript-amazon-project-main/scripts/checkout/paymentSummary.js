import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOprions.js";
import calculateCents from "../../utils/money.js";
import updateCartQuantity from "../../utils/updateQuantity.js";

export function renderPaymentSummary(){
  
  let productPriceCents = 0;
  let totalShipping = 0;
  
  cart.forEach(cartItem => {
    const product= getProduct(cartItem.productId);
    productPriceCents = product.priceCents *  cartItem.quantity;

    const deliveryFee = getDeliveryOption(cartItem.deliveryOptionId);
    totalShipping += deliveryFee.priceCents;
    
  })
  const totalBeforeTax = productPriceCents + totalShipping;
  const taxCents = totalBeforeTax * 0.1;
  const totalCents = totalBeforeTax + taxCents;
  const paymentSummaryHTML = `<div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${updateCartQuantity()}):</div>
            <div class="payment-summary-money">$${calculateCents(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${calculateCents(totalShipping)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${calculateCents(totalBeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${calculateCents(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${calculateCents(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>`;

          document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
}

renderPaymentSummary();