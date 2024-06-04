import { productsApi } from "../api/productsApi"
import type { Product } from "../interfaces/product"

interface GetProductsOptions {
  filterKey?: string
}

interface GetProductByIdOptions {
  id: number
}

const sleep = (seconds: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve(true)
    }, seconds * 1000)
  })
}

export const getProducts = async ({ filterKey }: GetProductsOptions) => {
  await sleep(2)
  const filterUrl = filterKey ? `?category=${filterKey}` : ""
  const { data } = await productsApi.get<Product[]>(`/products${filterUrl}`)
  return data
}

export const getProductById = async ({ id }: GetProductByIdOptions) => {
  await sleep(2)
  const { data } = await productsApi.get<Product>(`/products/${id}`)
  return data
}
