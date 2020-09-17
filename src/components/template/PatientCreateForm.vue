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
                                            :rules="emailRules"
                                            label="E-mail"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12" md="4">
                                        <v-text-field v-model="paciente.cpf" label="CPF"></v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="4">
                                        <v-text-field v-model="paciente.rg" label="RG"></v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="4">
                                        <v-text-field
                                            v-model="paciente.telefone"
                                            :rules="nameRules"
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
                                            append-icon="mdi-magnify"
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
                                        <v-text-field
                                            v-model="paciente.endereco.uf"
                                            label="UF"
                                        ></v-text-field>
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
                    <v-btn color="blue darken-1" text type="submit" @click="onFormSubmit">Salvar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { db } from "@/config/firebaseDb";

export default {
    name: "patient-create-form",
    props: ["value"],
    data() {
        return {
            valid: false,
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
                    uf: "",
                },
            },
            nameRules: [(v) => !!v || "Requerido"],
            emailRules: [(v) => /.+@.+/.test(v) || "E-mail inválido"],
        };
    },
    methods: {
        onFormSubmit(event) {
            event.preventDefault();
            db.collection("pacientes")
                .add(this.paciente)
                .then(() => {
                    alert("Paciente cadastrado");
                    this.paciente.name = "";
                    this.paciente.email = "";
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        reset() {
            this.$refs.form.reset();
        },
    },
};
</script>

<style>
</style>