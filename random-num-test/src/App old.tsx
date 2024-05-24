import { useEffect, useReducer, useState } from "react"
import "./App.css"

const getRandomNumberFromApi = async (): Promise<number> => {
  const response = await fetch(
    "https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new"
  )
  const data = await response.text()
  // throw new Error("Unknown Error")
  return Number(data)
}

function App() {
  const [number, setNumber] = useState<number>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>()
  const [key, forceRefetch] = useReducer((x) => x + 1, 0)

  useEffect(() => {
    setIsLoading(true)
    getRandomNumberFromApi()
      .then(setNumber)
      .catch((error) => {
        setError(error.message)
      })
  }, [key])

  useEffect(() => {
    if (number) setIsLoading(false)
  }, [number])

  useEffect(() => {
    if (error) setIsLoading(false)
  }, [error])

  return (
    <div>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <h1>Random number: {number}</h1>
      )}
      <button
        style={{ width: "200px" }}
        disabled={isLoading}
        onClick={forceRefetch}
      >
        {isLoading ? "..." : "New number"}
      </button>
    </div>
  )
}

export default App
