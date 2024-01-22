import { defineStore } from 'pinia';

export const useAuth = defineStore('auth', {
  state: () => ({
    isAuth: false,
    isAdmin: false,
  }),

  actions: {
    setAuth(payload: boolean) {
      this.isAuth = payload;
    },
    setAdmin(payload: boolean) {
      this.isAdmin = payload;
    },
  },
});
