/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides class sap.ui.core.DeclarativeSupport
jQuery.sap.declare("sap.ui.core.DeclarativeSupport");





/**
 * @class Static class for enabling declarative UI support.  
 *
 * @author Peter Muessig, Tino Butz
 * @version 1.18.8
 * @since 1.7.0
 * @public
 */
sap.ui.core.DeclarativeSupport = {
};



/**
 * Defines the attributes of an element that should be handled differently.
 * Set key/value pairs. The key indicates the attribute. The value can be of type <code>Boolean</code> or <code>Function</code>.
 * When the value is of type <code>Function</code> it will receive three arguments: 
 * <code>sValue</code> the value of the attribute,
 * <code>mSettings</code> the settings of the control
 * <code>fnClass</code> the control class
 * @private
 */
sap.ui.core.DeclarativeSupport.attributes = {
	"data-sap-ui-type" : true,
	"data-sap-ui-aggregation" : true,
	"data-sap-ui-default-aggregation" : true,
	"data-sap-ui-binding" : function(sValue, mSettings) {
		var oBindingInfo = sap.ui.base.ManagedObject.bindingParser(sValue);
		// TODO reject complex bindings, types, formatters; enable 'parameters'? 
		mSettings.objectBindings = mSettings.objectBindings || {};
		mSettings.objectBindings[oBindingInfo.model || undefined] = oBindingInfo;
	},
	"data-tooltip" : function(sValue, mSettings) {
		// special handling for tooltip (which is an aggregation)
		// but can also be applied as property
		mSettings["tooltip"] = sValue;
	},
	"tooltip" : function(sValue, mSettings, fnClass) {
		// TODO: Remove this key / value when deprecation is removed
		mSettings["tooltip"] = sValue;
		jQuery.sap.log.warning('[Deprecated] Control "' + mSettings.id + '": The attribute "tooltip" is not prefixed with "data-*". Future version of declarative support will only suppport attributes with "data-*" prefix.');
	},
	"class":true,
	"style" : true,
	"id" : true
};


/**
 * Enhances the given DOM element by parsing the Control and Elements info and creating
 * the SAPUI5 controls for them.
 * 
 * @param {DomElement} oElement the element to compile
 * @param {sap.ui.core.mvc.HTMLView} [oView] The view instance to use
 * @param {boolean} [isRecursive] Whether the call of the function is recursive.
 * @public
 */
sap.ui.core.DeclarativeSupport.compile = function(oElement, oView, isRecursive) {
	// Find all defined classes
	var self = this;
	jQuery(oElement).find("[data-sap-ui-type]").filter(function() {
		return jQuery(this).parents("[data-sap-ui-type]").length === 0;
	}).each(function() {
		self._compile(this, oView, isRecursive);
	});
};



/**
 * Enhances the given element by parsing the attributes and child elements.
 * 
 * @param {DomElement} oElement the element to compile
 * @param {sap.ui.core.mvc.HTMLView} [oView] The view instance to use
 * @param {boolean} [isRecursive] Whether the call of the function is recursive.
 * @private
 */
sap.ui.core.DeclarativeSupport._compile = function(oElement, oView, isRecursive) {
	var $element = jQuery(oElement);

	var sType = $element.attr("data-sap-ui-type");
	var aControls = [];
	var bIsUIArea = sType === "sap.ui.core.UIArea";

	if (bIsUIArea) {
		// use a UIArea / better performance when rendering multiple controls
		// parse and create the controls / children of element
		var self = this;
		$element.children().each(function() {
			var oControl = self._createControl(this, oView);
			if (oControl) {
				aControls.push(oControl);
			}
		}); 
	} else {
		var oControl = this._createControl(oElement, oView);
		if (oControl) {
			aControls.push(oControl);
		}
	}
	
	// remove the old content
	$element.empty();

	// in case of the root control is not a UIArea we remove all HTML attributes
	// for a UIArea we remove only the data HTML attributes and keep the others
	// also marks the control as parsed (by removing data-sap-ui-type) 
	var aAttr = [];
	jQuery.each(oElement.attributes, function(iIndex, oAttr) {
		var sName = oAttr.name;
		if (!bIsUIArea || bIsUIArea && /^data-/g.test(sName.toLowerCase())) {
			aAttr.push(sName);
		}
	});
	if (aAttr.length > 0) {
		$element.removeAttr(aAttr.join(" "));
	}

	// add the controls
	jQuery.each(aControls, function(vKey, oControl) {
		if (oControl instanceof sap.ui.core.Control) {
			if (oView && !isRecursive) {
				oView.addContent(oControl);
			} else {
				oControl.placeAt(oElement);
				if (oView) {
					// Remember the unassociated control so that it can be destroyed on exit of the view
					oView.connectControl(oControl);	
				}
			}
		}
	});
};



/**
 * Parses a given DOM ref and converts it into a Control.
 * @param {DomElement} oElement reference to a DOM element
 * @param {sap.ui.core.mvc.HTMLView} [oView] The view instance to use.
 * @return {sap.ui.core.Control} reference to a Control
 * @private
 */
sap.ui.core.DeclarativeSupport._createControl = function(oElement, oView) {
	var $element = jQuery(oElement);

	var oControl = null;

	var sType = $element.attr("data-sap-ui-type");
	if (sType) {
		jQuery.sap.require(sType); // make sure fnClass.getMatadata() is available
		var fnClass = jQuery.sap.getObject(sType);
		jQuery.sap.assert(typeof fnClass !== "undefined", "Class not found: " + sType);
		
			
		var mSettings = {};
		var sId = mSettings.id = this._getId($element, oView);
		this._addSettingsForAttributes(mSettings, fnClass, oElement, oView);
		this._addSettingsForAggregations(mSettings, fnClass, oElement, oView);

		var oControl;
		if (sap.ui.core.mvc.View.prototype.isPrototypeOf(fnClass.prototype) && typeof fnClass._sType === "string") {
			// for views having a factory function defined we use the factory function!
			oControl = sap.ui.view(mSettings, undefined, fnClass._sType);
		} else {
			oControl = new fnClass(mSettings);
		}

		if (oElement.className) {
			oControl.addStyleClass(oElement.className);	
		}

		// mark control as parsed
		$element.removeAttr("data-sap-ui-type");

	} else {
		oControl = this._createHtmlControl(oElement, oView);
	}

	return oControl;
};


/**
 * Parses a given DOM ref and converts it into a HTMLControl.
 * @param {DomElement} oElement reference to a DOM element
 * @param {sap.ui.core.mvc.HTMLView} [oView] The view instance to use.
 * @return {sap.ui.core.HTML} reference to a Control
 * @private
 */
sap.ui.core.DeclarativeSupport._createHtmlControl = function(oElement, oView) {
	//include HTML content
	var oHTML = new sap.ui.core.HTML();
	oHTML.setDOMContent(oElement);
	// check for declarative content
	this.compile(oElement, oView, true)
	return oHTML;	
};


/**
 * Adds all defined attributes to the settings object of a control.
 * 
 * @param {object} mSettings reference of the settings of the control
 * @param {function} fnClass reference to a Class
 * @param {DomElement} oElement reference to a DOM element
 * @param {sap.ui.core.mvc.HTMLView} [oView] The view instance to use.
 * @return {object} the settings of the control.
 * @throws {Error} if an attribute is not supported
 * @private
 */
sap.ui.core.DeclarativeSupport._addSettingsForAttributes = function(mSettings, fnClass, oElement, oView) {	
	var self = this;
	var oSpecialAttributes = sap.ui.core.DeclarativeSupport.attributes;
	var fnBindingParser = sap.ui.base.ManagedObject.bindingParser;
	var aCustomData = [];
	var reCustomData = /^data-custom-data:(.+)/i;

	jQuery.each(oElement.attributes, function(iIndex, oAttr) {
		var sName = oAttr.name;
		var sValue = oAttr.value;
		
		if (!reCustomData.test(sName)) {

			// no custom data attribute:
			
			if (typeof oSpecialAttributes[sName] === "undefined") {
				sName = self.convertAttributeToSettingName(sName, mSettings.id);
				var oProperty = self._getProperty(fnClass, sName);
				if (oProperty) {
					var oBindingInfo = fnBindingParser(sValue, oView && oView.getController(), true );
					if ( oBindingInfo && typeof oBindingInfo === "object" ) {
						mSettings[sName] = oBindingInfo;
					} else {
						mSettings[sName] = self.convertValueToType(self.getPropertyDataType(oProperty), oBindingInfo || sValue);
					}
				} else if (self._getAssociation(fnClass, sName)) {
					var oAssociation = self._getAssociation(fnClass, sName);
					if (oAssociation.multiple) {
						// we support "," and " " to split between IDs
						sValue = sValue.replace(/\s*,\s*|\s+/g, ","); // normalize strings: "id1  ,    id2    id3" to "id1,id2,id3"
						var aId = sValue.split(","); // split array for all ","
						jQuery.each(aId, function(iIndex, sId) {
							aId[iIndex] = oView ? oView.createId(sId) : sId;
						});
						mSettings[sName] = aId;
					} else {
						mSettings[sName] = oView ? oView.createId(sValue) : sValue; // use the value as ID
					}
				} else if (self._getAggregation(fnClass, sName)) {
					var oAggregation = self._getAggregation(fnClass, sName);
					if (oAggregation.multiple) {
						var oBindingInfo = fnBindingParser(sValue, oView && oView.getController());
						if (oBindingInfo) {
							mSettings[sName] = oBindingInfo;
						} else {
							throw new Error("Aggregation " + sName + " with cardinality 0..n only allows binding paths as attribute value");
						}
					} else if (oAggregation.altTypes) {
						var oBindingInfo = fnBindingParser(sValue, oView && oView.getController(), true);
						if ( oBindingInfo && typeof oBindingInfo === "object" ) {
							mSettings[sName] = oBindingInfo;
						} else {
							mSettings[sName] = self.convertValueToType(oAggregation.altTypes[0], oBindingInfo || sValue);
						}
					} else {
						throw new Error("Aggregation " + sName + " not supported");
					}
				} else if (self._getEvent(fnClass, sName)) {
					var fnHandler = jQuery.sap.getObject(sValue);
					
					if (oView && typeof fnHandler === "undefined") {
						var oController = (oView._oContainingView || oView).getController();
						fnHandler = oController[sValue];
						if (typeof fnHandler === "function") {
							// the handler name is set as property on the function to keep this information
							// e.g. for serializers which converts a control tree back to a declarative format
							// TODO: Remember events and attach them without using jQuery proxy
							fnHandler = jQuery.proxy(fnHandler, oController);
							fnHandler._sapui_handlerName = sValue;
						}
					}

					if (typeof fnHandler === "function") {
						mSettings[sName] = fnHandler;
					} else {
						throw new Error('Control "' + mSettings.id + '": The function "' + sValue + '" for the event "' + sName + '" is not defined');
						
					}
				}
			} else if (typeof oSpecialAttributes[sName] === "function") {
				oSpecialAttributes[sName](sValue, mSettings, fnClass);
			}
			
		} else {

			// custom data handling:

			// determine the key of the custom data entry
			sName = jQuery.sap.camelCase(reCustomData.exec(sName)[1]);

			// create a binding info object if necessary
			var oBindingInfo = fnBindingParser(sValue, oView && oView.getController());

			// create the custom data object
			aCustomData.push(new sap.ui.core.CustomData({
				key: sName,
				value: oBindingInfo || sValue
			}));

		}

	});
	
	if (aCustomData.length > 0) {
		mSettings.customData = aCustomData;
	}
	
	return mSettings;
};


/**
 * Adds all defined aggregations to the settings object of a control.
 * 
 * @param {object} mSettings reference of the settings of the control
 * @param {function} fnClass reference to a Class
 * @param {DomElement} oElement reference to a DOM element
 * @param {sap.ui.core.mvc.HTMLView} [oView] The view instance to use.
 * @return {object} the settings of the control.
 * @private
 */
sap.ui.core.DeclarativeSupport._addSettingsForAggregations = function(mSettings, fnClass, oElement, oView) {
	var $element = jQuery(oElement);

	var sDefaultAggregation = this._getDefaultAggregation(fnClass, oElement);

	var self = this;
	var oAggregations = fnClass.getMetadata().getAllAggregations();

	$element.children().each(function() {
		// check for an aggregation tag of in case of a sepcifiying the
		// aggregration on the parent control this will be used in case
		// of no meta tag was found
		var $child = jQuery(this);
		var sAggregation = $child.attr("data-sap-ui-aggregation");
		var sType = $child.attr("data-sap-ui-type");

		var bUseDefault = false;
		if (!sAggregation) {
			bUseDefault = true;
			sAggregation = sDefaultAggregation;
		}

		// add the child to the aggregation
		if (sAggregation && oAggregations[sAggregation]) {
			var bMultiple = oAggregations[sAggregation].multiple;

			var addControl = function(oChildElement) {
				var oControl = self._createControl(oChildElement, oView);
				if (oControl) {
					if (bMultiple) {
						// 1..n AGGREGATION
						if (!mSettings[sAggregation]) {
							mSettings[sAggregation] = [];
						}
						if ( typeof mSettings[sAggregation].path === "string" ) {
							jQuery.sap.assert(!mSettings[sAggregation].template, "list bindings support only a single template object");
							mSettings[sAggregation].template = oControl;
						} else {
							mSettings[sAggregation].push(oControl);
						}

					} else {
						// 1..1 AGGREGATION
						mSettings[sAggregation] = oControl;
					}
				}
			};

			if (bUseDefault || (sType && !bUseDefault)) {
				addControl(this);
			} else {
				$child.children().each(function() {
					addControl(this);
				});
			}
		}

		$child.removeAttr("data-sap-ui-aggregation");
		$child.removeAttr("data-sap-ui-type");
	});
	return mSettings;
	
};


/**
 * Returns the id of the element.
 *
 * @param {DomElement} oElement reference to a DOM element
 * @param {sap.ui.core.mvc.HTMLView} [oView] The view instance to use.
 * @return {string} the id of the element
 * @private
 */
sap.ui.core.DeclarativeSupport._getId = function(oElement, oView) {
	var $element = jQuery(oElement);
	var sId = $element.attr("id");
	if (sId) {
		if (oView) {
			sId = oView.createId(sId);
			// Remember the id for the HTMLView rendering method. This is needed to replace the placeholder div with the actual
			// control HTML (Do not use ID as Firefox even finds detached IDs)
			$element.attr("data-sap-ui-id", sId);
		}
		// in case of having an ID retrieve it and clear it in the placeholder
		// DOM element to avoid double IDs
		$element.attr("id", "");	
	}
	return sId;
};


/**
 * Returns the property of a given class and property name.
 *
 * @param {function} fnClass reference to a Class
 * @param {string} sName the name of the property
 * @return {object} reference to the property object
 * @private
 */
sap.ui.core.DeclarativeSupport._getProperty = function(fnClass, sName) {
	return fnClass.getMetadata().getAllProperties()[sName];
};


/**
 * Converts a given value to the right property type.
 *
 * @param {object} oType the type of the value
 * @param {string} sValue the value to convert
 * @return {string} the converted value
 * @private
 */
sap.ui.core.DeclarativeSupport.convertValueToType = function(oType, sValue) {
	if (oType instanceof sap.ui.base.DataType) {
		sValue = oType.parseValue(sValue);
	}
	// else return original sValue (e.g. for enums)
	// Note: to avoid double resolution of binding expressions, we have to escape string values once again 
	return typeof sValue === "string" ? sap.ui.base.ManagedObject.bindingParser.escape(sValue) : sValue;
};


/**
 * Returns the data type object for a certain property.
 *
 * @param {object} oProperty reference to the property object
 * @return {object} the type of the property
 * @throws {Error} if no type for the property is found
 * @private
 */
sap.ui.core.DeclarativeSupport.getPropertyDataType = function(oProperty) {
	var oType = sap.ui.base.DataType.getType(oProperty.type);
	if (!oType) {
		throw new Error("Property " + oProperty.name + " has no known type");
	}
	return oType;
};



/**
 * Returns the settings name for a given html attribute (converts data-my-setting to mySetting)
 *
 * @param {string} sAttribute the name of the attribute
 * @param {string} sId the id of the control
 * @param {boolean} bDeprecationWarning whether to show a deprecation warning or not
 * @return {string} the settings name
 * @private
 */
sap.ui.core.DeclarativeSupport.convertAttributeToSettingName = function(sAttribute, sId, bDeprecationWarning) {
	if (sAttribute.indexOf("data-") === 0) {
		sAttribute = sAttribute.substr(5);
	} else if (bDeprecationWarning) {
		jQuery.sap.log.warning('[Deprecated] Control "' + sId + '": The attribute "' + sAttribute + '" is not prefixed with "data-*". Future version of declarative support will only suppport attributes with "data-*" prefix.');
	} else {
		throw new Error('Control "' + sId + '": The attribute "' + sAttribute + '" is not prefixed with "data-*".');
	}
	return jQuery.sap.camelCase(sAttribute);
};


/**
 * Returns the association of a given class and association name.
 *
 * @param {function} fnClass reference to a Class
 * @param {string} sName the name of the association
 * @return {object} reference to the association object
 * @private
 */
sap.ui.core.DeclarativeSupport._getAssociation = function(fnClass, sName) {
	return fnClass.getMetadata().getAllAssociations()[sName];
};

/**
 * Returns the aggregations of a given class and aggregation name.
 *
 * @param {function} fnClass reference to a Class
 * @param {string} sName the name of the association
 * @return {object} reference to the association object
 * @private
 */
sap.ui.core.DeclarativeSupport._getAggregation = function(fnClass, sName) {
	return fnClass.getMetadata().getAllAggregations()[sName];
};


/**
 * Returns the event of a given class and event name.
 *
 * @param {function} fnClass reference to a Class
 * @param {string} sName the name of the event
 * @return {object} reference to the event object
 * @private
 */
sap.ui.core.DeclarativeSupport._getEvent = function(fnClass, sName) {
	return fnClass.getMetadata().getAllEvents()[sName];
};


/**
 * Returns the default aggregation of the control.
 *
 * @param {function} fnClass reference to a Class
 * @param {DomElement} oElement reference to a DOM element
 * @return {string} the default aggregation
 * @private
 */
sap.ui.core.DeclarativeSupport._getDefaultAggregation = function(fnClass, oElement) {
	var $element = jQuery(oElement);
	var sDefaultAggregation = $element.attr("data-sap-ui-default-aggregation") || fnClass.getMetadata().getDefaultAggregationName();
	$element.removeAttr("data-sap-ui-default-aggregation");
	return sDefaultAggregation;
};
