import React from 'react'

function Error404() {
  return (
    <div className='flex relative'>
    <div className='md:py-[104px] max-w-screen w-full mx-auto text-center flex flex-col justify-center items-center'>

        {/* Headline */}
        <div className=''>
                <span className='font-fr font-bold leading-[118px] text-[96px] text-orange'>404</span>
                <p className='text-text break-words text-bold text-xl'>
                    Page Not Found
                </p>
            </div>

        

       
    </div>
</div>
  )
}

export default Error404