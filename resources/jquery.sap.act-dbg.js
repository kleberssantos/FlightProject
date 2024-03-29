/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides functionality for activity detection
jQuery.sap.declare("jquery.sap.act", false);

(function() {
	
	if(typeof window.jQuery.sap.act === "object" || typeof window.jQuery.sap.act === "function" ){
		return;
	}
	
//	Date.now = Date.now || function() {
//		return new Date().getTime();
//	};
	
	/**
	 * @public
	 * @name jQuery.sap.act
	 * @namespace
	 * @static
	 */
	
	var _act = {},
		_active = true,
		_deactivatetimer = null,
		_I_MAX_IDLE_TIME = 10000, //max. idle time in ms
		_deactivateSupported = !!window.addEventListener, //Just skip IE8
		_aActivateListeners = [],
		_aDeactivateListeners = [],
		_domChangeObserver = null;
	
	function _reInitializeDeactivateTimer(){
		if(_deactivatetimer){
			clearTimeout(_deactivatetimer);
			_deactivatetimer = null;
		}
		setTimeout(_onDeactivate, _I_MAX_IDLE_TIME);
	};
	
	function _onDeactivate(){
		_active = false;
		_deactivatetimer = null;
		//_triggerEvent(_aDeactivateListeners); //Maybe provide later
		_domChangeObserver.observe(document.documentElement, {childList: true, attributes: true, subtree: true, characterData: true});
	};
	
	function _onActivate(){
		if(!_active){
			_active = true;
			_triggerEvent(_aActivateListeners);
			_domChangeObserver.disconnect();
		}
		_reInitializeDeactivateTimer();
	};
	
	function _triggerEvent(aListeners){
		if(aListeners.length == 0) {
			return;
		}
		var aEventListeners = aListeners.slice();
		setTimeout(function(){
			var oInfo;
			for (var i = 0, iL = aEventListeners.length; i < iL; i++) {
				oInfo = aEventListeners[i];
				oInfo.fFunction.call(oInfo.oListener || window);
			}
		}, 0);
	};
	
	
	/**
	 * Registers the given handler to the activity event, which is fired when an activity was detected after a certain period of inactivity.
	 * 
	 * The Event is not fired for Internet Explorer 8.
	 * 
	 * @param {Function} fnFunction The function to call, when an activity event occurs.
	 * @param {Object} [oListener] The 'this' context of the handler function.
	 * @protected
	 * 
	 * @function
	 * @name jQuery.sap.act#attachActivate
	 */
	_act.attachActivate = function(fnFunction, oListener){
		_aActivateListeners.push({oListener: oListener, fFunction:fnFunction});
	};
	
	/**
	 * Deregisters a previously registered handler from the activity event.
	 * 
	 * @param {Function} fnFunction The function to call, when an activity event occurs.
	 * @param {Object} [oListener] The 'this' context of the handler function.
	 * @protected
	 * 
	 * @function
	 * @name jQuery.sap.act#detachActivate
	 */
	_act.detachActivate = function(fnFunction, oListener){
		for (var i = 0, iL = _aActivateListeners.length; i < iL; i++) {
			if (_aActivateListeners[i].fFunction === fnFunction && _aActivateListeners[i].oListener === oListener) {
				_aActivateListeners.splice(i,1);
				break;
			}
		}
	};
	
	/**
	 * Checks whether recently an activity was detected.
	 * 
	 * Not supported for Internet Explorer 8.
	 * 
	 * @return true if recently an activity was detected, false otherwise
	 * @protected
	 * 
	 * @function
	 * @name jQuery.sap.act#isActive
	 */
	_act.isActive = !_deactivateSupported ? function(){return true;} : function(){return _active;};
	
	/**
	 * Reports an activity.
	 * 
	 * @public
	 * 
	 * @function
	 * @name jQuery.sap.act#refresh
	 */
	_act.refresh = !_deactivateSupported ? function(){} : _onActivate;
	
	
	// Setup and registering handlers
	
	if (_deactivateSupported) {
		var aEvents = ["resize", "orientationchange", "mousemove", "mousedown", "mouseup", //"mouseout", "mouseover",
		               "touchstart", "touchmove", "touchend", "touchcancel", "paste", "cut", "keydown", "keyup",
		               "DOMMouseScroll", "mousewheel"];
		for(var i=0; i<aEvents.length; i++){
			window.addEventListener(aEvents[i], _act.refresh, true);
		}
		
		if(window.MutationObserver){
			_domChangeObserver = new window.MutationObserver(_act.refresh);
    	}else if(window.WebKitMutationObserver){
    		_domChangeObserver = new window.WebKitMutationObserver(_act.refresh);
    	}else{
    		_domChangeObserver = {
    			observe : function(){
    				document.documentElement.addEventListener("DOMSubtreeModified", _act.refresh);
    			},
    			disconnect : function(){
    				document.documentElement.removeEventListener("DOMSubtreeModified", _act.refresh);
    			}
    		};
    	}
		
		_onActivate();
	}
	
	jQuery.sap.act = _act;
	
}());