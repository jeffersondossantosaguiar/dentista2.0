<template>
  <div id="app">
    <Header />
    <Menu />
    <Content />
  </div>
</template>

<script>
import Header from "./components/template/Header";
import Menu from "./components/template/Menu";
import Content from "./components/template/Content";

export default {
  name: "App",

  components: { Header, Menu, Content },

  data: () => ({
    //
  }),
};
</script>

<style>
* {
  font-family: Poppins;
}

body {
  margin: 0;
}

#app {
  height: 100vh;
  display: grid;
  grid-template-rows: 60px 1fr;
  grid-template-columns: 250px 1fr;
  grid-template-areas: 
    "menu header"
    "menu content"
  ;
}
</style>
