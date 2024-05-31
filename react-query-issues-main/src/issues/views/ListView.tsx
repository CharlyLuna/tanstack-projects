import { useState } from "react"
import { IssueList } from "../components/IssueList"
import { LabelPicker } from "../components/LabelPicker"
import { LoadingIcon } from "../../shared/components/LoadingIcon"
import { useIssues } from "../hooks"
import { State } from "../interfaces/issue"

export const ListView = () => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([])
  const [state, setState] = useState<State>()
  const { issuesQuery, currentPage, nextPage, prevPage } = useIssues({
    state,
    labels: selectedLabels,
  })

  const onLabelChanged = (labelName: string) => {
    selectedLabels.includes(labelName)
      ? setSelectedLabels(selectedLabels.filter((label) => label !== labelName))
      : setSelectedLabels([...selectedLabels, labelName])
  }

  return (
    <div className='row mt-5'>
      <div className='col-12 col-md-8 d-flex flex-column'>
        {issuesQuery.isLoading ? (
          <div className='loading-container'>
            <LoadingIcon />
          </div>
        ) : (
          <>
            <IssueList
              issues={issuesQuery.data ?? []}
              state={state}
              onStateChange={(state?: State) => setState(state)}
            />
          </>
        )}
        <div className='d-flex flex-row mt-2 justify-content-between align-items-center'>
          <button
            disabled={issuesQuery.isFetching || currentPage === 1}
            onClick={prevPage}
            className='btn btn-outline-light'
          >
            Prev
          </button>
          <span>{currentPage}</span>
          <button
            disabled={issuesQuery.isFetching}
            onClick={nextPage}
            className='btn btn-outline-light'
          >
            Next
          </button>
        </div>
      </div>

      <div className='col-12 col-md-4 mt-4 mt-md-0'>
        <LabelPicker
          selectedLabels={selectedLabels}
          onChange={(labelName) => onLabelChanged(labelName)}
        />
      </div>
    </div>
  )
}
