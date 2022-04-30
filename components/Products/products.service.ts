import { Prisma, Product } from '@prisma/client'
import { prisma } from '../../lib/prisma'

export const ProductsService = {
  findAll(): Promise<Product[]> {
    return prisma.product.findMany()
  },

  findProductBySlug(slug: string): Promise<Product | null> {
    return prisma.product.findUnique({ where: { slug } })
  },

  create(productCreate: Prisma.ProductCreateInput): Promise<Product> {
    return prisma.product.create({ data: { ...productCreate } })
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
