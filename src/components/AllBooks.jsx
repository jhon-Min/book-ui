import { HiChevronDoubleRight } from 'react-icons/hi';
import { Card } from 'flowbite-react';
import sampleImg from '../../public/img/img-3.webp';
import newImg from '../../public/img/new.gif';

export default function AllBooks() {
  return (
    <div className="px-[15px] md:px-[150px] mt-8 md:mt-[60px]">
      <h1 className="text-white text-[22px] md:text-[30px] font-bold italic mb-0">
        All Books
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-5 text-white">
        <div className="mb-5 ">
          <img
            src={newImg}
            className="h-[100px] object-cover absolute mt-[-2rem] ms-1"
          />
          <img
            src={sampleImg}
            className=" rounded-md h-[230px] w-full object-cover"
          />
          <h1 className="mt-2 text-[20px] text-center font-semibold">
            Attack of Titan
          </h1>
          <p className="text-sm text-center text-red-500">Chapter 12</p>
        </div>

        <div className="mb-5 ">
          <img
            src={newImg}
            className="h-[100px] object-cover absolute mt-[-2rem] ms-1"
          />
          <img
            src={sampleImg}
            className=" rounded-md h-[230px] w-full object-cover"
          />
          <h1 className="mt-2 text-[20px] text-center font-semibold">
            Attack of Titan
          </h1>
          <p className="text-sm text-center text-red-500">Chapter 12</p>
        </div>
      </div>
    </div>
  );
}
