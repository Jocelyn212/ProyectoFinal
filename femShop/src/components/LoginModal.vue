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


            <div class="modal-error">
            <span v-if="this.errors.usuario">{{ this.errors.usuario }}</span>
            </div>

          <div>
            <input v-model="password" type="password" id="password" placeholder="Password" class="input-field" />
            <label for="password" class="hidden">Password</label>
          </div>
          <div class="modal-error">
            <span v-if="this.errors.password">{{ this.errors.password }}</span>
        </div>
        <div class="modal-error">
            <span v-if="this.errors.login">{{ this.errors.login }}</span>
        </div>
        <button @click="checkForm" class="button button-primary">Login</button>
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
        usuario: null,
        password: null,
        errors: {},
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
          
          this.toggleSignIn()
        } catch (error) {
            console.log("error", error)
            if (error.status === 401) {
                this.errors.login = "Incorrect user or password"
            } else {
                this.errors.login = error.message
            }
        }
      },
      toggleSignIn() {
        this.$emit("close");
        this.errors = {}
      },
      checkForm() {
            this.errors = {};
            if (!this.usuario) {
                this.errors.usuario = "User is mandatory";
                console.log("falta el nombre")
            }
            if (!this.password) {
                this.errors.password = "Password is mandatory";
                console.log("falta el password")
            }
            if (Object.keys(this.errors).length === 0) {
                this.login();
            }
        },
    },
    computed: {
      ...mapStores(useActiveUserStore),
    },
  };
  </script>
  