/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

/* ----------------------------------------------------------------------------------
 * Hint: This is a derived (generated) file. Changes should be done in the underlying 
 * source files only (*.control, *.js) or they will be lost after the next generation.
 * ---------------------------------------------------------------------------------- */

// Provides control sap.ui.layout.HorizontalLayout.
jQuery.sap.declare("sap.ui.layout.HorizontalLayout");
jQuery.sap.require("sap.ui.layout.library");
jQuery.sap.require("sap.ui.core.Control");


/**
 * Constructor for a new HorizontalLayout.
 * 
 * Accepts an object literal <code>mSettings</code> that defines initial 
 * property values, aggregated and associated objects as well as event handlers. 
 * 
 * If the name of a setting is ambiguous (e.g. a property has the same name as an event), 
 * then the framework assumes property, aggregation, association, event in that order. 
 * To override this automatic resolution, one of the prefixes "aggregation:", "association:" 
 * or "event:" can be added to the name of the setting (such a prefixed name must be
 * enclosed in single or double quotes).
 *
 * The supported settings are:
 * <ul>
 * <li>Properties
 * <ul>
 * <li>{@link #getAllowWrapping allowWrapping} : boolean (default: false)</li>
 * <li>{@link #getVisible visible} : boolean (default: true)</li></ul>
 * </li>
 * <li>Aggregations
 * <ul>
 * <li>{@link #getContent content} : sap.ui.core.Control[]</li></ul>
 * </li>
 * <li>Associations
 * <ul></ul>
 * </li>
 * <li>Events
 * <ul></ul>
 * </li>
 * </ul> 

 *
 * @param {string} [sId] id for the new control, generated automatically if no id is given 
 * @param {object} [mSettings] initial settings for the new control
 *
 * @class
 * A layout that provides support for horizontal alignment of controls
 * @extends sap.ui.core.Control
 *
 * @author SAP AG 
 * @version 1.18.8
 *
 * @constructor   
 * @public
 * @since 1.16.0
 * @name sap.ui.layout.HorizontalLayout
 */
sap.ui.core.Control.extend("sap.ui.layout.HorizontalLayout", { metadata : {

	// ---- object ----

	// ---- control specific ----
	library : "sap.ui.layout",
	properties : {
		"allowWrapping" : {type : "boolean", group : "Misc", defaultValue : false},
		"visible" : {type : "boolean", group : "Appearance", defaultValue : true}
	},
	defaultAggregation : "content",
	aggregations : {
    	"content" : {type : "sap.ui.core.Control", multiple : true, singularName : "content"}
	}
}});


/**
 * Creates a new subclass of class sap.ui.layout.HorizontalLayout with name <code>sClassName</code> 
 * and enriches it with the information contained in <code>oClassInfo</code>.
 * 
 * <code>oClassInfo</code> might contain the same kind of informations as described in {@link sap.ui.core.Element.extend Element.extend}.
 *   
 * @param {string} sClassName name of the class to be created
 * @param {object} [oClassInfo] object literal with informations about the class  
 * @param {function} [FNMetaImpl] constructor function for the metadata object. If not given, it defaults to sap.ui.core.ElementMetadata.
 * @return {function} the created class / constructor function
 * @public
 * @static
 * @name sap.ui.layout.HorizontalLayout.extend
 * @function
 */


/**
 * Getter for property <code>allowWrapping</code>.
 * Specifies whether the content inside the Layout shall be line-wrapped in the case that there is less horizontal space available than required.
 *
 * Default value is <code>false</code>
 *
 * @return {boolean} the value of property <code>allowWrapping</code>
 * @public
 * @name sap.ui.layout.HorizontalLayout#getAllowWrapping
 * @function
 */

/**
 * Setter for property <code>allowWrapping</code>.
 *
 * Default value is <code>false</code> 
 *
 * @param {boolean} bAllowWrapping  new value for property <code>allowWrapping</code>
 * @return {sap.ui.layout.HorizontalLayout} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.layout.HorizontalLayout#setAllowWrapping
 * @function
 */


/**
 * Getter for property <code>visible</code>.
 * Whether this HorizontalLayout is visible.
 *
 * Default value is <code>true</code>
 *
 * @return {boolean} the value of property <code>visible</code>
 * @public
 * @name sap.ui.layout.HorizontalLayout#getVisible
 * @function
 */

/**
 * Setter for property <code>visible</code>.
 *
 * Default value is <code>true</code> 
 *
 * @param {boolean} bVisible  new value for property <code>visible</code>
 * @return {sap.ui.layout.HorizontalLayout} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.layout.HorizontalLayout#setVisible
 * @function
 */


/**
 * Getter for aggregation <code>content</code>.<br/>
 * The controls inside this layout
 * 
 * @return {sap.ui.core.Control[]}
 * @public
 * @name sap.ui.layout.HorizontalLayout#getContent
 * @function
 */


/**
 * Inserts a content into the aggregation named <code>content</code>.
 *
 * @param {sap.ui.core.Control}
 *          oContent the content to insert; if empty, nothing is inserted
 * @param {int}
 *             iIndex the <code>0</code>-based index the content should be inserted at; for 
 *             a negative value of <code>iIndex</code>, the content is inserted at position 0; for a value 
 *             greater than the current size of the aggregation, the content is inserted at 
 *             the last position        
 * @return {sap.ui.layout.HorizontalLayout} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.layout.HorizontalLayout#insertContent
 * @function
 */

/**
 * Adds some content <code>oContent</code> 
 * to the aggregation named <code>content</code>.
 *
 * @param {sap.ui.core.Control}
 *            oContent the content to add; if empty, nothing is inserted
 * @return {sap.ui.layout.HorizontalLayout} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.layout.HorizontalLayout#addContent
 * @function
 */

/**
 * Removes an content from the aggregation named <code>content</code>.
 *
 * @param {int | string | sap.ui.core.Control} vContent the content to remove or its index or id
 * @return {sap.ui.core.Control} the removed content or null
 * @public
 * @name sap.ui.layout.HorizontalLayout#removeContent
 * @function
 */

/**
 * Removes all the controls in the aggregation named <code>content</code>.<br/>
 * Additionally unregisters them from the hosting UIArea.
 * @return {sap.ui.core.Control[]} an array of the removed elements (might be empty)
 * @public
 * @name sap.ui.layout.HorizontalLayout#removeAllContent
 * @function
 */

/**
 * Checks for the provided <code>sap.ui.core.Control</code> in the aggregation named <code>content</code> 
 * and returns its index if found or -1 otherwise.
 *
 * @param {sap.ui.core.Control}
 *            oContent the content whose index is looked for.
 * @return {int} the index of the provided control in the aggregation if found, or -1 otherwise
 * @public
 * @name sap.ui.layout.HorizontalLayout#indexOfContent
 * @function
 */
	

/**
 * Destroys all the content in the aggregation 
 * named <code>content</code>.
 * @return {sap.ui.layout.HorizontalLayout} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.layout.HorizontalLayout#destroyContent
 * @function
 */


// Start of sap\ui\layout\HorizontalLayout.js
