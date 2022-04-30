import { Prisma } from '@prisma/client'
import { number, object, SchemaOf, string, TypeOf } from 'yup'

export const productCreateSchema: SchemaOf<Prisma.ProductUncheckedCreateInput> =
  object({
    id: number().optional().min(1),
    title: string().required(),
    slug: string().required(),
    price: number().required().min(0).max(1000000),
    image: string().required().url(),
    categoryId: number().required(),
  })
export interface ProductCreate extends TypeOf<typeof productCreateSchema> {}

export const productUpdateSchema: SchemaOf<Prisma.ProductUncheckedUpdateInput> =
  object({
    id: number().required().min(1),
    title: string().optional(),
    slug: string().optional(),
    price: number().optional().min(0).max(1000000),
    image: string().optional().url(),
    categoryId: number().optional(),
  })
export interface ProductUpdate extends TypeOf<typeof productUpdateSchema> {}
