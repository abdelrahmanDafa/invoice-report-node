const { genRandomNumber } = require("../utils/genRandom")


const findOneOrder = (id)=>{
    // dummy 
    let order = {products:[]}

        order.products = products
  
    return order
}

const products = [
    {
      "id": 1,
      "description": "browser",
      "quantity": 2,
      "price": 10,
      "tax-rate": 0,
    },
    {
      "id": 2,
      "quantity": 4,
      "description": "filename",
      "price": 5,
      "tax-rate": 0,
    },
    {
      "id": 3,
      "quantity": 1,
      "description": "1111",
      "price": 20,
      "tax-rate": 0,
    }
]
module.exports = {
    findOneOrder
}

