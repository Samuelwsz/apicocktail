// useSearchAPI.js
import { useEffect, useState } from "react"
import axios from "axios"


const api = axios.create({
  baseURL: "https://www.thecocktaildb.com/api/json/v1/1/",
})

export function useSearchAPI<T = unknown>(url: string) {
  const [data, setData] = useState<T | null>(null)
  const [isFetching, setIsFetching] = useState<boolean>(true)
  const [error, setError] = useState<{ status: boolean; msg: string }>({
    status: false,
    msg: "",
  })

  const fetchData = async () => {
    setIsFetching(true)
    setError({ status: false, msg: "" })
    try {
      setIsFetching(true)
      const response = await api.get(url)
      const { drinks } = response.data
      setData(drinks || [])
      setIsFetching(false)
      setError({ status: false, msg: "" })
      if (!drinks) {
        throw new Error("data not found")
      }
    } catch (err: any | unknown) {
      setError({
        status: true,
        msg: err.message || "something went wrong...",
      })
      setIsFetching(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [url])

  return { data, error, isFetching }
}
