<template>
  <div>
    <PageTitle
      icon="fa fa-home"
      main="Dashboard"
      sub="Lista das provas realizadas"
    />
    <ExamsDone />
  </div>
</template>

<script>
import PageTitle from "../template/PageTitle";
import ExamsDone from "./ExamsDone";

export default {
  name: "Dashboard",
  components: { PageTitle, ExamsDone },
};
</script>