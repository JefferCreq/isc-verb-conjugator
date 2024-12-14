import { useState } from "react";
import { NavLink } from "@remix-run/react";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="antialiased bg-[#402A2B] dark-mode:bg-gray-900 z-40">
      <div className="w-full text-[#ECECEC] bg-[#402A2B]  dark-mode:text-gray-200 dark-mode:bg-gray-800">
        <div className="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
          <div className="flex flex-row items-center justify-between p-4">
            <div className="flex flex-row items-center justify-between h-full">
              <img
                src={"/isc-symbol.svg"}
                className="flex w-5 h-5 mr-2 text-white self-center"
                alt={"Logo"}
              />
              <NavLink
                to="/"
                className=" mt-1 flex text-lg font-semibold tracking-widest text-[#ECECEC] uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline"
              >
                Iskonawa
              </NavLink>
            </div>

            <button
              className="rounded-lg md:hidden focus:outline-none focus:shadow-outline"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
                {isMenuOpen ? (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  />
                ) : (
                  <path d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"></path>
                )}
              </svg>
            </button>
          </div>
          <nav
            className={`flex-col flex-grow pb-4 md:pb-0 md:flex md:justify-end md:flex-row ${
              isMenuOpen ? "flex" : "hidden"
            }`}
          >
            {pages.map(({ href, text }) => (
              <NavLink
                key={href}
                className="px-4 py-2 mt-1 text-base font-normal bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                to={href}
              >
                {text}
              </NavLink>
            ))}
            <a
              className="flex px-2 py-2 text-sm font-normal bg-transparent rounded-lg md:mt-0 md:ml-4"
              href={"https://github.com/JefferCreq/isc-verb-conjugator"}
            >
              <img
                src="/github.svg"
                className="flex w-5 h-5 mx-2 text-white self-center"
                alt="Repositorio"
              />
              <span className="text-base font-normal block md:hidden">Repositorio</span>
            </a>
          </nav>
        </div>
      </div>
    </nav>
  );
}

const pages = [
  {
    href: "/",
    text: "Conjugador Verbal",
  },
  {
    href: "/model",
    text: "Modelo",
  },
  {
    href: "/proyect",
    text: "Proyecto",
  },
];
