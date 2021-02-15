<template>
  <div class="page-title">
    <h1><i v-if="icon" :class="icon"></i> {{ main }}</h1>
    <h2>{{ sub }}</h2>
  </div>
</template>

<script>
export default {
  name: "PageTitle",
  props: ["icon", "main", "sub"],
};
</script>

<style>
.page-title {
  background-color: #fff;
  padding: 10px;
  border-radius: 10px;
}

.page-title h1 {
  margin: 0px;
  font-size: 1.9rem;
}

.page-title h2 {
  color: #777;
  font-size: 1.2rem;
}
</style>