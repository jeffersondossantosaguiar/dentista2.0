<template>
  <div class="header">
    <v-toolbar flat color="#f1f6fc">
      <v-icon color="#FF5252">mdi-view-dashboard</v-icon>
      <v-toolbar-title>Dashboard</v-toolbar-title>

      <v-spacer></v-spacer>
      <div>
        <v-text-field hide-details prepend-icon="mdi-magnify" single-line label="Busca"></v-text-field>
      </div>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
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
  props: {
    title: String,
  },
};
</script>

<style>
.header {
  grid-area: header;
  display: flex;
}
</style>