jQuery.sap.require("sap.m.MessageBox");
jQuery.sap.require("sap.m.MessageToast");
jQuery.sap.require("util.Formatter");

sap.ui.controller("view.BookingCreate", {

	onInit : function() {
		this.getView().addEventDelegate({
			onBeforeShow : jQuery.proxy(function(evt) {
				this.onBeforeShow(evt);
			}, this)
		});
	},

	onBeforeShow : function(evt) {
		var oModel = sap.ui.getCore().getModel("flightModel");
		var oJsonObject = jQuery.parseJSON( oModel.getJSON() );
		this.getView().byId("airlineid").setText(oJsonObject.AirlineId);
		this.getView().byId("connectionno").setText(oJsonObject.ConnectionNo);
		this.getView().byId("flightdate").setText(oJsonObject.FlightDate);		
	},

	bookingSave : function(){		
		var oModel = sap.ui.getCore().getModel("flightModel");
		var oJsonObject = jQuery.parseJSON( oModel.getJSON() );
		var oDataModel   = sap.ui.getCore().getModel();
		oJsonObject.FlightDate = util.Formatter.convertDate(oJsonObject.FlightDate);
		oJsonObject.CustomerName = this.getView().byId("customername").getValue();
		oJsonObject.Agency = this.getView().byId("agencynum").getValue();
		oJsonObject.CustomerNo = this.getView().byId("customerno").getValue();
		oDataModel.create('/Bookings',oJsonObject,null, this.fnBookingCreated, this.fnBookingError);
	},

	fnBookingCreated : function(oData,response){
		sap.m.MessageToast.show("Reserva criada com sucesso!");
		sap.ui.getCore().getEventBus().publish("nav", "back");
	},

	fnBookingError : function(oError){
		sap.m.MessageToast.show("Erro ao criar reservar, por favor tente novamente");
	},	

	navButtonPress : function(evt) {
		sap.ui.getCore().getEventBus().publish("nav", "back");
	}	
});