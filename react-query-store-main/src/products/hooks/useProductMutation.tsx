import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Product, productActions } from ".."

export const useProductMutation = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: productActions.createProduct,
    onMutate: (product) => {
      // Optimistic product
      const optimisticProduct = { id: Math.random(), ...product }
      // Add the product to the cache of the query client
      queryClient.setQueryData<Product[]>(
        ["products", { filterKey: product.category }],
        (oldState) => {
          if (!oldState) return [optimisticProduct]
          return [...oldState, optimisticProduct]
        }
      )
      return { optimisticProduct }
    },
    onSuccess: (data, _variables, context) => {
      // Invalidate specific query to refetch data again
      // queryClient.invalidateQueries({
      //   queryKey: ["products", { filterKey: data.category }],
      // })
      // Remove the optimistic product from the cache
      queryClient.removeQueries({
        queryKey: ["product", context.optimisticProduct.id],
      })
      // Add the product to the cache instead of refetching the data
      queryClient.setQueryData<Product[]>(
        ["products", { filterKey: data.category }],
        (oldState) => {
          if (!oldState) return undefined

          return oldState.map((cacheProduct) => {
            console.log("mapping")
            return cacheProduct.id === context.optimisticProduct.id
              ? data
              : cacheProduct
          })
        }
      )
    },
    onError: (error, variables, context) => {
      // Remove the optimistic product from the cache
      queryClient.removeQueries({
        queryKey: ["product", context?.optimisticProduct.id],
      })

      queryClient.setQueryData<Product[]>(
        ["products", { filterKey: variables.category }],
        (oldState) => {
          if (!oldState) return undefined
          // Invalidate specific query to refetch data again
          // queryClient.invalidateQueries({
          //   queryKey: ["products", { filterKey: data.category }],
          // })

          return oldState.filter((cacheProduct) => {
            return cacheProduct.id !== context?.optimisticProduct.id
          })
        }
      )
    },
    onSettled: (_data, _error, variables) => {
      // Invalidate specific query to refetch data again
      queryClient.invalidateQueries({
        queryKey: ["products", { filterKey: variables.category }],
      })
      queryClient.invalidateQueries({
        queryKey: ["products", {}],
      })
    },
  })

  return mutation
}
