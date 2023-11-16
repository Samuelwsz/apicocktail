import axios from "axios"
import { useState } from "react"
import InputDrink from "./inputDrink"
import { Link } from "react-router-dom"
import Modal from "./modal"
import { Drink } from "../interfaces/IDrink"
import imgError from "../assets/wineglass-3312361_640.png"
import Buttom from "./button"
import { useSearchAPI } from "../hooks/useSearch"

const URL = "https://www.thecocktaildb.com/api/json/v1/1"

export default function SearchDrink() {
  //  const [drinksData, setDrinksData] = useState<Drink[] | []>([])
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [i, setI] = useState<string>("")
  const [c, setC] = useState<string>("")
  // const [loading, setLoading] = useState<boolean>(false)
  /* const [isError, setIsError] = useState<{ status: boolean; msg: string }>({
    status: false,
    msg: "",
  })*/

  const {
    data: drinksData,
    isFetching,
    error,
  } = useSearchAPI<Drink[]>(
    searchTerm
      ? `${URL}/search.php?s=${searchTerm}`
      : i
      ? `${URL}/filter.php?i=${i}`
      : c
      ? `${URL}/filter.php?c=${c}`
      : ""
  )

  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [selectedDrink, setSelectedDrink] = useState<Drink | null>(null)
  /*
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
  }, [c])*/

  const handleOpenModal = async (drink: Drink) => {
    // Consulta detalhes do coquetel usando o ID
    try {
      const response = await axios.get(`${URL}/lookup.php?i=${drink.idDrink}`)
      const { drinks } = response.data
      if (drinks && drinks.length > 0) {
        setSelectedDrink(drinks[0])
        setModalOpen(true)
      }
    } catch (error) {
      console.error("Error fetching cocktail details:", error)
    }
  }

  const handleSearchTermChange = (value: string) => {
    setSearchTerm(value)
    // Limpar o conteúdo de outros inputs quando este input é preenchido
    setI("")
    setC("")
  }

  const handleIngredientChange = (value: string) => {
    setI(value)
    // Limpar o conteúdo de outros inputs quando este input é preenchido
    setSearchTerm("")
    setC("")
  }

  const handleCategoryChange = (value: string) => {
    setC(value)
    // Limpar o conteúdo de outros inputs quando este input é preenchido
    setSearchTerm("")
    setI("")
  }

  return (
    <>
      <div className="py-3">
        <Link to="/">
          <Buttom variant="primary">Return</Buttom>
        </Link>

        <form>
          <InputDrink
            value={searchTerm}
            onChange={(e) => handleSearchTermChange(e.target.value)}
            placeholder="search something new..."
          />
          <InputDrink
            value={i}
            onChange={(e) => handleIngredientChange(e.target.value)}
            placeholder="search ingredient..."
          />
          <select
            id="category"
            name="category"
            value={c}
            onChange={(e) => handleCategoryChange(e.target.value)}
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
          Drinks count: {drinksData?.length}
        </h1>
        <hr />
        {isFetching && !error?.status && (
          <h3 className="flex justify-center my-10 text-2xl">
            Loading...
          </h3>
        )}
        {error?.status && (
          <h3 className="flex justify-center my-10 h-screen">
            <img className="w-80 h-64" src={imgError} alt="Image Error" />
          </h3>
        )}
        {!isFetching && !error?.status && (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 container text-center m-auto mt-2 px-5">
            {drinksData?.map((eachDrink) => {
              const { idDrink, strDrink, strDrinkThumb } = eachDrink
              return (
                <li
                  key={idDrink}
                  className="bg-white rounded-md shadow-md overflow-hidden cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300"
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
