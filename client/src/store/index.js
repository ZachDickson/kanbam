import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from '../router/index'
import { socketStore } from "./socketStore"

Vue.use(Vuex)

//Allows axios to work locally or live

let base = window.location.host.includes('localhost:8080') ? '//localhost:3000/' : '/'

let api = Axios.create({
  baseURL: base + "api",
  timeout: 3000,
  withCredentials: true
})

export default new Vuex.Store({
  state: {
    user: {},
    boards: [],
    activeBoard: {},
    lists: [],
    tasks: []
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },

    setBoards(state, boards) {
      state.boards = boards
    },

    setActiveBoard(state, board) {
      state.activeBoard = board
    },

    deleteBoard(state, boardId) {
      state.boards = state.boards.filter(b => b._id != boardId)
    },

    setList(state, list) {
      state.lists = list
    },

    deleteList(state, id) {
      state.lists = state.lists.filter(l => l._id != id)
    },

    addList(state, list) {
      state.lists.push(list)
    },

    addTask(state, task) {
      state.tasks[task.listId].push(task)
    },

    editTask(state, task) {
      let task1 = state.tasks.find(c => c.id == task.id)
      task1 = task;
    },

    deleteTask(state, task) {
      state.tasks[task.listId] = state.tasks[task.listId].filter(c => c.id != task.id)
    },

    setTasks(state, tasks) {
      Vue.set(state.tasks, tasks.listId, tasks.tasks)
    }
  },

  actions: {
    //#region -- AUTH STUFF --
    setBearer({ }, bearer) {
      api.defaults.headers.authorization = bearer;
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
    },
    async getProfile({ commit }) {
      try {
        let res = await api.get("/profile")
        commit("setUser", res.data)
      } catch (err) {
        console.error(err)
      }
    },
    //#endregion


    //#region -- BOARDS --
    async getBoards({ commit, dispatch }) {
      let res = await api.get('boards')
      commit('setBoards', res.data)
    },

    async setActiveBoard({ commit }, boardId) {
      let board = await api.get(`boards/${boardId}`);
      commit("setActiveBoard", board.data);
    },

    async addBoard({ commit, dispatch }, boardData) {
      await api.post('boards', boardData)
      dispatch('getBoards')

    },

    async editBoard({ dispatch }, update) {
      await api.put(`boards/${update.id}`, update)
    },

    async deleteBoardById({ commit, dispatch }, boardId) {
      await api.delete(`boards/${boardId}`)
      commit('deleteBoard', boardId)
    },
    //#endregion


    //#region -- LISTS --

    async getList({ commit }, boardId) {
      let res = await api.get(`boards/${boardId}/lists`)
      commit('setList', res.data)

    },

    async createList({ commit, dispatch }, list) {
      await api.post('lists', list)
      dispatch('getList', list.boardId)
    },

    async deleteList({ commit, dispatch }, list) {
      await api.delete(`lists/${list.id}`)
      commit('deleteList', list.id)
    },

    async createTask({ commit, dispatch }, task) {
      await api.post('tasks', task)
      dispatch('getTasksByListId', task.listId)

    },

    async getTasksByListId({ commit }, id) {
      let tasks = await api.get(`lists/${id}/tasks`);
      commit("setTasks", { tasks: tasks.data, listId: id });
    },

    async deleteTaskById({ commit, dispatch }, task) {
      await api.delete(`tasks/${task.id}`);
      commit('deleteTask', task)
    },

    async createComment({ commit, dispatch }, comment) {
      await api.post(`tasks/${comment.taskId}/comments`, comment)
      dispatch("getTasksByListId", comment.listId)
    },

    async deleteComment({ dispatch }, commentDict) {
      await api.delete(`tasks/${commentDict.taskId}/comments/${commentDict.commentId}`)
      dispatch("getTasksByListId", commentDict.listId)
    },

    async changeList({ commit }, data) {
      await api.put(`tasks/${data.taskId}`, { listId: data.listId })
    }


    //#endregion

  }
})
