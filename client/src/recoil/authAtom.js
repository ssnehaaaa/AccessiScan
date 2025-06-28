// src/recoil/authAtom.js
import { atom } from 'recoil';

const storedUser = localStorage.getItem("user");
const storedToken = localStorage.getItem("token");

export const authState = atom({
  key: 'authState',
  default: {
    user: storedUser ? JSON.parse(storedUser) : null,
    token: storedToken || null,
    isLoggedIn: !!(storedUser && storedToken),
  },
});
