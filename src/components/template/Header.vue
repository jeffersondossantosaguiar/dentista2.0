<template>
  <div class="header">
    <v-toolbar flat color="#f1f6fc">
      <v-icon>mdi-menu</v-icon>
      <v-toolbar-title class="v-toolbar-title" v-text="$route.name"></v-toolbar-title>

      <v-spacer></v-spacer>
      <!-- <div>
        <v-text-field hide-details prepend-icon="mdi-magnify" single-line label="Busca"></v-text-field>
      </div> -->

      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  name: "Header",
  };
</script>

<style>
.v-icon {
  margin-right: 10px;
}
.header {
  grid-area: header;
  display: flex;
}
.v-toolbar-title {
  font-weight: 600;
}
</style>