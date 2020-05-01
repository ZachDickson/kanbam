<template>
  <div class="card" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title text-dark">{{listData.title}}</h5>
      <span class="d-flex align-items-center">
        <create-task :listId="listData.id" :boardId="listData.boardId" />
      </span>
      <ul v-for="task in tasks" :key="task.id" class="list-group list-group-flush text-left">
        <li>
          <task :taskData="task" :listTitle="listData.title" />
        </li>
      </ul>
    </div>
    <p class="text-danger" @click="deleteList">Delete List</p>
  </div>
  <!-- <div class="row mx-1 list rounded mt-5 text-warning p-2">
    <div class>
      <h1>{{listData.title}}</h1>
    </div>
    <div v-for="(task) in tasks" :key="task.id">
      <task :taskData="task" :listTitle="listData.title" />
    </div>
  </div>-->
</template>

<script>
import CreateTask from "../components/CreateTask";
import Task from "../components/Task";
export default {
  name: "list",
  props: ["listData"],
  computed: {
    tasks() {
      return this.$store.state.tasks[this.listData._id];
    }
  },
  mounted() {
    this.$store.dispatch("getTasksByListId", this.listData._id);
    this.$store.dispatch("joinRoom", "tasks");
  },
  beforeDestroy() {
    this.$store.dispatch("leaveRoom", "tasks");
  },
  data() {
    return {};
  },
  methods: {
    deleteList() {
      this.$store.dispatch("deleteList", this.listData);
    }
  },
  components: {
    Task,
    CreateTask
  }
};
</script>

<style>
div.list {
  padding-bottom: 2rem;
  padding-top: 2rem;
}
img {
  max-height: 2rem;
  cursor: pointer;
}
p {
  cursor: pointer;
}
</style>