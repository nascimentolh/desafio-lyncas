<template>
  <div class="done-content">
    <div class="container">
      <h1 v-if="score > 0">
        Parabéns, {{ name }} você acertou {{ score }} de {{ total }}!
      </h1>
      <h2 v-else>Poxa, parece que você não conseguiu mas não fique triste!</h2>
    </div>
  </div>
</template>


<script>
export default {
  name: "Done",
  data: function () {
    return {
      name: localStorage.getItem("@QUESTIONS_APP_EXAM_DOER")
        ? localStorage.getItem("@QUESTIONS_APP_EXAM_DOER")
        : "",
      score: localStorage.getItem("@QUESTIONS_APP_EXAM_SCORE")
        ? localStorage.getItem("@QUESTIONS_APP_EXAM_SCORE")
        : "",
      total: localStorage.getItem("@QUESTIONS_APP_EXAM_TOTAL")
        ? localStorage.getItem("@QUESTIONS_APP_EXAM_TOTAL")
        : "",
    };
  },
};
</script>

<style>
.done-content {
  text-align: center;
  margin-top: 2.1rem;
}
</style>