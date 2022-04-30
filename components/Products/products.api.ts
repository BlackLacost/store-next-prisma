import { Category, Product } from '@prisma/client'
import { instance } from '../../utils/axios'
import { ProductCreate } from './product.schemas'
import { ProductWithCategory } from './products.service'

const PRODUCTS = 'products'
const CATEGORIES = 'categories'

export const ProductsAPI = {
  async create(data: ProductCreate): Promise<Product> {
    const response = await instance.post<Product>(`${PRODUCTS}/`, data)
    return response.data
  },

  async getProductsByCategorySlug(
    categorySlug: string,
  ): Promise<ProductWithCategory[]> {
    const response = await instance.get<{ items: ProductWithCategory[] }>(
      `${CATEGORIES}/${categorySlug}/`,
    )
    return response.data.items
  },

  async getProductBySlug(slug: string): Promise<Product> {
    const response = await instance.get<Product>(`${PRODUCTS}/${slug}/`)
    return response.data
  },

  async getCategories(): Promise<Category[]> {
    const response = await instance.get<Category[]>(`${CATEGORIES}/`)
    return response.data
  },
}
