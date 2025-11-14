/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.21/esri/copyright.txt for details.
*/
import{r as n}from"../core/lang.js";import{w as r}from"../core/Accessor.js";function t(n,r,t={}){return c(n,r,t,e)}function o(n,r,t={}){return c(n,r,t,s)}function c(t,o,c={},e){let s=null;const i=c.once?(r,t)=>{e(r)&&(n(s),o(r,t))}:(n,r)=>{e(n)&&o(n,r)};if(s=r(t,i,c.sync),c.immediate){const n=t();i(n,n)}return s}function e(n){return!0}function s(n){return!!n}const i={sync:!0,immediate:!0};export{i as S,o as a,t as r};
