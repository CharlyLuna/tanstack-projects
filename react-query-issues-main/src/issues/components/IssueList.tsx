import { Issue, State } from "../interfaces/issue"
import { IssueItem } from "./IssueItem"

interface Props {
  issues: Issue[]
  state?: State
  onStateChange: (state?: State) => void
}

export const IssueList = ({ issues, state, onStateChange }: Props) => {
  return (
    <div
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
      <div className='card-body text-dark'>
        {issues.map((issue) => (
          <IssueItem key={issue.id} issue={issue} />
        ))}
      </div>
    </div>
  )
}
