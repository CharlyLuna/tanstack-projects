import { useQuery } from "@tanstack/react-query"
import { githubApi } from "../../api/githubApi"
import type { Issue, State } from "../interfaces/issue"
import { useEffect, useState } from "react"

interface Props {
  state?: State
  labels: string[]
  page?: number
}

const getIssues = async ({
  labels,
  state,
  page = 1,
}: Props): Promise<Issue[]> => {
  const params = new URLSearchParams()
  if (state) params.append("state", state)

  if (labels.length > 0) {
    const labelString = labels.join(",")
    params.append("labels", labelString)
  }

  params.append("page", page.toString())

  params.append("per_page", "5")

  const { data } = await githubApi.get("/issues", { params })
  return data
}

export const useIssues = ({ state, labels, page = 1 }: Props) => {
  const [currentPage, setCurrentPage] = useState(page)
  const issuesQuery = useQuery({
    queryKey: ["issues", { state, labels, currentPage }],
    queryFn: () => getIssues({ labels, state, page: currentPage }),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60,
  })

  useEffect(() => {
    setCurrentPage(1)
  }, [state, labels])

  const nextPage = () => {
    if (issuesQuery.data?.length === 0) return
    setCurrentPage((prev) => prev + 1)
  }

  const prevPage = () => {
    if (currentPage === 1) return
    setCurrentPage((prev) => prev - 1)
  }

  return {
    issuesQuery,
    currentPage: issuesQuery.isFetching ? "loading..." : currentPage,
    nextPage,
    prevPage,
  }
}
