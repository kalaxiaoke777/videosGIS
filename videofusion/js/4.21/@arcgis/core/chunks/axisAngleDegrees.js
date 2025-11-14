/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.21/esri/copyright.txt for details.
*/
import{r,k as t,m as n}from"./mathUtils.js";import{g as s,s as a,m as o}from"./quat.js";import{d as u}from"./quatf64.js";function f(r=j){return[r[0],r[1],r[2],r[3]]}function i(r,n,s=f()){return t(s,r),s[3]=n,s}function m(t,n,u=f()){return a(d,t,p(t)),a(q,n,p(n)),o(d,q,d),i=u,m=r(s(u,d)),i[3]=m,i;var i,m}function c(r){return r}function e(r){return r[3]}function p(r){return n(r[3])}const j=[0,0,1,0],d=u(),q=u();f();export{m as a,c as b,f as c,p as d,e,i as f};
