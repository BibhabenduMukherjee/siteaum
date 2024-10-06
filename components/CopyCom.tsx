"use client"

import { CopyIcon } from "lucide-react";
import { useState } from "react";

export function CopyCom({code} : {code :string}) {
    const [textToCopy] = useState('This is the text to copy'); // The text you want to copy

    const handleCopyClick = () => {
      navigator.clipboard.writeText(code)
        .then(() => {
          alert('Text copied to clipboard!');
        })
        .catch(err => {
          console.error('Failed to copy text: ', err);
        });
    };
  
    return (
      <button 
        onClick={handleCopyClick} 
        className='dark:bg-slate-700 bg-white hover:bg-slate-200 dark:hover:bg-slate-800 rounded-sm relative p-2'
      >
        <CopyIcon />
      </button>
    );
}


