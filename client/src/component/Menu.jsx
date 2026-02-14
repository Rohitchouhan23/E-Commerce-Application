import React from 'react'

function Menu({ className = "" }) {
  return (
    <div className={`flex flex-col justify-center align-center gap-1.5 w-10 h-10 ${className}`}>
        <span className='block h-0.5 w-7 bg-current rounded-2xl text-black'/>
        <span className='block h-0.5 w-7 bg-current  rounded-2xl text-black'/>
        <span className='block h-0.5 w-7 bg-current rounded-2xl text-black'/>

    </div>
  )
}

export default Menu