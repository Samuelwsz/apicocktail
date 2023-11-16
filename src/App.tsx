import "./global.css"
import Banner from "./assets/pexels-min-an-1441122.jpg"
import { Link } from "react-router-dom"

export default function App() {
  return (
    <>
      <section
        className="h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${Banner})` }}
      >
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Api cocktail</h1>
          <div className="flex justify-center">
            <Link to="/ramdomdrink">
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 mr-4 rounded transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
                Ramdom Drink ?
              </button>
            </Link>
            <Link to="/searchdrink">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
                Search drinks by ?
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
