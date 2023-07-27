
const Achievements = () => {


    return (
        <div className='flex relative'>
            <div className='md:py-[104px] max-w-screen w-full mx-auto text-center flex flex-col justify-center items-center'>

                {/* Headline */}
                <div className="font-bold w-[675px] h-[39px] leading-[39px] font-fr text-center md:text-[2rem] tracking-[-0.04em] text-black mobile:text-[100px] mobile:mb-[52px] min-w-[768px] md:mb-[52px] mobile:h-fit">
                    What’s more, we’re just getting started. Are you?
                </div>

                {/* About */}
                <div className='mb-[52px] max-w-[686px] border border-[#D7D7D7]'>
                    <p className='text-text text-[18px] p-6 tracking-[-0.015em] leading-[2rem] w-full'>In the past two months
                        <span className='text-textHighlight font-medium'>
                            {" "}Millions of users{" "}
                        </span>have downloaded/uploaded over
                        <span className='text-textHighlight font-medium'>
                            {" "} 1TB {" "}
                        </span>
                        files
                    </p>
                </div>

                {/* Achievement */}
                <div className='grid lg:grid-cols-3 gap-5 lg:grid-rows-none xs:grid-rows-3 xs:grid-cols-none text-[18px] p-6 tracking-[-0.015em] leading-[2rem]'>
                    <div className=''>
                        <span className='font-fr font-bold leading-[118px] text-[96px] text-orange'>100m+</span>
                        <p className='text-text break-words'>
                            weekly users
                        </p>
                    </div>
                    <div className=''>
                        <span className='font-fr font-bold leading-[7.37rem] text-[96px] text-orange'>10</span>
                        <p className='text-text'>startups</p>
                    </div>
                    <div className=''>
                        <span className='font-fr font-bold leading-[7.37rem] text-[96px] text-orange'>200MB</span>
                        <p className='text-text'>upload files upto</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Achievements