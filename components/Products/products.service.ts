import { Product } from '@prisma/client'
import { prisma } from '../../lib/prisma'

export const ProductsService = {
  async findAll(): Promise<Product[]> {
    return prisma.product.findMany()
  },
}
