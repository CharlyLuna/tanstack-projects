import { useQuery } from "@tanstack/react-query"
import { githubApi } from "../../api/githubApi"
import { Label } from "../interfaces"

const getLabels = async (): Promise<Label[]> => {
  const { data } = await githubApi.get<Label[]>("/labels?per_page=100")
  return data
}

export const useLabels = () => {
  const labelsQuery = useQuery({
    queryKey: ["labels"],
    queryFn: getLabels,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60,
    placeholderData: [
      {
        id: 2281766624,
        node_id: "MDU6TGFiZWwyMjgxNzY2NjI0",
        url: "https://api.github.com/repos/facebook/react/labels/Component:%20Scheduling%20Profiler",
        name: "Component: Scheduling Profiler",
        color: "1dc3d6",
        default: false,
        description: "",
      },
      {
        id: 945148471,
        node_id: "MDU6TGFiZWw5NDUxNDg0NzE=",
        url: "https://api.github.com/repos/facebook/react/labels/Component:%20ReactIs",
        name: "Component: ReactIs",
        color: "1d76db",
        default: false,
        description: "",
      },
    ],
  })

  return labelsQuery
}
