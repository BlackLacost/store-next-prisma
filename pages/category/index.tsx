import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { prisma } from '../../lib/prisma'

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const categories = await prisma.category.findMany()
    return {
      props: { categories },
    }
  } catch (e: any) {
    console.log(e)
    throw new Error(e)
  }
}

type CategoriesProps = {
  categories: {
    id: string
    title: string
    image: string
    slug: string
  }[]
}

const CategoriesPage: NextPage<CategoriesProps> = (props) => {
  const { categories } = props
  return (
    <div>
      <Head>
        <title>Интерент магазин</title>
        <meta name="description" content="Интернет магазин для портфолио" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <li key={category.id}>
              <Link href={`category/${category.slug}`} passHref>
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
    </div>
  )
}

export default CategoriesPage