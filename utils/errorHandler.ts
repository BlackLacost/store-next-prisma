import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { ValidationError } from 'yup'

export const errorHandler =
  (handler: NextApiHandler) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await handler(req, res)
    } catch (err: unknown) {
      if (err instanceof ValidationError) {
        return res
          .status(422)
          .json({ name: err.name, message: err.message, errors: err.errors })
      }
      if (err instanceof Error) {
        return res.status(400).json({ error: err.message })
      }
      return res.status(500).json({ error: 'Unknow error' })
    }
  }
