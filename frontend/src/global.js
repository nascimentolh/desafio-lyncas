import Vue from "vue";
import select2 from "v-select2-component";

Vue.component('select2', select2);

export const userKey = "@QUESTION_APP_USER";
export const baseApiUrl = "http://localhost:3333";

export function showError(e) {
  console.log(e);
  if (e && e.response && e.response.data) {
    Vue.toasted.global.defaultError({ msg: e.response.data.message });
  } else if (typeof e === "string") {
    Vue.toasted.global.defaultError({ msg: e });
  } else {
    Vue.toasted.global.defaultError();
  }
}

export default { baseApiUrl, showError };
