import React from 'react'

const page = () => {
  return (
    <>
      <div className='flex flex-col gap-3 justify-center items-center text-white h-[44vh]'>
        <div className="font-bold text-5xl flex items-center">
          Buy Me a Chai
          <img className='w-20' src="tea.gif" alt="tea" />
        </div>
        <p>A crowdfunding platform for creators. Get funded by your fans and followers. Start now!</p>
        <div>
          <button type="button" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Start Here</button>
          <button type="button" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Read More</button>
        </div>
      </div>
      <div className="h-[0.15rem] bg-white opacity-20"></div>

      <div className="text-white container mx-auto pb-14">
        <h2 className="text-2xl font-bold text-center my-14">Your fans can buy you a Chai</h2>
        <div className="flex justify-around mx-16">
          <div className="item space-y-3 flex flex-col justify-center items-center">
            <img className='bg-slate-400 rounded-full p-2 text-black w-24' src="man.gif" alt="men" />
            <p className="font-bold text-lg">Fund Yourself</p>
            <p className='text-center'>Your fans are available for you to help you</p>
          </div>
          <div className="item space-y-3 flex flex-col justify-center items-center">
            <img className='bg-slate-400 rounded-full p-2 text-black w-24' src="coin.gif" alt="men" />
            <p className="font-bold text-lg">Fund Yourself</p>
            <p className='text-center'>Your fans are available for you to help you</p>
          </div>
          <div className="item space-y-3 flex flex-col justify-center items-center">
            <img className='bg-slate-400 rounded-full p-2 text-black w-24' src="group.gif" alt="men" />
            <p className="font-bold text-lg">Fund Yourself</p>
            <p className='text-center'>Your fans are available for you to help you</p>
          </div>
        </div>
      </div>
      <div className="h-[0.15rem] bg-white opacity-20"></div>

      <div className="text-white flex flex-col justify-center items-center pb-14">
        <h2 className="text-2xl font-bold text-center my-14">Learn more about us</h2>
        <iframe className='overflow-hidden rounded-xl' width="560" height="315" src="https://www.youtube.com/embed/3pZ8QQY1OPs?si=piQ-PLIt5YnZS29P" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>
    </>
  )
}

export default page

