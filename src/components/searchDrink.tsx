import { useEffect, useState } from "react"

interface Drink {
  idDrink: string
  strDrink: string
  strDrinkThumb: string
}

const URL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=l"

export default function SearchDrink() {
  const [drinksData, setDrinksData] = useState<Drink[]>([])

  const fetchDrink = async (apiURL: string) => {
    const response = await fetch(apiURL)
    const { drinks } = await response.json()
    console.log(drinks)
    setDrinksData(drinks || [])
  }

  useEffect(() => {
    fetchDrink(URL)
  }, [])

  return (
    <>
      <div>
        <h1>drinks count: {drinksData.length}</h1>
        <form>
          <input
            type="text"
            name="search"
            placeholder="search something new..."
            className="border border-black mb-2 flex m-auto p-1"
          />
        </form>
        <hr />
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 container text-center m-auto mt-2">
          {drinksData.map((eachDrink) => {
            const { idDrink, strDrink, strDrinkThumb } = eachDrink
            return (
              <li
                key={idDrink}
                className="bg-white rounded-md shadow-md overflow-hidden"
              >
                <div>
                  <img
                    src={strDrinkThumb}
                    alt={strDrink}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{strDrink}</h3>
                  {/* Adicione mais detalhes se necessário */}
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}
