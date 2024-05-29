import { FiInfo, FiMessageSquare, FiCheckCircle } from "react-icons/fi"
import { Issue } from "../interfaces/issue"

interface Props {
  issue: Issue
}

export const IssueItem = ({ issue }: Props) => {
  const timeSinceCreation = Date.now() - new Date(issue.created_at).getTime()
  const creator = issue.user
  return (
    <div style={{ minHeight: "100px" }} className='card mb-2 issue'>
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
