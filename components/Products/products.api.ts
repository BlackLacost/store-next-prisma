import { Product } from '@prisma/client'
import { instance } from '../../api/axios'
import { ProductCreate } from './create-product.schema'

const prefix = 'products'

export const ProductsAPI = {
  create(data: ProductCreate): Promise<Product> {
    return instance.post(`${prefix}/`, data)
  },
}
