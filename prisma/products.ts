import faker from '@faker-js/faker'
import { Product } from '@prisma/client'
import { slugify } from 'transliteration'

export function genProducts(
  count: number,
): Omit<Product, 'id' | 'categoryId'>[] {
  const products = [...Array(count)].map(() => {
    const title = faker.commerce.productName()
    const slug = slugify(title)
    return {
      title,
      slug,
      price: Number(faker.commerce.price()),
      image: faker.image.technics(300, 300, true),
    }
  })
  return products
}
