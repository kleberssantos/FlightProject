/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// A static class to show a busy indicator
jQuery.sap.declare("sap.ui.core.BusyIndicator");
jQuery.sap.require("sap.ui.core.Popup");


/**
 * @class Provides methods to show or hide a waiting animation covering the whole page and blocking user interaction.
 * @static 
 * @version 1.18.8
 * @public
 */
sap.ui.core.BusyIndicator = jQuery.extend(jQuery.sap.newObject(sap.ui.base.EventProvider.prototype), {
	oPopup: null,
	oDomRef: null,
	bOpenRequested: false,
	iDEFAULT_DELAY_MS: 1000,
	sDOM_ID: "sapUiBusyIndicator"
});

sap.ui.base.EventProvider.apply(sap.ui.core.BusyIndicator);

/**
 * Map of event names and ids, that are provided by this class
 * @private
 */
sap.ui.core.BusyIndicator.M_EVENTS = {Open: "Open", Close: "Close"};


/**
 * Sets up the BusyIndicator HTML and the Popup instance.
 *
 * @private
 */
sap.ui.core.BusyIndicator._init = function() {
	// Create the graphics element
	var root = document.createElement("div");
	root.id = this.sDOM_ID;

	// Render into invisible area, so the size settings from CSS are applied
	var oInvisible = sap.ui.getCore().getStaticAreaRef();
	oInvisible.appendChild(root);
	jQuery(root).addClass("sapUiBusy").attr("tabindex", 0).attr("role", "progressbar").attr("alt", "").attr("title", "Please Wait");
	this.oDomRef = root;

	this.oPopup = new sap.ui.core.Popup(root);
	this.oPopup.setModal(true, "sapUiBlyBusy");
	this.oPopup.setShadow(false);
};


/**
 * Displays the BusyIndicator and starts blocking all user input.
 * This only happens after some delay and if after that delay the BusyIndicator.hide() has not yet been called in the meantime.
 * There is a certain default value for the delay, but that one can be overridden.
 *
 * @public
 * @param {int} [iDelay] The delay in milliseconds before opening the BusyIndicator. It is not opened if hide() is called before end of the delay. If no delay (or no valid delay) is given, the default value is used.
 */
sap.ui.core.BusyIndicator.show = function(iDelay) {
	jQuery.sap.log.debug("sap.ui.core.BusyIndicator.show (delay: " + iDelay + ") at " + new Date().getTime());
	
	jQuery.sap.assert(iDelay === undefined || (typeof iDelay == "number" && (iDelay % 1 == 0)), "iDelay must be empty or an integer");

	if ((iDelay === undefined)
			|| ((iDelay != 0) && (parseInt(iDelay, 10) == 0))
			|| (parseInt(iDelay, 10) < 0)) {
		iDelay = this.iDEFAULT_DELAY_MS;
	}

	this.bOpenRequested = true;
	if (iDelay === 0) { // avoid async call when there is no delay
		this._showNowIfRequested();
	} else {
		jQuery.sap.delayedCall(iDelay, this, "_showNowIfRequested");
	}
};


/**
 * Immediately displays the BusyIndicator if the application has not called hide() yet.
 *
 * @private
 */
sap.ui.core.BusyIndicator._showNowIfRequested = function() {
	jQuery.sap.log.debug("sap.ui.core.BusyIndicator._showNowIfRequested (bOpenRequested: " + this.bOpenRequested + ") at " + new Date().getTime());
	
	// Do not open if the request has been canceled in the meantime
	if (!this.bOpenRequested) {
		return;
	}

	// If body/Core are not available yet, give them some more time and open later if still required
	if (!document.body || !sap.ui.getCore().isInitialized()) {
		jQuery.sap.delayedCall(100, this, "_showNowIfRequested");
		return;
	}

	this.bOpenRequested = false; // opening request is handled

	// Initialize/create the BusyIndicator if this has not been done yet
	if (!this.oDomRef) {
		this._init();
	}

	// Actually open the popup
	this.oPopup.open(0, sap.ui.core.Popup.Dock.CenterCenter, sap.ui.core.Popup.Dock.CenterCenter, document);

	// allow an event handler to do something with the indicator
	this.fireOpen({$Busy: this.oPopup._$()});

	// Grab the focus once opened
	var oDomRef = jQuery.sap.domById(sap.ui.core.BusyIndicator.sDOM_ID);
	jQuery.sap.focus(oDomRef);

	jQuery("body").attr("aria-busy", true);
};

/**
 * Removes the BusyIndicator from the screen
 *
 * @public
 */
sap.ui.core.BusyIndicator.hide = function() {
	jQuery.sap.log.debug("sap.ui.core.BusyIndicator.hide at " + new Date().getTime());
	
	var that = sap.ui.core.BusyIndicator; // Restore scope in case we are called with setTimeout or so...

	that.bOpenRequested = false;

	if (that.oDomRef) { // only if the BusyIndicator was shown before!
		jQuery("body").removeAttr("aria-busy");

		// allow an event handler to do something with the indicator
		this.fireClose({$Busy: this.oPopup._$()});

		that.oPopup.close(0);
	}
};


/*  EVENT HANDLING */

/**
 * Registers a handler for the "open" event.
 * 
 * @param {function}
 *            fnFunction The function to call, when the event occurs. This function will be called on the
 *            oListener-instance (if present) or in a 'static way'.
 * @param {object}
 *            [oListener] Object on which to call the given function.
 * @return {sap.ui.core.BusyIndicator} <code>this</code> to allow method chaining
 * @public
 */
sap.ui.core.BusyIndicator.attachOpen = function(fnFunction, oListener) {
	this.attachEvent(sap.ui.core.BusyIndicator.M_EVENTS.Open, fnFunction, oListener);
	return this;
};

/**
 * Unregisters a handler for the "open" event
 * @param {function}
 *            fnFunction The callback function to unregister
 * @param {object}
 *            oListener Object on which the given function had to be called.
 * @return {sap.ui.core.BusyIndicator} <code>this</code> to allow method chaining
 * @public
 */
sap.ui.core.BusyIndicator.detachOpen = function(fnFunction, oListener) {
	this.detachEvent(sap.ui.core.BusyIndicator.M_EVENTS.Open, fnFunction, oListener);
	return this;
};

/**
 * Registers a handler for the "close" event
 * 
 * @param {function}
 *            fnFunction The function to call, when the event occurs. This function will be called on the
 *            oListener-instance (if present) or in a 'static way'.
 * @param {object}
 *            [oListener] Object on which to call the given function.
 * @return {sap.ui.core.BusyIndicator} <code>this</code> to allow method chaining
 * @public
 */
sap.ui.core.BusyIndicator.attachClose = function(fnFunction, oListener) {
	this.attachEvent(sap.ui.core.BusyIndicator.M_EVENTS.Close, fnFunction, oListener);
	return this;
};

/**
 * Unregisters a handler for the "close" event
 * 
 * @param {function}
 *            fnFunction The callback function to unregister
 * @param {object}
 *            oListener Object on which the given function had to be called.
 * @return {sap.ui.core.BusyIndicator} <code>this</code> to allow method chaining
 * @public
 */
sap.ui.core.BusyIndicator.detachClose = function(fnFunction, oListener) {
	this.detachEvent(sap.ui.core.BusyIndicator.M_EVENTS.Close, fnFunction, oListener);
	return this;
};

sap.ui.core.BusyIndicator.fireOpen = function(mParameters) {
	this.fireEvent(sap.ui.core.BusyIndicator.M_EVENTS.Open, mParameters);
};

sap.ui.core.BusyIndicator.fireClose = function(mParameters) {
	this.fireEvent(sap.ui.core.BusyIndicator.M_EVENTS.Close, mParameters);
};