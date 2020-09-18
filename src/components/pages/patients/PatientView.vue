<template>
    <div class="patient-view d-flex flex-wrap">
        <!-- <h1>{{ $route.params.id }}</h1>
        <h1>{{this.$store.state.patient.name}}</h1>-->
        <v-card class="patient-photo">Foto</v-card>
        <v-card class="patient-data">Dados</v-card>
        <v-card class="patient-historic">Histórico</v-card>
        <v-card class="patient-notes">Notas</v-card>
        <v-card class="patient-files">Arquivos</v-card>

        <v-container fluid>
      <v-row dense>
        <v-col
          v-for="card in cards"
          :key="card.title"
          :cols="card.flex"
        >
          <v-card>
            <v-img
              :src="card.src"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >
              <v-card-title v-text="card.title"></v-card-title>
            </v-img>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-bookmark</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-share-variant</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    </div>
</template>

<script>
export default {
    name: "patient-view",
    data: () => ({
      cards: [
        { title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 12 },
        { title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 6 },
        { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 },
      ],
    }),
};
</script>

<style>

</style>