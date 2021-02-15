<template>
  <div class="exams-done">
    <table class="table table-striped borderless">
      <thead>
        <tr>
          <th>ID</th>
          <th>PROVA</th>
          <th>NOME</th>
          <th>ACERTOS</th>
          <th>TOTAL</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="exam in exams" :key="exam.id">
          <td>{{ exam.id }}</td>
          <td>Matématica Aplicada</td>
          <td>{{ exam.doer }}</td>
          <td>{{ exam.hits }}</td>
          <td>{{ exam.total }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "ExamsDone",
  data: function () {
    return {
      exams: [],
    };
  },
  methods: {
    getExams() {
      this.exams = [
        { id: 1, hits: 2, total: 4, doer: "Ana Beatriz" },
        { id: 2, hits: 4, total: 4, doer: "Larissa" },
      ];
    },
  },
  mounted() {
    this.getExams();
  },
};
</script>

<style>
.exams-done {
  background-color: #fff;
  border-radius: 10px;
  margin-top: 10px;
}

.borderless td,
.borderless th {
  border: none;
}
</style>