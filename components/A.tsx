"use client"
import { TypeAnimation } from 'react-type-animation';
export default function A(){
    return (
        <div>
               <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        "Let's share love",
        1000, // wait 1s before replacing "Mice" with "Hamsters"
        "Let's share knowledge",
        1000,
        "Let's share awareness",
        1000,
        "Let's create mind",
        1000
      ]}
      wrapper="span"
      speed={70}
      style={{ fontSize: '1.7em', color: 'red', display: 'inline-block' }}
      repeat={Infinity}
    />
        </div>
    )
}