import axios from "axios"
import { useEffect, useState } from "react"
import InputDrink from "./inputDrink"
import { ChevronLeftIcon } from "@heroicons/react/24/outline"
import { Link } from "react-router-dom"
import Modal from "./modal"
import { Drink } from "../interfaces/IDrink"

const URL = "https://www.thecocktaildb.com/api/json/v1/1"

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
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [selectedDrink, setSelectedDrink] = useState<Drink | null>(null)
  /*
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
*/
  const fetchDrink = async (apiURL: string) => {
    setLoading(true)
    setIsError({ status: false, msg: "" })
    try {
      const response = await axios.get(apiURL)
      const { drinks } = response.data
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
    const correctURL = `${URL}/search.php?s=${searchTerm}`
    fetchDrink(correctURL)
  }, [searchTerm])

  useEffect(() => {
    const correctURL = `${URL}/filter.php?i=${i}`
    fetchDrink(correctURL)
  }, [i])

  useEffect(() => {
    const correctURL = `${URL}/filter.php?c=${c}`
    fetchDrink(correctURL)
  }, [c])

  const handleOpenModal = (drink: Drink) => {
    setSelectedDrink(drink)
    setModalOpen(true)
  }

  return (
    <>
      <div className="bg-gray-200 h-auto py-3">
        <Link to="/">
          <button className="p-1 pr-2 border border-black bg-slate-800 rounded-md text-white ml-3 flex items-center">
            <ChevronLeftIcon className="w-4 h-4" />
            Voltar
          </button>
        </Link>

        <form>
          <InputDrink
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="search something new..."
          />
          <InputDrink
            value={i}
            onChange={(e) => setI(e.target.value)}
            placeholder="search ingredient..."
          />
          <select
            id="category"
            name="category"
            value={c}
            onChange={(e) => setC(e.target.value)}
            className="border border-black mb-2 p-2  rounded-md w-80 focus:outline-none focus:ring focus:border-blue-300 flex m-auto"
          >
            <option value="">Select a category</option>
            <option value="Ordinary Drink">Ordinary Drink</option>
            <option value="Cocktail">Cocktail</option>
            <option value="Shake">Shake</option>
            <option value="Cocoa">Cocoa</option>
            <option value="Shake">Shake</option>
            <option value="Coffee / Tea">Coffee & Tea</option>
            <option value="Homemade Liqueur">Homemade Liqueur</option>
            <option value="Punch / Party Drink">Punch & Party Drink</option>
            <option value="Beer">Beer</option>
            <option value="Soft Drink">Soft Drink</option>
            <option value="Other / Unknown">Other & Unknown</option>
            {/* Adicione mais opções conforme necessário */}
          </select>
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
                  onClick={() => handleOpenModal(eachDrink)}
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
      {modalOpen && (
        <Modal
          drink={selectedDrink}
          onClose={() => {
            setModalOpen(false)
            setSelectedDrink(null)
          }}
        />
      )}
    </>
  )
}
