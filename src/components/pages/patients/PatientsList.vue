<template>
    <div class="patients-list">
        <v-card>
            <v-card-title>
                Nutrition
                <v-spacer></v-spacer>
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
                ></v-text-field>
            </v-card-title>
            <v-data-table :headers="headers" :items="Patients" :search="search"></v-data-table>
        </v-card>
    </div>
</template>

<script>
import { db } from "@/config/firebaseDb.js";

export default {
    name: "patients-list",
    data() {
        return {
            search: "",
            headers: [
                { text: "Nome", align: "start", sortable: true, value: "name" },
                { text: "Sobrenome", value: "surname" },
                { text: "Email", value: "email" },
                { text: "Telefone", value: "phone" },
            ],
            Patients: [],
        };
    },
    created() {
        db.collection("pacientes").onSnapshot((snapshotChange) => {
            this.Patients = [];
            snapshotChange.forEach((res) => {
                this.Patients.push({
                    key: res.id,
                    name: res.data().nome,
                    surname: res.data().sobrenome,
                    email: res.data().email,
                    phone: res.data().telefone,
                });
            });
        });
    },
    methods: {
        /* deleteUser(id) {
            if (window.confirm("Do you really want to delete?")) {
                db.collection("users")
                    .doc(id)
                    .delete()
                    .then(() => {
                        console.log("Document deleted!");
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        }, */
    },
};
</script>

<style>
.patients-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.patients-header h2 {
    font-weight: 500;
    font-size: 1.2rem;
    margin-left: 20px;
}
hr {
    border-top: 1px solid #dfdfdf;
    margin: 10px 0px;
}
.text-start {
    text-align: left;
}
</style>