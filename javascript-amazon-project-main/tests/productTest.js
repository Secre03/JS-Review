import { Product, Clothing, Appliance } from "../data/products.js";
import { Cart } from "../data/cart-class.js";
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
    console.log(product.getPrice())

    expect(product.name).toEqual('Black and Gray Athletic Cotton Socks - 6 Pairs');
    expect(product.getPrice()).toEqual('$10.90');
    expect(product.extraInfoHTML()).toBe('');
  })

  it('has correct properties and methods in clothing', () => {
    const product = new Clothing({
     id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
    image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
    name: "Adults Plain Cotton T-Shirt - 2 Pack",
    rating: {
      stars: 4.5,
      count: 56
    },
    priceCents: 799,
    keywords: [
      "tshirts",
      "apparel",
      "mens"
    ],
    type: "clothing",
    sizeChartLink: "images/clothing-size-chart.png"
    })
    console.log(product.getPrice());

    expect(product.name).toEqual('Black and Gray Athletic Cotton Socks - 6 Pairs');
    expect(product.getPrice()).toEqual('$10.90');
    expect(product.extraInfoHTML()).toContain('images/clothing-size-chart.png');
  })

  
})


 
  



  