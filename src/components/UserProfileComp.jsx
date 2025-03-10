import useAuthStore from '../store/useAuthStore';
import {
  HiArrowRightStartOnRectangle,
  HiMiniCurrencyDollar,
} from 'react-icons/hi2';

export default function UserProfileComp() {
  const { user, logout } = useAuthStore();
  //   console.log('User', user);
  return (
    <>
      <div className="w-full md:w-1/1.5">
        <div className="my-20 mx-5 md:mx-[150px] p-5 bg-[#101720] rounded-[10px] flex flex-col items-center">
          <img
            src={user.image}
            alt="User Profile"
            className="w-28 h-28 rounded-full border-2 border-gray-300 shadow-lg object-cover mb-5"
          />
          <h2 className="text-2xl text-white font-bold mb-2">{user.name}</h2>
          <p className="text-white text-sm font-light mb-5">{user.email}</p>

          <p className="text-white text-center text-xl mb-10">
            {user.points}
            <HiMiniCurrencyDollar className=" inline ms-2" />
          </p>
          <button
            onClick={() => logout()}
            className="flex items-center justify-center w-full  px-4 py-2 text-white bg-red-500 rounded-lg shadow-md hover:bg-red-600 transition"
          >
            <HiArrowRightStartOnRectangle />
            <span className="font-medium ms-2">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
}
