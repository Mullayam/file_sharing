import FAQ from '@/components/FAQ';
import { faqs } from '@/constants';
const FAQS = () => {
  return (
    <div
      className={`text-white h-full bg-[#f4f8fa] object-fit scrollbar-thin`}
    >
      <div className="h-full py-[95px] px-10 min-w-full relative mx-auto">
        <div className="mx-auto text-center flex flex-col items-center">
          <h1 className="text-[2.37rem] text-center text-coffee font-fr mx-auto w-full mb-[1.5rem]">
            Frequently Asked Questions
          </h1>

          <p className="text-text text-[1rem] text-center justify-center items-center mb-[20px] min-w-[700px] mx-auto flex">
            If you can&apos;t find the answer to your question, please contact
            us at <span>amit@teensfounder.com</span>
          </p>
        </div>
       {/*  <div className="w-full max-h-[50px]  rounded-[15px] justify-center align-middle mb-[50px] flex">
          <div className="bg-[#fff] mx-auto  w-fit border-[1px_solid_rgba(0,0,0,0)] p-[10px_20px] border shadow-md">
            
            {faqs.map(({ section }) => (
              <a
                id={section}
                className="text-orange px-2 hover:cursor-pointer py-1 w-fit"
                key={section}
              >
                {section}
              </a>
            ))}
          </div>
        </div> */}
        <div className="w-full h-full">
          {faqs?.map(({ section, questions }, index) => (
            <FAQ questions={questions} section={section} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FAQS