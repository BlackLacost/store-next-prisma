import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import Modal from '../../components/Modal'
import { CreateProduct } from '../../components/Products/CreateProductForm'
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
      include: { category: { select: { id: true, slug: true } } },
    })
    return {
      props: { products, category: products[0].category },
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
    slug: string
    price: number
    image: string
  }[]
  category: {
    id: number
    slug: string
  }
}

const CategoryPage: NextPage<CategoryProps> = (props) => {
  const { products, category } = props
  const [modalActive, setModalActive] = useState<boolean>(false)

  return (
    <div>
      <Head>
        <title>Интерент магазин</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta name="description" content="Интернет магазин для портфолио" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto">
        <Modal active={modalActive} setActive={setModalActive}>
          <CreateProduct
            categoryId={category.id}
            setModalActive={setModalActive}
          />
        </Modal>
        <button
          className="w-10 h-10 border-2 border-black rounded-full"
          type="button"
          onClick={() => setModalActive(true)}
        >
          +
        </button>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <li className="p-4" key={product.id}>
              <Link href={`/product/${product.slug}`} passHref>
                <a>
                  <h2 className="text-3xl font-semibold">{product.title}</h2>
                </a>
              </Link>
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
