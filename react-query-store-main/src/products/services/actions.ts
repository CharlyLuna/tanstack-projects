import { productsApi } from "../api/productsApi"
import type { Product } from "../interfaces/product"

interface GetProductsOptions {
  filterKey?: string
}

interface GetProductByIdOptions {
  id: number
}

export const sleep = (seconds: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve(true)
    }, seconds * 1000)
  })
}

export const getProducts = async ({ filterKey }: GetProductsOptions) => {
  const filterUrl = filterKey ? `?category=${filterKey}` : ""
  const { data } = await productsApi.get<Product[]>(`/products${filterUrl}`)
  return data
}

export const getProductById = async ({ id }: GetProductByIdOptions) => {
  const { data } = await productsApi.get<Product>(`/products/${id}`)
  return data
}

export type ProductLike = Omit<Product, "id" | "rating">

export const createProduct = async (product: ProductLike) => {
  sleep(2)
  const { data } = await productsApi.post<Product>("/products", product)
  return data
}
