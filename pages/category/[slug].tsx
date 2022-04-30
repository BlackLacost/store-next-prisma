import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import Modal from '../../components/Modal'
import { CreateProduct } from '../../components/Products/CreateProductForm'
import ProductList from '../../components/Products/ProductList'
import { ProductsAPI } from '../../components/Products/products.api'
import { ProductWithCategory } from '../../components/Products/products.service'

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const slug = query.slug as string
  const products = await ProductsAPI.getProductsByCategorySlug(slug)
  return {
    props: { products, categoryId: products[0].categoryId },
  }
}

type CategoryProps = {
  products: ProductWithCategory[]
  categoryId: number
}

const CategoryPage: NextPage<CategoryProps> = (props) => {
  const { products, categoryId } = props
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
            categoryId={categoryId}
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
        <ProductList products={products} />
      </main>
    </div>
  )
}

export default CategoryPage
