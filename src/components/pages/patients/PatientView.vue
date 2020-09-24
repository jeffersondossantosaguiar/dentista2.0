<template>
	<v-container class="patient-view">
		<PatientCreateForm v-model="dialog" :editedPatient="editedPatient" />
		<v-container class="d-flex text-center align-self-center">
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
						<v-avatar
							class="avatar rounded-circle"
							rounded="true"
							size="100"
						>
							<img
								src="../../../assets/avatar.jpg"
								alt="Joselito"
							/>
						</v-avatar>
						<h3 class="pt-5">{{ paciente.nome }}</h3>
						<p>{{ paciente.email }}</p>
						<p>{{ paciente.telefone }}</p>
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
									<strong class="font-weight-medium"
										>Logradouro</strong
									>
									<p>
										{{ paciente.endereco.logradouro }},
										{{ paciente.endereco.numero }}
										{{ paciente.endereco.complemento }}
									</p>
								</v-container>
								<v-container>
									<strong class="font-weight-medium"
										>Bairro</strong
									>
									<p>{{ paciente.endereco.bairro }}</p>
								</v-container>
							</v-container>
							<v-container class="d-flex v-card__text pl-4 pt-5">
								<v-container>
									<strong class="font-weight-medium"
										>Cidade</strong
									>
									<p>
										{{ paciente.endereco.localidade }} -
										{{ paciente.endereco.uf }}
									</p>
								</v-container>
								<v-container>
									<strong class="font-weight-medium"
										>CEP</strong
									>
									<p>{{ paciente.endereco.cep }}</p>
								</v-container>
							</v-container>
							<v-container class="d-flex v-card__text pl-4 pt-5">
								<v-container>
									<strong class="font-weight-medium"
										>Status do Paciente</strong
									>
									<p>Ativo</p>
								</v-container>
								<v-container>
									<strong class="font-weight-medium"
										>Data de Registro</strong
									>
									<p>{{ paciente.dataCriacao }}</p>
								</v-container>
							</v-container>
						</v-container>
					</v-container>
				</v-card>
			</v-col>

			<v-col cols="12" md="4">
				<v-card class="v-card-notes">
					<v-form ref="formNotes" @submit.prevent="onFormNotesSubmit">
						<v-card-title class="v-card-title">Notas</v-card-title>
						<v-card-text class="text-center">
							<v-textarea
								v-model="paciente.notas"
								outlined
								name="input-7-4"
								label="Notas do Paciente"
							></v-textarea>
							<v-btn
								color="primary"
								type="submit"
								@click="onFormNotesSubmit"
								>Salvar</v-btn
							>
						</v-card-text>
					</v-form>
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
								<v-card-title class="headline"
									>Lorem ipsum</v-card-title
								>
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
								<v-card-title class="headline"
									>Lorem ipsum</v-card-title
								>
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
								<v-card-title class="headline"
									>Lorem ipsum</v-card-title
								>
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
				<PatientFiles :paciente="paciente" />
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { db } from "@/config/firebaseDb.js";
import PatientCreateForm from "@/components/template/PatientCreateForm.vue";
import PatientFiles from "./PatientFiles";

export default {
	name: "patient-view",
	components: { PatientCreateForm, PatientFiles },
	data: () => ({
		paciente: {
			nome: "",
			email: "",
			cpf: "",
			rg: "",
			telefone: "",
			endereco: {
				cep: "",
				logradouro: "",
				numero: "",
				complemento: "",
				bairro: "",
				localidade: "",
				uf: "",
			},
			notes: "",
		},
		dialog: false,
		editedPatient: null,
		files: {},
	}),
	created() {
		let dbRef = db.collection("pacientes").doc(this.$route.params.id);
		dbRef.get()
			.then((doc) => {
				this.paciente = doc.data();
				const option = {
					dateStyle: "long",
				};
				this.paciente.dataCriacao = this.paciente.dataCriacao
					.toDate()
					.toLocaleDateString("pt-BR", option);
			})
			.catch((error) => {
				console.log("ERRO", error);
			});
	},
	methods: {
		editPatient(paciente) {
			this.editedPatient = paciente;
			this.dialog = !this.dialog;
		},
		onFormNotesSubmit(event) {
			event.preventDefault();
			db.collection("pacientes")
				.doc(this.$route.params.id)
				.update(this.paciente)
				.then(() => {
					this.$toast.open({
						message: "Notas do Paciente Atualizadas",
						type: "success",
						position: "top-right",
						duration: 3000,
					});
				})
				.catch((error) => {
					console.log(error);
				});
		},
	},
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
