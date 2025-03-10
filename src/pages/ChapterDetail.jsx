import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router';
import api from '../api/api';
import { Spinner } from 'flowbite-react';
import useAuthStore from '../store/useAuthStore';

export default function ChapterDetail() {
  const { id } = useParams();
  const { token } = useAuthStore();
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ['chapter'],
    queryFn: async () => {
      if (!token) {
        navigate('/profile');
      }
      const res = await api.get(`api/v1/chapters/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },
    enabled: !!id,
  });

  console.log('Chapter Detail', data);

  if (isLoading) {
    return (
      <div className=" flex items-center  justify-center h-screen">
        <Spinner color="failure" aria-label="Failure spinner example" />;
      </div>
    );
  }

  if (error) {
    return <div>Error loading chapters: {error.message}</div>;
  }

  return (
    <>
      <div className="text-center">
        <h1 className="mt-7 text-white text-2xl ">{data.name}</h1>
        <p className="mt-2 text-white text-lg">
          <span className="text-red-500 mr-1">{data.coin}</span>
          coins
        </p>
      </div>
    </>
  );
}
