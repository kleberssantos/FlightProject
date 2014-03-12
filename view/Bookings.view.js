sap.ui.jsview("view.Bookings", {

	getControllerName: function () {
		return "view.Bookings";
	},

	createContent : function (oController) {

        this.page = new sap.m.Page({
                title : "Reservas",
                showNavButton: true,    
                navButtonPress: [ oController.navButtonPress, oController ],
                content : []
        });
        
        this.growingList = new sap.m.List({ growing : true, growingThreshold : 100 });

        var growingItem = 
            new sap.m.StandardListItem({
                     title: "{Title}",
                     description: "Linha Aérea {AirlineId} - Conexão {ConnectionNo} - Preço {Price}",
                     icon: sap.ui.core.IconPool.getIconURI("flight"),
                     iconDensityAware: false,
                     iconInset: false,
                     type: "Navigation",
                     press : [ oController.itemPress, oController ]
            });

        this.growingList.setModel(sap.ui.getCore().getModel("bookingModel"));
        this.growingList.bindItems("/results", growingItem , new sap.ui.model.Sorter("CustomerName", false, oController.fnGroupSupplier));


        // Footer 
        this.footer = new sap.m.Bar({
            contentLeft : [
                new sap.m.Button({
                    icon  : "sap-icon://add",
                    press : [ oController.createBooking, oController]
                })
            ]
        });

        // Adição de Conteúdo e Retorno dos Dados 
        this.page.addContent(this.growingList);
        this.page.setFooter(this.footer);
        return this.page;        
    }
});