import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { prisma } from '../../lib/prisma'

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { slug } = query
  try {
    const products = await prisma.product.findMany({
      where: {
        category: {
          slug: slug as string,
        },
      },
    })
    return {
      props: { products },
    }
  } catch (e: any) {
    console.log(e)
    throw new Error(e)
  }
}

type CategoryProps = {
  products: {
    id: number
    title: string
    price: number
    image: string
  }[]
}

const CategoryPage: NextPage<CategoryProps> = (props) => {
  const { products } = props
  return (
    <div>
      <Head>
        <title>Интерент магазин</title>
        <meta name="description" content="Интернет магазин для портфолио" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <li className="p-4" key={product.id}>
              <h2 className="text-3xl font-semibold">{product.title}</h2>
              <Image
                src={product.image}
                alt={product.title}
                width={300}
                height={300}
              />
              <p>Цена: {product.price} руб.</p>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}

export default CategoryPage
