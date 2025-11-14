/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.21/esri/copyright.txt for details.
*/
import{i as e}from"../core/lang.js";import{project as r}from"../geometry/support/webMercatorUtils.js";import{projectGeometry as o}from"./geometryServiceUtils.js";function t(t){const s=t.view.spatialReference,l=t.layer.fullExtent,i=l&&l.spatialReference;if(!i)return Promise.resolve(null);if(i.equals(s))return Promise.resolve(l.clone());const n=r(l,s);return e(n)?Promise.resolve(n):t.view.state.isLocal?o(l,s,t.layer.portalItem).then((e=>!t.destroyed&&e?e:void 0)).catch((()=>null)):Promise.resolve(null)}export{t};
