"use client"

import React, { useEffect } from 'react'
import Prismjs from "prismjs"
import "../styles/a.css"
function Code({ code, filename, language }) {
  useEffect(() => {
    Prismjs.highlightAll()
  })
  return (
    <div className='text-center md:w-[760px] w-[320px]   mt-8 mx-auto '>
      {/* <div className='relative rounded-md top-2   bg-slate-800 text-lg text-white'>{filename}</div> */}
      <pre className="language-javascript rounded-lg  ">
        <code className="language-javascript ">{code}</code>
      </pre>


    </div>
  )
}

export default Code