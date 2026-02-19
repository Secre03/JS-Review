import updateCartQuantity from "../utils/updateQuantity.js";

function Cart(localStorageKey) {
  const cart = {
    cartItems: undefined,

    loadStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));

      if (!this.cartItems) {
        this.cartItems = [
          {
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 2,
            deliveryOptionId: "1",
          },
          {
            productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity: 1,
            deliveryOptionId: "2",
          },
        ];
      }
    },

    savedCart() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },

    AddtoCart(productId, selectedQuantity) {
      let matchItem;

      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchItem = cartItem;
        }
      });

      if (matchItem) {
        matchItem.quantity += selectedQuantity;
      } else {
        this.cartItems.push({
          productId: productId,
          quantity: selectedQuantity,
          deliveryOptionId: "1",
        });
      }

      this.savedCart();
      updateCartQuantity();
    },
    removeFromCart(productId) {
      const newCart = [];
      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
          newCart.push(cartItem);
        }
      });
      this.cartItems = newCart;

      this.savedCart();
      updateCartQuantity();
    },

    updateDeliveryOption(productId, deliveryOptionId) {
      let matchItem;
      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchItem = cartItem;
        }
      });
      matchItem.deliveryOptionId = deliveryOptionId;

      this.savedCart();
    },
  };

  return cart;
}

//instead of copy pasting the object and create a new one use function and pass it on the variable this will make a code more cleaner
const cart = Cart("cart-oop");
const businessCart = Cart("business-cart");

cart.loadStorage();
businessCart.loadStorage();

console.log(cart);
console.log(businessCart);
