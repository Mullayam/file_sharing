import React from "react";

const LandingSection: React.FC = () => {
  return (
    <div className="bg-[#F4F8FA]">
      <div className="md:py-[184px] mx-auto w-max mobile:py-[120px] mobile:px-12 lg:px-[110px] flex md:flex-row mobile:space-x-5 flex-col">
        <div className="w-[505px] justify-center h-[250px] lg:mr-12 grid grid-rows-2 mobile:flex mobile:flex-col font-bold">
          <div className="font-bold mobile:h-full font-fr break-words text-left h-fit md:tracking-[-0.02em] md:text-[48px] md:leading-[4rem] w-[505px] text-coffee mobile:text-5xl">
            Share files on the Go,{" "}
            <span className="text-orange">no need to login!!!</span>
          </div>

          <div className="font-normal text-[1.12rem] tracking-[-0.015em] leading-[2rem] font-inter break-words text-left text-text">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident dolorum itaque optio adipisci nemo, labore consequuntur. Ipsam corrupti vitae provident cumque, ipsum quod, itaque saepe, iure 
          </div>
        </div>

        <div className="relative bg-black mobile:min-w-screen mobile:mx-12 rounded-[20px] md:min-w-[500px] flex-shrink h-[250px]"></div>
      </div>
    </div>
  );
};

export default LandingSection;
