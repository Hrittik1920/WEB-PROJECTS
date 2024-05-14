import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex h-14 items-center justify-between bg-slate-800 text-white md:px-40 px-3'>
      <div className='logo font-bold text-xl'>
            <span className="text-green-500">&lt;</span>
            Pass
            <span className="text-green-500">OP/&gt;</span>
      </div>
      <div className='flex gap-1 items-center bg-green-500 rounded-full px-2 py-1 ring-green-700 ring-1'> 
        <img className='invert w-7' src="github.svg" alt="github" />
        <p className=''>Github</p>
      </div>
    </nav>
  )
}

export default Navbar
