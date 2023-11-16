import { Link } from "react-router-dom"
import { Drink } from "../interfaces/IDrink"
import Buttom from "./button"
import { useRandomAPI } from "../hooks/useRandom"

export default function RamdomDrink() {
  const { data, isFetching, error, refetch } =
    useRandomAPI<Drink[]>("random.php")

  const getRandomDrink = () => {
    // Use refetch function from useAPI to reload the data
    refetch()
  }

  if (isFetching) {
    return <h2 className="text-black">Loading...</h2>
  }

  return (
    <>
      <div className="h-screen pt-3">
        <Link to="/">
          <Buttom variant="primary">Return</Buttom>
        </Link>
        <div className="items-center bg-cover bg-center flex justify-center text-center text-black">
          {error && data == null && (
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
              <p className="text-2xl mb-4">Error Loading Data</p>
              <p className="mb-4">
                Oops! Something went wrong. Please try again.
              </p>
              <Buttom variant="secondary" onClick={getRandomDrink}>
                Try Again
              </Buttom>
            </div>
          )}
          {data?.map((c) => {
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
                <Buttom variant="secondary" onClick={getRandomDrink}>
                  Get another drink
                </Buttom>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
