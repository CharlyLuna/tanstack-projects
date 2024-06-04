import { useParams } from "react-router-dom"
import { useProduct } from "../hooks/useProduct"
import { ProductCard } from "../components/ProductCard"
import { useEffect } from "react"

export const ProductById = () => {
  const { id } = useParams()
  const { isLoading, product } = useProduct({ id: Number(id) })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className='flex-col'>
      <h1 className='text-2xl font-bold'>Product</h1>
      {isLoading && <p>loading...</p>}
      {product && <ProductCard product={product} fullDescription />}
    </div>
  )
}
