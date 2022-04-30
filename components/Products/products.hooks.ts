import { useQuery } from 'react-query'
import { reactQueryOptions } from '../../utils/reactQueryOptions'
import { ProductsAPI } from './products.api'

export const useGetCategories = () =>
  useQuery('categories', ProductsAPI.getCategories, {
    ...reactQueryOptions,
  })

export const useGetProductsByCategorySlug = (categorySlug: string) =>
  useQuery(
    ['products', categorySlug],
    () => ProductsAPI.getProductsByCategorySlug(categorySlug),
    {
      ...reactQueryOptions,
      enabled: categorySlug ? true : false,
    },
  )

export const useGetProductBySlug = (slug: string) =>
  useQuery(['product', slug], () => ProductsAPI.getProductBySlug(slug), {
    ...reactQueryOptions,
    enabled: slug ? true : false,
  })
