import { Product } from '@prisma/client'
import { AxiosResponse } from 'axios'
import { instance } from '../../api/axios'
import { ProductCreate } from './product.schemas'

const prefix = 'products'

export const ProductsAPI = {
  create(data: ProductCreate): Promise<AxiosResponse<{ result: Product }>> {
    return instance.post(`${prefix}/`, data)
  },
}
