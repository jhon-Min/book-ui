import useAuthStore from '../store/useAuthStore';
import { HiArrowRightStartOnRectangle } from 'react-icons/hi2';

export default function UserProfileComp() {
  const { user, logout } = useAuthStore();
  return (
    <>
      <div className="w-full md:w-1/1.5">
        <div className="my-20 mx-5 md:mx-[150px] p-5 bg-[#101720] rounded-[10px] flex justify-center">
          <div>
            <h2 className="text-2xl text-white font-bold mb-2">{user.name}</h2>
            <p className="text-white text-sm font-light mb-10">{user.email}</p>

            <button
              onClick={() => logout()}
              className="flex items-center justify-center w-full  px-4 py-2 text-white bg-red-500 rounded-lg shadow-md hover:bg-red-600 transition"
            >
              <HiArrowRightStartOnRectangle />
              <span className="font-medium ms-2">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
