import { FiInfo, FiMessageSquare, FiCheckCircle } from "react-icons/fi"
import { useQueryClient } from "@tanstack/react-query"
import { Issue } from "../interfaces/issue"
import { useNavigate } from "react-router-dom"
import { getIssueInfo, getIsuueComments } from "../hooks"

interface Props {
  issue: Issue
}

export const IssueItem = ({ issue }: Props) => {
  const queryClient = useQueryClient()
  const timeSinceCreation = Date.now() - new Date(issue.created_at).getTime()
  const creator = issue.user
  const navigate = useNavigate()

  const prefetchData = () => {
    console.log("mouse enter")
    queryClient.prefetchQuery({
      queryKey: ["issue", issue.number],
      queryFn: () => getIssueInfo(issue.number),
      staleTime: 1000 * 30,
    })
    queryClient.prefetchQuery({
      queryKey: ["issue", issue.number, "comments"],
      queryFn: () => getIsuueComments(issue.number),
      staleTime: 1000 * 30,
    })
  }

  const preSetData = () => {
    queryClient.setQueryData(["issue", issue.number], issue, {
      updatedAt: Date.now() + 1000 * 60,
    })
  }

  return (
    <div
      onClick={() => navigate(`/issues/issue/${issue.number}`)}
      style={{ minHeight: "100px" }}
      className='card mb-2 issue'
      onMouseEnter={preSetData}
    >
      <div className='card-body d-flex align-items-center'>
        <div>
          {issue.state === "open" ? (
            <FiInfo size={25} color='red' />
          ) : (
            <FiCheckCircle size={30} color='green' />
          )}
        </div>

        <div className='d-flex flex-column flex-fill px-2'>
          <span>{issue.title}</span>
          <span className='issue-subinfo'>
            #{issue.number} opened {timeSinceCreation} ago by{" "}
            <span className='fw-bold'>{creator.login}</span>
          </span>
        </div>

        <div className='d-flex align-items-center'>
          <img src={creator.avatar_url} alt='User Avatar' className='avatar' />
          <span className='px-2'>{issue.comments}</span>
          <FiMessageSquare />
        </div>
      </div>
    </div>
  )
}
