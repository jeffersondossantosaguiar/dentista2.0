<template>
    <div class="patient-create-form">
        <v-dialog :value="value" persistent width="900px">
            <v-card>
                <v-card-title>
                    <span class="headline">Cadastro Paciente</span>
                    <v-spacer></v-spacer>
                    <v-btn icon @click.native="$emit('input')" @click="reset">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-card-title>

                <v-card-text>
                    <v-container>
                        <v-form v-model="valid" ref="form" @submit.prevent="onFormSubmit">
                            <v-container>
                                <v-row>
                                    <v-col cols="12" md="6">
                                        <v-text-field
                                            v-model="paciente.nome"
                                            :rules="nameRules"
                                            label="Nome Completo*"
                                            required
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <v-text-field
                                            v-model="paciente.email"
                                            label="E-mail"
                                        ></v-text-field>
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
                                        <v-text-field
                                            v-model="paciente.telefone"
                                            :rules="phoneRules"
                                            label="Telefone*"
                                            required
                                        ></v-text-field>
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
                                    <v-col cols="10" md="10">
                                        <v-text-field
                                            v-model="paciente.endereco.logradouro"
                                            label="Endereço"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="2" md="2">
                                        <v-text-field
                                            v-model="paciente.endereco.numero"
                                            label="Numero"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12" md="6">
                                        <v-text-field
                                            v-model="paciente.endereco.complemento"
                                            label="Complemento"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="6" md="4">
                                        <v-text-field
                                            v-model="paciente.endereco.bairro"
                                            label="Bairro"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="6" md="2">
                                        <v-select
                                            v-model="paciente.endereco.uf"
                                            :items="estados"
                                            label="UF"
                                        ></v-select>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-form>
                    </v-container>
                    <small>*campo obrigatório</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="reset">Resetar</v-btn>
                    <v-btn :disabled="!valid" color="blue darken-1" text type="submit" @click="onFormSubmit">Salvar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { db } from "@/config/firebaseDb"
import axios from 'axios'

export default {
    name: "patient-create-form",
    props: ["value"],
    data() {
        return {
            dataCep: '',
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
                    uf: "SP",
                },
            },
            estados: ["AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RO", "RS", "RR", "SC", "SE", "SP"],
            nameRules: [(v) => !!v || "Requerido"],
            phoneRules: [
                v => !!v || "Requerido",
                v => /^[0-9]*$/.test(v) || 'Numero inválido'
                ]
        };
    },
    methods: {
        onFormSubmit(event) {
            this.paciente.cpf = this.paciente.cpf.replace(/[^0-9]/g, "") //remove os caracteres especiais
            this.paciente.endereco.cep = this.paciente.endereco.cep.replace(/[^0-9]/g, "") //remove os caracteres especiais
            event.preventDefault();
            db.collection("pacientes")
                .add(this.paciente)
                .then(() => {
                    this.$toast.open({
                        message: 'Paciente Cadastrado',
                        type: 'success',
                        position: 'top-right',
                        duration: 3000,
                    });
                    this.closeDialog()
                    this.reset()
                })
                .catch((error) => {
                    console.log(error);
                })
        },
        reset() {
            this.$refs.form.reset();
        },
        closeDialog() {
            this.$emit('input')
        },
        async searchCep () {
            this.paciente.endereco.cep = this.paciente.endereco.cep.replace(/[^0-9]/g, "") //remove os caracteres especiais
			if(this.paciente.endereco.cep.length == 8) {
				await axios.get(`https://viacep.com.br/ws/${ this.paciente.endereco.cep }/json/`)
                .then( response => this.paciente.endereco = response.data )
                .catch( error => console.log(error) )
            }
		}
    },
};
</script>

<style>
</style>