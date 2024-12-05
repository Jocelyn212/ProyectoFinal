import { defineStore } from "pinia";
import axios from "axios";

export const useActiveUserStore = defineStore("activeUser", {
  state: () => ({
    login: false,
    profile: {
      email: null,
      name: null,
      role: null,
      avatar: null,
    },
  }),
  actions: {
    async getUserData(token) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`, // Incluye el token en el encabezado
          },
        };
        const response = await axios.get(
          "https://api.escuelajs.co/api/v1/auth/profile",
          config
        );
        console.log(response);
        this.profile = {
          email: response.data.email,
          name: response.data.name,
          role: response.data.role,
          avatar: response.data.avatar,
        };
        this.login = true;
        this.storeLogin(token);
        console.log(this.profile);
      } catch {
        console.log(error);
      }
      console.log(token);
    },
    storeLogin(token) {
      localStorage.setItem("token", token);
    },
    checkLogin() {
      const token = localStorage.getItem("token");
      token && this.getUserData(token);
      console.log(this.profile);
    },
    logOut() {
      this.profile = {
        email: null,
        name: null,
        role: null,
        avatar: null,
      };
      this.login = false;
      localStorage.removeItem("token");
    },
  },
  getters: {},
});
