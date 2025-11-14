/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.21/esri/copyright.txt for details.
*/
import{b as o,f as t}from"../core/lang.js";const s={dash:[4,3],dot:[1,3],"long-dash":[8,3],"short-dash":[4,1],"short-dot":[1,1]},d={dash:s.dash,"dash-dot":[...s.dash,...s.dot],dot:s.dot,"long-dash":s["long-dash"],"long-dash-dot":[...s["long-dash"],...s.dot],"long-dash-dot-dot":[...s["long-dash"],...s.dot,...s.dot],none:null,"short-dash":s["short-dash"],"short-dash-dot":[...s["short-dash"],...s["short-dot"]],"short-dash-dot-dot":[...s["short-dash"],...s["short-dot"],...s["short-dot"]],"short-dot":s["short-dot"],solid:null};function h(t){return o(t)?t:t.slice()}function a(o){return[o,o]}function n(o,s){return t(o,(o=>o.map((o=>o*s))))}function r(o){return t(o,(o=>h(d[o])))}export{a,h as c,r as g,n as s};
