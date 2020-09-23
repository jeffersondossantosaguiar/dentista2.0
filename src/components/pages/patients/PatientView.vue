<template>
	<v-container class="patient-view">
		<PatientCreateForm v-model="dialog" :editedPatient="editedPatient"/>
		<v-container class="d-flex text-center align-self-center">
			{{this.$route.path}}
			<v-spacer></v-spacer>
			<v-btn text small color="primary">
				<v-icon>mdi-printer</v-icon>
			</v-btn>
			<v-btn text small color="primary" @click="editPatient(paciente)">
				<v-icon>mdi-account-edit</v-icon>Editar Paciente
			</v-btn>
		</v-container>
		<v-row>
			<v-col cols="12" md="3">
				<v-card class="v-card-profile d-flex">
					<v-container class="text-center align-self-center">
						<v-avatar class="avatar rounded-circle" rounded="true" size="100">
							<img
								src="https://lnb.com.br/wp-content/uploads/2016/03/Joselito-Sem-No%C3%A7%C3%A3o-400x406.jpg"
								alt="Joselito"
							/>
						</v-avatar>
						<h3 class="pt-5">{{paciente.nome}} </h3>
						<p>{{paciente.email}}</p>
						<p>{{paciente.telefone}}</p>
					</v-container>
				</v-card>
			</v-col>
			<v-col cols="12" md="5">
				<v-card class="v-card-data">
					<v-card-title class="v-card-title">Dados</v-card-title>
					<v-container class="d-flex">
						<v-container class="align-self-center">
							<v-container class="d-flex v-card__text pl-4 pt-5">
								<v-container>
									<strong class="font-weight-medium">Logradouro</strong>
									<p>Rua Jovelina Maria de Brito, 267</p>
								</v-container>
								<v-container>
									<strong class="font-weight-medium">Bairro</strong>
									<p>Jardim Nova Esperança</p>
								</v-container>
							</v-container>
							<v-container class="d-flex v-card__text pl-4 pt-5">
								<v-container>
									<strong class="font-weight-medium">Cidade</strong>
									<p>Sorocaba - SP</p>
								</v-container>
								<v-container>
									<strong class="font-weight-medium">CEP</strong>
									<p>18061-459</p>
								</v-container>
							</v-container>
							<v-container class="d-flex v-card__text pl-4 pt-5">
								<v-container>
									<strong class="font-weight-medium">Status do Paciente</strong>
									<p>Ativo</p>
								</v-container>
								<v-container>
									<strong class="font-weight-medium">Data de Registro</strong>
									<p>22 de Setembro de 2020</p>
								</v-container>
							</v-container>
						</v-container>
					</v-container>
				</v-card>
			</v-col>

			<v-col cols="12" md="4">
				<v-card class="v-card-notes">
					<v-card-title class="v-card-title">Notas</v-card-title>
					<v-card-text class="text-center">
						<v-textarea
							outlined
							name="input-7-4"
							label="Notas do Paciente"
							value="Paciente sente dores ao mastigar..."
						></v-textarea>
						<v-btn color="primary">Salvar</v-btn>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
		<v-row>
			<v-col cols="12" md="8">
				<v-card class="v-card-historic overflow-y-auto">
					<v-card-title class="v-card-title">Histórico</v-card-title>
					<v-timeline dense class="v-timeline">
						<v-timeline-item fill-dot small>
							<v-card class="elevation-2">
								<v-card-title class="headline">Lorem ipsum</v-card-title>
								<v-card-text>
									Lorem ipsum dolor sit amet, no nam oblique
									veritus. Commune scaevola imperdiet nec ut,
									sed euismod convenire principes at. Est et
									nobis iisque percipit, an vim zril
									disputando voluptatibus, vix an salutandi
									sententiae.
								</v-card-text>
							</v-card>
						</v-timeline-item>
						<v-timeline-item fill-dot small>
							<v-card class="elevation-2">
								<v-card-title class="headline">Lorem ipsum</v-card-title>
								<v-card-text>
									Lorem ipsum dolor sit amet, no nam oblique
									veritus. Commune scaevola imperdiet nec ut,
									sed euismod convenire principes at. Est et
									nobis iisque percipit, an vim zril
									disputando voluptatibus, vix an salutandi
									sententiae.
								</v-card-text>
							</v-card>
						</v-timeline-item>
						<v-timeline-item fill-dot small>
							<v-card class="elevation-2">
								<v-card-title class="headline">Lorem ipsum</v-card-title>
								<v-card-text>
									Lorem ipsum dolor sit amet, no nam oblique
									veritus. Commune scaevola imperdiet nec ut,
									sed euismod convenire principes at. Est et
									nobis iisque percipit, an vim zril
									disputando voluptatibus, vix an salutandi
									sententiae.
								</v-card-text>
							</v-card>
						</v-timeline-item>
					</v-timeline>
				</v-card>
			</v-col>
			<v-col cols="12" md="4">
				<v-card class="v-card-files">
					<v-card-title class="v-card-title">
						Arquivos / Documentos / Exames
						<v-spacer></v-spacer>
						<v-btn text color="primary">
							<v-icon left>mdi-file-plus</v-icon>Upload
						</v-btn>
					</v-card-title>
					<v-card-text class="text-center">
						<v-list class="files-list">
							<v-list-item v-for="item in items2" :key="item.title">
								<v-list-item-avatar>
									<v-icon :class="[item.iconClass]">{{ item.icon }}</v-icon>
								</v-list-item-avatar>
								<v-list-item-content class="text-left">
									<v-list-item-title v-text="item.title"></v-list-item-title>
									<v-list-item-subtitle v-text="item.subtitle"></v-list-item-subtitle>
								</v-list-item-content>

								<v-list-item-action>
									<v-btn icon>
										<v-icon color="grey lighten-1">mdi-information</v-icon>
									</v-btn>
								</v-list-item-action>
							</v-list-item>
						</v-list>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { db } from "@/config/firebaseDb.js"
import PatientCreateForm from "@/components/template/PatientCreateForm.vue"

export default {
	name: "patient-view",
	components: { PatientCreateForm },
	data: () => ({
		paciente: {},
		dialog: false,
		editedPatient: null,
		items2: [
			{
				icon: "mdi-file-document",
				iconClass: "blue white--text",
				title: "Vacation itinerary",
				subtitle: "Jan 20, 2014",
			},
			{
				icon: "mdi-image",
				iconClass: "amber white--text",
				title: "Kitchen remodel",
				subtitle: "Jan 10, 2014",
			}
		],
	}),
	created() {
		let dbRef = db.collection('pacientes').doc(this.$route.params.id);
            dbRef.get().then((doc) => {
				this.paciente = doc.data()
            }).catch((error) => {
                console.log(error)
			})
	},
	methods: {
		editPatient(paciente) {
			this.editedPatient = paciente
			this.dialog = !this.dialog
		}
	}
};
</script>

<style>
.v-timeline {
	height: 300px;
	overflow-y: auto;
}
.files-list {
	height: 250px;
	overflow-y: auto;
}
.v-timeline {
	padding-right: 20px;
}
.v-card-title {
	font-size: 0.9em;
}
.notas {
	text-align: start;
}
.container {
	padding: 0;
}
.v-card-profile {
	min-height: 350px;
}
.v-card-data {
	min-height: 350px;
}
.v-card-notes {
	min-height: 350px;
}
.v-card-historic {
	min-height: 350px;
}
.v-card-files {
	min-height: 350px;
}
</style>
