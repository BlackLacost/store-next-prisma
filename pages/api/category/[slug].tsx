import { NextApiRequest, NextApiResponse } from 'next'
import { ProductsService } from '../../../components/Products/products.service'
import { errorHandler } from '../../../utils/errorHandler'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req

  if (method === 'GET') {
    const products = await ProductsService.findAll(query.slug as string)
    return res.status(200).json({ items: products })
  }

  res.setHeader('Allow', ['GET'])
  res.status(405).end(`Method ${method} Not Allowed`)
}

export default errorHandler(handler)
