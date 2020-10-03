<template>
    <div class="users-list">
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
                    <v-icon left>mdi-account-plus</v-icon>Adicionar Usuário
                </v-btn>
            </v-card-title>
            <v-data-table
                class="row-pointer"
                :headers="headers"
                :items="Users"
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
                    <v-icon color="primary" fab @click="viewDentist(item)"
                        >mdi-account-edit</v-icon
                    >
                </template>
            </v-data-table>
        </v-card>
    </div>
</template>

<script>
import { db } from "@/config/firebase.js"

export default {
    name: "users-list",
    data() {
        return {
            dialog: false,
            search: "",
            headers: [
                { text: "Nome", align: "start", sortable: true, value: "name" },
                { text: "E-mail", value: "email", sortable: true },
                { text: "Permissão", value: "role", sortable: true },
                { text: "Ativo", value: "enable", sortable: true },
                { text: "Ações", value: "actions", sortable: false }
            ],
            Users: []
        }
    },
    async created() {
        await db.collection("users").onSnapshot((snapshotChange) => {
            this.Users = []
            snapshotChange.forEach((res) => {
                this.Users.push({
                    id: res.id,
                    avatar: res.data().avatar,
                    name: res.data().nome,
                    createdAt: res.data().dataCriacao,
                    email: res.data().email,
                    enable: res.data().ativo,
                    role: res.data().permissao
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
