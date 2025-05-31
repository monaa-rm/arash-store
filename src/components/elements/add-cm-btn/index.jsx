import React from 'react'

const AddCommentButton = ({showCm, setShowCm }) => {
  return (
    <button
    onClick={() => setShowCm(true) }
    className=" h-10 w-48 md:h-12 md:w-56 z-[2] flex group  justify-center items-center gap-2 bg-blue-600 rounded-md text-white
relative font-semibold after:-z-[1] after:absolute after:h-1 after:w-1 after:bg-blue-800 after:left-5 
overflow-hidden after:bottom-0 after:translate-y-full after:rounded-md after:hover:scale-[300]
after:hover:transition-all after:hover:duration-700 after:transition-all after:duration-700 transition-all 
duration-700 [text-shadow:3px_5px_2px_#001764;] hover:[text-shadow:2px_2px_2px_#fda4af] text-lg md:text-2xl"
  >
    افزودن دیدگاه
    <svg
      strokeLinejoin="round"
      strokeLinecap="round"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      height="44"
      width="44"
      xmlns="http://www.w3.org/2000/svg"
      className="w-8 group-hover:w-9 z-[3] duration-200 hover:stroke-[#fde8ea]"
      fill="none"
    >
      <path fill="none" d="M0 0h24v24H0z" stroke="none"></path>
      <path d="M8 9h8"></path>
      <path d="M8 13h6"></path>
      <path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12z"></path>
    </svg>
    <svg
      strokeLinejoin="round"
      strokeLinecap="round"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      height="44"
      width="44"
      xmlns="http://www.w3.org/2000/svg"
      className="w-8  absolute left-7 top-[2px] md:top-1.5  duration-500 stroke-blue-800 group-hover:stroke-[#fda4ae62] transition-all "
      fill="none"
    >
      <path fill="none" d="M0 0h24v24H0z" stroke="none"></path>
      <path d="M8 9h8"></path>
      <path d="M8 13h6"></path>
      <path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12z"></path>
    </svg>
  </button>
  )
}

export default AddCommentButton
