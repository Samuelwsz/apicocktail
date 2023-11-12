import { createBrowserRouter } from "react-router-dom"
import App from "../App"
import RamdomDrink from "../components/randomDrink"
import SearchDrink from "../components/searchDrink"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [],
  },
  {
    path: "/ramdomdrink",
    element: <RamdomDrink />,
  },
  {
    path: "/searchdrink",
    element: <SearchDrink />,
  },
])
