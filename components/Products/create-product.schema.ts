import { number, object, string, TypeOf } from 'yup'

export const productCreateSchema = object({
  title: string().required(),
  price: number().required().min(0).max(1000000),
  image: string().required().url(),
  categoryId: number().required(),
})

// type ProductCreate = TypeOf<typeof productCreateSchema>
export interface ProductCreate extends TypeOf<typeof productCreateSchema> {}
