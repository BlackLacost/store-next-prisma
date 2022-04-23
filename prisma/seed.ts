import faker from '@faker-js/faker'
import { slugify } from 'transliteration'
import { prisma } from '../lib/prisma'
import { categories } from './categories'
import { genProducts } from './products'

const productsCount = 12

const load = async () => {
  try {
    await prisma.product.deleteMany()
    console.log('Delete all products')
    await prisma.category.deleteMany()
    console.log('Delete all categories')

    await prisma.$queryRaw`ALTER TABLE Product AUTO_INCREMENT = 1`
    await prisma.$queryRaw`ALTER TABLE Category AUTO_INCREMENT = 1`

    Promise.all(
      categories.map((category) => {
        return prisma.category.create({
          data: {
            title: category.title,
            slug: slugify(category.title),
            image: faker.image.technics(200, 200, true),
            products: {
              createMany: {
                data: genProducts(productsCount),
                skipDuplicates: true,
              },
            },
          },
        })
      }),
    )
    console.log(
      `Generated ${categories.length} categories with ${productsCount} products`,
    )
  } catch (e) {
    console.error(e)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}
load()
