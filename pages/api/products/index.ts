import { NextApiRequest, NextApiResponse } from 'next'
import {
  productCreateSchema,
  productUpdateSchema,
} from '../../../components/Products/product.schemas'
import { ProductsService } from '../../../components/Products/products.service'
import { errorHandler } from '../../../utils/errorHandler'
import { validate } from '../../../utils/validate'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req

  if (method === 'POST') {
    await validate(productCreateSchema, body)
    const result = await ProductsService.create(body)
    return res.status(201).json({ result })
  }

  if (method === 'PUT') {
    await validate(productUpdateSchema, body)
    const result = await ProductsService.update(body.id, body)
    return res.status(201).json({ result })
  }

  res.setHeader('Allow', ['POST, PUT'])
  res.status(405).end(`Method ${method} Not Allowed`)
}

export default errorHandler(handler)
