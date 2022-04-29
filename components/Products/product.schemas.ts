import { number, object, string, TypeOf } from 'yup'

export const productCreateSchema = object({
  title: string().required(),
  price: number().required().min(0).max(1000000),
  image: string().required().url(),
  categoryId: number().required(),
})
export interface ProductCreate extends TypeOf<typeof productCreateSchema> {}

export const productUpdateSchema = object({
  id: number().required().min(1),
  title: string().optional(),
  price: number().optional().min(0).max(1000000),
  image: string().optional().url(),
  categoryId: number().optional(),
})
export interface ProductUpdate extends TypeOf<typeof productUpdateSchema> {}
