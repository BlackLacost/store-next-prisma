// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Product = {
  id: number
  title: string
  price: number
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product[]>,
) {
  const products: Product[] = [
    { id: 1, title: 'iPhone 5', price: 65000 },
    { id: 2, title: 'iPhone 4xs', price: 45000 },
    { id: 3, title: 'Poco x3 nfc', price: 15000 },
  ]
  res.status(200).json(products)
}
