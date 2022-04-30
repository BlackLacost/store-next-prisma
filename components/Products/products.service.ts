import { Category, Prisma, Product } from '@prisma/client'
import { prisma } from '../../lib/prisma'

const productWithCategory = Prisma.validator<Prisma.ProductArgs>()({
  include: { category: { select: { id: true, slug: true } } },
})

export type ProductWithCategory = Prisma.ProductGetPayload<
  typeof productWithCategory
>

export const ProductsService = {
  findAll(categorySlug?: string): Promise<ProductWithCategory[]> {
    return prisma.product.findMany({
      where: { category: { slug: categorySlug } },
      include: { category: { select: { id: true, slug: true } } },
    })
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

  findAllCategories(): Promise<Category[]> {
    return prisma.category.findMany()
  },
}
