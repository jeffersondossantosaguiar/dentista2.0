<template>
  <div class="patient-form">
    <v-dialog
      :value="value"
      :editedDentist="editedDentist"
      persistent
      width="900px"
    >
      <v-card>
        <v-card-title>
          Disponibilidade
          <v-spacer></v-spacer>
          <v-btn icon @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-row class="availability-days">
            <v-col class="availability-cols">
              <v-btn color="red" fab small dark>
                D
              </v-btn>
            </v-col>
            <!-- <v-select
              :items="items"
              append-icon="mdi-clock"
              label="Entrada"
              dense
              outlined
            ></v-select> -->
          </v-row>
          <v-row class="availability-days">
            <v-btn color="primary" fab small dark>
              S
            </v-btn>
          </v-row>
          <v-row class="availability-days">
            <v-btn color="primary" fab small dark>
              T
            </v-btn>
          </v-row>
          <v-row class="availability-days">
            <v-btn color="primary" fab small dark>
              Q
            </v-btn>
          </v-row>
          <v-row class="availability-days">
            <v-btn color="primary" fab small dark>
              Q
            </v-btn>
          </v-row>
          <v-row class="availability-days">
            <v-btn color="primary" fab small dark>
              S
            </v-btn>
          </v-row>
          <v-row class="availability-days">
            <v-btn color="primary" fab small dark>
              S
            </v-btn>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "patient-form",
  props: ["value", "editedDentist"],
  data() {
    return {
      valid: true,
      items: ["", "Foo", "Bar", "Fizz", "Buzz"],
    };
  },
  methods: {
    closeDialog() {
      this.$emit("input");
    },
  },
  /* 	watch: {
		editedDentist: function (editedDentist) {
			this.paciente = editedDentist;
		},
	}, */
};
</script>

<style>
.availability-days {
  margin: 10px;
}
.availability-cols{
	padding: 0;
}
</style>
