<template>
    <div class="patient-create-form">
        <v-card>
            <v-dialog :value="value" persistent>
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
                                        <v-col cols="12" md="4">
                                            <v-text-field
                                                v-model="paciente.nome"
                                                :rules="nameRules"
                                                label="Primeiro Nome*"
                                                required
                                            ></v-text-field>
                                        </v-col>

                                        <v-col cols="12" md="4">
                                            <v-text-field
                                                v-model="paciente.sobrenome"
                                                :rules="nameRules"
                                                label="Sobrenome*"
                                                required
                                            ></v-text-field>
                                        </v-col>

                                        <v-col cols="12" md="4">
                                            <v-text-field
                                                v-model="paciente.email"
                                                :rules="emailRules"
                                                label="E-mail"
                                                required
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12" md="4">
                                            <v-text-field
                                                v-model="paciente.nome"
                                                :rules="nameRules"
                                                label="Primeiro Nome*"
                                                required
                                            ></v-text-field>
                                        </v-col>

                                        <v-col cols="12" md="4">
                                            <v-text-field
                                                v-model="paciente.sobrenome"
                                                :rules="nameRules"
                                                label="Sobrenome*"
                                                required
                                            ></v-text-field>
                                        </v-col>

                                        <v-col cols="12" md="4">
                                            <v-text-field
                                                v-model="paciente.email"
                                                :rules="emailRules"
                                                label="E-mail"
                                                required
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
        </v-card>
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
                sobrenome: "",
                email: "",
                cpf: "",
                rg: "",
                telefone: "",
                endereco: {
                    bairro: "",
                    cep: "",
                    complemento: "",
                    logradouro: "",
                    uf: ""
                }
            },
            nameRules: [(v) => !!v || "Requerido"],
            emailRules: [
                (v) => !!v || "E-mail é requerido!",
                (v) => /.+@.+/.test(v) || "E-mail must be valid",
            ],
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
                    this.paciente.sobrenome = "";
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