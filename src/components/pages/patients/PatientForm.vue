<template>
	<div class="patient-form">
		<v-dialog :value="value" :editedPatient="editedPatient" persistent width="900px">
			<v-card>
				<v-card-title>
					<span class="headline">Cadastro Paciente</span>
					<v-spacer></v-spacer>
					<v-btn icon @click="closeDialog">
						<v-icon>mdi-close</v-icon>
					</v-btn>
				</v-card-title>

				<v-card-text>
					<v-container>
						<v-form v-model="valid" ref="form" @submit.prevent="onFormSubmit">
							<v-container>
								<v-row>
									<v-col cols="12" md="6">
										<v-text-field v-model="paciente.nome" :rules="nameRules" label="Nome Completo*" required></v-text-field>
									</v-col>
									<v-col cols="12" md="6">
										<v-text-field v-model="paciente.email" label="E-mail"></v-text-field>
									</v-col>
								</v-row>
								<v-row>
									<v-col cols="12" md="4">
										<v-text-field v-model="paciente.cpf" label="CPF" v-mask="'###.###.###-##'"></v-text-field>
									</v-col>

									<v-col cols="12" md="4">
										<v-text-field v-model="paciente.rg" label="RG"></v-text-field>
									</v-col>

									<v-col cols="12" md="4">
										<v-text-field v-model="paciente.telefone" :rules="phoneRules" label="Telefone*" required></v-text-field>
									</v-col>
								</v-row>
								<v-row>
									<v-col cols="12">
										<v-text-field
											v-model="paciente.endereco.cep"
											label="CEP"
											v-mask="'#####-###'"
											append-icon="mdi-magnify"
											@click:append="searchCep"
										></v-text-field>
									</v-col>
								</v-row>
								<v-row>
									<v-col cols="12" md="6">
										<v-text-field
											v-model="
                                                paciente.endereco.logradouro
                                            "
											label="Endereço"
										></v-text-field>
									</v-col>
									<v-col cols="12" md="2">
										<v-text-field v-model="paciente.endereco.numero" label="Numero"></v-text-field>
									</v-col>
									<v-col cols="12" md="4">
										<v-text-field
											v-model="
                                                paciente.endereco.complemento
                                            "
											label="Complemento"
										></v-text-field>
									</v-col>
								</v-row>
								<v-row>
									<v-col cols="12" md="5">
										<v-text-field v-model="paciente.endereco.localidade" label="Cidade"></v-text-field>
									</v-col>
									<v-col cols="12" md="5">
										<v-text-field v-model="paciente.endereco.bairro" label="Bairro"></v-text-field>
									</v-col>
									<v-col cols="12" md="2">
										<v-select v-model="paciente.endereco.uf" :items="estados" label="UF"></v-select>
									</v-col>
								</v-row>
							</v-container>
						</v-form>
					</v-container>
					<small>*campo obrigatório</small>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn :disabled="!valid" color="blue darken-1" text type="submit" @click="onFormSubmit">Salvar</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
import { db } from "@/config/firebaseDb";
import axios from "axios";

export default {
	name: "patient-form",
	props: ["value", "editedPatient"],
	data() {
		return {
			dataCep: "",
			valid: true,
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
					uf: "SP",
				},
			},
			estados: ["AC","AL","AM","AP","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RO","RS","RR","SC","SE","SP"],
			nameRules: [(v) => !!v || "Requerido"],
			phoneRules: [
				(v) => !!v || "Requerido",
				(v) => /^[0-9]*$/.test(v) || "Numero inválido",
			],
		};
	},
	methods: {
		onFormSubmit(event) {
			this.paciente.cpf = this.paciente.cpf.replace(/[^0-9]/g, ""); //remove os caracteres especiais
			this.paciente.endereco.cep = this.paciente.endereco.cep.replace(/[^0-9]/g, ""); //remove os caracteres especiais
            event.preventDefault();
            if (!this.editedPatient) {
				const dataCriacao = new Date()
				this.paciente.dataCriacao = dataCriacao
                db.collection("pacientes")
                    .add(this.paciente)
                    .then(() => {
                        this.$toast.open({
                            message: "Paciente Cadastrado",
                            type: "success",
                            position: "top-right",
                            duration: 3000,
                        });
                        this.closeDialog();
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else {
                db.collection('pacientes').doc(this.$route.params.id)
                    .update(this.paciente)
                    .then(() => {
                        this.$toast.open({
                            message: "Paciente Atualizado",
                            type: "success",
                            position: "top-right",
                            duration: 3000,
                        });
                        this.closeDialog();
                    }).catch((error) => {
                        console.log(error);
                    });
            }
		},
		async searchCep() {
			this.paciente.endereco.cep = this.paciente.endereco.cep.replace(
				/[^0-9]/g,
				""
			); //remove os caracteres especiais
			if (this.paciente.endereco.cep.length == 8) {
				await axios
					.get(
						`https://viacep.com.br/ws/${this.paciente.endereco.cep}/json/`
					)
					.then(
						(response) => (this.paciente.endereco = response.data)
					)
					.catch((error) => console.log(error));
			}
		},
		closeDialog() {
			this.$emit("input");
			if (!this.editedPatient) {
				this.$refs.form.reset();
			}
		},
	},
	watch: {
		editedPatient: function (editedPatient) {
			this.paciente = editedPatient;
		},
	},
};
</script>

<style></style>
