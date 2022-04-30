import { ObjectShape, OptionalObjectSchema } from 'yup/lib/object'

export async function validate(
  schema: OptionalObjectSchema<ObjectShape>,
  input: unknown,
): Promise<void> {
  // abortEarly выведет все ошибки при проверке на бекенде
  // camelCase делает авто преобразование в camel case
  await schema.camelCase().validate(input, { abortEarly: false })
}
