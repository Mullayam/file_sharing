

const Features = () => {

    const features: string[] = [
        "Learning",
        "Resources",
        "Mentorship",
        "Funding",
        "Credits",
        "Product Development",
    ]

    return (
        <div className='text-black mobile:h-full md:h-screen md:w-screen bg-featuredbg flex flex-col md:px-[223px] md:py-[92px] mobile:p-0'>
            
            <div className='min-w-[557px] mx-auto max-w-[600px] h-[100px] inline-block mb-10'>
                <p className=' text-[#2A303B] md:text-[2.25rem] font-fr font-semibold tracking-[-0.04em] h-fit leading--[4rem] leading-[44.39px] mobile:text-[2.5rem] text-center'>
                    You may wonder... How does a high
                    schoolers do all this?
                </p>
            </div>

            <div className='w-[740px] mx-auto min-w-[768px] text-lg mb-10 p-4 text-[18px] font-inter tracking-[-0.015em] leading-[2rem] flex-col text-[#606970] '>
                <p className='block mb-9 w-full text-center'>
                    It’s because we are not just another Entrepreneurship Bootcamp or Summer Program
                    where teens attend online workshops/classes and work on some ppt presentations.
                </p>
                <p className='block w-full text-center'>
                    We are the only entrepreneurship program where teens learn entrepreneurship  and start
                    working on their ideas by cofounding the startups with startup studios and accelerators.
                </p>
            </div>
            
            <div className='mx-auto w-[834px] grid gap-10 font-fr md:grid-cols-3 md:grid-rows-2'>
                {features.map((feature, index) => (
                    <button key={index} className='mobile:basis-[16.66%]outline-black min-w-[250px] min-h-[50px] bg-[#ffffff]  text-[1.25rem] border border-[#d7d7d7] rounded-[20px] font-normal'>
                        {feature}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Features;