import { useState } from "react"
import { LabelPicker } from "../components/LabelPicker"
import { LoadingIcon } from "../../shared/components/LoadingIcon"
import { State } from "../interfaces/issue"
import { useIssuesInfinite } from "../hooks/useIssuesInfinite"
import { IssueListInfinite } from "../components/IssueListInfinite"

export const ListViewInfinite = () => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([])
  const [state, setState] = useState<State>()
  const { issuesQuery } = useIssuesInfinite({
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
            <IssueListInfinite
              issues={issuesQuery.data?.pages.flat() ?? []}
              state={state}
              onStateChange={(state?: State) => setState(state)}
              handleScroll={() => issuesQuery.fetchNextPage()}
              isLoading={issuesQuery.isFetching}
            />
            {/* Fetch using a button instead of detecting scroll to bottom */}
            {/* <div className='d-flex mt-2 justify-content-center align-items-center'>
              <button
                disabled={issuesQuery.isFetching || !issuesQuery.hasNextPage}
                onClick={() => issuesQuery.fetchNextPage()}
                className='btn btn-outline-light'
              >
                Load more...
              </button>
            </div> */}
          </>
        )}
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
