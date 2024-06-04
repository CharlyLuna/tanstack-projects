import { productsApi } from "../api/productsApi"
import type { Product } from "../interfaces/product"

interface GetProductsOptions {
  filterKey?: string
}

export const getProducts = async ({ filterKey }: GetProductsOptions) => {
  const filterUrl = filterKey ? `?category=${filterKey}` : ""
  const { data } = await productsApi.get<Product[]>(`/products${filterUrl}`)
  return data
}
