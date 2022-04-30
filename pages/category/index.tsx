import { Category } from '@prisma/client'
import type { GetServerSideProps, NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { HeadSeo } from '../../components/HeadSeo'
import { ProductsAPI } from '../../components/Products/products.api'

export const getServerSideProps: GetServerSideProps = async () => {
  const categories = await ProductsAPI.getCategories()
  return {
    props: { categories },
  }
}

type CategoriesProps = {
  categories: Category[]
}

const CategoriesPage: NextPage<CategoriesProps> = (props) => {
  const { categories } = props
  return (
    <>
      <HeadSeo />

      <main className="container mx-auto">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {categories.map((category) => (
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
