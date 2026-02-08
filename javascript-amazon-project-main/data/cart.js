import updateCartQuantity from "../utils/updateQuantity.js";
import { deliveryOptions } from "./deliveryOprions.js";
import { products } from "./products.js";

export let cart = JSON.parse(localStorage.getItem("cart"));

if(!cart){
  cart = [
    {
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId: '1'
    },{
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
      deliveryOptionId: '2'
    }
  ]
};


export const savedCart = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

export function AddtoCart(selectedQuantity, productId) {
  let matchItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchItem = cartItem;
    }
  });

  if (matchItem) {
    matchItem.quantity += selectedQuantity;
  } else {
    cart.push({
      productId: productId,
      quantity: selectedQuantity,
      deliveryOptionId: '1'
    });
  }

  savedCart();
  updateCartQuantity();
}

export function removeFromCart(productId) {
  const newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });
  cart = newCart;

  savedCart();
  updateCartQuantity();
}
export function updateDeliveryOption(productId, deliveryOptionId){
  let matchItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchItem = cartItem;
    }
  });
  matchItem.deliveryOptionId = deliveryOptionId;

  savedCart();
}