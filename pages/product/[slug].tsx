import type { GetServerSideProps, NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { dehydrate, QueryClient } from 'react-query'
import { HeadSeo } from '../../components/HeadSeo'
import { ProductsAPI } from '../../components/Products/products.api'
import { useGetProductBySlug } from '../../components/Products/products.hooks'

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const slug = query.slug as string
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(['product', slug], () =>
    ProductsAPI.getProductBySlug(slug),
  )
  return { props: { dehydratedState: dehydrate(queryClient) } }
}

const ProductPage: NextPage = () => {
  const { query } = useRouter()
  const productQuery = useGetProductBySlug(query.slug as string)

  return (
    <>
      <HeadSeo />

      {productQuery.isLoading
        ? 'Loading...'
        : productQuery.data && (
            <>
              <h1 className="text-3xl font-semibold">
                {productQuery.data.title}
              </h1>
              <Image
                src={productQuery.data.image}
                alt={productQuery.data.title}
                width={300}
                height={300}
              />
              <p>Цена: {productQuery.data.price} руб.</p>
            </>
          )}
    </>
  )
}

export default ProductPage
