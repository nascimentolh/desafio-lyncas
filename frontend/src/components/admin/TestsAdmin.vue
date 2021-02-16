<template>
  <div class="tests-admin">
    <b-form>
      <input type="hidden" id="test-id" v-model="test.id" />
      <b-row>
        <b-col md="12" sm="12">
          <b-form-group label="Prova:" label-for="test-name">
            <b-form-input
              id="test-name"
              type="text"
              v-model="test.name"
              required
              placeholder="Informe o nome/matéria da prova"
            />
          </b-form-group>
        </b-col>
        <b-col md="12" sm="12">
          <b-form-select
            v-model="selected"
            :options="questions"
            multiple
            :select-size="4"
          ></b-form-select>
        </b-col>
      </b-row>
      <b-button
        class="mt-2"
        variant="primary"
        v-if="mode === 'save'"
        @click="save"
      >
        Salvar
      </b-button>
      <b-button class="ml-2 mt-2" @click="reset">Cancelar</b-button>
    </b-form>
    <hr />
    <b-table
      hover
      striped
      v-if="tests.length > 0"
      :items="tests"
      :fields="fields"
      class="mb-2 p-0 mt-3"
    >
      <template #cell(actions)="data">
        <b-button variant="warning" @click="loadTest(data.item)" class="mr-2">
          <i class="fa fa-pencil"></i>
        </b-button>
        <b-button
          variant="primary"
          @click="generateLink(data.item)"
          class="mr-2"
        >
          <i class="fa fa-link"></i>
        </b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import { baseApiUrl, showError } from "@/global";
import axios from "axios";

export default {
  name: "TestsAdmin",
  data: function () {
    return {
      mode: "save",
      test: { questions: [] },
      tests: [],
      questions: [],
      selected: [],
      fields: [
        { key: "name", label: "Nome / Matéria", sortable: true },
        {
          key: "actions",
          label: "Ações",
          sortable: false,
        },
      ],
    };
  },
  watch: {
    test: function () {
      if (this.test.id !== undefined) {
        this.test.questions.map((question) => {
          this.selected.push(question.id);
        });
      }
    },
  },
  methods: {
    loadQuestions() {
      const url = `${baseApiUrl}/questions`;
      axios.get(url).then((res) => {
        this.questions = res.data.map((question) => {
          return { ...question, value: question.id, text: question.title };
        });
      });
    },
    reset() {
      this.mode = "save";
      this.test = { questions: [] };
      this.selected = [];
      this.loadTests();
    },
    save() {
      this.selected.map(async (select) => {
        const question = await axios.get(`${baseApiUrl}/questions/${select}`);
        this.test.questions.push(question.data);
      });

      const method = this.test.id ? "put" : "post";
      const id = this.test.id ? `/${this.test.id}` : "";

      axios[method](`${baseApiUrl}/tests${id}`, this.test)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    loadTests() {
      const url = `${baseApiUrl}/tests`;
      axios.get(url).then((res) => {
        this.tests = res.data;
      });
    },
    loadTest(test, mode = "save") {
      this.mode = mode;
      this.test = { ...test };
    },
    generateLink(test) {
      navigator.clipboard.writeText(
        window.location.origin + `/exam/${test.id}`
      );
      this.$toasted.show("Url copiada com sucesso!", {
        type: "info",
      });
    },
  },
  mounted() {
    this.loadTests();
    this.loadQuestions();
  },
};
</script>