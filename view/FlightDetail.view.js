sap.ui.jsview("view.FlightDetail", {

	getControllerName: function () {
		return "view.FlightDetail";
	},

	createContent : function (oController) {

        this.page = new sap.m.Page({
                title : "Detalhes do Vôo",
                showNavButton: true,    
                navButtonPress: [ oController.navButtonPress, oController ],
                content : []
        });
        
        /* Dados Gerais */
        this.generalData = 
        new sap.ui.layout.form.SimpleForm({ 
            title: "Dados Gerais",
            content: [                        
                new sap.m.Label({text: "Compania Aérea"}),
                new sap.m.Text({ id : this.createId("airlineid"), text: "{AirlineId}"}),
                new sap.m.Label({text: "Linha Aérea"}),
                new sap.m.Text({ id : "connectionno", text: "{ConnectionNo}"}),
                new sap.m.Label({text: "Data do Vôo"}),
                new sap.m.Text({ id : "flightdate", text: "{FlightDate}"}),
                new sap.m.Label({text: "Preço"}),
                new sap.m.Text({ id : "price", text: "{Price}"}),
                new sap.m.Label({text: "Distância do Vôo"}),
                new sap.m.Text({ id : "distance", text: "{Distance}"}),
                new sap.m.Label({text: "Unidade de Distância"}),
                new sap.m.Text({ id : "distanceunit", text: "{DistanceUnit}"}),
                new sap.m.Label({text: "Tipo de Aeronave"}),
                new sap.m.Text({ id : "planetype", text: "{PlaneType}"})                
            ]
        });

        /* Partida */
        this.departure = 
        new sap.ui.layout.form.SimpleForm({ 
            title: "Local de Partida",
            content: [                        
                new sap.m.Label({text: "País"}),
                new sap.m.Text({text: "{Departure/Country}"}),
                new sap.m.Label({text: "Cidade"}),
                new sap.m.Text({text: "{Departure/City}"}),
                new sap.m.Label({text: "Aeroporto"}),
                new sap.m.Text({text: "{Departure/Airport}"}),
                new sap.m.Label({text: "Hora de Partida"}),
                new sap.m.Text({text: {path:'Departure/Time', formatter: util.Formatter.convertTime }})        
            ]
        });          

        /* Partida */
        this.arrival = 
        new sap.ui.layout.form.SimpleForm({ 
            title: "Local de Chegada",
            content: [        
                new sap.m.Label({text: "País"}),
                new sap.m.Text({text: "{Arrival/Country}"}),
                new sap.m.Label({text: "Cidade"}),
                new sap.m.Text({text: "{Arrival/City}"}),
                new sap.m.Label({text: "Aeroporto"}),
                new sap.m.Text({text: "{Arrival/Airport}"}),
                new sap.m.Label({text: "Hora de Partida"}),
                new sap.m.Text({text: {path:'Arrival/Time', formatter: util.Formatter.convertTime }})                               
            ]
        });  

        // Footer 
        this.footer = new sap.m.Bar({
            contentLeft : [
                new sap.m.Button({
                    icon  : "sap-icon://travel-expense",
                    press : [ oController.bookingsButtonPress, oController]
                })
            ],
            contentRight : [
            ]
        })

        // Adição de Conteúdo e Retorno dos Dados 
        this.page.addContent(this.generalData);
        this.page.addContent(this.departure);
        this.page.addContent(this.arrival);
        this.page.setFooter(this.footer);
        return this.page;
    }
});