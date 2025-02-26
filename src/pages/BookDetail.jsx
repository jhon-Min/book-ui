import React from 'react';
import { useParams } from 'react-router';
import sampleImg from '../../public/img/img-3.webp';
import { useQuery } from '@tanstack/react-query';
import api from '../api/api';
import { Spinner } from 'flowbite-react';

export default function BookDetail() {
  const { id } = useParams();

  const {
    data: detailData,
    error: detailErr,
    isLoading: detailLoading,
  } = useQuery({
    queryKey: ['detail'],
    queryFn: async () => {
      const res = await api.get(`api/v1/books/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  const { data, error, isLoading } = useQuery({
    queryKey: ['chapters', BookDetail?.id],
    queryFn: async () => {
      const res = await api.get(`api/v1/chapters/${detailData.id}/book`);
      return res.data;
    },
  });

  console.log('Chapters', data);

  if (detailLoading) {
    return (
      <div className=" flex items-center  justify-center h-screen">
        <Spinner color="failure" aria-label="Failure spinner example" />;
      </div>
    );
  }

  return (
    <>
      <img
        src={detailData.bookProfile}
        className="h-[30rem] w-full object-cover"
      />

      <div className="grid backdrop-blur-md bg-white/5 w-full h-[31rem] absolute top-[82px] left-0 md:grid-cols-2">
        <img
          src={detailData.bookProfile}
          className="rounded-lg w-72 h-[22rem] object-cover mx-auto mt-[70px] md:mt-28 xl:ms-24 xl:mt-20 xl:w-80"
        />
      </div>

      <div className="px-[15px] md:px-[140px] mt-10 text-white mb-[150px]">
        <p className="text-[25px] text-center text-red-500 mb-3">
          {detailData?.name || '---'}
        </p>
        <p>{detailData?.description || '......'}</p>

        <hr className="border-red-500 my-10" />
      </div>
    </>
  );
}
