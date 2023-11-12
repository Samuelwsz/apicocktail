import { useEffect, useState } from "react"

const URL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=l"

export default function SearchDrink() {
  const [drinksData, setDrinksData] = useState([])

  const fetchDrink = async (apiURL) => {
    const response = await fetch(apiURL)
    const { drinks } = await response.json()
    console.log(drinks)
    setDrinksData(drinks)
  }

  useEffect(() => {
    fetchDrink(URL)
  }, [])

  return (
    <>
      <div>
        <h1>drinks count: {drinksData.length}</h1>
        <input
          type="text"
          name="search"
          placeholder="search something new..."
          className="border border-black"
        />
      </div>
    </>
  )
}
