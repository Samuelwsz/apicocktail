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
        <div ref={modalRef} className="bg-white p-8 rounded-md relative">
          <button
            onClick={onClose}
            className="absolute top-[-15px] left-[-5px] mt-4 px-4 py-2 rounded-md"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
          <h2 className="text-2xl font-bold mb-4">{drink?.strDrink}</h2>
          <p>{drink?.strIngredient1}</p>
          {/* Adicione mais informações conforme necessário */}
        </div>
      </div>
    </>
  )
}
