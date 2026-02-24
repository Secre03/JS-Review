 import calculateCents from "../utils/money.js";
 class Product {
    name;
    priceCents;
    constructor(productDertails){
      this.name = productDertails.name;
      this.priceCents = productDertails.priceCents
    }
    getPrice(){
      return `$${calculateCents(this.priceCents)}`;
    }
  }
describe('test suite: Product', () => {
 
  it('has correct properties and methods', () => {
    const product = new Product({
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    image: "images/products/athletic-cotton-socks-6-pairs.jpg",
    name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
    rating: {
      stars: 4.5,
      count: 87
    },
    priceCents: 1090,
    keywords: [
      "socks",
      "sports",
      "apparel"
    ]
    })

    expect(product.name).toEqual('Black and Gray Athletic Cotton Socks - 6 Pairs');
    expect(product.getPrice()).toEqual('$10.90');
  })
})