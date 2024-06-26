import type { Issue, State } from "../interfaces/issue"
import { githubApi } from "../../api/githubApi"
import { useInfiniteQuery } from "@tanstack/react-query"

interface Props {
  state?: State
  labels: string[]
  page?: number
}

interface QueryProps {
  pageParam?: number
  queryKey: (string | Props)[]
}

const getIssues = async ({
  pageParam = 1,
  queryKey,
}: QueryProps): Promise<Issue[]> => {
  const [, , args] = queryKey
  const { state, labels } = args as Props

  const params = new URLSearchParams()
  if (state) params.append("state", state)

  if (labels.length > 0) {
    const labelString = labels.join(",")
    params.append("labels", labelString)
  }

  params.append("page", pageParam.toString())

  params.append("per_page", "5")

  const { data } = await githubApi.get("/issues", { params })
  return data
}

export const useIssuesInfinite = ({ labels, state, page = 1 }: Props) => {
  const issuesQuery = useInfiniteQuery({
    queryKey: ["issues", "infinite", { state, labels }],
    queryFn: (data) => getIssues(data),
    initialPageParam: page,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length === 0) return

      return pages.length + 1
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60,
  })

  return {
    issuesQuery,
  }
}
