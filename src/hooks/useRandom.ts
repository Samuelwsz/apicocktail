import axios from "axios"
import { useEffect, useState } from "react"

const api = axios.create({
  baseURL: "https://www.thecocktaildb.com/api/json/v1/1/",
})

export function useRandomAPI<T = unknown>(url: string) {
  const [data, setData] = useState<T | null>(null)
  const [isFetching, setIsFetching] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = async () => {
    try {
      //setIsFetching(true)
      const response = await api.get(url)
      setData(response.data.drinks)
    } catch (err: any | unknown) {
      setError(err)
    } finally {
      setIsFetching(false)
    }
  }
  useEffect(() => {
    fetchData()
  }, [url])

  const refetch = () => {
    fetchData()
  }

  return { data, error, isFetching, refetch }
}
