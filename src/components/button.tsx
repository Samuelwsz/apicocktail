import { ChevronLeftIcon } from "@heroicons/react/24/outline"
import { ReactNode } from "react"

interface ButtomProps {
  children: ReactNode
  variant?: "primary" | "secondary"
  onClick?: () => void
}

export default function Buttom({
  children,
  variant = "primary",
  onClick,
}: ButtomProps) {
  const variantClasses = {
    primary: "p-1 pr-2 ml-3 flex items-center",
    secondary: "p-3 mt-3 mb-2",
  }

  return (
    <>
      <button
        className={`border border-black bg-slate-800 rounded-md text-white ${variantClasses[variant]}`}
        onClick={onClick}
      >
        {variant === "primary" && <ChevronLeftIcon className="w-4 h-4" />}
        {children}
      </button>
    </>
  )
}
