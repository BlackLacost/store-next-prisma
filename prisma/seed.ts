import { prisma } from '../lib/prisma'
import { genProducts } from './products'

const productsCount = 10

const load = async () => {
  try {
    await prisma.product.deleteMany()
    console.log('Delete all products')

    await prisma.$queryRaw`ALTER TABLE Product AUTO_INCREMENT = 1`

    await prisma.product.createMany({
      data: genProducts(productsCount),
    })
    console.log(`Generated ${productsCount} products`)
  } catch (e) {
    console.error(e)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}
load()
