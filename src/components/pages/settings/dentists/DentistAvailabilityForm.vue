<template>
  <div class="patient-form">
    <v-dialog
      :value="value"
      :editedDentist="editedDentist"
      persistent
      max-width="900px"
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
          <v-row v-for="(day, index) in availabilityDaysArray" :key="index" class="availabilityDays">
            <v-btn :color="day.disabled ? `red` : `primary`" fab small dark>
              {{ day.day }}
            </v-btn>

            <vue-timepicker
              v-model="day.start_time"
              placeholder="Início Jornada"
              :disabled="day.disabled"
              manual-input
              hide-dropdown
            ></vue-timepicker
            >:

            <vue-timepicker
              v-model="day.start_break_hour"
              placeholder="Início Descanso"
              :disabled="day.disabled"
              manual-input
              hide-dropdown
            ></vue-timepicker
            >:

            <vue-timepicker
              v-model="day.end_break_hour"
              placeholder="Final Descanso"
              :disabled="day.disabled"
              manual-input
              hide-dropdown
            ></vue-timepicker
            >:

            <vue-timepicker
              v-model="day.end_time"
              placeholder="Final Jornada"
              :disabled="day.disabled"
              manual-input
              hide-dropdown
            ></vue-timepicker
            >
          </v-row>
        </v-card-text>
        <v-card-actions>
					<v-spacer></v-spacer>
					<v-btn :disabled="!valid" color="blue darken-1" text type="submit">Salvar</v-btn>
				</v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import VueTimepicker from "vue2-timepicker"
import "vue2-timepicker/dist/VueTimepicker.css"

export default {
  name: "patient-form",
  props: ["value", "editedDentist"],
  components: { VueTimepicker },
  data() {
    return {
      valid: true,
      availabilityDaysArray: [
        {
          day: "D",
          disabled: true,
          start_time: { HH: "", mm: "" },
          start_break_hour: { HH: "", mm: "" },
          end_break_hour: { HH: "", mm: "" },
          end_time: { HH: "", mm: "" },
        },
        {
          day: "S",
          disabled: false,
          start_time: { HH: "", mm: "" },
          start_break_hour: { HH: "", mm: "" },
          end_break_hour: { HH: "", mm: "" },
          end_time: { HH: "", mm: "" },
        },
        {
          day: "T",
          disabled: false,
          start_time: { HH: "", mm: "" },
          start_break_hour: { HH: "", mm: "" },
          end_break_hour: { HH: "", mm: "" },
          end_time: { HH: "", mm: "" },
        },
        {
          day: "Q",
          disabled: false,
          start_time: { HH: "", mm: "" },
          start_break_hour: { HH: "", mm: "" },
          end_break_hour: { HH: "", mm: "" },
          end_time: { HH: "", mm: "" },
        },
        {
          day: "Q",
          disabled: false,
          start_time: { HH: "", mm: "" },
          start_break_hour: { HH: "", mm: "" },
          end_break_hour: { HH: "", mm: "" },
          end_time: { HH: "", mm: "" },
        },
        {
          day: "S",
          disabled: false,
          start_time: { HH: "", mm: "" },
          start_break_hour: { HH: "", mm: "" },
          end_break_hour: { HH: "", mm: "" },
          end_time: { HH: "", mm: "" },
        },
        {
          day: "S",
          disabled: false,
          start_time: { HH: "", mm: "" },
          start_break_hour: { HH: "", mm: "" },
          end_break_hour: { HH: "", mm: "" },
          end_time: { HH: "", mm: "" },
        },
      ],
    }
  },
  methods: {
    closeDialog() {
      this.$emit("input")
    },
  },
  /* 	watch: {
		editedDentist: function (editedDentist) {
			this.paciente = editedDentist;
		},
	}, */
}
</script>

<style>
.row {
  padding: 5px;
}
.availabilityDays{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}
.v-btn {
  margin-right: 20px;
}
.disabled {
  background: #d0cece;
}
.display-time {
  border-radius: 4px;
}
</style>
