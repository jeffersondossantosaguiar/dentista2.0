<template>
	<div class="patients-list">
		<PatientCreateForm v-model="dialog" />
		<v-card>
			<v-card-title>
				<v-text-field
					v-model="search"
					append-icon="mdi-magnify"
					label="Search"
					single-line
					hide-details
				></v-text-field>
				<v-spacer></v-spacer>
				<v-btn color="#ff5252" dark @click="dialog = true">
					<v-icon left>mdi-account-plus</v-icon>Adicionar Paciente
				</v-btn>
			</v-card-title>
			<v-data-table :headers="headers" :items="Patients" :search="search">
				<template v-slot:item.actions="{ item }">
					<v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
					<v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
				</template>
			</v-data-table>
		</v-card>
	</div>
</template>

<script>
import { db } from "@/config/firebaseDb.js";
import PatientCreateForm from "@/components/template/PatientCreateForm.vue";

export default {
	name: "patients-list",
	components: { PatientCreateForm },
	data() {
		return {
			dialog: false,
			search: "",
			headers: [
				{ text: "Nome", align: "start", sortable: true, value: "name" },
				{ text: "Telefone", value: "phone" },
				{ text: "Email", value: "email" },
				{ text: "Ações", value: "actions", sortable: false },
			],
			Patients: [],
		};
	},
	created() {
		db.collection("pacientes").onSnapshot((snapshotChange) => {
			this.Patients = [];
			snapshotChange.forEach((res) => {
				this.Patients.push({
					key: res.id,
					name: res.data().nome,
					phone: res.data().telefone,
					email: res.data().email,
				});
			});
		});
		// CONSULTA DE ENREÇOS DOS USUÁRIOS
		/* var enderecos = db.collectionGroup("endereco");
		enderecos.get().then(function (querySnapshot) {
			querySnapshot.forEach(function (doc) {
				console.log(doc.id, " => ", doc.data());
			});
		}); */
	},
	methods: {},
};
</script>

<style>
.patients-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.patients-header h2 {
	font-weight: 500;
	font-size: 1.2rem;
	margin-left: 20px;
}
hr {
	border-top: 1px solid #dfdfdf;
	margin: 10px 0px;
}
.text-start {
	text-align: left;
}
</style>