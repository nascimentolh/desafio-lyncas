<template>
  <div class="auth-content">
    <div class="auth-modal">
      <div class="auth-title">Login</div>
      <input type="text" v-model="user.email" placeholder="E-mail" />
      <input type="password" v-model="user.password" placeholder="Password" />
      <button @click="signin">Entrar</button>
    </div>
  </div>
</template>

<script>
import { baseApiUrl, showError, userKey } from "@/global";
import axios from "axios";

export default {
  name: "Auth",
  data: function () {
    return {
      user: {},
    };
  },
  methods: {
    signin() {
      axios
        .post(`${baseApiUrl}/auth`, this.user)
        .then((res) => {
          this.$store.commit("setUser", res.data);
          localStorage.setItem(userKey, JSON.stringify(res.data));
          this.$router.push({ path: "/dashboard" });
        })
        .catch(showError);
    },
  },
};
</script>

<style>
.auth-content {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.auth-modal {
  background-color: #fff;
  width: 350px;
  padding: 35px;
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.auth-title {
  font-size: 1.2rem;
  font-weight: 100;
  margin-top: 10px;
  margin-bottom: 15px;
}

.auth-modal input {
  border: 1px solid #bbb;
  width: 100%;
  padding: 3px 8px;
  margin-bottom: 15px;
  outline: none;
  border-radius: 5px;
}

.auth-modal button {
  align-self: flex-end;
  background-color: #3176d1;
  color: #fff;
  padding: 5px 15px;
  border: none;
  border-radius: 10px;
}

.auth-modal button:hover {
  opacity: 0.9;
  transition: opacity 0.5s linear;
}
</style>