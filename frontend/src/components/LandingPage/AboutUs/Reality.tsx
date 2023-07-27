import React from 'react'

type Props = {}

const Reality = (props: Props) => {
    return (
        <div className='h-full flex flex-col mobile:gap-5 text-black text-center w-full py-[5.3rem] mx-auto'>
            <h3 className="w-fit md:mb-12 mx-auto font-fr font-semibold text-[3rem] items-center text-textHighlight">
                The harsh reality is that...
            </h3>
            <p className='capitalize m-auto min-w-[750px] w-[750px]  text-[1.12rem] tracking-[-0.015em] leading-[2rem] text-text'>
                These Entrepreneurship Bootcamps or Summer Programs are not gonna help you
                in anyway to build a startup if you have an idea as their goal is to make money
                selling you dreams of Entrepreneurship by offering you some workshops/video
                lectures/e-learning programs
            </p>
        </div>
    )
}

export default Reality