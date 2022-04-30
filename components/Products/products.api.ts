import { Product } from '@prisma/client'
import { instance } from '../../utils/axios'
import { ProductCreate } from './product.schemas'
import { ProductWithCategory } from './products.service'

const prefix = 'products'

export const ProductsAPI = {
  async create(data: ProductCreate): Promise<Product> {
    const response = await instance.post<Product>(`${prefix}/`, data)
    return response.data
  },

  async getProductsByCategorySlug(
    categorySlug: string,
  ): Promise<ProductWithCategory[]> {
    const response = await instance.get<{ items: ProductWithCategory[] }>(
      `category/${categorySlug}/`,
    )
    return response.data.items
  },

  async getProductBySlug(slug: string): Promise<Product> {
    const response = await instance.get<Product>(`${prefix}/${slug}/`)
    return response.data
  },
}
