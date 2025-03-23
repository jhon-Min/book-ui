import { Link, useNavigate } from 'react-router';
import sampleImg from '../../public/img/img-3.webp';
import newImg from '../../public/img/new.gif';
import Category from './Category';
import api from '../api/api';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Spinner, Button } from 'flowbite-react';
import { limitWords, getRandomItems } from '../helper/util';

export default function AllBooks() {
  const [genres, setGenres] = useState([]);
  const navigate = useNavigate();

  const {
    data: books,
    error: booksError,
    isLoading: booksLoading,
  } = useQuery({
    queryKey: ['books'], // Query key should be an array in v4+
    queryFn: async () => {
      const res = await api.get('api/v1/books');
      const random = getRandomItems(res.data.data, 6);

      const filterHotBooks = res.data.data.filter((x) => x.isHot);
      const randomHotBooks = getRandomItems(
        filterHotBooks,
        filterHotBooks.length >= 6 ? 6 : filterHotBooks.length
      );

      return { random, hotBooks: randomHotBooks };
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

  function goToBook() {
    navigate('books');
  }

  return (
    <>
      <div className="px-[15px] md:px-[150px] mt-8 md:mt-[70px] mb-[60px]">
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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mt-5 text-white">
          {booksLoading ? (
            <Spinner color="failure" aria-label="Failure spinner example" />
          ) : books && books.random.length > 0 ? (
            books.random.map((book) => (
              <Link
                key={book.id}
                to={`/manga/${book.id}`}
                className="mb-5 design pb-4 px-2 pt-2 block relative"
              >
                {book.isHot ? <img src={newImg} className="fire" /> : ''}
                {book.bookProfile && (
                  <img
                    src={book.bookProfile}
                    className="rounded-md h-[230px] w-full object-cover"
                    alt={book.name}
                  />
                )}

                {book.status == 'COMPLETE' ? (
                  <p className="status bg-red-500 absolute top-2 right-[8px] shadow">
                    {book.status}
                  </p>
                ) : (
                  <p className="status bg-green-500 absolute top-2 right-[8px] shadow">
                    {book.status}
                  </p>
                )}
                <h1 className="mt-[7px] text-[17px] text-center font-semibold">
                  {limitWords(book.name, 2)}
                </h1>

                <p className="text-center text-[13px] text-white">
                  Chapter 100
                </p>
              </Link>
            ))
          ) : (
            <div>No books found</div>
          )}
        </div>

        <div className="flex justify-center mt-3">
          <button class="fancy-btn py-2 px-4" onClick={() => goToBook()}>
            See more
          </button>
        </div>
      </div>

      <div className="px-[15px] md:px-[150px]">
        <hr className="hrColor" />
      </div>

      <div className="px-[15px] md:px-[150px] mt-8 md:mt-[50px] mb-[100px]">
        <h1 className="text-white text-[22px] md:text-[30px] font-bold italic mb-0">
          Admin Selection
        </h1>

        {/* <div className="mt-[20px] mb-[35px]">
          {genres.length > 0 ? (
            genres.map((item) => {
              return <Category key={item.id} name={item.name} />;
            })
          ) : (
            <Spinner color="failure" aria-label="Failure spinner example" />
          )}
        </div> */}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mt-5 text-white">
          {booksLoading ? (
            <Spinner color="failure" aria-label="Failure spinner example" />
          ) : books && books.hotBooks.length > 0 ? (
            books.hotBooks.map((book) => (
              <Link
                key={book.id}
                to={`/manga/${book.id}`}
                className="mb-5 design pb-4 px-2 pt-2 block relative"
              >
                {book.isHot ? <img src={newImg} className="fire" /> : ''}
                {book.bookProfile && (
                  <img
                    src={book.bookProfile}
                    className="rounded-md h-[230px] w-full object-cover"
                    alt={book.name}
                  />
                )}

                {book.status == 'COMPLETE' ? (
                  <p className="status bg-red-500 absolute top-2 right-[8px] shadow">
                    {book.status}
                  </p>
                ) : (
                  <p className="status bg-green-500 absolute top-2 right-[8px] shadow">
                    {book.status}
                  </p>
                )}
                <h1 className="mt-[7px] text-[17px] text-center font-semibold">
                  {limitWords(book.name, 2)}
                </h1>

                <p className="text-center text-[13px] text-white">
                  Chapter 100
                </p>
              </Link>
            ))
          ) : (
            <div>No books found</div>
          )}
        </div>
      </div>
    </>
  );
}
