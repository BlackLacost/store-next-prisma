import React from 'react'
import ProductCard from './ProductCard'

type ProductListProps = {
  products: {
    id: number
    title: string
    slug: string
    price: number
    image: string
  }[]
}

export default function ProductList({ products }: ProductListProps) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </ul>
  )
}
