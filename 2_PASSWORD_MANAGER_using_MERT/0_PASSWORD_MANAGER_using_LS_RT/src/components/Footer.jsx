import React from 'react'

const Footer = () => {
  return (
    <div className='bg-slate-800 w-full text-center text-white fixed bottom-0'>
      <div className='logo font-bold text-lg opacity-90'>
            <span className="text-green-500">&lt;</span>
            Pass
            <span className="text-green-500">OP/&gt;</span>
      </div>
      <div className='opacity-70 text-sm'>Created with <img className='w-5 inline' src="heart.webp" alt="heart" /> by HrittikSingh</div>
    </div>
  )
}

export default Footer
