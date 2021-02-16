<template>
  <div class="exams-done">
    <b-table :items="exams" :fields="fields"></b-table>
  </div>
</template>

<script>
import { baseApiUrl } from "@/global";
import axios from "axios";

export default {
  name: "ExamsDone",
  data: function () {
    return {
      exams: [],
      fields: [
        { key: "test.name", label: "Prova", sortable: true },
        { key: "doer", label: "Avaliado", sortable: true },
        { key: "hits", label: "Acertos", sortable: true },
        { key: "total", label: "Total Questões", sortable: true },
      ],
    };
  },
  methods: {
    getExams() {
      axios.get(`${baseApiUrl}/stats`).then((res) => {
        this.exams = res.data;
      });
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