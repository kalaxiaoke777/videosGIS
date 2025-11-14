// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.21/esri/copyright.txt for details.
//>>built
define(["exports","../../../../core/maybe","../../../../geometry/support/webMercatorUtils","../../../../portal/support/geometryServiceUtils"],function(e,g,h,k){e.toViewIfLocal=function(a){const d=a.view.spatialReference,b=a.layer.fullExtent;var c=b&&b.spatialReference;if(!c)return Promise.resolve(null);if(c.equals(d))return Promise.resolve(b.clone());c=h.project(b,d);return g.isSome(c)?Promise.resolve(c):a.view.state.isLocal?k.projectGeometry(b,d,a.layer.portalItem).then(f=>!a.destroyed&&f?f:void 0).catch(()=>
null):Promise.resolve(null)};Object.defineProperty(e,"__esModule",{value:!0})});