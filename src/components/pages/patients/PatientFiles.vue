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
						<v-card-title class="headline justify-center"
							>Enviar Arquivos</v-card-title
						>
						<v-card-text>
							<v-file-input
								v-model="files"
								color="deep-purple accent-4"
								counter
								label="Selecione os arquivos"
								multiple
								outlined
								dense
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
										+{{ files.length - 2 }} Arquivo(s)
									</span>
								</template>
							</v-file-input>
						</v-card-text>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="error" text @click="dialog = false"
								>Cancelar</v-btn
							>
							<v-btn color="success" text @click="uploadFiles()"
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
								<v-icon
									color="grey lighten-1"
									@click="downloadFile(item.metadata)"
								>
									mdi-download-circle</v-icon
								>
							</v-btn>
							<v-btn icon>
								<v-icon
									color="grey lighten-1"
									@click="deleteFile(item.metadata, item.id)"
									>mdi-delete-circle</v-icon
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
import { db } from "@/config/firebase";
import firebase from "firebase";

export default {
	name: "patient-files",
	components: {},
	props: ["paciente"],
	data: () => ({
		dialog: false,
		items2: "",
		files: [],
		urlFile: "google.com",
	}),
	created() {
		this.listFiles();
	},
	methods: {
		listFiles() {
			let fileRef = db.collection("pacientes");
			var items = [];
			let iconType, iconTypeClass;
			let files = fileRef
				.doc(this.$route.params.id)
				.collection("arquivos");
			files.get().then(function (querySnapshot) {
				querySnapshot.forEach(function (doc) {
					if (!Object.keys(doc.data()).length) {
						return items;
					} else {
						if (doc.data().contentType === "text/plain") {
							iconType = "mdi-file-document";
							iconTypeClass = "blue white--text";
						} else if (
							doc.data().contentType === "image/jpeg" ||
							doc.data().contentType === "image/png"
						) {
							iconType = "mdi-image";
							iconTypeClass = "amber white--text";
						} else if (
							doc.data().contentType === "application/pdf"
						) {
							iconType = "mdi-file-pdf";
							iconTypeClass = "red white--text";
						} else {
							iconType = "mdi-file";
							iconTypeClass = "grey white--text";
						}
						items.push({
							id: doc.id,
							icon: iconType,
							iconClass: iconTypeClass,
							title: doc.data().name,
							subtitle: `${new Date(
								doc.data().timeCreated
							).toLocaleDateString("pt-BR")}`,
							metadata: doc.data(),
						});
					}
				});
			});
			this.items2 = items;
			return this.items2
		},
		uploadFiles() {
			const storageRef = firebase.storage().ref();
			this.files.forEach((file) => {
				const path = `patientFiles/${this.$route.params.id}/${file.name}`;
				storageRef
					.child(path)
					.put(file)
					.then((snapshot) => {
						this.createdFilesMeta(snapshot);
						this.listFiles();
						this.dialog = false;
					})
					.catch((error) => {
						console.log("ERRO1", error);
					});
			});
		},
		createdFilesMeta(snapshot) {
			db.collection("pacientes")
				.doc(this.$route.params.id)
				.collection("arquivos")
				.add({
					name: snapshot.metadata.name,
					contentType: snapshot.metadata.contentType,
					path: snapshot.metadata.fullPath,
					size: snapshot.metadata.size,
					timeCreated: snapshot.metadata.timeCreated,
				})
				.then(() => {
					this.$toast.open({
						message: "Arquivo enviado!",
						type: "success",
						position: "top-right",
						duration: 5000,
					});
				})
				.catch((error) => {
					this.$toast.open({
						message: "Erro ao enviar arquivo!",
						type: "error",
						position: "top-right",
						duration: 5000,
					});
					console.log(error);
				});
		},
		downloadFile(metadata) {
			const storageRef = firebase.storage().ref(metadata.path);
			storageRef.getDownloadURL().then(function (url) {
				fetch(url)
					.then((resp) => resp.blob())
					.then((blob) => {
						const url = window.URL.createObjectURL(blob);
						const a = document.createElement("a");
						a.style.display = "none";
						a.href = url;
						a.download = metadata.name;
						document.body.appendChild(a);
						a.click();
						window.URL.revokeObjectURL(url);
					})
					.catch((error) => console.log(error));
			})
		},
		deleteFile(metadata, id) {
			const storageRef = firebase.storage().ref(metadata.path);
			db.collection("pacientes")
				.doc(this.$route.params.id)
				.collection("arquivos")
				.doc(id)
				.delete()
				.then(function () {
					storageRef
						.delete()
						.then(function () {
							console.log("Arquivo Deletado");
						})
						.catch(function (error) {
							console.log("ERRO delete Arquivo", error);
						});
					console.log("Meta Deletado!");
				})
				.catch(function (error) {
					console.log("ERRO delete metadata", error);
				});
			this.$toast.open({
				message: "Aquivo deletado",
				type: "success",
				position: "top-right",
				duration: 5000,
			})
			this.listFiles()
		}
	}
};
</script>
<style scoped>
.v-list-item__action {
	display: block;
}
</style>