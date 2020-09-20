<template>
    <div class="patients-list">
        <PatientCreateForm v-model="dialog" />
        <v-card>
            <v-card-title>
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
                ></v-text-field>
                <v-spacer></v-spacer>
                <v-btn color="primary" dark @click="dialog = true">
                    <v-icon left>mdi-account-plus</v-icon>Adicionar Paciente
                </v-btn>
            </v-card-title>
            <v-data-table
                class="row-pointer"
                :headers="headers"
                :items="Patients"
                :search="search"
            >
                <template v-slot:item.actions="{ item }">
                    <v-icon small class="mr-2" @click="editPatient(item)"
                        >mdi-pencil</v-icon
                    >
                    <!-- <v-icon small @click="deleteItem(item)">mdi-delete</v-icon> -->
                </template>
            </v-data-table>
        </v-card>
    </div>
</template>

<script>
import { db } from "@/config/firebaseDb.js"
import PatientCreateForm from "@/components/template/PatientCreateForm.vue"

export default {
    name: "patients-list",
    components: { PatientCreateForm },
    data() {
        return {
            cep: "",
            data: "",
            messageCep: null,
            dialog: false,
            search: "",
            headers: [
                { text: "Nome", align: "start", sortable: true, value: "name" },
                { text: "Telefone", value: "phone" },
                { text: "Email", value: "email" },
                { text: "Ações", value: "actions", sortable: false }
            ],
            Patients: []
        }
    },
    async created() {
        await db.collection("pacientes").onSnapshot((snapshotChange) => {
            this.Patients = []
            snapshotChange.forEach((res) => {
                this.Patients.push({
                    id: res.id,
                    name: res.data().nome,
                    phone: res.data().telefone,
                    email: res.data().email
                })
            })
        })
    },
    methods: {
        editPatient(patient) {
            this.$router.push({ path: `/pacientes/${patient.id}` })
            this.$store.state.patient = patient
        }
    }
}
</script>

<style>
/* tbody:hover {
  cursor: pointer;
} */
</style>
