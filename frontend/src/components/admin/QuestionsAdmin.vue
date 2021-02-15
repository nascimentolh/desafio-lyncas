<template>
  <div class="questions-admin">
    <b-form>
      <input type="hidden" id="question-id" v-model="question.id" />
      <b-row>
        <b-col md="12" sm="12">
          <b-form-group label="Titulo:" label-for="question-title">
            <b-form-input
              id="question-title"
              type="text"
              v-model="question.title"
              required
              placeholder="Informe o titulo da questão"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="12" sm="12">
          <b-form-group label="Adicionar Resposta:" label-for="question-answer">
            <b-input-group>
              <b-form-input
                type="text"
                v-model="answer.description"
                id="question-answer"
                placeholder="Insira o conteudo da resposta"
              ></b-form-input>

              <b-input-group-append>
                <b-button variant="primary" @click="addAnswer"
                  ><i class="fa fa-plus"></i
                ></b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>
      </b-row>
      <b-table
        hover
        v-if="question.answers.length > 0"
        :items="question.answers"
        :fields="answersFields"
        :tbody-tr-class="rowClass"
        class="mb-2 p-0 mt-3"
      >
        <template #cell(actions)="data">
          <b-button
            variant="success"
            @click="setCorrect(data.item)"
            class="mr-2"
          >
            <i class="fa fa-check"></i>
          </b-button>
        </template>
      </b-table>
      <b-button
        variant="primary"
        v-if="mode === 'save'"
        :disabled="question.answers.length < 4"
        @click="save"
      >
        Salvar
      </b-button>
      <b-button class="ml-2" @click="reset">Cancelar</b-button>
    </b-form>
    <hr />
    <b-table
      hover
      striped
      v-if="questions.length > 0"
      :items="questions"
      :fields="fields"
      class="mb-2 p-0 mt-3"
    >
      <template #cell(actions)="data">
        <b-button
          variant="warning"
          @click="loadQuestion(data.item)"
          class="mr-2"
        >
          <i class="fa fa-pencil"></i>
        </b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import { baseApiUrl, showError } from "@/global";
import axios from "axios";

export default {
  name: "QuestionsAdmin",
  data: function () {
    return {
      mode: "save",
      question: { answers: [] },
      questions: [],
      max: 4,
      answer: {},
      answersFields: [
        { key: "description", label: "Respostas", sortable: true },
        {
          key: "actions",
          label: "Ações",
          sortable: false,
        },
      ],
      fields: [
        { key: "title", label: "Questão", sortable: true },
        {
          key: "answer",
          label: "Resposta",
          formatter: (value) => value.description,
        },
        {
          key: "actions",
          label: "Ações",
          sortable: false,
        },
      ],
    };
  },
  methods: {
    rowClass(item, type) {
      if (!item || type !== "row") return;
      if (item.id === this.question.answer_id) return "table-success";
    },
    loadQuestions() {
      const url = `${baseApiUrl}/questions`;
      axios.get(url).then((res) => {
        this.questions = res.data;
      });
    },
    addAnswer() {
      if (this.question.answers.length === this.max) {
        this.$toasted.show("Você já alcançou o limite de respostas!", {
          type: "info",
        });
        return;
      }
      axios
        .post(`${baseApiUrl}/answers`, this.answer)
        .then((res) => {
          this.question.answers.push(res.data);
        })
        .catch(showError);
    },
    setCorrect(answer) {
      this.question.answer_id = answer.id;
    },
    reset() {
      this.mode = "save";
      this.question = { answers: [] };
      this.answer = {};
      this.loadQuestions();
    },
    save() {
      const method = this.question.id ? "put" : "post";
      const id = this.question.id ? `/${this.question.id}` : "";

      axios[method](`${baseApiUrl}/questions${id}`, this.question)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    loadQuestion(question, mode = "save") {
      this.mode = mode;
      this.question = { ...question };
    },
  },
  mounted() {
    this.loadQuestions();
  },
};
</script>