import { useEffect, useState } from "react"

interface Drink {
  idDrink: string
  strDrink: string
  strDrinkThumb: string
}

const URL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="

const URL2 = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i="

const URL3 = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c="

export default function SearchDrink() {
  const [drinksData, setDrinksData] = useState<Drink[] | []>([])
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [i, setI] = useState<string>("")
  const [c, setC] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<{ status: boolean; msg: string }>({
    status: false,
    msg: "",
  })

  const fetchDrink = async (apiURL: string) => {
    setLoading(true)
    setIsError({ status: false, msg: "" })
    try {
      const response = await fetch(apiURL)
      const { drinks } = await response.json()
      setDrinksData(drinks || [])
      setLoading(false)
      setIsError({ status: false, msg: "" })
      if (!drinks) {
        throw new Error("data not found")
      }
    } catch (error: any) {
      console.log(error)
      setLoading(false)
      setIsError({
        status: true,
        msg: error.message || "something went wrong...",
      })
    }
  }

  useEffect(() => {
    const correctURL = `${URL}${searchTerm}`
    fetchDrink(correctURL)
  }, [searchTerm])

  useEffect(() => {
    const correctURL2 = `${URL2}${i}`
    fetchDrink(correctURL2)
  }, [i])

  useEffect(() => {
    const correctURL3 = `${URL3}${c}`
    fetchDrink(correctURL3)
  }, [c])

  return (
    <>
      <div>
        <form>
          <input
            type="text"
            name="search"
            placeholder="search something new..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-black mb-2 flex m-auto p-1 mt-3"
          />
          <input
            type="text"
            name="search"
            placeholder="search ingredient..."
            value={i}
            onChange={(e) => setI(e.target.value)}
            className="border border-black mb-2 flex m-auto p-1 mt-3"
          />
          <input
            type="text"
            name="search"
            placeholder="search category..."
            value={c}
            onChange={(e) => setC(e.target.value)}
            className="border border-black mb-2 flex m-auto p-1 mt-3"
          />
        </form>
        <h1 className="flex justify-center text-lg font-semibold">
          Drinks count: {drinksData.length}
        </h1>
        <hr />
        {loading && !isError?.status && (
          <h3 className="text-2xl flex justify-center">Loading...</h3>
        )}
        {isError?.status && (
          <h3 className="text-4xl font-semibold flex justify-center text-red-600">
            {isError.msg}
          </h3>
        )}
        {!loading && !isError?.status && (
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
        )}
      </div>
    </>
  )
}
