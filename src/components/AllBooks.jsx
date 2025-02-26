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

  const {
    data: books,
    error: booksError,
    isLoading: booksLoading,
  } = useQuery({
    queryKey: ['books'], // Query key should be an array in v4+
    queryFn: async () => {
      const res = await api.get('api/v1/books');
      // console.log(res.data);
      return res.data.data;
    },
  });

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
        {booksLoading ? (
          <Spinner color="failure" aria-label="Failure spinner example" />
        ) : books && books.length > 0 ? (
          books.map((book) => (
            <Link key={book.id} to={`/manga/${book.id}`} className="mb-5 block">
              {book.bookProfile && (
                <img
                  src={book.bookProfile}
                  className="rounded-md h-[230px] w-full object-cover"
                  alt={book.name}
                />
              )}
              <h1 className="mt-2 text-[20px] text-center font-semibold">
                {book.name}
              </h1>
              <p className="text-center text-red-500">Chapter 100</p>
            </Link>
          ))
        ) : (
          <div>No books found</div>
        )}
      </div>
    </div>
  );
}
