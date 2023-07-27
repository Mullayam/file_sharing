import React from 'react'
import { Disclosure } from '@headlessui/react'
import { IoMdArrowDropdown } from 'react-icons/io'

type Props = {
    questions: {
        question: string;
        answer: string;
    }[];
    section: string;
}

const FAQ = (props: Props) => {
    
    return (
        <div className="w-full px-4 pt-16">
            <h2 id={props.section} className='mx-auto text-[1.75rem] text-text font-fr font-bold items-center justify-center flex mb-5'>
                    {props.section}
            </h2>
            {props.questions.map(({ question, answer }, index) => (
                <div  className="mx-auto min-w-[770px] w-full max-w-[780px] items-center justify-center  mb-5 rounded-2xl bg-white p-2" key={index}>
                    <Disclosure>
                        {({ open }) => (
                            <>
                                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-white px-4 py-2 text-left text-sm font-medium text-black hover:bg-text-30  ">
                                    <span className='text-[1.375rem] py-[28px]'>{question}</span>
                                    <IoMdArrowDropdown
                                        className={`${open ? 'rotate-180 transform' : ''
                                            } h-5 w-5 text-text`}
                                    />
                                </Disclosure.Button>
                                <Disclosure.Panel className="px-4 pb-2 text-sm text-text">
                                    {answer}
                                </Disclosure.Panel>
                            </>
                        )}
                    </Disclosure>
                </div>
            ))}
        </div>
    )
}

export default FAQ;