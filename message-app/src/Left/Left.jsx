import React from 'react'
import Search from './Serach'
// import Logout from './Logout'
import Users from './Users'
import Header from './Header'

function Left() {
  return (
    <div className='w-full bg-black '>
      <div className='h-14 flex items-center '>
        <div className='flex justify-between items-center'>
          <Header />
        </div>
      </div>
      <div className='bg-slate-200 p-[0.5px] w-full '></div>
      <Search />
      <div className=' scrollbar-hidden overflow-y-auto md:overflow-hidden' style={{ minHeight: "calc(92vh - 10vh)" }}>

        <Users />

      </div>
      {/* <Logout /> */}
    </div>
  )
}

export default Left
