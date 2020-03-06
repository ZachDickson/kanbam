import io from "socket.io-client";

let socket = {};

export const socketStore = {
  actions: {
    initializeSocket({ commit, dispatch }) {
      //establish connection with socket
      socket = io("//localhost:3000");
      //Handle any on connection events
      socket.on("CONNECTED", data => {
        console.log("Connected to socket, villany may commence");
      });

      //register all listeners
      socket.on("createList", item => {
        commit("addList", item);
      });

      //register all listeners

      socket.on("deleteList", data => {
        commit("deleteList", data);
      });

      //TASKS

      socket.on("createTask", data => {
        commit("addTask", data);
      });

      socket.on('removeTask', data => {
        // debugger;
        commit("deleteTask", data);
      });

      socket.on("changeTask", data => {
        debugger;
        commit("editTask", data);
      });
    },

    joinRoom({ commit, dispatch }, roomName) {
      socket.emit("dispatch", { action: "JoinRoom", data: roomName });
    }
  }
};