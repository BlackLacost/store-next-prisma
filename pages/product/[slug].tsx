import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { ProductsAPI } from '../../components/Products/products.api'

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const slug = query.slug as string
  const product = await ProductsAPI.getProductBySlug(slug)
  return { props: { product } }
}

type ProductProps = {
  product: {
    id: number
    title: string
    slug: string
    price: number
    image: string
  }
}

const ProductPage: NextPage<ProductProps> = (props) => {
  const { product } = props

  return (
    <div>
      <Head>
        <title>Интерент магазин</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta name="description" content="Интернет магазин для портфолио" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto">
        <h1 className="text-3xl font-semibold">{product.title}</h1>
        <Image
          src={product.image}
          alt={product.title}
          width={300}
          height={300}
        />
        <p>Цена: {product.price} руб.</p>
      </main>
    </div>
  )
}

export default ProductPage
