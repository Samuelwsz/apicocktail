import { ChevronLeftIcon } from "@heroicons/react/24/outline"
import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Drink } from "../interfaces/IDrink"

export default function RamdomDrink() {
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<Drink[]>([])

  const url = "http://www.thecocktaildb.com/api/json/v1/1/random.php"

  const fecthCocktailGandler = useCallback(() => {
    setLoading(true)

    axios
      .get(url)
      .then((res) => {
        console.log(res.data)
        setData(res.data.drinks)
      })
      .catch((e) => console.log(e))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    fecthCocktailGandler()
  }, [fecthCocktailGandler])

  if (loading) {
    return <h2 className="text-black bg-gray-200">Loading...</h2>
  }

  return (
    <>
      <div className="h-screen bg-gray-200 pt-3">
        <Link to="/">
          <button className="p-1 pr-2 border border-black bg-slate-800 rounded-md text-white ml-3 flex items-center">
            <ChevronLeftIcon className="w-4 h-4" />
            Voltar
          </button>
        </Link>
        <div className="items-center bg-cover bg-center flex justify-center text-center text-black">
          {data.map((c) => {
            return (
              <div
                key={c.idDrink}
                className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl "
              >
                <div className="md:flex p-3">
                  <div className="md:shrink-0">
                    <h2 className="mb-3 text-2xl font-semibold italic">
                      {c.strDrink}
                    </h2>
                    <img
                      src={c.strDrinkThumb}
                      alt={c.strDrink}
                      className="w-72 h-72 rounded-2xl"
                    />
                  </div>
                  <div className="p-8">
                    <h2 className="my-3 text-xl font-bold">Ingredients</h2>
                    <div className="font-semibold">
                      {Object.entries(c)
                        .filter(
                          ([key, value]) =>
                            key.startsWith("strIngredient") && value
                        )
                        .map(([key, value]) => (
                          <p key={key}>{value}</p>
                        ))}
                    </div>
                  </div>
                </div>
                <button
                  onClick={fecthCocktailGandler}
                  className="p-3 mt-3 border border-black bg-slate-800 rounded-md text-white mb-2"
                >
                  Get another drink
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
