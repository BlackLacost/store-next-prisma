import { NextApiRequest, NextApiResponse } from 'next'
import { ProductsService } from '../../../components/Products/products.service'
import { errorHandler } from '../../../utils/errorHandler'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  if (method === 'GET') {
    const categories = await ProductsService.findAllCategories()
    return res.status(200).json(categories)
  }

  res.setHeader('Allow', ['GET'])
  res.status(405).end(`Method ${method} Not Allowed`)
}

export default errorHandler(handler)
