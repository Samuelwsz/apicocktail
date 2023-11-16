import { XMarkIcon } from "@heroicons/react/24/outline"
import { useRef, useEffect } from "react"
import { Drink } from "../interfaces/IDrink"
interface ModalProps {
  drink: Drink | null
  onClose: () => void
}

export default function Modal({ drink, onClose }: ModalProps) {
  //clicar fora do modal para fechar
  const modalRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose()
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [handleClickOutside])

  return (
    <> 
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        {/* Caixa centralizada */}
        <div
          ref={modalRef}
          className="bg-white p-10 rounded-md relative container m-5 md:max-w-xl lg:max-w-3xl xl:max-w-4xl"
        >
          <button
            onClick={onClose}
            className="absolute top-[-15px] left-[-5px] mt-4 px-4 py-2 rounded-md"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
          <h2 className="text-2xl font-bold mb-3">{drink?.strDrink}</h2>
          <div>
            <h3 className="font-semibold text-lg mb-1">Ingredients:</h3>
            {Object.entries(drink ?? {})
              .filter(
                ([key, value]) => key.startsWith("strIngredient") && value
              )
              .map(([key, value]) => (
                <p key={key}>{value}</p>
              ))}

            <hr className="my-2" />
            <h3 className="text-lg">Category: {drink?.strCategory}</h3>
            <div className="text-lg flex gap-1">
              <h1 className="font-semibold">Instructions:</h1>
              {drink?.strInstructions}
            </div>
            <p className="font-semibold text-xl mt-2">{drink?.strAlcoholic}</p>
          </div>
          {/* Adicione mais informações conforme necessário */}
        </div>
      </div>
    </>
  )
}
