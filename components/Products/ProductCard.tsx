import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export type ProductCardProps = {
  product: {
    title: string
    slug: string
    price: number
    image: string
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <li className="p-4">
      <Link href={`/product/${product.slug}`} passHref>
        <a>
          <h2 className="text-3xl font-semibold">{product.title}</h2>
        </a>
      </Link>
      <Image src={product.image} alt={product.title} width={300} height={300} />
      <p>Цена: {product.price} руб.</p>
    </li>
  )
}
