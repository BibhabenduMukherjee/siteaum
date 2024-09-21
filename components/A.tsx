"use client"
import { TypeAnimation } from 'react-type-animation';
export default function A(){
    return (
        <div>
               <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        "Master in DSA",
        1000, // wait 1s before replacing "Mice" with "Hamsters
        "Master in C++",
        1000,
        "Master in Web dev",
        1000,
        "Master in Devops",
        1000,
        "Master in Design",
        1000,
        "Master in ML",
        
        
      ]}
      wrapper="span"
      speed={60}
      style={{ fontSize: '1.4em', color: 'red', display: 'inline-block' }}
      repeat={Infinity}
    />
        </div>
    )
}