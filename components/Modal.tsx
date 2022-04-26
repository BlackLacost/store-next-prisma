import React, { Dispatch, ReactNode, SetStateAction } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
  active: boolean
  setActive: Dispatch<SetStateAction<boolean>>
  children: ReactNode
}

export default function Modal({ active, setActive, children }: Props) {
  const modelClass = `fixed top-0 left-0 z-10
	flex justify-center items-center h-screen w-screen
	bg-black/40 transition-opacity duration-300`

  const modelContentClass = `w-3/5 p-10 rounded-md
	bg-white z-20  transition-transform duration-300`

  return (
    <div
      className={
        active
          ? twMerge('opacity-100 w-screen pointer-events-auto', modelClass)
          : twMerge('opacity-0 pointer-events-none', modelClass)
      }
      onClick={() => setActive(false)}
    >
      <div
        className={
          active
            ? twMerge('scale-100 w-1/2', modelContentClass)
            : twMerge('scale-50', modelContentClass)
        }
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}
