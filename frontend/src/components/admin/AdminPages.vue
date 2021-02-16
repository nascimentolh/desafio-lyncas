<template>
  <div class="admin-pages">
    <PageTitle
      icon="fa fa-cogs"
      main="Administração"
      sub="Cadastros de Provas, Questões e Respostas"
    />
    <div class="admin-pages-tabs">
      <b-card no-body class="radius">
        <b-tabs card>
          <b-tab title="Questões">
            <QuestionsAdmin />
          </b-tab>
          <b-tab title="Provas">
            <TestsAdmin />
          </b-tab>
          <b-tab title="Usuários">
            <UsersAdmin />
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
  </div>
</template>

<script>
import PageTitle from "../template/PageTitle";
import QuestionsAdmin from "./QuestionsAdmin";
import TestsAdmin from "./TestsAdmin";
import UsersAdmin from "./UsersAdmin";

export default {
  name: "AdminPages",
  components: {
    PageTitle,
    QuestionsAdmin,
    TestsAdmin,
    UsersAdmin,
  },
};
</script>

<style>
.admin-pages-tabs {
  margin-top: 10px;
}

.radius {
  border-radius: 10px;
}
</style>