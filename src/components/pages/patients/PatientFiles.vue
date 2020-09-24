<template>
	<v-container>
		<v-card class="v-card-files">
			<v-card-title class="v-card-title">
				Arquivos
				<v-spacer></v-spacer>
                <v-dialog v-model="dialog" persistent max-width="290">
					<template v-slot:activator="{ on, attrs }">
						<v-btn text color="primary" v-bind="attrs" v-on="on">
							Upload
						</v-btn>
					</template>
					<v-card justify="center">
						<v-card-title class="headline"
							>Upload de arquivo</v-card-title
						>
						<v-card-text
							>Let Google help apps determine location. This means
							sending anonymous location data to Google, even when
							no apps are running.</v-card-text
						>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn
								color="green darken-1"
								text
								@click="dialog = false"
								>Disagree</v-btn
							>
							<v-btn
								color="green darken-1"
								text
								@click="dialog = false"
								>Agree</v-btn
							>
						</v-card-actions>
					</v-card>
				</v-dialog>
				<!-- <v-btn text type="file" color="primary">
					<v-icon left>mdi-file-plus</v-icon>Upload
				</v-btn> -->
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

export default {
	name: "patient-files",
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
	}),
	created() {
            let fileRef = db.collection('pacientes');
            let files = fileRef.doc(this.$route.params.id).collection('arquivos')
            files.get().then(function (querySnapshot) {
				querySnapshot.forEach(function (doc) {
					console.log("Lista de arquivos do usuário", doc.id, " => ", doc.data());
				});
            });
	},
};
</script>

<style></style>