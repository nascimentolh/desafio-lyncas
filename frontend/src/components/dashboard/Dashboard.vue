<template>
  <div>
    <PageTitle icon="fa fa-home" main="Dashboard" sub="Questions APP" />
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