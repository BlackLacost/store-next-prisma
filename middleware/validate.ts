import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { number, object } from 'yup'
import { ObjectShape, OptionalObjectSchema } from 'yup/lib/object'

export function validate(
  schema: OptionalObjectSchema<ObjectShape>,
  handler: NextApiHandler,
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (['POST', 'PUT'].includes(req.method as string)) {
      try {
        const newSchema =
          req.method === 'POST'
            ? schema
            : schema.concat(object({ id: number().required().min(1) }))
        // abortEarly выведет все ошибки при проверке на бекенде
        // camelCase делает авто преобразование в camel case
        await newSchema.camelCase().validate(req.body, { abortEarly: false })
        return handler(req, res)
      } catch (error) {
        return res.status(400).json(error)
      }
    }
  }
}
