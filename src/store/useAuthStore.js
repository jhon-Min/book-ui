import { create } from 'zustand';

const saveToSessionStorage = (key, value) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

const loadFromSessionStorage = (key) => {
  const value = sessionStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

const useAuthStore = create((set) => ({
  user: loadFromSessionStorage('user'),
  token: loadFromSessionStorage('token'),

  setUser: (user) => {
    set({ user });
    saveToSessionStorage('user', user);
  },
  setToken: (token) => {
    set({ token });
    saveToSessionStorage('token', token);
  },
  logout: () => {
    set({ user: null, token: null });
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
  },
}));

export default useAuthStore;
