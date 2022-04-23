import { Category } from '@prisma/client'

export const categories: Omit<Category, 'id' | 'slug' | 'image'>[] = [
  { title: 'Холодильники' },
  { title: 'Телевизоры' },
  { title: 'Смартфоны' },
]
