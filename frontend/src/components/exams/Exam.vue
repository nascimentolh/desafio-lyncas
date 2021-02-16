<template>
  <div class="exam-content">
    <b-card
      border-variant="primary"
      header="Informe seu nome para poder iniciar"
      header-bg-variant="primary"
      header-text-variant="white"
      align="center"
    >
      <b-form>
        <b-row>
          <b-col md="12">
            <b-form-group label-for="exam-doer-name">
              <b-form-input
                id="exam-doer-name"
                type="text"
                required
                v-model="stat.doer"
                placeholder="Informe o seu nome:"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-button
          @click="start"
          variant="primary"
          :disabled="stat.doer === undefined"
          >Iniciar</b-button
        >
      </b-form>
    </b-card>

    <div class="container">
      <div id="game" class="justify-center flex-column">
        <div id="hud">
          <div id="hud-item">
            <p class="hud-prefix">
              {{ progressText }}
            </p>
            <div id="progressBar">
              <div
                id="progressBarFull"
                v-bind:style="{ width: progressBarFull }"
              ></div>
            </div>
          </div>
          <div id="hud-item">
            <p class="hud-prefix">Acertos</p>
            <h1 class="hud-main-text" id="score">{{ score }}</h1>
          </div>
        </div>
        <h2 id="question">{{ question }}</h2>
        <div class="choice-container">
          <p class="choice-prefix">A</p>
          <p class="choice-text" :data-number="1"></p>
        </div>
        <div class="choice-container">
          <p class="choice-prefix">B</p>
          <p class="choice-text" :data-number="2"></p>
        </div>
        <div class="choice-container">
          <p class="choice-prefix">C</p>
          <p class="choice-text" :data-number="3"></p>
        </div>
        <div class="choice-container">
          <p class="choice-prefix">D</p>
          <p class="choice-text" :data-number="4"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { baseApiUrl, showError } from "@/global";
import axios from "axios";

export default {
  name: "Exams",
  data: function () {
    return {
      init: false,
      questionCounter: 0,
      score: 0,
      questions: [],
      avaliableQuestions: [],
      acceptingAnswers: false,
      currentQuestion: {},
      progressText: "Questão",
      progressBarFull: "0%",
      question: "",
      totalQuestions: 0,
      stat: {},
    };
  },
  methods: {
    getTest() {
      axios.get(`${baseApiUrl}/tests/${this.$route.params.id}`).then((res) => {
        this.totalQuestions = res.data.questions.length;
        this.stat.test_id = res.data.id;
        this.questions = res.data.questions.map((question) => {
          const formattedQuestion = {
            question: question.title,
          };

          const answerChoices = [...question.answers];
          formattedQuestion.answer = question.answer.description;

          answerChoices.forEach((choice, index) => {
            formattedQuestion["choice" + (index + 1)] = choice.description;
          });
          return formattedQuestion;
        });
        this.startTest();
      });
    },
    start() {
      this.init = true;
      this.$toasted.show("Teste Iniciado!", {
        type: "success",
      });
    },
    startTest() {
      this.getNewQuestion();
      this.choicesFn();
    },
    getNewQuestion() {
      if (
        this.questions.length === 0 ||
        this.questionCounter >= this.totalQuestions
      ) {
        localStorage.setItem("@QUESTIONS_APP_EXAM_TOTAL", this.totalQuestions);
        localStorage.setItem("@QUESTIONS_APP_EXAM_SCORE", this.score);
        localStorage.setItem("@QUESTIONS_APP_EXAM_DOER", this.stat.doer);

        this.stat.total = this.totalQuestions;
        this.stat.hits = this.score;

        axios
          .post(`${baseApiUrl}/stats`, this.stat)
          .then(() => {
            this.$toasted.show("Prova salva com sucesso!", {
              type: "info",
            });
          })
          .catch(showError);

        this.$router.push({ name: "done" });
      }

      const choices = Array.from(
        this.$el.getElementsByClassName("choice-text")
      );
      this.questionCounter++;
      this.progressText = `Question ${this.questionCounter}/${this.totalQuestions}`;
      this.progressBarFull = `${
        (this.questionCounter / this.totalQuestions) * 100
      }%`;

      const questionIndex = Math.floor(Math.random() * this.questions.length);
      this.currentQuestion = this.questions[questionIndex];
      this.question = this.currentQuestion.question;

      choices.forEach((choice) => {
        const number = choice.getAttribute("data-number");
        choice.innerText = this.currentQuestion["choice" + number];
      });

      this.questions.splice(questionIndex, 1);

      this.acceptingAnswers = true;
    },
    choicesFn() {
      const choices = Array.from(
        this.$el.getElementsByClassName("choice-text")
      );
      choices.forEach((choice) => {
        choice.addEventListener("click", (e) => {
          if (!this.init) {
            this.$toasted.show(
              "Por favor informe seu nome, e clique em iniciar!",
              {
                type: "info",
              }
            );
            return;
          }
          if (!this.acceptingAnswers) return;

          this.acceptingAnswers = false;
          const selectedChoice = e.target;
          const selectAnswer = selectedChoice.innerText;
          const classToApply =
            selectAnswer == this.currentQuestion.answer
              ? "correct"
              : "incorrect";

          if (classToApply === "correct") {
            this.incrementScore(1);
          }

          selectedChoice.parentElement.classList.add(classToApply);

          setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            this.getNewQuestion();
          }, 1000);
        });
      });
    },
    incrementScore(num) {
      this.score += num;
    },
  },
  mounted() {
    this.getTest();
  },
};
</script>

<style>
.hidden {
  display: none;
}

.flex-column {
  display: flex;
  flex-direction: column;
}

.justify-center {
  justify-content: center;
}

.choice-container {
  display: flex;
  margin-bottom: 0.5rem;
  width: 100%;
  font-size: 1.2rem;
  border: 0.1rem solid rgb(86, 165, 235, 0.25);
  background-color: white;
}

.choice-container:hover {
  cursor: pointer;
  box-shadow: 0 0.4rem 1.4rem rgba(86, 185, 235, 0.5);
  transform: translate(-0.1rem);
  transition: transform 150ms;
}

.choice-prefix {
  padding: 0.5rem 1.5rem;
  margin-bottom: 0;
  background-color: #56a5eb;
  color: white;
}

.choice-text {
  padding: 1rem;
  margin-bottom: 0;
  width: 100%;
}

.correct {
  background-color: #28a745;
}

.incorrect {
  background-color: #dc3545;
}

/* HUD */
#hud {
  display: flex;
  justify-content: space-around;
}

.hud-prefix {
  text-align: center;
  font-size: 1.6rem;
}

.hud-main-text {
  text-align: center;
  font-size: 1.6rem;
}

#progressBar {
  width: 20rem;
  height: 1rem;
  border: 0.3rem solid #56a5eb;
  margin-top: 1.5rem;
}

#progressBarFull {
  height: 0.4rem;
  background-color: #56a5eb;
  width: 0%;
}
</style>