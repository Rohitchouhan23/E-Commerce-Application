import React from 'react'

function X({ className = "" }) {
  return (
    <div>
        <div className={`flex flex-col justify-center align-center gap-1.5 w-10 h-10 ${className}`}>
        <span className='absolute h-0.5 w-7 bg-current rounded-full rotate-45 text-black'/>
        <span className='absolute h-0.5 w-7 bg-current rounded-full -rotate-45 text-black'/>
        </div>
        
    </div>
  )
}

export default X;