sap.ui.jsview("view.BookingDetail", {

	getControllerName: function () {
		return "view.BookingDetail";
	},

	createContent : function (oController) {

        this.page = new sap.m.Page({
                title : "Detalhes da Reserva",
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
                new sap.m.Label({text: "Reserva"}),
                new sap.m.Text({ id : this.createId("bookingid"), text: "{BookingId}"}),                
                new sap.m.Label({text: "Número do Cliente"}),
                new sap.m.Text({ id : this.createId("customerno"), text: "{CustomerNo}"}),                                
                new sap.m.Label({text: "Preço"}),
                new sap.m.Text({ id : this.createId("price"), text: "{Price}"}),
                new sap.m.Label({text: "Moeda"}),
                new sap.m.Text({ id : this.createId("currencycode"), text: "{CurrencyCode}"}),
                new sap.m.Label({text: "Data da Reserva"}),
                new sap.m.Text({ id : this.createId("bookingdate"), text: "{BookingDate}"}),
                new sap.m.Label({text: "Agência"}),
                new sap.m.Text({ id : this.createId("agency"), text: "{Agency}"}),
                new sap.m.Label({text: "Cancelado"}),
                new sap.m.Text({ id : this.createId("cancelled"), text: {path:'Cancelled', formatter: util.Formatter.cancelled }}) 
            ]
        });

        this.page.setModel(sap.ui.getCore().getModel("bookingModel"));

        // Footer 
        this.footer = new sap.m.Bar({
            contentLeft : [
                new sap.m.Button({
                    icon  : "sap-icon://delete",
                    press : [ oController.bookingCancel, oController]
                })
            ],
            contentRight : [
            ]
        });

        // Adição de Conteúdo e Retorno dos Dados 
        this.page.addContent(this.generalData);
        this.page.setFooter(this.footer);
        return this.page;       
    }
});