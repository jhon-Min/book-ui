import { HiOutlineLogin } from 'react-icons/hi';
import { signInWithGoogle, auth } from '../helper/firebase';
import api from '../api/api';
import { successNoti } from '../helper/notiMessage';
import { useMutation } from '@tanstack/react-query';
import { Spinner } from 'flowbite-react';
import { useState } from 'react';
import useAuthStore from '../store/useAuthStore';

export function GLogin({
  title = 'Welcome Back',
  description = 'Sign in to continue',
}) {
  const { setUser, setToken } = useAuthStore();
  const [isLoggedIn, setLoggedIn] = useState(false); // New state

  const useSignIn = (setLoggedIn) => {
    return useMutation({
      mutationFn: async () => {
        const loginData = await signInWithGoogle();
        const authToken = loginData.accessToken;
        console.log('firebase token', authToken);
        if (authToken) {
          const res = await api.post(`api/v1/login`, {
            token: authToken,
          });
          return res;
        }
        throw new Error('No auth token received');
      },
      onSuccess: (data) => {
        const res = data.data;
        console.log('Login Res', res);
        setToken(res.accessToken);
        setUser({
          id: res.id,
          name: res.name,
          email: res.email,
        });
        successNoti('Login Success');
        setLoggedIn(true);
      },
      onError: (error) => {
        console.error('Error during sign-in:', error);
      },
    });
  };

  const mutation = useSignIn(setLoggedIn);

  const handleSignIn = () => {
    mutation.mutate();
  };

  const handleSignOut = () => {
    auth.signOut();
  };

  return (
    <div className="flex justify-center mt-[100px]">
      <div className="w-[80%] py-10 bg-[#101720] rounded-[10px] px-5 text-center text-white">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-gray-600 mb-10">{description}</p>
        <button
          onClick={handleSignIn}
          disabled={mutation.isLoading || isLoggedIn}
          className="flex items-center justify-center w-full  px-4 py-2 text-white bg-red-500 rounded-lg shadow-md hover:bg-red-600 transition"
        >
          {mutation.isLoading ? (
            <Spinner color="failure" />
          ) : (
            <>
              <HiOutlineLogin className="w-6 h-6 mr-2" />
              <span className="font-medium">Sign in with Google</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
