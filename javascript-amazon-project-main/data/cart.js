import { updateCartQuantity } from "../utils/updateQuantity.js";

export let cart = JSON.parse(localStorage.getItem("cart")) || [];
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
