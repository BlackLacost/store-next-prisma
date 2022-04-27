import { Prisma, Product } from '@prisma/client'
import { slugify } from 'transliteration'
import { prisma } from '../../lib/prisma'

export const ProductsService = {
  async findAll(): Promise<Product[]> {
    return prisma.product.findMany()
  },

  async findProductBySlug(slug: string): Promise<Product | null> {
    return prisma.product.findUnique({ where: { slug } })
  },

  async create(productCreate: Prisma.ProductCreateInput): Promise<Product> {
    const product = await prisma.product.create({
      data: {
        ...productCreate,
        slug: slugify(productCreate.title),
      },
    })
    console.log(product)
    return product
  },

  update(
    id: number,
    productUpdate: Prisma.ProductUpdateInput,
  ): Promise<Product> {
    return prisma.product.update({
      where: { id },
      data: productUpdate,
    })
  },
}
