<template>
    <v-container class="patient-view">
        <v-row>
            <v-col cols="12" md="3">
                <v-card class="v-card-profile" justify="center" align="center">
                    <v-avatar
                        class="avatar rounded-circle"
                        rounded="true"
                        size="100"
                    >
                        <img
                            src="https://cdn.vuetifyjs.com/images/john.jpg"
                            alt="John"
                        />
                    </v-avatar>
                    <h2>Joselito Muito Loko</h2>
                    <p>
                        joselito@gmail.com
                    </p>
                </v-card>
            </v-col>
            <v-col cols="12" md="5">
                <v-card class="v-card-data">
                    <p class="font-weight-light grey--text">
                        Don't be scared of the truth because we need to restart
                        the human foundation in truth And I love you like Kanye
                        loves Kanye I love Rick Owens’ bed design but the back
                        is...
                    </p>
                </v-card>
            </v-col>

            <v-col cols="12" md="4">
                <v-card class="v-card-notes">
                    <v-card-title class="v-card-title">
                        Notas
                    </v-card-title>
                    <v-card-text class="text-center">
                        <v-textarea
                            outlined
                            name="input-7-4"
                            label="Outlined textarea"
                            value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
                        ></v-textarea>
                        <v-btn color="success" rounded class="mr-0"
                            >Salvar</v-btn
                        >
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="8">
                <v-card class="v-card-historic overflow-y-auto">
                    <v-card-title class="v-card-title">
                        Notas
                    </v-card-title>                        
                    <v-timeline dense class="v-timeline">
                        <v-timeline-item>
                            <v-card class="elevation-2">
                                <v-card-title class="headline">Lorem ipsum</v-card-title>
                                <v-card-text>
                                    Lorem ipsum dolor sit amet, no nam oblique
                                    veritus. Commune scaevola imperdiet nec ut,
                                    sed euismod convenire principes at. Est et
                                    nobis iisque percipit, an vim zril
                                    disputando voluptatibus, vix an salutandi
                                    sententiae.
                                </v-card-text>
                            </v-card>
                        </v-timeline-item>
                        <v-timeline-item>
                            <v-card class="elevation-2">
                                <v-card-title class="headline">Lorem ipsum</v-card-title>
                                <v-card-text>
                                    Lorem ipsum dolor sit amet, no nam oblique
                                    veritus. Commune scaevola imperdiet nec ut,
                                    sed euismod convenire principes at. Est et
                                    nobis iisque percipit, an vim zril
                                    disputando voluptatibus, vix an salutandi
                                    sententiae.
                                </v-card-text>
                            </v-card>
                        </v-timeline-item>
                        <v-timeline-item>
                            <v-card class="elevation-2">
                                <v-card-title class="headline">Lorem ipsum</v-card-title>
                                <v-card-text>
                                    Lorem ipsum dolor sit amet, no nam oblique
                                    veritus. Commune scaevola imperdiet nec ut,
                                    sed euismod convenire principes at. Est et
                                    nobis iisque percipit, an vim zril
                                    disputando voluptatibus, vix an salutandi
                                    sententiae.
                                </v-card-text>
                            </v-card>
                        </v-timeline-item>
                        <v-timeline-item>timeline item</v-timeline-item>
                        <v-timeline-item>timeline item</v-timeline-item>
                    </v-timeline>
                </v-card>
            </v-col>
            <v-col cols="12" md="4">
                <v-card class="v-card-files">
                    <v-card-title class="v-card-title">
                        Arquivos / Documentos
                    </v-card-title>
                    <v-card-text class="text-center">
                        <h6 class="display-1 mb-1 grey--text"></h6>

                        <h4
                            class="display-2 font-weight-light mb-3 black--text"
                        >
                            Alec Thompson
                        </h4>

                        <p class="font-weight-light grey--text">
                            Don't be scared of the truth because we need to
                            restart the human foundation in truth And I love you
                            like Kanye loves Kanye I love Rick Owens’ bed design
                            but the back is...
                        </p>

                        <v-btn color="success" rounded class="mr-0"
                            >Follow</v-btn
                        >
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: "patient-view"
}
</script>

<style>
.v-timeline{
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
.avatar {
    margin-top: 10px;
}
.v-card-profile {
    min-height: 350px;
}
.v-card-data {
    min-height: 350px;
}
.v-card-notes {
    min-height: 350px;
}
.v-card-historic {
    min-height: 350px;
    max-height: 350px;
}
.v-card-files {
    min-height: 350px;
}
</style>
