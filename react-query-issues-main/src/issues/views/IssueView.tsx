import { Link, Navigate, useParams } from "react-router-dom"
import { IssueComment } from "../components/IssueComment"
import { useIssue } from "../hooks"
import { LoadingIcon } from "../../shared/components/LoadingIcon"

export const IssueView = () => {
  const params = useParams()
  const { id = "0" } = params

  const { issue, comments } = useIssue(Number(id))

  if (issue.isLoading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LoadingIcon />
      </div>
    )
  }
  if (!issue.data) {
    return <Navigate to={"/issues/list"} />
  }

  return (
    <div className='row mb-5'>
      <div className='col-12 mb-3'>
        <Link to='./issues/list'>Go Back</Link>
      </div>

      {/* Issue comment*/}
      <IssueComment issue={issue.data} />
      {comments.isLoading && <LoadingIcon />}
      {/* Other comments */}
      {comments.data?.map((comment) => (
        <IssueComment key={comment.id} issue={comment} />
      ))}
    </div>
  )
}
