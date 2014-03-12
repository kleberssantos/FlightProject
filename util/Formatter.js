jQuery.sap.declare("util.Formatter");

util.Formatter = {
		
	price :  function(fValue) {
		return fValue + "€";
	},

	convertTime : function(fValue){
		jQuery.sap.require("sap.ui.core.format.DateFormat");
		// Timezone
		var TZOffsetMs = new Date(0).getTimezoneOffset()*60*1000;
		var timeFormat = sap.ui.core.format.DateFormat.getTimeInstance({pattern: "KK:mm:ss a"});
		if(fValue != null)
			return timeFormat.format(new Date(fValue.ms + TZOffsetMs));
	},

	convertDate : function(fValue){
		jQuery.sap.require("sap.ui.core.format.DateFormat");
		var TZOffsetMs = new Date().getTimezoneOffset();
		var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern: "yyyy-MM-ddThh:mm:ss"}); 
		var oDate = new Date(fValue);
		oDate.setMinutes(oDate.getMinutes() + TZOffsetMs);
		return oDateFormat.format(oDate);
	},
	
	bestBefore : function(fValue) {		
		jQuery.sap.require("sap.ui.core.format.DateFormat");
		var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern: "yyyy-MM-dd"}); 
		if(!fValue)
			return oDateFormat.format(new Date(fValue));
	},

	cancelled : function(fValue){
		if(fValue != null){
			return fValue == "X" ? "Sim" : "Não";
		}
	},
	
	country : function(code) {
		if (!this.map) {
			this.map = {
				"NL" : "Netherlands",
				"NO" : "Norway",
				"NZ" : "New Zealand",
				"MX" : "Mexico",
				"GR" : "Greece",
			};
		}
		return (this.map[code]) ? this.map[code] : "?";
	}
};