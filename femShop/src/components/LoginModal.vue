<template>
    <div v-if="isHidden" class="modal-overlay" @click.self="toggleSignIn">
      <div class="modal">
        <button class="close-btn" @click="toggleSignIn">
          <i class="fa-solid fa-xmark"></i>
        </button>
        <h2 class="text-lg font-bold mb-4">Sign In</h2>
        <div>
          <div>
            <input v-model="usuario" type="text" id="usuario" placeholder="Username" class="input-field" />
            <label for="usuario" class="hidden">Usuario</label>
          </div>
          <div>
            <input v-model="password" type="password" id="password" placeholder="Password" class="input-field" />
            <label for="password" class="hidden">Password</label>
          </div>
          <button @click="login" class="button button-primary">Login</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { useActiveUserStore } from "../stores/user";
  import { mapStores } from "pinia";
  import axios from "axios";
  
  export default {
    name: "LoginModal",
    props: {
      isHidden: {
        type: Boolean,
        required: true,
      },
    },
    emits: ["close"],
    data() {
      return {
        usuario: "",
        password: "",
      };
    },
    methods: {
      async login() {
        try {
          const user = {
            email: this.usuario,
            password: this.password,
          };
          const response = await axios.post("https://api.escuelajs.co/api/v1/auth/login", user);
          const token = response.data.access_token;
          this.activeUserStore.getUserData(token);
          this.$emit("close"); 
        } catch (error) {
          console.error(error);
        }
      },
      toggleSignIn() {
        this.$emit("close");
      },
    },
    computed: {
      ...mapStores(useActiveUserStore),
    },
  };
  </script>
  