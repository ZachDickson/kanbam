<template>
  <div id="app">
    <navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
import { onAuth } from "@bcwdev/auth0-vue";
export default {
  name: "App",
  async beforeCreate() {
    try {
      await onAuth();
      this.$store.dispatch("setBearer", this.$auth.bearer);
      this.$store.dispatch("getProfile");
      this.$store.dispatch("initializeSocket", this.$auth.bearer);
    } catch (err) {
      this.$router.push({ name: "home" });
    }
  },
  components: {
    Navbar
  }
};
</script>


<style lang="scss">
@import "./assets/_variables.scss";
@import "bootstrap";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
app {
  background-image: url(https://www.lionfront.com/wp-content/uploads/2018/03/coffee-smartphone-desk-pen-1.jpg);
  background-size: cover;
}
</style>