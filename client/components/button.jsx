import React from "react";

export default function Button(props) {
  return (
    <button type="submit"

    className="bg-blue-500 font-nunito-sans font-thin text-lg text-white rounded border-none
    py-2 px-4">

      {props.text}
    </button>

  )
}
