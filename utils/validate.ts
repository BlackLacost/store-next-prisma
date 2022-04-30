import { ValidationError } from 'yup'
import { ObjectShape, OptionalObjectSchema } from 'yup/lib/object'

export async function validate(
  schema: OptionalObjectSchema<ObjectShape>,
  input: unknown,
): Promise<void> {
  try {
    // abortEarly выведет все ошибки при проверке на бекенде
    // camelCase делает авто преобразование в camel case
    await schema.camelCase().validate(input, { abortEarly: false })
  } catch (error: unknown) {
    if (error instanceof ValidationError) {
      throw error
    }
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw new Error('Unknow error')
  }
}
