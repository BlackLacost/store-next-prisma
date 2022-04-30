import { yupResolver } from '@hookform/resolvers/yup'
import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Router from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { slugify } from 'transliteration'
import { API } from '../../api/axios'
import Modal from '../../components/Modal'
import {
  ProductCreate,
  productCreateSchema,
} from '../../components/Products/product.schemas'
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
  const [slug, setSlug] = useState<string>('')
  const [modalActive, setModalActive] = useState<boolean>(false)
  const {
    reset,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProductCreate>({
    resolver: yupResolver(productCreateSchema),
    defaultValues: {
      title: undefined,
      price: undefined,
      image: undefined,
    },
  })
  const onSubmit = async (data: any) => {
    const response = await API.Products.create(data)
    reset()
    setModalActive(false)
    Router.push(`/product/${response.data.result.slug}`)
  }

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <p>{errors.title?.message}</p>
            <input
              {...register('title', { required: true })}
              onChange={(e) => setSlug(slugify(e.target.value))}
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
            <button
              type="submit"
              onClick={() => {
                setValue('slug', slug)
                setValue('categoryId', category.id)
              }}
            >
              Создать
            </button>
          </form>
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
