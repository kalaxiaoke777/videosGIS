/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.21/esri/copyright.txt for details.
*/
import{O as i,b as n}from"./vectorStacks.js";import{u as r,b as t,k as o,s as e,d as s,a as c,n as a,g as u,f as g}from"./mathUtils.js";function d(i){return i?{origin:r(i.origin),direction:r(i.direction)}:{origin:t(),direction:t()}}function f(i,n){const r=k.get();return r.origin=i,r.direction=n,r}function l(i,n=d()){return b(i.origin,i.direction,n)}function m(i,n,r=d()){return o(r.origin,i),e(r.direction,n,i),r}function b(i,n,r=d()){return o(r.origin,i),o(r.direction,n),r}function p(i,r){const t=c(n.get(),a(n.get(),i.direction),e(n.get(),r,i.origin));return s(t,t)}function j(i,n,r){const t=s(i.direction,e(r,n,i.origin));return u(r,i.origin,g(r,i.direction,t)),r}const k=new i((function(){return{origin:null,direction:null}}));export{l as a,m as b,d as c,j as d,p as e,b as f,f as w};
