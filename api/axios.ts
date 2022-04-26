import axios from 'axios'
import { ProductsAPI } from '../components/Products/products.api'

export const instance = axios.create({
  baseURL: '/api/',
  timeout: 4000,
})

export const API = {
  Products: ProductsAPI,
}
