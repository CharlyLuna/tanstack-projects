import { useRandom } from "./hooks/useRandom"
import "./App.css"

function App() {
  const { error, hasError, isFetching, refetch, data } = useRandom()

  return (
    <div>
      {isFetching ? (
        <h1>Loading...</h1>
      ) : hasError ? (
        <h1>{error!.message}</h1>
      ) : (
        <h1>Random number: {data}</h1>
      )}
      <button
        style={{ width: "200px" }}
        disabled={isFetching}
        onClick={() => refetch()}
      >
        {isFetching ? "..." : "New number"}
      </button>
    </div>
  )
}

export default App
