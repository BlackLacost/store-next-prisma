import { NextApiRequest, NextApiResponse } from 'next'
import { productCreateSchema } from '../../components/Products/create-product.schema'
import { ProductsService } from '../../components/Products/products.service'
import { validate } from '../../middleware/validate'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  switch (method) {
    case 'POST':
      try {
        const result = await ProductsService.create(req.body)
        res.status(201).json({ result })
        break
      } catch (err: any) {
        console.error('Request error', err)
        res.status(400).json({ error: 'Error create post' + err.message })
      }

    case 'PUT':
      try {
        const result = await ProductsService.update(req.body.id, req.body)
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

export default validate(productCreateSchema, handler)
