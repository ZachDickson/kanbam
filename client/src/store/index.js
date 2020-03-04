import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from '../router/index'

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

    setList(state, list) {
      state.lists = list
    },

    addList(state, list) {
      state.lists.push(list)
    },
    addTask(state, task) {
      state.tasks.push(task)
    },
    setTasks(state, tasks) {
      state.tasks = tasks
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
    getBoards({ commit, dispatch }) {
      api.get('boards')
        .then(res => {
          commit('setBoards', res.data)
        })
    },
    async setActiveBoard({ commit }, boardId) {
      let board = await api.get(`boards/${boardId}`);
      commit("setActiveBoard", board.data);
    },
    addBoard({ commit, dispatch }, boardData) {
      api.post('boards', boardData)
        .then(serverBoard => {
          dispatch('getBoards')
        })
    },
    //#endregion


    //#region -- LISTS --

    getList({ commit }, boardId) {
      api.get(`boards/${boardId}/lists`)
        .then(res => {
          console.log(boardId)
          commit('setList', res.data)
        })
    },

    createList({ commit }, list) {
      api.post('lists', list)
        .then(res => {
          console.log(res)
          commit("addList", res.data)
        })
    },
    async createTask({ commit }, task) {
      let tasks = await api.post('tasks', task)
      commit("addTask", tasks.data)
    },
    async getTasksByListId({ commit }, id) {
      let tasks = await api.get(`lists/${id}/tasks`);
      commit("setTasks", tasks.data);
      return tasks.data
    }

    //#endregion

  }
})
