import updateCartQuantity from "../utils/updateQuantity.js";

//class is a better way to generate an objects in OOP

export class Cart {
   cartItems;
   #localStorageKey; // if the property have hash on the beginning its called private property it can only be access
   //inside the class

   //everytime we generate an objects constructor will run so all the setup code we created will be put inside the constructor
   constructor(localStorageKey){
      this.#localStorageKey = localStorageKey;
      this.#loadStorage();
   }

    #loadStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));

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
    }

    savedCart() {
      localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    }

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
    }

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
    }

    updateDeliveryOption(productId, deliveryOptionId) {
      let matchItem;
      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchItem = cartItem;
        }
      });
      matchItem.deliveryOptionId = deliveryOptionId;

      this.savedCart();
    }

}


const cart = new Cart('cart-oop');
const businessCart = new Cart('business-cart');
// cart.#localStorageKey = 'asd'; if we change the property of a private it will result an error



console.log(cart);
console.log(businessCart);

console.log(businessCart instanceof Cart); // check if the businesssCart is instance of Cart class

