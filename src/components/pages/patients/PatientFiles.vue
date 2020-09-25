<template>
	<v-container>
		<v-card class="v-card-files">
			<v-card-title class="v-card-title">
				Arquivos
				<v-spacer></v-spacer>
				<v-dialog v-model="dialog" persistent width="500">
					<template v-slot:activator="{ on, attrs }">
						<v-btn text color="primary" v-bind="attrs" v-on="on">
							Upload
						</v-btn>
					</template>
					<v-card justify="center">
						<v-card-title class="headline"
							>Upload de arquivo</v-card-title
						>
						<v-card-text>
							<v-file-input
								v-model="files"
								color="deep-purple accent-4"
								counter
								label="Arquivos"
								multiple
								placeholder="Selecione os arquivos"
								prepend-icon="mdi-paperclip"
								outlined
								:show-size="1000"
							>
								<template v-slot:selection="{ index, text }">
									<v-chip
										v-if="index < 2"
										color="deep-purple accent-4"
										dark
										label
										small
									>
										{{ text }}
									</v-chip>

									<span
										v-else-if="index === 2"
										class="overline grey--text text--darken-3 mx-2"
									>
										+{{ files.length - 2 }} File(s)
									</span>
								</template>
							</v-file-input>
						</v-card-text>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn
								color="error"
								text
								@click="dialog = false"
								>Cancelar</v-btn
							>
							<v-btn
								color="success"
								text
								@click="uploadFiles()"
								>Enviar</v-btn
							>
						</v-card-actions>
					</v-card>
				</v-dialog>
			</v-card-title>
			<v-card-text class="text-center">
				<v-list class="files-list">
					<v-list-item v-for="item in items2" :key="item.title">
						<v-list-item-avatar>
							<v-icon :class="[item.iconClass]">{{
								item.icon
							}}</v-icon>
						</v-list-item-avatar>
						<v-list-item-content class="text-left">
							<v-list-item-title
								v-text="item.title"
							></v-list-item-title>
							<v-list-item-subtitle
								v-text="item.subtitle"
							></v-list-item-subtitle>
						</v-list-item-content>

						<v-list-item-action>
							<v-btn icon>
								<v-icon color="grey lighten-1"
									>mdi-information</v-icon
								>
							</v-btn>
						</v-list-item-action>
					</v-list-item>
				</v-list>
			</v-card-text>
		</v-card>
	</v-container>
</template>

<script>
import { db } from "@/config/firebaseDb";
import firebase from "firebase";

export default {
	name: "patient-files",
	components: {},
	props: ["paciente"],
	data: () => ({
		dialog: false,
		items2: [
			{
				icon: "mdi-file-document",
				iconClass: "blue white--text",
				title: "Vacation itinerary",
				subtitle: "Jan 20, 2014",
			},
			{
				icon: "mdi-image",
				iconClass: "amber white--text",
				title: "Kitchen remodel",
				subtitle: "Jan 10, 2014",
			},
		],
		files: [],
	}),
	created() {
		let fileRef = db.collection("pacientes");
		let files = fileRef.doc(this.$route.params.id).collection("arquivos");
		files.get().then(function (querySnapshot) {
			querySnapshot.forEach(function (doc) {
				console.log(
					"Lista de arquivos do usuário",
					doc.id,
					" => ",
					doc.data()
				);
			});
		});
	},
	methods: {
		uploadFiles() {
			const storageRef = firebase.storage().ref();
			this.files.forEach(file => {
				storageRef.child(`patientFiles/` + file.name).put(file).then((snapshot) => {
					console.log("TESTE UPLOAD", snapshot);
				});
			});
		},
	},
};
</script>

<style scoped></style>