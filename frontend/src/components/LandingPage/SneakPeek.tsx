const SneakPeeks = () => {

    const sneakPeek = [{ number: "01", para: "Team up with equally ambitious peers ready to share the founder journey with you." },
    { number: "02", para: "Whether you are a visionary, hustler or hacker, you are invited to join the fellowship to build the next big thing. " },
    { number: "03", para: "Don’t worry about mvp/product development as we connect you with startup studios/accelerators for initial funding support and product development" },
    { number: "04", para: "Develop your entrepreneurial skills working with early stage startups and experience what it takes to build community, get sales, do marketing, come up with new product features & more." },
    ]

    return (
        <div className='w-[70%] h-fit my-[100px] justify-center m-auto items-center'>
            <div className='mx-auto max-h-fit min-w-[463px] mb-[51px]'>
                <h3 className='font-semibold tracking-[-0.04em] text-[2.25rem] font-fr text-sneakpeek text-center'>
                    A sneak peek into the membership plans...
                </h3>
            </div>
            <div className='gap-x-[130px] gap-y-[72px] text-left tracking-[-0.015em] relative leading-[2rem] grid grid-cols-2 grid-rows-2 mx-auto'>
                {sneakPeek.map(({ number, para }, index) => (
                    <div key={index} className='min-w-[450px] flex flex-col mr-[131px] mb-[72px] max-h-[50px] w-full'>
                        <span className="font-fr text-black text-[1.5rem] mb-[1.62rem]">{number}</span>
                        <p className='text-text font-inter text-[1rem] w-[450px] h-fit flex-wrap'>
                            {para}
                        </p>
                    </div>))}
            </div>
        </div>
    )
}

export default SneakPeeks;