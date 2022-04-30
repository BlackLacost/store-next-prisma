import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { dehydrate, QueryClient } from 'react-query'
import { HeadSeo } from '../../components/HeadSeo'
import Modal from '../../components/Modal'
import { CreateProduct } from '../../components/Products/CreateProductForm'
import ProductList from '../../components/Products/ProductList'
import { ProductsAPI } from '../../components/Products/products.api'
import { useGetProductsByCategorySlug } from '../../components/Products/products.hooks'

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const categorySlug = query.slug as string
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(['products', categorySlug], () =>
    ProductsAPI.getProductsByCategorySlug(categorySlug),
  )
  return { props: { dehydratedState: dehydrate(queryClient) } }
}

const CategoryPage: NextPage = () => {
  const { query } = useRouter()
  const productsQuery = useGetProductsByCategorySlug(query.slug as string)
  const [modalActive, setModalActive] = useState<boolean>(false)

  return (
    <>
      <HeadSeo />

      <Modal active={modalActive} setActive={setModalActive}>
        <CreateProduct
          categoryId={productsQuery.data ? productsQuery.data[0].categoryId : 1}
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
      <ProductList />
    </>
  )
}

export default CategoryPage
