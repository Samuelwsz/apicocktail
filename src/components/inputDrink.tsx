import { ChangeEvent } from "react"

interface InputDrinkProps {
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  placeholder: string
}

export default function InputDrink({
  value,
  onChange,
  placeholder,
}: InputDrinkProps) {
  return (
    <>
      <input
        type="text"
        name="search"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="border border-black mb-2 p-2  rounded-md w-80 focus:outline-none focus:ring focus:border-blue-300 flex m-auto"
      />
    </>
  )
}
