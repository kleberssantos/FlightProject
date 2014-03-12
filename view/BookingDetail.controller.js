jQuery.sap.require("sap.m.MessageBox");
jQuery.sap.require("sap.m.MessageToast");
jQuery.sap.require("util.Formatter");

sap.ui.controller("view.BookingDetail", {

	onInit : function() {
		this.getView().addEventDelegate({
			onBeforeShow : jQuery.proxy(function(evt) {
				this.onBeforeShow(evt);
			}, this)
		});
	},

	onBeforeShow : function(evt) {
		if (evt.data.context) {
			this.getView().setBindingContext(evt.data.context);
		}
	},

	bookingCancel : function(){		
		var oJsonModel   = sap.ui.getCore().getModel("bookingModel");
		var oDataModel   = sap.ui.getCore().getModel();
		var oContext     = this.getView().getBindingContext();
		oDataModel.callFunction("CancelBooking",'POST',
			{ "AirlineId"    : oJsonModel.getProperty("AirlineId",oContext)   , 
			  "ConnectionNo" : oJsonModel.getProperty("ConnectionNo",oContext),
			  "FlightDate"   : oJsonModel.getProperty("FlightDate",oContext)  ,
			  "BookingId"    : oJsonModel.getProperty("BookingId",oContext)  
			},null, this.fnBookingCancelled,this.fnBookingError);
	},

	fnBookingCancelled : function(oData,response){
		sap.m.MessageToast.show("A reserva foi cancelada com sucesso!");
		sap.ui.getCore().getEventBus().publish("nav", "back");
	},

	fnBookingError : function(oError){
		sap.m.MessageToast.show("Erro ao cancelar reserva, por favor tente novamente");
	},	

	navButtonPress : function(evt) {
		sap.ui.getCore().getEventBus().publish("nav", "back");
	}	
});