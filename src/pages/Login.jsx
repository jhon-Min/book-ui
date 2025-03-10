import { GLogin } from '../components/gLogin';
import UserProfileComp from '../components/UserProfileComp';
import useAuthStore from '../store/useAuthStore';

export default function Login() {
  const { user, token } = useAuthStore();
  console.log('Zustand token', token);
  console.log('Zustand user', user);
  return <>{user && token ? <UserProfileComp /> : <GLogin />}</>;
}
