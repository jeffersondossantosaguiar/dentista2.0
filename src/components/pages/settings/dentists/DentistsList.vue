<template>
    <div class="dentists-list">
        <DentistForm v-model="dialog" />
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
                    <v-icon left>mdi-account-plus</v-icon>Adicionar Dentista
                </v-btn>
            </v-card-title>
            <v-data-table
                class="row-pointer"
                :headers="headers"
                :items="Dentists"
                :search="search"
            >
                <template v-slot:[`item.speciality`]="{ item }">
                    <template v-for="speciality in item.speciality"><v-chip :key="speciality">{{speciality}}</v-chip></template>
                </template>
                <template v-slot:[`item.name`]="{ item }">
                    <v-avatar size="36">
                        <img
                            src="@/assets/avatar.jpg"
                        />
                    </v-avatar> {{ item.name }}
                </template>
                <template v-slot:[`item.enable`]="{ item }">
                    <v-icon v-if="item.enable" color="green" fab
                        >mdi-checkbox-marked-circle</v-icon
                    >
                    <v-icon v-else fab
                        >mdi-checkbox-blank-circle-outline</v-icon
                    >
                </template>
                <template v-slot:[`item.actions`]="{ item }">
                    <v-icon color="primary" fab @click="viewDentist(item)"
                        >mdi-account-edit</v-icon
                    >
                </template>
            </v-data-table>
        </v-card>
    </div>
</template>

<script>
import DentistForm from "./DentistForm"
import { dentistasCollection } from "@/config/firebase.js"

export default {
    name: "dentists-list",
    components: {DentistForm},
    data() {
        return {
            dialog: false,
            search: "",
            headers: [
                { text: "Nome", align: "start", sortable: true, value: "name" },
                { text: "Especialidade(s)", value: "speciality" },
                { text: "Telefone", value: "phone", sortable: true },
                { text: "E-mail", value: "email", sortable: true },
                { text: "CRO", value: "cro" },
                { text: "Ativo", value: "enable", sortable: true },
                { text: "Ações", value: "actions", sortable: false }
            ],
            Dentists: []
        }
    },
    async created() {
        await dentistasCollection.onSnapshot((snapshotChange) => {
            this.Dentists = []
            snapshotChange.forEach((res) => {
                this.Dentists.push({
                    id: res.id,
                    name: res.data().nome,
                    speciality: res.data().especialidade,
                    phone: res.data().telefone,
                    email: res.data().email,
                    cro: res.data().cro,
                    enable: res.data().ativo
                })
            })
        })
    },
    methods: {
        viewDentist(dentist) {
            this.$router.push({ path: `/configuracoes/dentistas/${dentist.id}` })
        }
    }
}
</script>

<style>

</style>
