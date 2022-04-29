import { NextApiRequest, NextApiResponse } from 'next'
import {
  productCreateSchema,
  productUpdateSchema,
} from '../../components/Products/product.schemas'
import { ProductsService } from '../../components/Products/products.service'
import { validate } from '../../utils/validate'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req

  switch (method) {
    case 'POST':
      try {
        validate(productCreateSchema, body)
        const result = await ProductsService.create(body)
        res.status(201).json({ result })
        break
      } catch (err: any) {
        console.error('Request error', err)
        res.status(400).json({ error: 'Error create post' + err.message })
      }

    case 'PUT':
      try {
        validate(productUpdateSchema, body)
        const result = await ProductsService.update(body.id, body)
        res.status(201).json({ result })
        break
      } catch (err: any) {
        console.error('Request error', err)
        res.status(400).json({ error: 'Error create post' + err.message })
      }

    default:
      res.setHeader('Allow', ['POST, PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
      break
  }
}

// export default validate(productCreateSchema, handler)
export default handler
