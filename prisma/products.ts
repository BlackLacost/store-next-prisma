import faker from '@faker-js/faker'
import { Product } from '@prisma/client'

export function genProducts(
  count: number,
): Omit<Product, 'id' | 'categoryId'>[] {
  const products = [...Array(count)].map(() => ({
    title: faker.commerce.productName(),
    price: Number(faker.commerce.price()),
    image: faker.image.technics(300, 300, true),
  }))
  return products
}
