import { cart } from "../data/cart.js";

function updateCartQuantity(){
   let totalQuantity = 0;
    cart.forEach((cartItem) => {
      totalQuantity += cartItem.quantity;
    });
    return totalQuantity
}
export default updateCartQuantity;