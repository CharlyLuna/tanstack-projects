import { LoadingIcon } from "../../shared/components/LoadingIcon"
import { Issue, State } from "../interfaces/issue"
import { IssueItem } from "./IssueItem"

interface Props {
  issues: Issue[]
  state?: State
  onStateChange: (state?: State) => void
  handleScroll: () => void
  isLoading: boolean
}

export const IssueListInfinite = ({
  issues,
  state,
  onStateChange,
  handleScroll,
  isLoading,
}: Props) => {
  return (
    <div
      onScroll={(e: React.UIEvent<HTMLElement>) => {
        const { scrollHeight, scrollTop, clientHeight } = e.currentTarget
        const bottom = Math.abs(scrollHeight - (scrollTop + clientHeight)) <= 1
        if (bottom && !isLoading) handleScroll()
      }}
      style={{ maxHeight: "600px", width: "100%", overflowY: "auto" }}
      className='card border-white'
    >
      <div className='card-header bg-dark'>
        <ul className='nav nav-pills card-header-pills'>
          <li className='nav-item'>
            <a
              onClick={() => onStateChange(undefined)}
              className={`nav-link ${!state ? "active" : ""}`}
            >
              All
            </a>
          </li>
          <li className='nav-item'>
            <a
              onClick={() => onStateChange(State.Open)}
              className={`nav-link ${state === State.Open ? "active" : ""}`}
            >
              Open
            </a>
          </li>
          <li className='nav-item'>
            <a
              onClick={() => onStateChange(State.Closed)}
              className={`nav-link ${state === State.Closed ? "active" : ""}`}
            >
              Closed
            </a>
          </li>
        </ul>
      </div>
      {issues.length === 0 && (
        <div
          style={{ height: "600px" }}
          className='text-dark text-center mt-4 fw-bold'
        >
          <p>No issues for the selected filters.</p>
        </div>
      )}
      <div className='card-body text-dark pb-2'>
        {issues.map((issue) => (
          <IssueItem key={issue.id} issue={issue} />
        ))}
      </div>
      {isLoading && (
        <div className='text-dark d-flex justify-content-center align-items-center pb-2'>
          <LoadingIcon />
        </div>
      )}
    </div>
  )
}
