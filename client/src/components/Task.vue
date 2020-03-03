<template>
  <div class="task bg-light rounded mt-5">
    <h1>{{taskData.title}}</h1>
  </div>
</template>

<script>
export default {
  name: "task",
  props: ["taskData"],
  mounted() {},
  data() {
    return {
      newBoard: {}
    };
  },
  computed: {},
  methods: {}
};
</script>

<style>
div.task {
  padding-bottom: 2rem;
  padding-top: 2rem;
}
</style>