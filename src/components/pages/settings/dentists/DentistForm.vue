<template>
	<div class="dentist-form">
		<v-dialog :value="value" :editedDentist="editedDentist" persistent width="900px">
			<v-card>
				<v-card-title>
					<span class="headline">Cadastro Cirurgião-Dentista</span>
					<v-spacer></v-spacer>
					<v-btn icon @click="closeDialog">
						<v-icon>mdi-close</v-icon>
					</v-btn>
				</v-card-title>

				<v-card-text>
					<v-container>
						<v-form v-model="valid" ref="form" @submit.prevent>
							<v-container>
								<v-row>
									<v-col cols="12" md="6">
										<v-text-field v-model="dentista.nome" :rules="nameRules" label="Nome Completo*" required></v-text-field>
									</v-col>
									<v-col cols="12" md="6">
										<v-text-field v-model="dentista.email" label="E-mail"></v-text-field>
									</v-col>
								</v-row>
								<v-row>
									<v-col cols="12" md="4">
										<v-text-field v-model="dentista.cpf" label="CPF" v-mask="'###.###.###-##'"></v-text-field>
									</v-col>

									<v-col cols="12" md="4">
										<v-text-field v-model="dentista.rg" label="RG"></v-text-field>
									</v-col>

									<v-col cols="12" md="4">
										<v-text-field v-model="dentista.telefone" :rules="phoneRules" label="Telefone*" required></v-text-field>
									</v-col>
								</v-row>
								<v-row>
									<v-col cols="12" md="8">
										<v-select chips v-model="dentista.especialidade" multiple hint="Selecione uma ou mais especialidades" persistent-hint :items="especialidades" label="Especialidades"></v-select>
									</v-col>
									<v-col cols="12" md="2">
										<v-text-field v-model="dentista.cro" label="Nº CRO"></v-text-field>
									</v-col>
									<v-col cols="12" md="2">
										<v-select v-model="dentista.croUf" :items="estados" label="UF"></v-select>
									</v-col>
								</v-row>
								<v-row>
									<v-col cols="12">
										<v-text-field
											v-model="dentista.endereco.cep"
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
                                                dentista.endereco.logradouro
                                            "
											label="Endereço"
										></v-text-field>
									</v-col>
									<v-col cols="12" md="2">
										<v-text-field v-model="dentista.endereco.numero" label="Numero"></v-text-field>
									</v-col>
									<v-col cols="12" md="4">
										<v-text-field
											v-model="
                                                dentista.endereco.complemento
                                            "
											label="Complemento"
										></v-text-field>
									</v-col>
								</v-row>
								<v-row>
									<v-col cols="12" md="5">
										<v-text-field v-model="dentista.endereco.localidade" label="Cidade"></v-text-field>
									</v-col>
									<v-col cols="12" md="5">
										<v-text-field v-model="dentista.endereco.bairro" label="Bairro"></v-text-field>
									</v-col>
									<v-col cols="12" md="2">
										<v-select v-model="dentista.endereco.uf" :items="estados" label="UF"></v-select>
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
import { dentistasCollection } from "@/config/firebase";
import axios from "axios";

export default {
	name: "dentist-form",
	props: ["value", "editedDentist"],
	data() {
		return {
			dataCep: "",
			valid: true,
			dentista: {
				nome: "",
				email: "",
				cpf: "",
				rg: "",
				telefone: "",
				especialidade: [],
				cro: "",
				croUf: "",
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
			especialidades: ["Cirurgia e Traumatologia Buco – Maxilo – Facial", "Dentística", "Disfunção Têmporo Mandibular e Dor Orofacial", "Endodontia", "Estomatologia", "Implantodontia", "Odontogeriatria", "Odontologia do Trabalho", "Odontologia Legal", "Odontologia para Pacientes com Necessidades Especiais","Odontopediatria", "Ortodontia", "Ortopedia Funcional dos Maxilares", "Patologia Bucal", "Periodontia", "Prótese Buco – Maxilo – Facial", "Prótese Dentária", "Radiologia Odontológica e Imaginologia", "Saúde Coletiva"],
			nameRules: [(v) => !!v || "Requerido"],
			phoneRules: [
				(v) => !!v || "Requerido",
				(v) => /^[0-9]*$/.test(v) || "Numero inválido",
			],
		};
	},
	methods: {
		onFormSubmit() {
			if (this.dentista.cpf){
				this.dentista.cpf = this.dentista.cpf.replace(/[^0-9]/g, ""); //remove os caracteres especiais
			}
			this.dentista.endereco.cep = this.dentista.endereco.cep.replace(/[^0-9]/g, ""); //remove os caracteres especiais

            if (!this.editedDentist) {
				const dataCriacao = new Date()
				this.dentista.dataCriacao = dataCriacao
				this.dentista.ativo = true
                dentistasCollection
                    .add(this.dentista)
                    .then(() => {
                        this.$toast.open({
                            message: "Dentista Cadastrado",
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
                dentistasCollection.doc(this.$route.params.id)
                    .update(this.dentista)
                    .then(() => {
                        this.$toast.open({
                            message: "Dentista Atualizado",
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
			this.dentista.endereco.cep = this.dentista.endereco.cep.replace(/[^0-9]/g,""); //remove os caracteres especiais
			if (this.dentista.endereco.cep.length == 8) {
				await axios
					.get(
						`https://viacep.com.br/ws/${this.dentista.endereco.cep}/json/`
					)
					.then(
						(response) => (this.dentista.endereco = response.data)
					)
					.catch((error) => console.log(error));
			}
		},
		closeDialog() {
			this.$emit("input");
			if (!this.editedDentist) {
				this.$refs.form.reset();
				this.dentista = {
				nome: "",
				email: "",
				cpf: "",
				rg: "",
				telefone: "",
				especialidade: [],
				cro: "",
				croUf: "",
				endereco: {
					cep: "",
					logradouro: "",
					numero: "",
					complemento: "",
					bairro: "",
					localidade: "",
					uf: "SP",
				},}
			}
		},
	},
	watch: {
		editedDentist: function (editedDentist) {
			this.dentista = editedDentist;
		},
	},
};
</script>

<style></style>
