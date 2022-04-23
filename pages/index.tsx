import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'

const products = [
  { id: 1, title: 'iPhone 5', price: 65000 },
  { id: 2, title: 'iPhone 4xs', price: 45000 },
  { id: 3, title: 'Poco x3 nfc', price: 15000 },
]
export const getStaticProps: GetServerSideProps = async (context) => {
  return {
    props: { products },
  }
}

type HomeProps = {
  products: typeof products
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
