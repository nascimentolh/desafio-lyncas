<template>
  <div class="users-admin">
    <b-form>
      <input type="hidden" id="user-id" v-model="user.id" />
      <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="Nome:" label-for="user-name">
            <b-form-input
              id="user-name"
              type="text"
              v-model="user.name"
              required
              placeholder="Informe o nome do usuário"
            />
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group label="E-mail:" label-for="user-email">
            <b-form-input
              id="user-email"
              type="text"
              v-model="user.email"
              required
              placeholder="Informe o email do usuário"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="Password:" label-for="user-password">
            <b-form-input
              id="user-password"
              type="password"
              v-model="user.password"
              required
              placeholder="Informe o a senha do usuário"
            />
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group
            label="Confirmação de Senha:"
            label-for="user-confirm-password"
          >
            <b-form-input
              id="user-confirm-password"
              type="password"
              v-model="user.confirmPassword"
              required
              placeholder="Confirme a senha  do usuário"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-button variant="primary" v-if="mode === 'save'" @click="save">
        Salvar
      </b-button>
      <b-button class="ml-2" @click="reset">Cancelar</b-button>
    </b-form>
    <b-table
      hover
      striped
      :items="users"
      :fields="fields"
      class="mb-0 p-0 mt-3"
    ></b-table>
  </div>
</template>

<script>
import { baseApiUrl, showError } from "@/global";
import axios from "axios";

export default {
  name: "UsersAdmin",
  data: function () {
    return {
      mode: "save",
      user: {},
      users: [],
      fields: [
        { key: "id", label: "Codigo", sortable: true },
        { key: "name", label: "Nome", sortable: true },
        { key: "email", label: "Email", sortable: true },
      ],
    };
  },
  methods: {
    loadUsers() {
      const url = `${baseApiUrl}/users`;
      axios.get(url).then((res) => {
        this.users = res.data;
      });
    },
    reset() {
      this.mode = "save";
      this.user = {};
      this.loadUsers();
    },
    save() {
      if (this.user.password !== this.user.confirmPassword) {
        showError("Senhas não conferem");
        return;
      }
      axios
        .post(`${baseApiUrl}/users`, this.user)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
  },
  mounted() {
    this.loadUsers();
  },
};
</script>

<style>
</style>