import { useQuery } from "@tanstack/react-query"
import { githubApi } from "../../api/githubApi"
import { Issue } from "../interfaces/issue"

const getIssueInfo = async (issueNumber: number): Promise<Issue> => {
  const { data } = await githubApi.get(`/issues/${issueNumber}`)
  return data
}

export const useIssue = (issueNumber: number) => {
  const issueQuery = useQuery({
    queryKey: ["issue", issueNumber],
    queryFn: () => getIssueInfo(issueNumber),
  })

  return issueQuery
}
