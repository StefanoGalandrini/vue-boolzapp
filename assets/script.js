const app = Vue.createApp({
	data() {
		return {
			activeIndex: 0,
			nameContains: "",
			userAvatar: "img/avatar_stefano.jpg",
			userName: "Stefano G.",
			newMessage: "",
			answerDelay: 1500,
			showMenu: null,
			contacts: [
				{
					name: "Michele",
					avatar: "./img/avatar_1.jpg",
					visible: true,
					messages: [
						{
							date: "10/01/2020 15:30:55",
							message: "Hai portato a spasso il cane?",
							status: "sent",
						},
						{
							date: "10/01/2020 15:50:00",
							message: "Ricordati di stendere i panni",
							status: "sent",
						},
						{
							date: "10/01/2020 16:15:22",
							message: "Tutto fatto!",
							status: "received",
						},
					],
				},
				{
					name: "Fabio",
					avatar: "./img/avatar_2.jpg",
					visible: true,
					messages: [
						{
							date: "20/03/2020 16:30:00",
							message: "Ciao come stai?",
							status: "sent",
						},
						{
							date: "20/03/2020 16:30:55",
							message: "Bene grazie! Stasera ci vediamo?",
							status: "received",
						},
						{
							date: "20/03/2020 16:35:00",
							message:
								"Mi piacerebbe ma devo andare a fare la spesa.",
							status: "sent",
						},
					],
				},
				{
					name: "Samuele",
					avatar: "./img/avatar_3.jpg",
					visible: true,
					messages: [
						{
							date: "28/03/2020 10:10:40",
							message: "La Marianna va in campagna",
							status: "received",
						},
						{
							date: "28/03/2020 10:20:10",
							message: "Sicuro di non aver sbagliato chat?",
							status: "sent",
						},
						{
							date: "28/03/2020 16:15:22",
							message: "Ah scusa!",
							status: "received",
						},
					],
				},
				{
					name: "Alessandro B.",
					avatar: "./img/avatar_4.jpg",
					visible: true,
					messages: [
						{
							date: "10/01/2020 15:30:55",
							message: "Lo sai che ha aperto una nuova pizzeria?",
							status: "sent",
						},
						{
							date: "10/01/2020 15:50:00",
							message: "Si, ma preferirei andare al cinema",
							status: "received",
						},
					],
				},
				{
					name: "Alessandro L.",
					avatar: "./img/avatar_5.jpg",
					visible: true,
					messages: [
						{
							date: "10/01/2020 15:30:55",
							message: "Ricordati di chiamare la nonna",
							status: "sent",
						},
						{
							date: "10/01/2020 15:50:00",
							message: "Va bene, stasera la sento",
							status: "received",
						},
					],
				},
				{
					name: "Claudia",
					avatar: "./img/avatar_5.jpg",
					visible: true,
					messages: [
						{
							date: "10/01/2020 15:30:55",
							message: "Ciao Claudia, hai novità?",
							status: "sent",
						},
						{
							date: "10/01/2020 15:50:00",
							message: "Non ancora",
							status: "received",
						},
						{
							date: "10/01/2020 15:51:00",
							message: "Nessuna nuova, buona nuova",
							status: "sent",
						},
					],
				},
				{
					name: "Federico",
					avatar: "./img/avatar_7.jpg",
					visible: true,
					messages: [
						{
							date: "10/01/2020 15:30:55",
							message:
								"Fai gli auguri a Martina che è il suo compleanno!",
							status: "sent",
						},
						{
							date: "10/01/2020 15:50:00",
							message:
								"Grazie per avermelo ricordato, le scrivo subito!",
							status: "received",
						},
					],
				},
				{
					name: "Davide",
					avatar: "./img/avatar_8.jpg",
					visible: true,
					messages: [
						{
							date: "10/01/2020 15:30:55",
							message:
								"Ciao, andiamo a mangiare la pizza stasera?",
							status: "received",
						},
						{
							date: "10/01/2020 15:50:00",
							message:
								"No, l'ho già mangiata ieri, ordiniamo sushi!",
							status: "sent",
						},
						{
							date: "10/01/2020 15:51:00",
							message: "OK!!",
							status: "received",
						},
					],
				},
			],
		};
	},

	methods: {
		chooseActiveContact(i) {
			this.activeIndex = i;
		},

		filterContacts() {
			if (this.nameContains.trim() === "") {
				this.filteredContacts = this.contacts;
			} else {
				this.filteredContacts = this.contacts.filter((contact) =>
					contact.name
						.toLowerCase()
						.includes(this.nameContains.toLowerCase()),
				);
			}
		},

		onChange() {
			this.filterContacts();
		},

		addMessage() {
			const now = luxon.DateTime.now().toLocal("Europe");
			const sentDate = now.toFormat("dd/MM/yyyy HH:mm:ss");
			if (this.newMessage.trim() !== "") {
				const newMessage = {
					date: sentDate,
					message: this.newMessage,
					status: "sent",
				};
				this.contacts[this.activeIndex].messages.push(newMessage);
				this.newMessage = "";
				setTimeout(() => {
					this.addReply();
				}, this.answerDelay);
			}
		},

		addReply() {
			const now = luxon.DateTime.now().toLocal("Europe");
			const receivedDate = now.toFormat("dd/MM/yyyy HH:mm:ss");
			const replies = [
				"Ok!",
				"Anche no...",
				"Va bene",
				"Perfetto!",
				"Grazie!",
				"A presto",
			];
			const randomIndex = Math.floor(Math.random() * replies.length);
			const randomReply = replies[randomIndex];
			const newReply = {
				date: receivedDate,
				message: randomReply,
				status: "received",
			};
			this.contacts[this.activeIndex].messages.push(newReply);
		},

		lastMessageDate(contact) {
			let i = contact.messages.length - 1;
			if (contact.messages[i].status === "sent") {
				i--;
				return contact.messages[i].date;
			} else {
				return contact.messages[i].date;
			}
		},

		lastMessageText(contact) {
			let i = contact.messages.length - 1;
			if (contact.messages[i].status === "sent") {
				i--;
				return contact.messages[i].message;
			} else {
				return contact.messages[i].message;
			}
		},

		toggleShowMenu(index) {
			this.showMenu === index
				? (this.showMenu = null)
				: (this.showMenu = index);
		},

		deleteMessage(index) {
			this.filteredContacts[this.activeIndex].messages.splice(index, 1);
			this.toggleShowMenu(index);
			this.lastMessageText(this.filteredContacts[this.activeIndex]);
			this.lastMessageDate(this.filteredContacts[this.activeIndex]);
		},
	},

	computed: {
		filteredContacts() {
			if (this.nameContains.trim() === "") {
				return this.contacts;
			} else {
				return this.contacts.filter((contact) =>
					contact.name
						.toLowerCase()
						.includes(this.nameContains.toLowerCase()),
				);
			}
		},
	},
});

app.mount("#container");
