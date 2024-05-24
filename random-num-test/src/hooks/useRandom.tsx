import { useQuery } from "@tanstack/react-query"

const getRandomNumberFromApi = async (): Promise<number> => {
  const response = await fetch(
    "https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new"
  )
  const data = await response.text()
  // throw new Error("Unknown Error")
  return Number(data)
}

export const useRandom = () => {
  const query = useQuery({
    queryKey: ["randomNumber"],
    queryFn: getRandomNumberFromApi,
  })

  return {
    hasError: query.isError,
    error: query.error,
    refetch: query.refetch,
    isFetching: query.isFetching,
    data: query.data,
  }
}
