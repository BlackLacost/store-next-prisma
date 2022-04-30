import { useRouter } from 'next/router'
import React from 'react'
import ProductCard from './ProductCard'
import { useGetProductsByCategorySlug } from './products.hooks'

export default function ProductList() {
  const { query } = useRouter()
  const productsQuery = useGetProductsByCategorySlug(query.slug as string)
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {productsQuery.isLoading ? (
        'Loading...'
      ) : (
        <>
          {productsQuery.isFetching ? (
            <p className="col-span-full">Fetching...</p>
          ) : null}
          {productsQuery.data?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </>
      )}
    </ul>
  )
}
