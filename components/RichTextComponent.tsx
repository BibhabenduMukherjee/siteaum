import React from 'react'
import Image from "next/image"

import Link from 'next/link'
import Code from "./Code"
import { urlFor } from '@/lib/urlFor'
export const  RichTextComponents = {
    types: {
      image: ({value} :any) => {
         return (
          <div style={{display: "flex" , marginBottom : "20px", justifyContent : "center"}}>
<img  style={{width : "70%",height:"40%"}} src= {urlFor(value).url()} />
</div>
         )
      },
      code: ({ value }:any) => {
        const { code, filename, language } = value;
        return (
          <Code  code={code}  filename = {filename} language = {language}  />
        );
      },
     
    },

   
        list : {
  bullet : ({children} : any)=>(
    <ul className=' ml-4 md:ml-8 py-1 list-disc text-[15px] md:text-[16px] space-y-2'>{children}</ul>
  ),
  number  : ({children} : any)=> (
    <ol className='ml-4 py-1 list-disc space-y-5 '>{children}</ol>
  ),
  },
    block : {
    h1: ({children} : any)=>(
        <h1 className = "text-4xl py-5 font-bold">{children}</h1>
    ),
  
    h2: ({children} : any)=>(
        <h2 className = "text-3xl py-5 font-bold">{children}</h2>
    ),
    h3: ({children} : any)=>(
        <h3 className = " text-green-700 text-2xl py-5 font-bold">{children}</h3>
    ),
    h4: ({children} : any)=>(
        <h4 className = "text-xl py-5 font-bold">{children}</h4>
    ),

    normal : ({children} : any)=>{
     return <p style={{ textAlign : "justify" , lineHeight : 1.7}} className='  dark:text-white/60  text-black/70 text-[15px] md:text-[17px]'>{children}</p>
    },
   
    blockquote : ({children} : any) => (
        <blockquote className='border-l-[#F7AB0A] text-lg border-l-4 pl-5 py-2 my-5 '>"{children}"</blockquote>
    )
    
    ,

   
  },

    marks:{
    link : ({children , value} : any) => {
        const rel = !value.href.startsWith("/") 
           ? "noreferrer noopener" : undefined

           return (
            <Link href = {value.href} rel = {rel}  className ="underline decoration-[#F7AB0A] hover:decoration-black">{children}</Link>
           )
    },
    // code: ({code}: any) => {
    //   <div className='m-2 md:mx-auto flex flex-col'>
    //   <Code code = {code}/>
    //   </div>
    // },
  
  }
  
      
}

