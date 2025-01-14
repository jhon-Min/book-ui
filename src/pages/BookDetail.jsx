import React from 'react';
import { useParams } from 'react-router';
import sampleImg from '../../public/img/img-3.webp';

export default function BookDetail() {
  const { id } = useParams();

  return (
    <>
      <img src={sampleImg} className="h-[30rem] w-full object-cover" />

      <div className="grid backdrop-blur-md bg-white/5 w-full h-[31rem] absolute top-[82px] left-0 md:grid-cols-2">
        <img
          src={sampleImg}
          className="rounded-lg w-72 h-[22rem] object-cover mx-auto mt-[70px] md:mt-28 xl:ms-24 xl:mt-20 xl:w-80"
        />
      </div>

      <div className="px-[15px] md:px-[140px] mt-10 text-white mb-[100px]">
        <p className="text-[25px] text-center text-red-500 mb-3">
          Attack of Titan
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
          mollitia, molestiae quas vel sint commodi repudiandae consequuntur
          voluptatum laborum numquam blanditiis harum quisquam eius sed odit
          fugiat iusto fuga praesentium optio, eaque rerum! Provident similique
          accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut
          molestias architecto voluptate aliquam nihil, eveniet aliquid culpa.
        </p>
      </div>
    </>
  );
}
