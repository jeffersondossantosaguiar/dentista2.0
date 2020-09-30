<template>
    <div class="dentists-list">
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
                <v-btn color="primary" dark @click="dialog = true">
                    <v-icon left>mdi-account-plus</v-icon>Adicionar Dentista
                </v-btn>
            </v-card-title>
            <v-data-table
                class="row-pointer"
                :headers="headers"
                :items="Dentists"
                :search="search"
            >
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
                    <v-icon color="primary" fab @click="viewPatient(item)"
                        >mdi-account-edit</v-icon
                    >
                </template>
            </v-data-table>
        </v-card>
    </div>
</template>

<script>
import { db } from "@/config/firebaseDb.js"

export default {
    name: "dentists-list",
    data() {
        return {
            dialog: false,
            search: "",
            headers: [
                { text: "Nome", align: "start", sortable: true, value: "name" },
                { text: "Especialidade", value: "speciality" },
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
        await db.collection("dentistas").onSnapshot((snapshotChange) => {
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
        viewPatient(patient) {
            this.$router.push({ path: `/pacientes/${patient.id}` })
        }
    }
}
</script>

<style>

</style>
