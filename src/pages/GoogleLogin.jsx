import { useAuthState } from 'react-firebase-hooks/auth';
import { signInWithGoogle, auth } from '../helper/firebase';

const GoogleLogin = () => {
  const [user, loading, error] = useAuthState(auth);

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Error during sign-in:', error);
    }
  };

  const handleSignOut = () => {
    auth.signOut();
  };

  console.log('User', user);

  return (
    <div>
      {user ? (
        <div>
          <button
            onClick={handleSignOut}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <button
          onClick={handleSignIn}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Sign In with Google
        </button>
      )}
    </div>
  );
};

export default GoogleLogin;
