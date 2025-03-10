import { GLogin } from '../components/gLogin';
import useAuthStore from '../store/useAuthStore';

export default function Login() {
  const { user, token } = useAuthStore();
  console.log('Zustand token', token);
  // console.log('Zustand user', user);
  return <>{user && token ? 'Hello 123' : <GLogin />}</>;
}
