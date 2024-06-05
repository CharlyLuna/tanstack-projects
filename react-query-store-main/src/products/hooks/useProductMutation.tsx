import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Product, productActions } from ".."

export const useProductMutation = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: productActions.createProduct,
    onSuccess: (data) => {
      // Invalidate specific query to refetch data again
      // queryClient.invalidateQueries({
      //   queryKey: ["products", { filterKey: data.category }],
      // })
      // Add the product to the cache instead of refetching the data
      queryClient.setQueryData<Product[]>(
        ["products", { filterKey: data.category }],
        (oldState) => {
          if (!oldState) return undefined
          return [...oldState, data]
        }
      )
    },
    onSettled: () => {
      console.log("Mutation settled")
    },
  })

  return mutation
}
