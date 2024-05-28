import { LoadingIcon } from "../../shared/components/LoadingIcon"
import { useLabels } from "../hooks/useLabels"

interface Props {
  selectedLabels: string[]
  onChange: (labelName: string) => void
}

export const LabelPicker = ({ selectedLabels, onChange }: Props) => {
  const labelsQuery = useLabels()

  if (labelsQuery.isLoading) return <LoadingIcon />

  return (
    <div>
      {labelsQuery.data?.map((label) => (
        <span
          key={label.id}
          onClick={() => onChange(label.name)}
          className='badge rounded-pill m-1 label-picker'
          style={{
            border: `1px solid #${label.color}`,
            color: `#${label.color}`,
            backgroundColor: selectedLabels.includes(label.name)
              ? `#${label.color}7f`
              : "",
          }}
        >
          {label.name}
        </span>
      ))}
    </div>
  )
}
