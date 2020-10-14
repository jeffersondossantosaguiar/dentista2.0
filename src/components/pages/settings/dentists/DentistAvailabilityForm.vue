<template>
	<div class="patient-form">
		<v-dialog :value="value" :editedDentist="editedDentist" persistent width="900px">
            <v-card>
                <v-card-title>
                    Disponibilidade
                    <v-spacer></v-spacer>
					<v-btn icon @click="closeDialog">
						<v-icon>mdi-close</v-icon>
					</v-btn>
                </v-card-title>
                <v-card-text>ABC</v-card-text>
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

<style></style>
