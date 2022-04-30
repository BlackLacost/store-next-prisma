import { NextApiRequest, NextApiResponse } from 'next'
import { ProductsService } from '../../../components/Products/products.service'
import { errorHandler } from '../../../utils/errorHandler'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req

  if (method === 'GET') {
    const slug = query.slug as string
    const product = await ProductsService.findProductBySlug(slug)
    if (!product) {
      return res
        .status(404)
        .json({ message: `Product with slug: ${slug} not found` })
    }
    return res.status(200).json(product)
  }

  res.setHeader('Allow', ['GET'])
  res.status(405).end(`Method ${method} Not Allowed`)
}

export default errorHandler(handler)
