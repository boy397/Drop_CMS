import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  setAuth: (token: string, user: User) => void;
  logout: () => void;
  init: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  setAuth: (token, user) => {
    localStorage.setItem('cms_admin_token', token);
    localStorage.setItem('cms_admin_user', JSON.stringify(user));
    set({ token, user });
  },
  logout: () => {
    localStorage.removeItem('cms_admin_token');
    localStorage.removeItem('cms_admin_user');
    set({ token: null, user: null });
  },
  init: () => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('cms_admin_token');
      const userStr = localStorage.getItem('cms_admin_user');
      if (token && userStr) {
        try {
          const user = JSON.parse(userStr);
          set({ token, user });
        } catch {
          localStorage.removeItem('cms_admin_token');
          localStorage.removeItem('cms_admin_user');
        }
      }
    }
  },
}));
