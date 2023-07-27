import React from 'react'

type Props = {}

const Suggestions = (props: Props) => {
    const suggestion = ["Build a real startup, not just a Linked page or PPT of your idea", "Don’t have an idea? Still you can apply, if you are widly to build the next big thing"]

    return (
        <div className='max-h-[400px] w-screen my-[100px] h-full'>
            <div className='mx-[100px] flex flex-row justify-center scale-y-100'>
                {suggestion.map((item, index) => (
                    <div key={index} className='max-w-[520px] min-w-[500px] rounded-[1.25rem] my-auto mr-[65px] border border-[#D7D7D7] min-h-[200px]'>
                        <p className='text-[1.5rem] my-[4rem] mx-[3rem] font-fr min-w-[402] text-textHighlight leading-[30px]'>
                            {item}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Suggestions;