<template>
	<div class="patients-list">
		<PatientForm v-model="dialog" />
		<v-card>
			<v-card-title>
				<v-text-field
					v-model="search"
					append-icon="mdi-magnify"
					label="Busca"
					single-line
					hide-details
				></v-text-field>
				<v-spacer></v-spacer>
				<v-btn color="primary" small dark @click="dialog = true">
					<v-icon left>mdi-account-plus</v-icon>Adicionar Paciente
				</v-btn>
			</v-card-title>
			<v-data-table
				class="row-pointer"
				:headers="headers"
				:items="patients"
				:search="search"
			>
				<template v-slot:[`item.actions`]="{ item }">
					<v-icon color="primary" fab @click="viewPatient(item)"
						>mdi-account-edit</v-icon
					>
				</template>
			</v-data-table>
		</v-card>
	</div>
</template>

<script>
import PatientForm from "./PatientForm";
import { mapState } from "vuex";

export default {
	name: "patients-list",
	components: { PatientForm },
	data() {
		return {
			cep: "",
			data: "",
			messageCep: null,
			dialog: false,
			search: "",
			headers: [
				{ text: "Nome", align: "start", sortable: true, value: "name" },
				{ text: "Telefone", value: "phone" },
				{ text: "Email", value: "email" },
				{ text: "Ações", value: "actions", sortable: false },
			],
		};
	},
	computed: {
		...mapState(["userProfile", "patients"]),
	},
	created() {
		this.$store.dispatch("getPacientes");
	},
	methods: {
		viewPatient(patient) {
			this.$router.push({ path: `/pacientes/${patient.id}` });
		},
	},
};
</script>
<style>
</style>
