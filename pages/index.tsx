import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { ProductsService } from '../components/Products/products.service'

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const products = await ProductsService.findAll()
    return {
      props: { products },
    }
  } catch (e: any) {
    console.log(e)
    throw new Error(e)
  }
}

type HomeProps = {
  products: {
    id: number
    title: string
    price: number
  }[]
}

const Home: NextPage<HomeProps> = (props) => {
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
              <p>Цена: {product.price} руб.</p>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}

export default Home
