import { describe, it, expect } from '@jest/globals'
import { Product, batchProducts } from '../../../lib/batchProducts'

describe('batch products function', () => {
  it('should return 2 batchs of products with max 10 products each batch by default', async () => {
    const products = Array.from({ length: 15 }, (_, index) => ({ [index]: index })) as Product[]
    const result = batchProducts(products)

    // Batch with 10 items, stringified to compare
    const productsToCompare = JSON.stringify(products.slice(0, 10))
    expect(result.length).toEqual(2)
    expect(result[0]).toEqual(productsToCompare)
  })

  it('should return a batch of products with the quantity passed in argument', async () => {
    const quantityParam = 15
    const products = Array.from({ length: 22 }, (_, index) => ({ [index]: index })) as Product[]
    const result = batchProducts(products, quantityParam)

    console.log('result: ', result)
    // Batch with 15 items, stringified to compare
    const productsToCompare = JSON.stringify(products.slice(0, quantityParam))
    expect(result.length).toEqual(2)
    expect(result[0]).toEqual(productsToCompare)
  })
})
