/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.m.ObjectListItemRenderer");jQuery.sap.require("sap.ui.core.Renderer");jQuery.sap.require("sap.m.ListItemBaseRenderer");sap.m.ObjectListItemRenderer=sap.ui.core.Renderer.extend(sap.m.ListItemBaseRenderer);
sap.m.ObjectListItemRenderer.renderAttributeStatus=function(r,l,a,s){if(!a&&!s||(a&&a._isEmpty()&&s&&s._isEmpty())){return}r.write("<div");r.addClass("sapMObjLAttrRow");r.writeClasses();r.write(">");if(a&&!a._isEmpty()){r.write("<div");r.addClass("sapMObjLAttrDiv");if(s&&(!s._isEmpty())){if(s instanceof Array){r.addClass("sapMObjAttrWithMarker")}}r.writeClasses();if(!s||s._isEmpty()){r.addStyle("width","100%");r.writeStyles()}r.write(">");r.renderControl(a);r.write("</div>")}if(s&&(!s._isEmpty())){r.write("<div");r.addClass("sapMObjLStatusDiv");if(s instanceof Array){r.addClass("sapMObjStatusMarker")}r.writeClasses();if(!a||a._isEmpty()){r.addStyle("width","100%");r.writeStyles()}r.write(">");if(s instanceof Array){while(s.length>0){r.renderControl(s.shift())}}else{r.renderControl(s)}r.write("</div>")}r.write("</div>")};
sap.m.ObjectListItemRenderer.renderLIAttributes=function(r,l){r.addClass("sapMObjLItem");r.addClass("sapMObjLListModeDiv")};
sap.m.ObjectListItemRenderer.renderLIContent=function(r,l){r.write("<div");r.writeControlData(l);r.write(">");if(l.getIntro()){r.write("<div");r.addClass("sapMObjLIntro");r.writeClasses();r.writeAttribute("id",l.getId()+"-intro");r.write(">");r.write("<span>");r.writeEscaped(l.getIntro());r.write("</span>");r.write("</div>")}r.write("<div");r.addClass("sapMObjLTopRow");r.writeClasses();r.write(">");r.write("<div");r.addClass("sapMObjLNumberDiv");r.writeClasses();r.write(">");if(l.getNumber()){r.write("<div");r.writeAttribute("id",l.getId()+"-number");r.addClass("sapMObjLNumber");r.addClass("sapMObjLNumberState"+l.getNumberState());r.writeClasses();r.write(">");r.writeEscaped(l.getNumber());r.write("</div>");if(l.getNumberUnit()){r.write("<div");r.writeAttribute("id",l.getId()+"-numberUnit");r.addClass("sapMObjLNumberUnit");r.addClass("sapMObjLNumberState"+l.getNumberState());r.writeClasses();r.write(">");r.writeEscaped(l.getNumberUnit());r.write("</div>")}}r.write("</div>");r.write("<div");r.writeAttribute("id",l.getId()+"-title");r.addClass("sapMObjLTitle");r.writeClasses();r.write(">");if(!!l.getIcon()){r.write("<div");r.addClass("sapMObjLIconDiv");r.writeClasses();r.write(">");r.renderControl(l._getImageControl());r.write("</div>")}if(l.getTitle()){r.writeEscaped(l.getTitle())}r.write("</div>");r.write("</div>");r.write('<div style="clear:both"/>');if(l._hasBottomContent()){r.write("<div");r.addClass("sapMObjLBottomRow");r.writeClasses();r.write(">");var a=l._getVisibleAttributes();var s=new Array();var m=null;if(l.getShowMarkers()){var p=l._getPlaceholderIcon();var f=l._getFavoriteIcon();var b=l._getFlagIcon();f.setVisible(l.getMarkFavorite());b.setVisible(l.getMarkFlagged());m=[p,f,b];s.push(m);m._isEmpty=function(){return false}}s.push(l.getFirstStatus());s.push(l.getSecondStatus());while(a.length>0){this.renderAttributeStatus(r,l,a.shift(),s.shift())}while(s.length>0){this.renderAttributeStatus(r,l,null,s.shift())}r.write("</div>")}r.write("</div>")};