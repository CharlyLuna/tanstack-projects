import { useState } from "react"
import { IssueList } from "../components/IssueList"
import { LabelPicker } from "../components/LabelPicker"
import { LoadingIcon } from "../../shared/components/LoadingIcon"
import { useIssues } from "../hooks"
import { State } from "../interfaces/issue"

export const ListView = () => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([])
  const [state, setState] = useState<State>()
  const issuesQuery = useIssues({ state, labels: selectedLabels })

  const onLabelChanged = (labelName: string) => {
    selectedLabels.includes(labelName)
      ? setSelectedLabels(selectedLabels.filter((label) => label !== labelName))
      : setSelectedLabels([...selectedLabels, labelName])
  }

  return (
    <div className='row mt-5'>
      <div className='col-12 col-md-8 d-flex justify-content-center'>
        {issuesQuery.isLoading ? (
          <div className='loading-container'>
            <LoadingIcon />
          </div>
        ) : (
          <IssueList
            issues={issuesQuery.data ?? []}
            state={state}
            onStateChange={(state?: State) => setState(state)}
          />
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
