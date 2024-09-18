import React from 'react'
import Image from "next/image"

import Link from 'next/link'
import Code from "./Code"
import { urlFor } from '@/lib/urlFor'
import { TableRoww } from './TableRow'
import { Table } from './ui/table'

export const RichTextComponents = {
  types: {
    image: ({ value }: any) => {
      return (
        <div style={{ display: "flex", marginBottom: "20px", justifyContent: "center" }}>
          <img style={{ width: "70%", height: "40%" }} src={urlFor(value).url()} />
        </div>
      )
    },
    code: ({ value }: any) => {
      const { code, filename, language } = value;
      return (
        <Code code={code} filename={filename} language={language} />
      );
    },

  
      sizeChart : ({value} : any) => {
        return (
          <Table className='bg-blue-400/25 mt-16 rounded-md'>
            {value.rows.map((row:any)  =>
              <TableRoww row={row} />)}
          </Table>
        )
    
    
    },

    callout: ({ value }: any) => {
      return (
        <div className="border-2 border-yellow-500 p-4 rounded-md bg-yellow-100 dark:border-blue-500 dark:bg-blue-50 dark:text-white/70">
          <p>{value}</p>
        </div>
      )
    }

  },


  list: {
    bullet: ({ children }: any) => (
      <div className= "max-w-2xl mx-auto">
      <ul style={{ textAlign: "justify" }}  className=' ml-4 md:ml-8 dark:text-white/80  selection:bg-yellow-300 dark:selection:bg-blue-500  text-black/70  py-1 list-disc text-[15px] md:text-[16px] space-y-2'>{children}</ul>

      </div>
    ),
    number: ({ children }: any) => (
      <ol className='ml-4 py-1 list-disc space-y-5 '>{children}</ol>
    ),
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-4xl  dark:text-yellow-300 selection:bg-yellow-300 dark:selection:bg-blue-500 py-5 font-bold">{children}</h1>
    ),

    h2: ({ children }: any) => (
      <h2 className="text-3xl  dark:text-yellow-300  selection:bg-yellow-300 dark:selection:bg-blue-500 py-5 font-bold">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className=" text-black  dark:text-yellow-400/85 text-2xl py-5 font-bold  selection:bg-yellow-300 dark:selection:bg-blue-500">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-xl py-5 font-bold  selection:bg-yellow-300 dark:selection:bg-blue-500">{children}</h4>
    ),

    h5: ({ children }: any) => (
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 mt-4 shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Important Highlight</h2>
          <p className="text-gray-700 dark:text-gray-300">
            {children}
          </p>
        </div>
      </div>
    ),
   //add some extra here
    normal: ({ children }: any) => {
      return <p style={{ textAlign: "justify", marginBottom: 6, lineHeight: 1.7 }} className=' selection:bg-yellow-300 dark:selection:bg-blue-500  dark:text-white/80  text-black/70 text-[15px] md:text-[17px]'>{children}</p>
    },

    blockquote: ({ children }: any) => (
      <blockquote className='border-l-[#F7AB0A]  selection:bg-yellow-300 dark:selection:bg-blue-500 text-lg border-l-4 pl-5 py-2 my-5 '>"{children}"</blockquote>
    )

    ,


  },

  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith("/")
        ? "noreferrer noopener" : undefined

      return (
        <Link href={value.href} rel={rel} className="underline decoration-[#F7AB0A] hover:decoration-black">{children}</Link>
      )
    },
    // code: ({code}: any) => {
    //   <div className='m-2 md:mx-auto flex flex-col'>
    //   <Code code = {code}/>
    //   </div>
    // },

  }


}

