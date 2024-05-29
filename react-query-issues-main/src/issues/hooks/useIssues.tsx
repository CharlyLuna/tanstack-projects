import { useQuery } from "@tanstack/react-query"
import { githubApi } from "../../api/githubApi"
import type { Issue } from "../interfaces/issue"

const getIssues = async (): Promise<Issue[]> => {
  const { data } = await githubApi.get("/issues")
  console.log(data)
  return data
}

export const useIssues = () => {
  const issuesQuery = useQuery({
    queryKey: ["issues"],
    queryFn: getIssues,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60,
  })

  return issuesQuery
}
