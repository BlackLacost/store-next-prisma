import { ObjectShape, OptionalObjectSchema } from 'yup/lib/object'

export async function validate(
  schema: OptionalObjectSchema<ObjectShape>,
  input: unknown,
) {
  try {
    // abortEarly выведет все ошибки при проверке на бекенде
    // camelCase делает авто преобразование в camel case
    await schema.camelCase().validate(input, { abortEarly: false })
  } catch (error: any) {
    throw new Error(error)
  }
}
