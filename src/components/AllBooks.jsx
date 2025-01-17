import { Link } from 'react-router';
import sampleImg from '../../public/img/img-3.webp';
import newImg from '../../public/img/new.gif';
import Category from './Category';
import api from '../api/api';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Spinner } from 'flowbite-react';

export default function AllBooks() {
  const [genres, setGenres] = useState([]);

  const getGenres = async () => {
    try {
      const { data } = await api.get('api/v1/genres');
      setGenres(data.data);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    getGenres();
  }, []);
  console.log(genres);

  return (
    <div className="px-[15px] md:px-[150px] mt-8 md:mt-[70px] mb-[120px]">
      <h1 className="text-white text-[22px] md:text-[30px] font-bold italic mb-0">
        All Books
      </h1>

      <div className="mt-[20px] mb-[35px]">
        {genres.length > 0 ? (
          genres.map((item) => {
            return <Category key={item.id} name={item.name} />;
          })
        ) : (
          <Spinner color="failure" aria-label="Failure spinner example" />
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-5 text-white">
        <Link to="/manga/1" className="mb-5 ">
          <img
            src={newImg}
            className="h-[100px] object-cover absolute mt-[-0.5rem] ms-1"
          />
          <img
            src={sampleImg}
            className=" rounded-md h-[230px] w-full object-cover"
          />
          <h1 className="mt-2 text-[20px] text-center font-semibold">
            Attack of Titan
          </h1>
          <p className="text-center text-red-500">Chapter 12</p>
        </Link>
      </div>
    </div>
  );
}
