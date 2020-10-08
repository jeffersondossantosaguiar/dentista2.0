<template>
    <v-container class="dentist-view">
        <DentistForm v-model="dialog" :editedDentist="editedDentist" />
        <v-container class="d-flex text-center align-self-center">
            <v-spacer></v-spacer>
            <v-btn text small color="primary">
                <v-icon>mdi-printer</v-icon>
            </v-btn>
            <v-btn text small color="primary" @click="editDentist(dentista)">
                <v-icon>mdi-account-edit</v-icon>Editar Dentista
            </v-btn>
        </v-container>
        <v-row>
            <v-col class="padding-right-0px" cols="12" md="3">
                <v-card class="v-card-profile d-flex">
                    <v-container class="text-center align-self-center">
                        <v-avatar
                            class="avatar rounded-circle"
                            rounded="true"
                            size="100"
                        >
                            <img
                                src="../../../../assets/avatar.jpg"
                                alt="Joselito"
                            />
                        </v-avatar>
                        <h3 class="pt-5">{{ dentista.nome }}</h3>
                        <p>{{ dentista.email }}</p>
                        <p>{{ dentista.telefone }}</p>
                        <v-btn outlined color="primary">
                            <v-icon>mdi-plus</v-icon>Consulta
                        </v-btn>
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
                                        {{ dentista.endereco.logradouro }},
                                        {{ dentista.endereco.numero }}
                                        {{ dentista.endereco.complemento }}
                                    </p>
                                </v-container>
                                <v-container>
                                    <strong class="font-weight-medium"
                                        >Bairro</strong
                                    >
                                    <p>{{ dentista.endereco.bairro }}</p>
                                </v-container>
                            </v-container>
                            <v-container class="d-flex v-card__text pl-4 pt-5">
                                <v-container>
                                    <strong class="font-weight-medium"
                                        >Cidade</strong
                                    >
                                    <p>
                                        {{ dentista.endereco.localidade }} -
                                        {{ dentista.endereco.uf }}
                                    </p>
                                </v-container>
                                <v-container>
                                    <strong class="font-weight-medium"
                                        >CEP</strong
                                    >
                                    <p>{{ dentista.endereco.cep }}</p>
                                </v-container>
                            </v-container>
                            <v-container class="d-flex v-card__text pl-4 pt-5">
                                <v-container>
                                    <strong class="font-weight-medium"
                                        >Status do Dentista</strong
                                    >
                                    <p>Ativo</p>
                                </v-container>
                                <v-container>
                                    <strong class="font-weight-medium"
                                        >Data de Registro</strong
                                    >
                                    <p>{{ dentista.dataCriacao }}</p>
                                </v-container>
                            </v-container>
                        </v-container>
                    </v-container>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { dentistasCollection } from "@/config/firebase"
import DentistForm from "./DentistForm"

export default {
    name: "dentist-view",
    components: { DentistForm },
    data: () => ({
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
                uf: "SP"
            }
        },
        dialog: false,
        editedDentist: null,
        files: {}
    }),
    created() {
        let dbRef = dentistasCollection.doc(this.$route.params.id)
        dbRef
            .get()
            .then((doc) => {
                this.dentista = doc.data()
                const option = {
                    dateStyle: "long"
                }
                this.dentista.dataCriacao = this.dentista.dataCriacao
                    .toDate()
                    .toLocaleDateString("pt-BR", option)
            })
            .catch((error) => {
                console.log("ERRO", error)
            })
    },
    methods: {
        editDentist(dentista) {
            this.editedDentist = dentista
			this.dialog = !this.dialog
        }
    }
}
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
.padding-right-0px {
    padding-right: 0px;
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
