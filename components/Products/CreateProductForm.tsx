import { yupResolver } from '@hookform/resolvers/yup'
import Router from 'next/router'
import { Dispatch, SetStateAction, useState } from 'react'
import { useForm } from 'react-hook-form'
import { slugify } from 'transliteration'
import { ProductCreate, productCreateSchema } from './product.schemas'
import { ProductsAPI } from './products.api'

type Props = {
  setModalActive: Dispatch<SetStateAction<boolean>>
  categoryId: number
}

export function CreateProduct({ setModalActive, categoryId }: Props) {
  const [slug, setSlug] = useState<string>('')
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
  const onSubmit = async (data: ProductCreate) => {
    const product = await ProductsAPI.create(data)
    reset()
    setModalActive(false)
    Router.push(`/product/${product.slug}`)
  }
  return (
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
          setValue('categoryId', categoryId)
        }}
      >
        Создать
      </button>
    </form>
  )
}
