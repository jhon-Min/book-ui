import { NavLink } from 'react-router';
import logo from '../../public/img/logo.png';
import './Navbar.css';
import { HiHome } from 'react-icons/hi';

export default function Navbar() {
  return (
    <>
      <nav className="bg-[#101720] p-[15px] sm:px-[140px] flex items-center justify-between">
        <div className=" flex items-center">
          <img src={logo} className="mr-4 w-[55px]" />
          <h3 className=" text-white text-[30px]">BMU</h3>
        </div>

        <div className=" text-white text-[20px] hidden md:block">
          <NavLink
            to="/"
            className="mr-[50px] hover:text-red-500 transcation-colors duration-300 ease-in-out"
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            className="mr-[50px] hover:text-red-500 transcation-colors duration-300 ease-in-out"
          >
            About
          </NavLink>

          <button
            type="button"
            class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-[16px] px-6 py-2.5 text-center"
          >
            Login
          </button>
        </div>
      </nav>

      <nav className="md:hidden fixed bottom-0 left-0 z-50 w-full h-[75px] bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
        <div className="px-[15px] flex items-center justify-around">
          <NavLink
            to="/"
            className="mr-[50px] hover:text-red-500 transcation-colors duration-300 ease-in-out"
          >
            <HiHome className="text-[30px] text-center" />
            Home
          </NavLink>

          <NavLink
            to="/"
            className="mr-[50px] hover:text-red-500 transcation-colors duration-300 ease-in-out"
          >
            <HiHome className="text-[30px]" />
            Home
          </NavLink>

          <NavLink
            to="/"
            className="mr-[50px] hover:text-red-500 transcation-colors duration-300 ease-in-out"
          >
            <HiHome className="text-[30px]" />
            Home
          </NavLink>
        </div>
      </nav>
    </>
  );
}
