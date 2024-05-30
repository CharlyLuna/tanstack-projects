import { useQuery } from "@tanstack/react-query"
import { githubApi } from "../../api/githubApi"
import { Issue } from "../interfaces/issue"
import { sleep } from "../../helpers/functions"

export const getIssueInfo = async (issueNumber: number): Promise<Issue> => {
  const { data } = await githubApi.get(`/issues/${issueNumber}`)
  return data
}

export const getIsuueComments = async (
  issueNumber: number
): Promise<Issue[]> => {
  const { data } = await githubApi.get(`/issues/${issueNumber}/comments`)
  return data
}

export const useIssue = (issueNumber: number) => {
  const issueQuery = useQuery({
    queryKey: ["issue", issueNumber],
    queryFn: () => getIssueInfo(issueNumber),
  })
  const issueCommentsQuery = useQuery({
    queryKey: ["issue", issueNumber, "comments"],
    queryFn: () => getIsuueComments(issueQuery.data!.number),
    enabled: issueQuery.data !== undefined,
  })

  return {
    issue: issueQuery,
    comments: issueCommentsQuery,
  }
}
