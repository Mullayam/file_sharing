import { nav_items } from "@/constants";
import { useEffect } from "react";
import { Link, redirect, useNavigate, useSearchParams } from "react-router-dom";

const Header = () => {
  const [params, setParams] = useSearchParams();
  const navaigate = useNavigate();
  const newURL = params.toString().split("=")[1];

  useEffect(() => {
    navaigate(newURL);
  }, [params]);

  return (
    <nav className="fixed w-screen min-h-[10vh] flex flex-row py-[10px] text-center shadow-md mobile:w-screen bg-review justify-between items-center mx-auto md:px-12 mobile:px-6 inset-x-0 border-b border-b-gray-200 top-0 z-10">
      {/* Nav  items left*/}
      <div className="flex items-center">
        <Link
          to={"/"}
          className="h-10 w-10 md:mr-[1rem] max-w-full inline-block"
        >
          <img
            src="http://localhost:5173/assets/logo.png"
            height={128}
            width={100}
            alt={"128"}
            className="flex-1 w-full rounded-full border border-gray shadow shadow-orange"
          />
        </Link>
        {/* nav-simple-content */}
        <div className="mobile:hidden md:block items-center">
          <ul className="flex gap-2 rounded-sm object-contain text-text font-semibold">
            {nav_items.map(({ title, path }, index) => (
              <Link key={index} to={path}>
                <li className="hover:bg-white px-4 py-1 rounded-lg">{title}</li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
      {/* Nav items right */}
      <div className="flex flex-nowrap flex-row text-[.999rem] min-w-[245px]"></div>
    </nav>
  );
};

export default Header;
