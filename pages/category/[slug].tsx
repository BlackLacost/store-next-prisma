import { yupResolver } from '@hookform/resolvers/yup'
import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Router from 'next/router'
import { useForm } from 'react-hook-form'
import { API } from '../../api/axios'
import {
  ProductCreate,
  productCreateSchema,
} from '../../components/Products/create-product.schema'
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
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductCreate>({
    resolver: yupResolver(productCreateSchema),
    defaultValues: {
      title: undefined,
      price: undefined,
      image: undefined,
      categoryId: category.id,
    },
  })
  const onSubmit = async (data: any) => {
    await API.Products.create(data)
    reset()
    Router.push(`/category/${category.slug}`)
  }

  return (
    <div>
      <Head>
        <title>Интерент магазин</title>
        <meta name="description" content="Интернет магазин для портфолио" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <p>{errors.title?.message}</p>
          <input
            {...register('title', { required: true })}
            type="text"
            placeholder="Название продукта"
          />
          <p>{errors.price?.message}</p>
          <input
            {...register('price', { required: true })}
            type="number"
            placeholder="Цена"
          />
          <p>{errors.image?.message}</p>
          <input
            {...register('image', { required: true })}
            type="url"
            placeholder="Ссылка на картинку"
          />
          <input
            {...register('categoryId', { required: true })}
            type="hidden"
            value={category.id}
          />
          <button type="submit">Создать</button>
        </form>
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
