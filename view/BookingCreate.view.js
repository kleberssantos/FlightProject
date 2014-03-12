sap.ui.jsview("view.BookingCreate", {

	getControllerName: function () {
		return "view.BookingCreate";
	},

	createContent : function (oController) {

        this.page = new sap.m.Page({
                title : "Criação de Reserva",
                showNavButton: true,    
                navButtonPress: [ oController.navButtonPress, oController ],
                content : []
        });
        
        /* Dados Gerais */
        this.generalData = 
        new sap.ui.layout.form.SimpleForm({ 
            title: "{Title}",
            content: [                        
                new sap.m.Label({text: "Compania Aérea"}),
                new sap.m.Text({ id : this.createId("airlineid"), text: "{AirlineId}"}),
                new sap.m.Label({text: "Linha Aérea"}),
                new sap.m.Text({ id : this.createId("connectionno"), text: "{ConnectionNo}"}),
                new sap.m.Label({text: "Data do Vôo"}),
                new sap.m.Text({ id : this.createId("flightdate"), text: "{FlightDate}"}),             
                new sap.m.Label({text: "Nome do Cliente"}),
                new sap.m.Input({ id : this.createId("customername")}),                             
                new sap.m.Label({text: "Número da Agência"}),
                new sap.m.Input({ id : this.createId("agencynum")}),                             
                new sap.m.Label({text: "Número do Cliente"}),
                new sap.m.Input({ id : this.createId("customerno")})
            ]
        });

        // Footer 
        this.footer = new sap.m.Bar({
            contentLeft : [
                new sap.m.Button({
                    icon  : "sap-icon://save",
                    press : [ oController.bookingSave, oController]
                })
            ],
            contentRight : [
            ]
        });

        // Adição de Conteúdo e Retorno dos Dados 
        this.page.addContent(this.generalData);
        this.page.setFooter(this.footer);

        this.page.setModel(sap.ui.getCore().getModel("flightModel"));        
        return this.page;       
    }
});