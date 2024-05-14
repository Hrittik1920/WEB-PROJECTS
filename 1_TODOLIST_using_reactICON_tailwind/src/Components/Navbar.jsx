import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-purple-900 p-2 text-white'>
        <div className="logo mx-6">
            <span className='font-bold text-xl cursor-pointer'>iTask</span>
        </div>
      <ul className='flex gap-8 mx-6'>
        <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
        <li className='cursor-pointer hover:font-bold transition-all'>Your Tasks</li>
      </ul>
    </nav>
  )
}

export default Navbar
