import type { GetServerSideProps, NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { dehydrate, QueryClient } from 'react-query'
import { HeadSeo } from '../../components/HeadSeo'
import { ProductsAPI } from '../../components/Products/products.api'
import { useGetCategories } from '../../components/Products/products.hooks'

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery('categories', ProductsAPI.getCategories)
  return { props: { dehydratedState: dehydrate(queryClient) } }
}

const CategoriesPage: NextPage = () => {
  const queryCategories = useGetCategories()

  return (
    <>
      <HeadSeo />

      <main className="container mx-auto">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {queryCategories.data?.map((category) => (
            <li key={category.id}>
              <Link href={`/category/${category.slug}`} passHref>
                <a>
                  <h2 className="text-3xl font-semibold">{category.title}</h2>
                  <Image
                    src={category.image}
                    alt={category.title}
                    width={200}
                    height={200}
                  />
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  )
}

export default CategoriesPage
