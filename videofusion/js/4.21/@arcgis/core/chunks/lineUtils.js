/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.21/esri/copyright.txt for details.
*/
import{b as e,j as t,K as r,c as i,e as s,s as a,d as o,f as n,g as l,k as d,l as c,w as h,t as p,q as u,n as m,i as f}from"./mathUtils.js";import{d as g,o as v,i as y,b as _,u as b,k as x,s as S}from"../core/lang.js";import{projectBuffer as w,computeTranslationToOriginAndRotation as C}from"../geometry/projection.js";import{p as E}from"./triangulationUtils.js";import{O as R,Z as T}from"./vec4f64.js";import{n as O}from"./compilerUtils.js";import{e as D,d as P,a as A,m as M,o as I,i as L,t as z}from"./mat4.js";import{c as F,I as N,b as U}from"./mat4f64.js";import{i as j,a as H,g as V}from"./ElevationProvider.js";import{u as G,W,S as B}from"./ScreenSpacePass.js";import{_ as q}from"./tslib.es6.js";import k,{s as Z}from"../core/Accessor.js";import{E as $}from"./Evented.js";import Q from"../core/Handles.js";import{L as Y}from"./Logger.js";import{s as J}from"./MapUtils.js";import{P as X,a as K}from"../core/scheduling.js";import{init as ee}from"../core/watchUtils.js";import{property as te}from"../core/accessorSupport/decorators/property.js";import"./ensureType.js";import{subclass as re}from"../core/accessorSupport/decorators/subclass.js";import{a as ie}from"./vec2f64.js";import{c as se,o as ae,a as oe}from"./aaBoundingRect.js";import{c as ne}from"./vec2f32.js";import{m as le,c as de,d as ce,V as he,B as pe,f as ue,s as me,v as fe}from"./VertexArrayObject.js";import{F as ge}from"./FramebufferObject.js";import{T as ve}from"./Texture.js";import{g as ye,f as _e,S as be,O as xe,R as Se,E as we,q as Ce,C as Ee,B as Re,p as Te,a as Oe,b as De,c as Pe,P as Ae,h as Me,F as Ie,W as Le,$ as ze,a0 as Fe,G as Ne,H as Ue,I as je,a1 as He,J as Ve,a2 as Ge,L as We,M as Be,a3 as qe,a4 as ke,a5 as Ze,a6 as $e,a7 as Qe,a8 as Ye,a9 as Je,aa as Xe,ab as Ke,T as et,r as tt,D as rt,ac as it,ad as st,Y as at,w as ot,_ as nt,Z as lt,d as dt}from"./OutputDepth.glsl.js";import{C as ct}from"./Camera.js";import{a as ht,c as pt,s as ut,b as mt}from"./Util.js";import{O as ft,a as gt}from"./Intersector.js";import{d as vt}from"./screenUtils.js";import{c as yt}from"./vec2.js";import{c as _t,d as bt,f as xt,a as St}from"./lineSegment.js";import{c as wt,f as Ct,s as Et,n as Rt}from"./plane.js";import{n as Tt}from"./InterleavedLayout.js";import{c as Ot}from"./geometryDataUtils.js";import{c as Dt}from"./quatf64.js";import{f as Pt}from"./vec3f32.js";import{i as At,c as Mt,d as It,e as Lt}from"./verticalOffsetUtils.js";import{P as zt,b as Ft,a as Nt,F as Ut,R as jt,c as Ht}from"./PhysicallyBasedRendering.glsl.js";import{g as Vt}from"./glUtil.js";import{o as Gt}from"./metadata.js";import{T as Wt,n as Bt}from"./Scheduler.js";function qt(e){e.fragment.code.add(ye`const float GAMMA = 2.2;
const float INV_GAMMA = 0.4545454545;
vec4 delinearizeGamma(vec4 color) {
return vec4(pow(color.rgb, vec3(INV_GAMMA)), color.w);
}
vec3 linearizeGamma(vec3 color) {
return pow(color, vec3(GAMMA));
}`)}class kt{constructor(t=e()){this.intensity=t}}class Zt{constructor(r=e(),i=t(.57735,.57735,.57735)){this.intensity=r,this.direction=i}}class $t{constructor(r=e(),i=t(.57735,.57735,.57735),s=!0){this.intensity=r,this.direction=i,this.castShadows=s}}class Qt{constructor(){this.r=[0],this.g=[0],this.b=[0]}}let Yt=class extends k{constructor(){super(...arguments),this.SCENEVIEW_HITTEST_RETURN_INTERSECTOR=!1,this.SCENEVIEW_LOCKING_LOG=!1,this.HIGHLIGHTS_GRID_OPTIMIZATION_ENABLED=!0,this.HIGHLIGHTS_PROFILE_TO_CONSOLE=!1,this.DECONFLICTOR_SHOW_VISIBLE=!1,this.DECONFLICTOR_SHOW_INVISIBLE=!1,this.DECONFLICTOR_SHOW_GRID=!1,this.LABELS_SHOW_BORDER=!1,this.OVERLAY_DRAW_DEBUG_TEXTURE=!1,this.OVERLAY_SHOW_CENTER=!1,this.SHOW_POI=!1,this.TESTS_DISABLE_UPDATE_THRESHOLDS=!1,this.DISABLE_DECONFLICTOR_VISIBILITY_OFFSET=!1,this.DISABLE_ELEVATION_ALIGNERS_ITERATIVE_UPDATES=!1,this.DRAW_MESH_GEOMETRY_NORMALS=!1,this.FEATURE_TILE_FETCH_SHOW_TILES=!1,this.FEATURE_TILE_TREE_SHOW_TILES=!1,this.TERRAIN_TILE_TREE_SHOW_TILES=!1,this.I3S_TREE_SHOW_TILES=!1,this.I3S_SHOW_MODIFICATIONS=!1,this.ENABLE_PROFILE_DEPTH_RANGE=!1,this.DISABLE_FAST_UPDATES=!1,this.LOD_INSTANCE_RENDERER_DISABLE_UPDATES=!1,this.LOD_INSTANCE_RENDERER_COLORIZE_BY_LEVEL=!1,this.EDGES_SHOW_HIDDEN_TRANSPARENT_EDGES=!1,this.ENABLE_CONTINUOUS_LINE_PATTERNS=!1}};q([te()],Yt.prototype,"SCENEVIEW_HITTEST_RETURN_INTERSECTOR",void 0),q([te()],Yt.prototype,"SCENEVIEW_LOCKING_LOG",void 0),q([te()],Yt.prototype,"HIGHLIGHTS_GRID_OPTIMIZATION_ENABLED",void 0),q([te()],Yt.prototype,"HIGHLIGHTS_PROFILE_TO_CONSOLE",void 0),q([te()],Yt.prototype,"DECONFLICTOR_SHOW_VISIBLE",void 0),q([te()],Yt.prototype,"DECONFLICTOR_SHOW_INVISIBLE",void 0),q([te()],Yt.prototype,"DECONFLICTOR_SHOW_GRID",void 0),q([te()],Yt.prototype,"LABELS_SHOW_BORDER",void 0),q([te()],Yt.prototype,"OVERLAY_DRAW_DEBUG_TEXTURE",void 0),q([te()],Yt.prototype,"OVERLAY_SHOW_CENTER",void 0),q([te()],Yt.prototype,"SHOW_POI",void 0),q([te()],Yt.prototype,"TESTS_DISABLE_UPDATE_THRESHOLDS",void 0),q([te()],Yt.prototype,"DISABLE_DECONFLICTOR_VISIBILITY_OFFSET",void 0),q([te()],Yt.prototype,"DISABLE_ELEVATION_ALIGNERS_ITERATIVE_UPDATES",void 0),q([te()],Yt.prototype,"DRAW_MESH_GEOMETRY_NORMALS",void 0),q([te()],Yt.prototype,"FEATURE_TILE_FETCH_SHOW_TILES",void 0),q([te()],Yt.prototype,"FEATURE_TILE_TREE_SHOW_TILES",void 0),q([te()],Yt.prototype,"TERRAIN_TILE_TREE_SHOW_TILES",void 0),q([te()],Yt.prototype,"I3S_TREE_SHOW_TILES",void 0),q([te()],Yt.prototype,"I3S_SHOW_MODIFICATIONS",void 0),q([te()],Yt.prototype,"ENABLE_PROFILE_DEPTH_RANGE",void 0),q([te()],Yt.prototype,"DISABLE_FAST_UPDATES",void 0),q([te()],Yt.prototype,"LOD_INSTANCE_RENDERER_DISABLE_UPDATES",void 0),q([te()],Yt.prototype,"LOD_INSTANCE_RENDERER_COLORIZE_BY_LEVEL",void 0),q([te()],Yt.prototype,"EDGES_SHOW_HIDDEN_TRANSPARENT_EDGES",void 0),q([te()],Yt.prototype,"ENABLE_CONTINUOUS_LINE_PATTERNS",void 0),Yt=q([re("esri.views.3d.support.DebugFlags")],Yt);const Jt=new Yt;function Xt(e,t,r,i,s,a,o,n,l,d,c){const h=ar[c.mode];let p,u,m=0;if(w(e,t,r,i,l.spatialReference,s,n))return h.requiresAlignment(c)?(m=h.applyElevationAlignmentBuffer(i,s,a,o,n,l,d,c),p=a,u=o):(p=i,u=s),w(p,l.spatialReference,u,a,d.spatialReference,o,n)?m:void 0}function Kt(e,t,r,i,s){const a=(j(e)?e.z:H(e)?e.array[e.offset+2]:e[2])||0;switch(r.mode){case"on-the-ground":{const r=g(V(t,e,"ground"),0);return s&&(s.verticalDistanceToGround=0,s.sampledElevation=r),r}case"relative-to-ground":{const o=g(V(t,e,"ground"),0),n=r.geometryZWithOffset(a,i);return s&&(s.verticalDistanceToGround=n,s.sampledElevation=o),n+o}case"relative-to-scene":{const o=g(V(t,e,"scene"),0),n=r.geometryZWithOffset(a,i);return s&&(s.verticalDistanceToGround=n,s.sampledElevation=o),n+o}case"absolute-height":{const o=r.geometryZWithOffset(a,i);if(s){const r=g(V(t,e,"ground"),0);s.verticalDistanceToGround=o-r,s.sampledElevation=r}return o}default:return O(r.mode),0}}function er(e,t,r){return null==t||null==r?e.definedChanged:"on-the-ground"===t&&"on-the-ground"===r?e.staysOnTheGround:t===r||"on-the-ground"!==t&&"on-the-ground"!==r?sr.UPDATE:e.onTheGroundChanged}function tr(e){return"relative-to-ground"===e||"relative-to-scene"===e}function rr(e){return"absolute-height"!==e}function ir(e,t,r,i,s){const a=Kt(t,r,s,i,nr);G(e,nr.verticalDistanceToGround);const o=nr.sampledElevation,n=D(or,e.transformation);lr[0]=t.x,lr[1]=t.y,lr[2]=a;return C(t.spatialReference,lr,n,i.spatialReference)?e.transformation=n:console.warn("Could not locate symbol object properly, it might be misplaced"),o}var sr;!function(e){e[e.NONE=0]="NONE",e[e.UPDATE=1]="UPDATE",e[e.RECREATE=2]="RECREATE"}(sr||(sr={}));const ar={"absolute-height":{applyElevationAlignmentBuffer:function(e,t,r,i,s,a,o,n){const l=n.calculateOffsetRenderUnits(o),d=n.featureExpressionInfoContext;t*=3,i*=3;for(let a=0;a<s;++a){const s=e[t+0],a=e[t+1],o=e[t+2];r[i+0]=s,r[i+1]=a,r[i+2]=null==d?o+l:l,t+=3,i+=3}return 0},requiresAlignment:function(e){const t=e.meterUnitOffset,r=e.featureExpressionInfoContext;return 0!==t||null!=r}},"on-the-ground":{applyElevationAlignmentBuffer:function(e,t,r,i,s,a){let o=0;const n=a.spatialReference;t*=3,i*=3;for(let l=0;l<s;++l){const s=e[t+0],l=e[t+1],d=e[t+2],c=g(a.getElevation(s,l,d,n,"ground"),0);o+=c,r[i+0]=s,r[i+1]=l,r[i+2]=c,t+=3,i+=3}return o/s},requiresAlignment:()=>!0},"relative-to-ground":{applyElevationAlignmentBuffer:function(e,t,r,i,s,a,o,n){let l=0;const d=n.calculateOffsetRenderUnits(o),c=n.featureExpressionInfoContext,h=a.spatialReference;t*=3,i*=3;for(let o=0;o<s;++o){const s=e[t+0],o=e[t+1],n=e[t+2],p=g(a.getElevation(s,o,n,h,"ground"),0);l+=p,r[i+0]=s,r[i+1]=o,r[i+2]=null==c?n+p+d:p+d,t+=3,i+=3}return l/s},requiresAlignment:()=>!0},"relative-to-scene":{applyElevationAlignmentBuffer:function(e,t,r,i,s,a,o,n){let l=0;const d=n.calculateOffsetRenderUnits(o),c=n.featureExpressionInfoContext,h=a.spatialReference;t*=3,i*=3;for(let o=0;o<s;++o){const s=e[t+0],o=e[t+1],n=e[t+2],p=g(a.getElevation(s,o,n,h,"scene"),0);l+=p,r[i+0]=s,r[i+1]=o,r[i+2]=null==c?n+p+d:p+d,t+=3,i+=3}return l/s},requiresAlignment:()=>!0}},or=F(),nr={verticalDistanceToGround:0,sampledElevation:0},lr=e();class dr{constructor(e,t){this.vec3=e,this.id=t}}function cr(e,r,i,s){return new dr(t(e,r,i),s)}class hr{constructor(e,t){this.index=e,this.renderTargets=t,this.extent=se(),this.resolution=0,this.renderLocalOrigin=cr(0,0,0,"O"),this.pixelRatio=1,this.canvasGeometries={extents:[se(),se(),se()],numViews:0},this.validTargets=null,this.hasDrapedFeatureSource=!1,this.hasDrapedRasterSource=!1,this.hasTargetWithoutRasterImage=!1,this.index=e,this.validTargets=new Array(t.renderTargets.length).fill(!1)}getValidTarget(e){return this.validTargets[e]?this.renderTargets.getTarget(e):null}get needsColorWithoutRasterImage(){return this.hasDrapedRasterSource&&this.hasDrapedFeatureSource&&this.hasTargetWithoutRasterImage}getColorTexture(e){const t=1===e?this.renderTargets.getTarget(0):2===e?this.renderTargets.getTarget(2):this.renderTargets.getTarget(4);return t?t.getTexture():null}getNormalTexture(e){const t=1===e?this.renderTargets.getTarget(3):null;return t?t.getTexture():null}draw(e,t){const r=this.computeRenderTargetValidityBitfield(),i=this.needsColorWithoutRasterImage;for(const r of this.renderTargets.renderTargets)1===r.type&&!1===i?this.validTargets[r.type]=!1:this.validTargets[r.type]=e.drawTarget(this,r,t);return r^this.computeRenderTargetValidityBitfield()?0:1}computeRenderTargetValidityBitfield(){const e=this.validTargets;return+e[0]|+e[1]<<1|+e[2]<<2|+e[3]<<3|+e[4]<<4}setupGeometryViewsCyclical(e){this.setupGeometryViewsDirect();const t=.001*e.range;if(this.extent[0]-t<=e.min){const t=this.canvasGeometries.extents[this.canvasGeometries.numViews++];ae(this.extent,e.range,0,t)}if(this.extent[2]+t>=e.max){const t=this.canvasGeometries.extents[this.canvasGeometries.numViews++];ae(this.extent,-e.range,0,t)}}setupGeometryViewsDirect(){this.canvasGeometries.numViews=1,oe(this.canvasGeometries.extents[0],this.extent)}hasSomeSizedView(){for(let e=0;e<this.canvasGeometries.numViews;e++){const t=this.canvasGeometries.extents[e];if(t[0]!==t[2]&&t[1]!==t[3])return!0}return!1}applyViewport(e){e.setViewport(0===this.index?0:this.resolution,0,this.resolution,this.resolution)}}function pr(e,t,i){return Math.min(r(Math.max(e,t)+256),i)}class ur{constructor(e,t){this.size=ne(),this._fbo=null,this._fbo=new ge(e,{colorTarget:0,depthStencilTarget:0},{target:3553,pixelFormat:6408,dataType:5121,wrapMode:33071,samplingMode:9987,hasMipmap:t,maxAnisotropy:8,width:0,height:0})}dispose(){this._fbo=v(this._fbo)}getTexture(){return this._fbo?this._fbo.colorTexture:null}isValid(){return null!==this._fbo}resize(e,t){this.size[0]=e,this.size[1]=t,this._fbo.resize(this.size[0],this.size[1])}bind(e){e.bindFramebuffer(this._fbo)}generateMipMap(){this._fbo.colorTexture.descriptor.hasMipmap&&this._fbo.colorTexture.generateMipmap()}disposeRenderTargetMemory(){var e;null==(e=this._fbo)||e.resize(0,0)}get gpuMemoryUsage(){var e,t;return null!=(e=null==(t=this._fbo)?void 0:t.gpuMemoryUsage)?e:0}}class mr{constructor(e){this.renderTargets=null;const t=(t,r,i=!0)=>({type:r,fbo:new ur(e,i),renderPass:t,valid:!1,lastUsed:1/0});this.renderTargets=[t(0,0),t(0,1),t(5,2,!1),t(3,3),t(0,4)]}getTarget(e){return this.renderTargets[e].fbo}dispose(){for(const e of this.renderTargets)e.fbo.dispose()}disposeRenderTargetMemory(){for(const e of this.renderTargets)e.fbo.disposeRenderTargetMemory()}validateUsageForTarget(e,t,r){if(e)t.lastUsed=r;else if(r-t.lastUsed>fr)t.fbo.disposeRenderTargetMemory(),t.lastUsed=1/0;else if(t.lastUsed<1/0)return!0;return!1}get gpuMemoryUsage(){return this.renderTargets.reduce(((e,t)=>e+t.fbo.gpuMemoryUsage),0)}}const fr=1e3;class gr{constructor(e){this.technique=e,this.refCount=0,this.refZeroFrame=0}}class vr{constructor(e){this._context=e,this._perConstructorInstances=new Map,this._frameCounter=0,this._keepAliveFrameCount=yr}get viewingMode(){return this._context.viewingMode}get constructionContext(){return this._context}dispose(){this._perConstructorInstances.forEach((e=>e.forEach((e=>e.technique.dispose())))),this._perConstructorInstances.clear()}acquire(e,t){const r=t.key;let i=this._perConstructorInstances.get(e);i||(i=new Map,this._perConstructorInstances.set(e,i));let s=i.get(r);if(void 0===s){const a=new e(this._context,t,(()=>this.release(a)));s=new gr(a),i.set(r,s)}return++s.refCount,s.technique}releaseAndAcquire(e,t,r){if(y(r)){if(t.key===r.key)return r;r.release()}return this.acquire(e,t)}release(e){if(_(e))return;const t=this._perConstructorInstances.get(e.constructor).get(e.key);--t.refCount,0===t.refCount&&(t.refZeroFrame=this._frameCounter)}frameUpdate(){this._frameCounter++,this._keepAliveFrameCount!==yr&&this._perConstructorInstances.forEach(((e,t)=>{e.forEach(((t,r)=>{0===t.refCount&&t.refZeroFrame+this._keepAliveFrameCount<this._frameCounter&&(t.technique.dispose(),e.delete(r))})),0===e.size&&this._perConstructorInstances.delete(t)}))}async hotReload(){const e=new Array;this._perConstructorInstances.forEach(((t,r)=>{e.push((async(e,t)=>{const r=t.shader;r&&(await r.reload(),e.forEach((e=>{e.technique.reload(this._context)})))})(t,r))})),await Promise.all(e)}}const yr=-1,_r=[{output:0,name:"color"},{output:1,name:"depth"},{output:2,name:"normal"},{output:3,name:"depthShadowMap"},{output:4,name:"highlight"},{output:5,name:"draped"},{output:6,name:"occlusion"},{output:7,name:"alpha"}];function br(e,t){return e+"_"+_r.find((e=>e.output===t)).name}const xr=Y.getLogger("esri.views.3d.webgl-engine.lib.GLMaterialRep");class Sr{constructor(e){this.refCnt=0,this.glMaterial=e}incRefCnt(){++this.refCnt}decRefCnt(){--this.refCnt,ht(this.refCnt>=0)}getRefCnt(){return this.refCnt}getGLMaterial(){return this.glMaterial}}class wr{constructor(e,t,r){this._textureRep=e,this._techniqueRep=t,this.onMaterialChanged=r,this._id2glMaterialRef=new Map}dispose(){this._textureRep.dispose()}acquire(e,t){this.ownMaterial(e);const r=br(e.id,t);let i=this._id2glMaterialRef.get(r);if(null==i){const s=e.getGLMaterial({material:e,techniqueRep:this._techniqueRep,textureRep:this._textureRep,output:t});return i=new Sr(s),i.incRefCnt(),this._id2glMaterialRef.set(r,i),s}return i.incRefCnt(),i.getGLMaterial()}release(e,t){const r=br(e.id,t),i=this._id2glMaterialRef.get(r);if(i.decRefCnt(),0===i.getRefCnt()){const e=i.getGLMaterial();e&&e.dispose(),this._id2glMaterialRef.delete(r)}}materialChanged(e){for(const t of _r)if(5!==t.output&&6!==t.output){const r=this._id2glMaterialRef.get(br(e.id,t.output));if(r&&r.getGLMaterial()){const e=r.getGLMaterial();e.updateParameters&&e.updateParameters()}}this.onMaterialChanged&&this.onMaterialChanged(e)}ownMaterial(e){y(e.materialRepository)&&e.materialRepository!==this&&xr.error("Material is already owned by a different material repository"),e.materialRepository=this}}var Cr;!function(e){e.Default={vvSizeEnabled:!1,vvSizeMinSize:Pt(1,1,1),vvSizeMaxSize:Pt(100,100,100),vvSizeOffset:Pt(0,0,0),vvSizeFactor:Pt(1,1,1),vvSizeValue:Pt(1,1,1),vvColorEnabled:!1,vvColorValues:[0,0,0,0,0,0,0,0],vvColorColors:[1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],vvOpacityEnabled:!1,vvOpacityValues:[0,0,0,0,0,0,0,0],vvOpacityOpacities:[1,1,1,1,1,1,1,1],vvSymbolAnchor:[0,0,0],vvSymbolRotationMatrix:Dt()}}(Cr||(Cr={}));var Er=Cr;function Rr(e,t){e.vertex.uniforms.add("intrinsicWidth","float"),t.vvSize?(e.attributes.add("sizeFeatureAttribute","float"),e.vertex.uniforms.add("vvSizeMinSize","vec3"),e.vertex.uniforms.add("vvSizeMaxSize","vec3"),e.vertex.uniforms.add("vvSizeOffset","vec3"),e.vertex.uniforms.add("vvSizeFactor","vec3"),e.vertex.code.add(ye`float getSize() {
return intrinsicWidth * clamp(vvSizeOffset + sizeFeatureAttribute * vvSizeFactor, vvSizeMinSize, vvSizeMaxSize).x;
}`)):(e.attributes.add("size","float"),e.vertex.code.add(ye`float getSize(){
return intrinsicWidth * size;
}`)),t.vvOpacity?(e.attributes.add("opacityFeatureAttribute","float"),e.vertex.constants.add("vvOpacityNumber","int",8),e.vertex.code.add(ye`uniform float vvOpacityValues[vvOpacityNumber];
uniform float vvOpacityOpacities[vvOpacityNumber];
float interpolateOpacity( float value ){
if (value <= vvOpacityValues[0]) {
return vvOpacityOpacities[0];
}
for (int i = 1; i < vvOpacityNumber; ++i) {
if (vvOpacityValues[i] >= value) {
float f = (value - vvOpacityValues[i-1]) / (vvOpacityValues[i] - vvOpacityValues[i-1]);
return mix(vvOpacityOpacities[i-1], vvOpacityOpacities[i], f);
}
}
return vvOpacityOpacities[vvOpacityNumber - 1];
}
vec4 applyOpacity( vec4 color ){
return vec4(color.xyz, interpolateOpacity(opacityFeatureAttribute));
}`)):e.vertex.code.add(ye`vec4 applyOpacity( vec4 color ){
return color;
}`),t.vvColor?(e.attributes.add("colorFeatureAttribute","float"),e.vertex.constants.add("vvColorNumber","int",8),e.vertex.code.add(ye`uniform float vvColorValues[vvColorNumber];
uniform vec4 vvColorColors[vvColorNumber];
vec4 interpolateColor( float value ) {
if (value <= vvColorValues[0]) {
return vvColorColors[0];
}
for (int i = 1; i < vvColorNumber; ++i) {
if (vvColorValues[i] >= value) {
float f = (value - vvColorValues[i-1]) / (vvColorValues[i] - vvColorValues[i-1]);
return mix(vvColorColors[i-1], vvColorColors[i], f);
}
}
return vvColorColors[vvColorNumber - 1];
}
vec4 getColor(){
return applyOpacity(interpolateColor(colorFeatureAttribute));
}`)):(e.attributes.add("color","vec4"),e.vertex.code.add(ye`vec4 getColor(){
return applyOpacity(color);
}`))}function Tr(e,t){e.constants.add("stippleAlphaColorDiscard","float",.001),e.constants.add("stippleAlphaHighlightDiscard","float",.5),t.stippleEnabled?function(e,t){e.fragment.include(_e);const r=t.draped&&Jt.ENABLE_CONTINUOUS_LINE_PATTERNS;r?e.vertex.uniforms.add("worldToScreenRatio","float"):e.vertex.uniforms.add("stipplePatternPixelSizeInv","float");t.stippleUVMaxEnabled&&e.varyings.add("stipplePatternUvMax","float");e.varyings.add("stipplePatternUv","float"),e.fragment.uniforms.add("stipplePatternTexture","sampler2D"),e.fragment.uniforms.add("stipplePatternSDFNormalizer","float"),r&&e.fragment.uniforms.add("stipplePatternPixelSizeInv","float");t.stippleOffColorEnabled&&e.fragment.uniforms.add("stippleOffColor","vec4");r?e.fragment.code.add(ye`float getStippleValue() {
return rgba2float(texture2D(stipplePatternTexture, vec2(mod(stipplePatternUv * stipplePatternPixelSizeInv, 1.0), 0.5)));
}`):e.fragment.code.add(ye`
      float getStippleValue() {
        float stipplePatternUvClamped = stipplePatternUv * gl_FragCoord.w;
        ${t.stippleUVMaxEnabled?"stipplePatternUvClamped = clamp(stipplePatternUvClamped, 0.0, stipplePatternUvMax);":""}
        return rgba2float(texture2D(stipplePatternTexture, vec2(mod(stipplePatternUvClamped, 1.0), 0.5)));
      }
    `);e.fragment.code.add(ye`float getStippleSDF() {
return (getStippleValue() * 2.0 - 1.0) * stipplePatternSDFNormalizer;
}
float getStippleAlpha() {
return clamp(getStippleSDF() + 0.5, 0.0, 1.0);
}`),t.stippleOffColorEnabled?e.fragment.code.add(ye`#define discardByStippleAlpha(stippleAlpha, threshold) {}
#define blendStipple(color, stippleAlpha) mix(color, stippleOffColor, stippleAlpha)`):e.fragment.code.add(ye`#define discardByStippleAlpha(stippleAlpha, threshold) if (stippleAlpha < threshold) { discard; }
#define blendStipple(color, stippleAlpha) vec4(color.rgb, color.a * stippleAlpha)`)}(e,t):function(e){e.fragment.code.add(ye`float getStippleAlpha() { return 1.0; }
#define discardByStippleAlpha(_stippleAlpha_, _threshold_) {}
#define blendStipple(color, _stippleAlpha_) color`)}(e)}var Or=Object.freeze({__proto__:null,build:function(e){const t=new be;t.extensions.add("GL_OES_standard_derivatives"),t.include(zt),t.include(Rr,e),t.include(Tr,e),1===e.output&&t.include(xe,e),t.vertex.uniforms.add("proj","mat4").add("view","mat4").add("cameraNearFar","vec2").add("pixelRatio","float").add("miterLimit","float").add("screenSize","vec2"),t.attributes.add("position","vec3"),t.attributes.add("subdivisionFactor","float"),t.attributes.add("uv0","vec2"),t.attributes.add("auxpos1","vec3"),t.attributes.add("auxpos2","vec3"),t.varyings.add("vColor","vec4"),t.varyings.add("vpos","vec3"),t.varyings.add("linearDepth","float"),e.multipassTerrainEnabled&&t.varyings.add("depth","float");const r=e.draped&&Jt.ENABLE_CONTINUOUS_LINE_PATTERNS,i=e.falloffEnabled,s=r&&e.stippleEnabled&&e.roundCaps,a=e.innerColorEnabled||s;return s&&t.varyings.add("stippleCapRadius","float"),a&&t.varyings.add("vLineDistance","float"),i&&t.varyings.add("vLineDistanceNorm","float"),e.falloffEnabled&&t.fragment.uniforms.add("falloff","float"),e.innerColorEnabled&&(t.fragment.uniforms.add("innerColor","vec4"),t.fragment.uniforms.add("innerWidth","float")),t.vertex.code.add(ye`#define PERPENDICULAR(v) vec2(v.y, -v.x);
float interp(float ncp, vec4 a, vec4 b) {
return (-ncp - a.z) / (b.z - a.z);
}
vec2 rotate(vec2 v, float a) {
float s = sin(a);
float c = cos(a);
mat2 m = mat2(c, -s, s, c);
return m * v;
}`),t.vertex.code.add(ye`vec4 projectAndScale(vec4 pos) {
vec4 posNdc = proj * pos;
posNdc.xy *= screenSize / posNdc.w;
return posNdc;
}`),t.vertex.code.add(ye`
    void clipAndTransform(inout vec4 pos, inout vec4 prev, inout vec4 next, in bool isStartVertex) {
      float vnp = cameraNearFar[0] * 0.99;

      //current pos behind ncp --> we need to clip
      if(pos.z > -cameraNearFar[0]) {
        if (!isStartVertex) {
          //previous in front of ncp
          if(prev.z < -cameraNearFar[0]) {
            pos = mix(prev, pos, interp(vnp, prev, pos));
            next = pos;
          } else {
            pos = vec4(0.0, 0.0, 0.0, 1.0);
          }
        }
        //next in front of ncp
        if(isStartVertex) {
          if(next.z < -cameraNearFar[0]) {
            pos = mix(pos, next, interp(vnp, pos, next));
            prev = pos;
          } else {
            pos = vec4(0.0, 0.0, 0.0, 1.0);
          }
        }
      } else {
        //current position visible
        //previous behind ncp
        if (prev.z > -cameraNearFar[0]) {
          prev = mix(pos, prev, interp(vnp, pos, prev));
        }
        //next behind ncp
        if (next.z > -cameraNearFar[0]) {
          next = mix(next, pos, interp(vnp, next, pos));
        }
      }

      ${e.multipassTerrainEnabled?"depth = pos.z;":""}
      linearDepth = (-pos.z - cameraNearFar[0]) / (cameraNearFar[1] - cameraNearFar[0]);

      pos = projectAndScale(pos);
      next = projectAndScale(next);
      prev = projectAndScale(prev);
    }
`),t.vertex.code.add(ye`void main(void) {
float uvY = floor(uv0.y);
float uvZ = fract(uv0.y) * 10.0;
float coverage = 1.0;
vpos = position;
if (uvY == 0.0) {
gl_Position = vec4(1e038, 1e038, 1e038, 1.0);
}
else {
bool isStartVertex = abs(abs(uvY)-3.0) == 1.0;
bool isJoin = abs(uvY)-3.0 < 0.0;
float lineWidth = getSize() * pixelRatio;
if (lineWidth < 1.0) {
coverage = lineWidth;
lineWidth = 1.0;
}else{
lineWidth = floor(lineWidth + 0.5);
}
vec4 pos  = view * vec4(position.xyz, 1.0);
vec4 prev = view * vec4(auxpos1.xyz, 1.0);
vec4 next = view * vec4(auxpos2.xyz, 1.0);
clipAndTransform(pos, prev, next, isStartVertex);
vec2 left = (pos.xy - prev.xy);
vec2 right = (next.xy - pos.xy);
float leftLen = length(left);
float rightLen = length(right);`),e.stippleEnabled&&t.vertex.code.add(ye`vec4 stippleSegmentInfo = mix(vec4(pos.xy, right), vec4(prev.xy, left), uvZ);
vec2 stippleSegmentOrigin = stippleSegmentInfo.xy;
vec2 stippleSegment = stippleSegmentInfo.zw;`),t.vertex.code.add(ye`left = (leftLen > 0.001) ? left/leftLen : vec2(0.0, 0.0);
right = (rightLen > 0.001) ? right/rightLen : vec2(0.0, 0.0);
vec2 capDisplacementDir = vec2(0, 0);
vec2 joinDisplacementDir = vec2(0, 0);
float displacementLen = lineWidth;
if (isJoin) {
bool isOutside = (left.x * right.y - left.y * right.x) * uvY > 0.0;
joinDisplacementDir = normalize(left + right);
joinDisplacementDir = PERPENDICULAR(joinDisplacementDir);
if (leftLen > 0.001 && rightLen > 0.001) {
float nDotSeg = dot(joinDisplacementDir, left);
displacementLen /= length(nDotSeg * left - joinDisplacementDir);
if (!isOutside) {
displacementLen = min(displacementLen, min(leftLen, rightLen)/abs(nDotSeg));
}
}
if (isOutside && (displacementLen > miterLimit * lineWidth)) {`),e.roundJoins?t.vertex.code.add(ye`vec2 startDir;
vec2 endDir;
if (leftLen < 0.001) {
startDir = right;
}
else{
startDir = left;
}
startDir = normalize(startDir);
startDir = PERPENDICULAR(startDir);
if (rightLen < 0.001) {
endDir = left;
}
else{
endDir = right;
}
endDir = normalize(endDir);
endDir = PERPENDICULAR(endDir);
float rotationAngle = acos(clamp(dot(startDir, endDir), -1.0, 1.0));
joinDisplacementDir = rotate(startDir, -sign(uvY) * subdivisionFactor * rotationAngle);`):t.vertex.code.add(ye`if (leftLen < 0.001) {
joinDisplacementDir = right;
}
else if (rightLen < 0.001) {
joinDisplacementDir = left;
}
else {
joinDisplacementDir = isStartVertex ? right : left;
}
joinDisplacementDir = normalize(joinDisplacementDir);
joinDisplacementDir = PERPENDICULAR(joinDisplacementDir);`),t.vertex.code.add(ye`displacementLen = lineWidth;
}
} else {
if (leftLen < 0.001) {
joinDisplacementDir = right;
}
else if (rightLen < 0.001) {
joinDisplacementDir = left;
}
else {
joinDisplacementDir = isStartVertex ? right : left;
}
joinDisplacementDir = normalize(joinDisplacementDir);
joinDisplacementDir = PERPENDICULAR(joinDisplacementDir);
displacementLen = lineWidth;
capDisplacementDir = isStartVertex ? -right : left;`),e.roundCaps?t.vertex.code.add(ye`float angle = subdivisionFactor*PI*0.5;
joinDisplacementDir *= cos(angle);
capDisplacementDir *= sin(angle);`):t.vertex.code.add(ye`capDisplacementDir *= subdivisionFactor;`),t.vertex.code.add(ye`
  }

  // Displacement (in pixels) caused by join/or cap
  vec2 dpos = joinDisplacementDir * sign(uvY) * displacementLen + capDisplacementDir * displacementLen;

  ${s?ye`stippleCapRadius = lineWidth;`:""}

  ${i||a?ye`float lineDist = lineWidth * sign(uvY) * pos.w;`:""}

  ${a?ye`vLineDistance = lineDist;`:""}
  ${i?ye`vLineDistanceNorm = lineDist / lineWidth;`:""}

  pos.xy += dpos;
  `),e.stippleEnabled&&(r?t.vertex.code.add(ye`{
stipplePatternUv = uv0.x;
float stippleSegmentScreenLength = length(stippleSegment);
float stippleSegmentRenderLength = length(mix(auxpos2 - position, position - auxpos1, uvZ));
if (stippleSegmentScreenLength >= 0.001) {
vec2 stippleDisplacement = pos.xy - stippleSegmentOrigin;
float stippleDisplacementFactor = dot(stippleSegment, stippleDisplacement) / (stippleSegmentScreenLength * stippleSegmentScreenLength);
stipplePatternUv += (stippleDisplacementFactor - uvZ) * stippleSegmentRenderLength;
}
stipplePatternUv *= worldToScreenRatio;
}`):(t.vertex.code.add(ye`{
vec2 posVec = pos.xy - stippleSegmentOrigin;
float stippleSegmentDirectionLength = length(stippleSegment);`),e.stippleIntegerRepeatsEnabled&&t.vertex.code.add(ye`float numberOfPatternRepeats = stippleSegmentDirectionLength * 0.5 * stipplePatternPixelSizeInv;
float roundedNumberOfPatternRepeats = floor(numberOfPatternRepeats);
stipplePatternUvMax = roundedNumberOfPatternRepeats;`),t.vertex.code.add(ye`
        if (stippleSegmentDirectionLength >= 0.001) {
          // Project the vertex position onto the line segment.
          float projectedLength = dot(stippleSegment, posVec) / stippleSegmentDirectionLength * 0.5;
          ${e.stippleIntegerRepeatsEnabled?"float wholeNumberOfRepeatsScale = roundedNumberOfPatternRepeats / numberOfPatternRepeats;":"float wholeNumberOfRepeatsScale = 1.0;"}
          stipplePatternUv = projectedLength * wholeNumberOfRepeatsScale * stipplePatternPixelSizeInv * pos.w;
        } else {
          stipplePatternUv = 1.0;
        }
      }
    `))),t.vertex.code.add(ye`pos.xy = pos.xy / screenSize * pos.w;
vColor = getColor();
vColor.a *= coverage;
gl_Position = pos;
}
}`),e.multipassTerrainEnabled&&(t.fragment.include(Se),t.include(we,e)),t.include(Ce,e),t.fragment.uniforms.add("intrinsicColor","vec4"),t.fragment.include(Ee),t.fragment.code.add(ye`
  void main() {
    discardBySlice(vpos);
    ${e.multipassTerrainEnabled?"terrainDepthTest(gl_FragCoord, depth);":""}
  `),s?t.fragment.code.add(ye`vec2 stipplePosition = vec2(
clamp(stippleCapRadius - getStippleSDF(), 0.0, stippleCapRadius),
vLineDistance
) / stippleCapRadius;
float stippleRadius = dot(stipplePosition, stipplePosition);
float stippleAlpha = step(stippleRadius, 1.0);`):t.fragment.code.add(ye`float stippleAlpha = getStippleAlpha();`),t.fragment.code.add(ye`discardByStippleAlpha(stippleAlpha, stippleAlphaColorDiscard);
vec4 color = intrinsicColor * vColor;`),e.innerColorEnabled&&(t.fragment.uniforms.add("pixelRatio","float"),t.fragment.code.add(ye`float distToInner = abs(vLineDistance * gl_FragCoord.w) - innerWidth;
float innerAA = clamp(0.5 - distToInner, 0.0, 1.0);
float innerAlpha = innerColor.a + color.a * (1.0 - innerColor.a);
color = mix(color, vec4(innerColor.rgb, innerAlpha), innerAA);`)),t.fragment.code.add(ye`vec4 finalColor = blendStipple(color, stippleAlpha);`),e.falloffEnabled&&t.fragment.code.add(ye`finalColor.a *= pow(max(0.0, 1.0 - abs(vLineDistanceNorm * gl_FragCoord.w)), falloff);`),t.fragment.code.add(ye`
    if (finalColor.a < ${ye.float(Re)}) {
      discard;
    }

    ${7===e.output?ye`gl_FragColor = vec4(finalColor.a);`:""}
    ${0===e.output?ye`gl_FragColor = highlightSlice(finalColor, vpos);`:""}
    ${0===e.output&&e.OITEnabled?"gl_FragColor = premultiplyAlpha(gl_FragColor);":""}
    ${4===e.output?ye`gl_FragColor = vec4(1.0);`:""}
    ${1===e.output?ye`outputDepth(linearDepth);`:""}
  }
  `),t}});const Dr=new Map([["position",0],["subdivisionFactor",1],["uv0",2],["auxpos1",3],["auxpos2",4],["size",6],["sizeFeatureAttribute",6],["color",5],["colorFeatureAttribute",5],["opacityFeatureAttribute",7]]);class Pr extends Pe{constructor(e,t,r){super(e,t,r),this.stippleTextureRepository=e.stippleTextureRepository}initializeProgram(e){const t=Pr.shader.get(),r=this.configuration,i=t.build({OITEnabled:0===r.transparencyPassType,output:r.output,slicePlaneEnabled:r.slicePlaneEnabled,sliceHighlightDisabled:!1,sliceEnabledForVertexPrograms:!1,draped:r.draped,stippleEnabled:r.stippleEnabled,stippleOffColorEnabled:r.stippleOffColorEnabled,stippleUVMaxEnabled:r.stippleIntegerRepeatsEnabled,stippleIntegerRepeatsEnabled:r.stippleIntegerRepeatsEnabled,roundCaps:r.roundCaps,roundJoins:r.roundJoins,vvColor:r.vvColor,vvSize:r.vvSize,vvInstancingEnabled:!0,vvOpacity:r.vvOpacity,falloffEnabled:r.falloffEnabled,innerColorEnabled:r.innerColorEnabled,multipassTerrainEnabled:r.multipassTerrainEnabled,cullAboveGround:r.cullAboveGround});return new Ae(e.rctx,i,Dr)}dispose(){super.dispose(),this.stippleTextureRepository.release(this.stipplePattern),this.stipplePattern=null,this.stippleTextureBind=null}bindPass(e,t){if(Me(this.program,t.camera.projectionMatrix),4===this.configuration.output&&Ie(this.program,t),t.multipassTerrainEnabled&&(this.program.setUniform2fv("inverseViewport",t.inverseViewport),Le(this.program,t)),this.program.setUniform1f("intrinsicWidth",e.width),this.program.setUniform4fv("intrinsicColor",e.color),this.program.setUniform1f("miterLimit","miter"!==e.join?0:e.miterLimit),this.program.setUniform2fv("cameraNearFar",t.camera.nearFar),this.program.setUniform1f("pixelRatio",t.camera.pixelRatio),this.program.setUniform2f("screenSize",t.camera.fullViewport[2],t.camera.fullViewport[3]),Ft(this.program,e),this.stipplePattern!==e.stipplePattern){const t=e.stipplePattern;this.stippleTextureBind=this.stippleTextureRepository.swap(this.stipplePattern,t),this.stipplePattern=t}if(this.configuration.stippleEnabled){const{pixelSize:r,sdfNormalizer:i}=y(this.stippleTextureBind)?this.stippleTextureBind(this.program):{pixelSize:1,sdfNormalizer:1};if(this.program.setUniform1f("stipplePatternSDFNormalizer",i),this.configuration.draped?(this.program.setUniform1f("stipplePatternPixelSizeInv",1/r),this.program.setUniform1f("worldToScreenRatio",1/t.screenToWorldRatio)):this.program.setUniform1f("stipplePatternPixelSizeInv",1/(r*t.camera.pixelRatio)),this.configuration.stippleOffColorEnabled){const t=b(e.stippleOffColor);this.program.setUniform4f("stippleOffColor",t[0],t[1],t[2],t.length>3?t[3]:1)}}this.configuration.falloffEnabled&&this.program.setUniform1f("falloff",e.falloff),this.configuration.innerColorEnabled&&(this.program.setUniform4fv("innerColor",g(e.innerColor,e.color)),this.program.setUniform1f("innerWidth",e.innerWidth*t.camera.pixelRatio))}bindDraw(e){ze(this.program,e),Fe(this.program,this.configuration,e),this.program.rebindTextures()}setPipelineState(e,t){const r=this.configuration,i=3===e,s=2===e;return le({blending:0===r.output||7===r.output?i?Ne:Ue(e):null,depthTest:{func:je(e)},depthWrite:i?!r.transparent&&r.writeDepth&&de:He(e),colorWrite:ce,stencilWrite:r.sceneHasOcludees?Ve:null,stencilTest:r.sceneHasOcludees?t?Ge:We:null,polygonOffset:i||s?r.polygonOffset&&Ar:Be})}initializePipeline(){const e=this.configuration,t=e.polygonOffset&&Ar;return e.occluder&&(this._occluderPipelineTransparent=le({blending:Ne,polygonOffset:t,depthTest:qe,depthWrite:null,colorWrite:ce,stencilWrite:null,stencilTest:ke}),this._occluderPipelineOpaque=le({blending:Ne,polygonOffset:t,depthTest:qe,depthWrite:null,colorWrite:ce,stencilWrite:Ze,stencilTest:$e}),this._occluderPipelineMaskWrite=le({blending:null,polygonOffset:t,depthTest:Qe,depthWrite:null,colorWrite:null,stencilWrite:Ve,stencilTest:Ge})),this._occludeePipelineState=this.setPipelineState(this.configuration.transparencyPassType,!0),this.setPipelineState(this.configuration.transparencyPassType,!1)}get primitiveType(){return 5}getPipelineState(e,t){return t?this._occludeePipelineState:this.configuration.occluder?11===e?this._occluderPipelineTransparent:10===e?this._occluderPipelineOpaque:this._occluderPipelineMaskWrite:this.pipeline}}Pr.shader=new Oe(Or,(()=>Promise.resolve().then((function(){return Or}))));const Ar={factor:0,units:-4};class Mr extends De{constructor(){super(...arguments),this.output=0,this.occluder=!1,this.slicePlaneEnabled=!1,this.transparent=!1,this.polygonOffset=!1,this.writeDepth=!1,this.draped=!1,this.stippleEnabled=!1,this.stippleOffColorEnabled=!1,this.stippleIntegerRepeatsEnabled=!1,this.roundCaps=!1,this.roundJoins=!1,this.vvSize=!1,this.vvColor=!1,this.vvOpacity=!1,this.falloffEnabled=!1,this.innerColorEnabled=!1,this.sceneHasOcludees=!1,this.transparencyPassType=3,this.multipassTerrainEnabled=!1,this.cullAboveGround=!1}}q([Te({count:8})],Mr.prototype,"output",void 0),q([Te()],Mr.prototype,"occluder",void 0),q([Te()],Mr.prototype,"slicePlaneEnabled",void 0),q([Te()],Mr.prototype,"transparent",void 0),q([Te()],Mr.prototype,"polygonOffset",void 0),q([Te()],Mr.prototype,"writeDepth",void 0),q([Te()],Mr.prototype,"draped",void 0),q([Te()],Mr.prototype,"stippleEnabled",void 0),q([Te()],Mr.prototype,"stippleOffColorEnabled",void 0),q([Te()],Mr.prototype,"stippleIntegerRepeatsEnabled",void 0),q([Te()],Mr.prototype,"roundCaps",void 0),q([Te()],Mr.prototype,"roundJoins",void 0),q([Te()],Mr.prototype,"vvSize",void 0),q([Te()],Mr.prototype,"vvColor",void 0),q([Te()],Mr.prototype,"vvOpacity",void 0),q([Te()],Mr.prototype,"falloffEnabled",void 0),q([Te()],Mr.prototype,"innerColorEnabled",void 0),q([Te()],Mr.prototype,"sceneHasOcludees",void 0),q([Te({count:4})],Mr.prototype,"transparencyPassType",void 0),q([Te()],Mr.prototype,"multipassTerrainEnabled",void 0),q([Te()],Mr.prototype,"cullAboveGround",void 0);const Ir=Y.getLogger("esri.views.3d.webgl-engine.materials.RibbonLineMaterial");class Lr extends Je{constructor(e){super(e,Fr),this._vertexAttributeLocations=Dr,this.techniqueConfig=new Mr,this.layout=this.createLayout()}isClosed(e,t){return Hr(this.params,e,t)}dispose(){}getPassParameters(){return this.params}getTechniqueConfig(e,t){this.techniqueConfig.output=e;const r=y(t)&&23===t.slot;this.techniqueConfig.draped=r;const i=y(this.params.stipplePattern);return this.techniqueConfig.stippleEnabled=i,this.techniqueConfig.stippleIntegerRepeatsEnabled=i&&this.params.stippleIntegerRepeats,this.techniqueConfig.stippleOffColorEnabled=i&&y(this.params.stippleOffColor),this.techniqueConfig.slicePlaneEnabled=this.params.slicePlaneEnabled,this.techniqueConfig.sceneHasOcludees=this.params.sceneHasOcludees,this.techniqueConfig.roundJoins="round"===this.params.join,this.techniqueConfig.roundCaps="round"===this.params.cap,this.techniqueConfig.transparent=this.params.transparent,this.techniqueConfig.polygonOffset=this.params.polygonOffset,this.techniqueConfig.writeDepth=this.params.writeDepth,this.techniqueConfig.vvColor=this.params.vvColorEnabled,this.techniqueConfig.vvOpacity=this.params.vvOpacityEnabled,this.techniqueConfig.vvSize=this.params.vvSizeEnabled,this.techniqueConfig.innerColorEnabled=this.params.innerWidth>0&&y(this.params.innerColor),this.techniqueConfig.falloffEnabled=this.params.falloff>0,this.techniqueConfig.occluder=8===this.params.renderOccluded,this.techniqueConfig.transparencyPassType=t?t.transparencyPassType:3,this.techniqueConfig.multipassTerrainEnabled=!!t&&t.multipassTerrainEnabled,this.techniqueConfig.cullAboveGround=!!t&&t.cullAboveGround,this.techniqueConfig}intersect(e,t,r,i,s,a,o,n,l){l?this.intersectDrapedLineGeometry(e,i,a,o):this.intersectLineGeometry(e,t,r,i,this.params.width,o)}intersectDrapedLineGeometry(e,t,r,s){if(!t.options.selectionMode)return;const a=e.vertexAttributes.get("position").data,o=e.vertexAttributes.get("size");let n=this.params.width;if(this.params.vvSizeEnabled){const t=e.vertexAttributes.get("sizeFeatureAttribute").data[0];n*=i(this.params.vvSizeOffset[0]+t*this.params.vvSizeFactor[0],this.params.vvSizeMinSize[0],this.params.vvSizeMaxSize[0])}else o&&(n*=o.data[0]);const l=r[0],d=r[1],c=(n/2+4)*e.screenToWorldRatio;let h=Number.MAX_VALUE;for(let e=0;e<a.length-5;e+=3){const t=a[e],r=a[e+1],s=l-t,o=d-r,n=a[e+3]-t,c=a[e+4]-r,p=i((n*s+c*o)/(n*n+c*c),0,1),u=n*p-s,m=c*p-o,f=u*u+m*m;f<h&&(h=f)}h<c*c&&s()}intersectLineGeometry(e,t,r,p,u,m){if(!p.options.selectionMode||At(t))return;if(!pt(r))return void Ir.error("intersection assumes a translation-only matrix");const f=e.vertexAttributes,g=f.get("position").data;let v=u;if(this.params.vvSizeEnabled){const e=f.get("sizeFeatureAttribute").data[0];v*=i(this.params.vvSizeOffset[0]+e*this.params.vvSizeFactor[0],this.params.vvSizeMinSize[0],this.params.vvSizeMaxSize[0])}else f.has("size")&&(v*=f.get("size").data[0]);const y=p.camera,_=Zr;yt(_,p.point);const b=v*y.pixelRatio/2+4*y.pixelRatio;s(ii[0],_[0]-b,_[1]+b,0),s(ii[1],_[0]+b,_[1]+b,0),s(ii[2],_[0]+b,_[1]-b,0),s(ii[3],_[0]-b,_[1]-b,0);for(let e=0;e<4;e++)if(!y.unprojectFromRenderScreen(ii[e],si[e]))return;Ct(y.eye,si[0],si[1],ai),Ct(y.eye,si[1],si[2],oi),Ct(y.eye,si[2],si[3],ni),Ct(y.eye,si[3],si[0],li);let x=Number.MAX_VALUE;const S=jr(this.params,f,e.indices)?g.length-2:g.length-5;for(let e=0;e<S;e+=3){Wr[0]=g[e]+r[12],Wr[1]=g[e+1]+r[13],Wr[2]=g[e+2]+r[14];const t=(e+3)%g.length;if(Br[0]=g[t]+r[12],Br[1]=g[t+1]+r[13],Br[2]=g[t+2]+r[14],Et(ai,Wr)<0&&Et(ai,Br)<0||Et(oi,Wr)<0&&Et(oi,Br)<0||Et(ni,Wr)<0&&Et(ni,Br)<0||Et(li,Wr)<0&&Et(li,Br)<0)continue;if(y.projectToRenderScreen(Wr,$r),y.projectToRenderScreen(Br,Qr),$r[2]<0&&Qr[2]>0){a(qr,Wr,Br);const e=y.frustum,t=-Et(e[4],Wr)/o(qr,Rt(e[4]));n(qr,qr,t),l(Wr,Wr,qr),y.projectToRenderScreen(Wr,$r)}else if($r[2]>0&&Qr[2]<0){a(qr,Br,Wr);const e=y.frustum,t=-Et(e[4],Br)/o(qr,Rt(e[4]));n(qr,qr,t),l(Br,Br,qr),y.projectToRenderScreen(Br,Qr)}else if($r[2]<0&&Qr[2]<0)continue;$r[2]=0,Qr[2]=0;const i=bt(xt($r,Qr,Xr),_);i<x&&(x=i,d(Yr,Wr),d(Jr,Br))}const w=p.rayBeginPoint,C=p.rayEndPoint;if(x<b*b){let e=Number.MAX_VALUE;if(St(xt(Yr,Jr,Xr),xt(w,C,Kr),kr)){a(kr,kr,w);const t=c(kr);n(kr,kr,1/t),e=t/h(w,C)}m(e,kr)}}computeAttachmentOrigin(e,t){const r=e.vertexAttributes;if(!r)return null;const i=e.indices,s=r.get("position");return Ot(s,i?i.get("position"):null,i&&jr(this.params,r,i),t)}createLayout(){const e=Tt().vec3f("position").f32("subdivisionFactor").vec2f("uv0").vec3f("auxpos1").vec3f("auxpos2");return this.params.vvSizeEnabled?e.f32("sizeFeatureAttribute"):e.f32("size"),this.params.vvColorEnabled?e.f32("colorFeatureAttribute"):e.vec4f("color"),this.params.vvOpacityEnabled&&e.f32("opacityFeatureAttribute"),e}createBufferWriter(){return new Nr(this.layout,this.params)}getGLMaterial(e){return 0===e.output||7===e.output||4===e.output||1===e.output?new zr(e):void 0}validateParameterValues(e){"miter"!==e.join&&(e.miterLimit=0),this.requiresTransparent(e)&&(e.transparent=!0)}requiresTransparent(e){return!!((e.color&&e.color[3])<1||e.innerWidth>0&&this.colorRequiresTransparent(e.innerColor)||e.stipplePattern&&this.colorRequiresTransparent(e.stippleOffColor)||e.falloff>0)}colorRequiresTransparent(e){return y(e)&&e[3]<1&&e[3]>0}}class zr extends Xe{constructor(e){super(e),this.updateParameters()}updateParameters(e){this._technique=this._techniqueRep.releaseAndAcquire(Pr,this._material.getTechniqueConfig(this._output,e),this._technique)}beginSlot(e){return 23===e||(this._technique.configuration.occluder?3===e||10===e||11===e:0===this._output||7===this._output?(this.targetSlot=this._technique.configuration.writeDepth?5:8,e===this.targetSlot):3===e)}_updateOccludeeState(e){e.hasOccludees!==this._material.params.sceneHasOcludees&&this._material.setParameterValues({sceneHasOcludees:e.hasOccludees})}ensureParameters(e){0!==this._output&&7!==this._output||this._updateOccludeeState(e),this.updateParameters(e)}bind(e){this._technique.bindPass(this._material.getPassParameters(),e)}getPipelineState(e,t){return this._technique.getPipelineState(e,t)}}const Fr={width:0,color:[1,1,1,1],join:"miter",cap:"butt",miterLimit:5,writeDepth:!0,polygonOffset:!1,stipplePattern:null,stippleIntegerRepeats:!1,stippleOffColor:null,slicePlaneEnabled:!1,vvFastUpdate:!1,transparent:!1,isClosed:!1,falloff:0,innerWidth:0,innerColor:null,sceneHasOcludees:!1,...Ye,...Er.Default};class Nr{constructor(e,t){switch(this.params=t,this.numJoinSubdivisions=0,this.vertexBufferLayout=e,this.params.join){case"miter":case"bevel":this.numJoinSubdivisions=t.stipplePattern?1:0;break;case"round":this.numJoinSubdivisions=Gr}}isClosed(e){return jr(this.params,e.vertexAttributes,e.indices)}numCapSubdivisions(e){if(this.isClosed(e))return 0;switch(this.params.cap){case"butt":return 0;case"square":return 1;case"round":return Vr}}allocate(e){return this.vertexBufferLayout.createBuffer(e)}elementCount(e){const t=2*this.numCapSubdivisions(e)+2,r=e.indices.get("position").length/2+1,i=this.isClosed(e);let s=i?2:2*t;const a=i?0:1,o=i?r:r-1;if(e.vertexAttributes.has("subdivisions")){const t=e.vertexAttributes.get("subdivisions").data;for(let e=a;e<o;++e){s+=4+2*t[e]}}else{s+=(o-a)*(2*this.numJoinSubdivisions+4)}return s+=2,s}write(e,t,r,i){const a=ei,o=ti,n=ri,l=t.vertexAttributes.get("position").data,c=t.indices&&t.indices.get("position"),u=this.numCapSubdivisions(t);c&&c.length!==2*(l.length/3-1)&&console.warn("RibbonLineMaterial does not support indices");let m=null;t.vertexAttributes.has("subdivisions")&&(m=t.vertexAttributes.get("subdivisions").data);let f=1,g=0;this.params.vvSizeEnabled?g=t.vertexAttributes.get("sizeFeatureAttribute").data[0]:t.vertexAttributes.has("size")&&(f=t.vertexAttributes.get("size").data[0]);let v=[1,1,1,1],y=0;this.params.vvColorEnabled?y=t.vertexAttributes.get("colorFeatureAttribute").data[0]:t.vertexAttributes.has("color")&&(v=t.vertexAttributes.get("color").data);let _=0;this.params.vvOpacityEnabled&&(_=t.vertexAttributes.get("opacityFeatureAttribute").data[0]);const b=l.length/3,x=e.transformation,S=new Float32Array(r.buffer),w=this.vertexBufferLayout.stride/4;let C=i*w;const E=C;let R=0;const T=(e,t,r,i,s,a,o,n)=>{if(S[C++]=t[0],S[C++]=t[1],S[C++]=t[2],S[C++]=i,S[C++]=n,S[C++]=a+s/10,S[C++]=e[0],S[C++]=e[1],S[C++]=e[2],S[C++]=r[0],S[C++]=r[1],S[C++]=r[2],this.params.vvSizeEnabled?S[C++]=g:S[C++]=f,this.params.vvColorEnabled)S[C++]=y;else{const e=Math.min(4*o,v.length-4);S[C++]=v[e+0],S[C++]=v[e+1],S[C++]=v[e+2],S[C++]=v[e+3]}this.params.vvOpacityEnabled&&(S[C++]=_)};C+=w,s(o,l[0],l[1],l[2]),x&&p(o,o,x);const O=this.isClosed(t);if(O){const e=l.length-3;s(a,l[e],l[e+1],l[e+2]),x&&p(a,a,x)}else{d(a,o),s(n,l[3],l[4],l[5]),x&&p(n,n,x);for(let e=0;e<u;++e){const t=1-e/u;T(a,o,n,t,1,-4,0,R),T(a,o,n,t,1,4,0,R)}T(a,o,n,0,0,-4,0,R),T(a,o,n,0,0,4,0,R),d(a,o),d(o,n)}const D=O?0:1,P=O?b:b-1;for(let e=D;e<P;e++){const t=(e+1)%b*3;s(n,l[t+0],l[t+1],l[t+2]),x&&p(n,n,x),R+=h(a,o),T(a,o,n,0,1,-1,e,R),T(a,o,n,0,1,1,e,R);const r=m?m[e]:this.numJoinSubdivisions;for(let t=0;t<r;++t){const i=(t+1)/(r+1);T(a,o,n,i,1,-2,e,R),T(a,o,n,i,1,2,e,R)}T(a,o,n,1,0,-2,e,R),T(a,o,n,1,0,2,e,R),d(a,o),d(o,n)}if(O)s(n,l[3],l[4],l[5]),x&&p(n,n,x),R+=h(a,o),T(a,o,n,0,1,-1,D,R),T(a,o,n,0,1,1,D,R);else{R+=h(a,o),T(a,o,n,0,1,-5,P,R),T(a,o,n,0,1,5,P,R);for(let e=0;e<u;++e){const t=(e+1)/u;T(a,o,n,t,1,-5,P,R),T(a,o,n,t,1,5,P,R)}}Ur(S,E+w,S,E,w);C=Ur(S,C-w,S,C,w)}}function Ur(e,t,r,i,s){for(let a=0;a<s;a++)r[i++]=e[t++];return i}function jr(e,t,r){return Hr(e,t.get("position").data,r?r.get("position"):null)}function Hr(e,t,r){return!!e.isClosed&&(r?r.length>2:t.length>6)}const Vr=3,Gr=1,Wr=e(),Br=e(),qr=e(),kr=e(),Zr=e(),$r=vt(),Qr=vt(),Yr=e(),Jr=e(),Xr=_t(),Kr=_t(),ei=e(),ti=e(),ri=e(),ii=[vt(),vt(),vt(),vt()],si=[e(),e(),e(),e()],ai=wt(),oi=wt(),ni=wt(),li=wt();let di=0;class ci{constructor(e){this._originSR=e,this.ROOT_ORIGIN_ID="rg_root_"+di++,this._origins=new Map,this._gridSize=125e4,this._objects=new Map}getOrigin(e){const t=this._origins.get(this.ROOT_ORIGIN_ID);if(null==t){if(y(hi))return this._origins.set(this.ROOT_ORIGIN_ID,cr(hi[0],hi[1],hi[2],this.ROOT_ORIGIN_ID)),this.getOrigin(e);const t=cr(e[0]+Math.random()-.5,e[1]+Math.random()-.5,e[2]+Math.random()-.5,this.ROOT_ORIGIN_ID);return this._origins.set(this.ROOT_ORIGIN_ID,t),t}const r=this._gridSize,i=Math.round(e[0]/r),s=Math.round(e[1]/r),o=Math.round(e[2]/r),n=`rg_${i}/${s}/${o}`;let l=this._origins.get(n);const d=.5*r;if(a(pi,e,t.vec3),pi[0]=Math.abs(pi[0]),pi[1]=Math.abs(pi[1]),pi[2]=Math.abs(pi[2]),pi[0]<d&&pi[1]<d&&pi[2]<d){if(l){const t=Math.max(...pi);a(pi,e,l.vec3),pi[0]=Math.abs(pi[0]),pi[1]=Math.abs(pi[1]),pi[2]=Math.abs(pi[2]);if(Math.max(...pi)<t)return l}return t}return l||(l=cr(i*r,s*r,o*r,n),this._origins.set(n,l)),l}_drawOriginBox(e,t=[1,1,0,1]){const r=window.view,i=r._stage,s=t.toString();if(!this._objects.has(s)){this._material=new Lr({width:2,color:t}),i.add(this._material);const e=new W({isPickable:!1}),r=new ft({castShadow:!1});i.add(r),e.add(r),i.add(e),this._objects.set(s,r)}const a=this._objects.get(s),o=[0,1,5,4,0,2,1,7,6,2,0,1,3,7,5,4,6,2,0],n=o.length,l=new Array(3*n),d=new Uint16Array(2*(n-1)),c=.5*this._gridSize;for(let t=0;t<n;t++)l[3*t+0]=e[0]+(1&o[t]?c:-c),l[3*t+1]=e[1]+(2&o[t]?c:-c),l[3*t+2]=e[2]+(4&o[t]?c:-c),t>0&&(d[2*t+0]=t-1,d[2*t+1]=t);w(l,this._originSR,0,l,r.renderSpatialReference,0,n);const h=new Ke([["position",{size:3,data:l,exclusive:!0}]],[["position",d]],2);i.add(h),a.addGeometry(h,this._material,N)}get test(){const e=this;return{get gridSize(){return e._gridSize},set gridSize(t){e._gridSize=t}}}}let hi=null;const pi=e();class ui{constructor(e){this.rctx=e,this.camera=null,this.lastFrameCamera=new ct,this.pass=0,this.slot=0,this.highlightDepthTexture=null,this.renderOccludedMask=fi,this.hasOccludees=!1}resetRenderOccludedMask(){this.renderOccludedMask=fi}get isHighlightPass(){return 5===this.pass}}class mi extends ui{constructor(e,t,r,i,s,a){super(e),this.offscreenRenderingHelper=t,this.scenelightingData=r,this.shadowMap=i,this.ssaoHelper=s,this.sliceHelper=a}}const fi=13;class gi{constructor(){this.adds=new X,this.removes=new X,this.updates=new X({allocator:e=>e||new vi,deallocator:e=>(e.renderGeometry=null,e)})}clear(){this.adds.clear(),this.removes.clear(),this.updates.clear()}prune(){this.adds.prune(),this.removes.prune(),this.updates.prune()}}class vi{}class yi{constructor(){this.adds=new Array,this.removes=new Array,this.updates=new Array}}function _i(e){const t=new Map,r=e=>{let r=t.get(e);return r||(r=new yi,t.set(e,r)),r};return e.adds.forAll((e=>{bi(e)&&r(e.material).adds.push(e)})),e.removes.forAll((e=>{bi(e)&&r(e.material).removes.push(e)})),e.updates.forAll((e=>{bi(e.renderGeometry)&&r(e.renderGeometry.material).updates.push(e)})),t}function bi(e){return e.data.indexCount>=1}class xi{constructor(e){null==e?e=16:e<65536&&(e=r(e)),this._array=new Float32Array(e),this._size=0}resize(e,t){if(this._size=e,this._size>this._array.length){let e=this._array.length||1;for(;e<this._size;)e*=2;const r=new Float32Array(e);return t&&r.set(this._array),this._array=r,!0}const r=2*this._size;if(r<=this._array.length){let e=this._array.length;for(;e>=r;)e=Math.floor(e/2);const i=new Float32Array(e);return t&&i.set(this._array.subarray(0,e)),this._array=i,!0}return!1}append(e){const t=this._size;this.resize(this._size+e.length,!0),this._array.set(e,t)}erase(e,t){for(let r=e;r<t;++r)this._array[r]=0}get array(){return this._array}get size(){return this._size}}function Si(e){e.fragment.uniforms.add("lastFrameColorMap","sampler2D"),e.fragment.uniforms.add("reprojectionMat","mat4"),e.fragment.uniforms.add("rpProjectionMat","mat4"),e.fragment.code.add(ye`vec2 reprojectionCoordinate(vec3 projectionCoordinate)
{
vec4 zw = rpProjectionMat * vec4(0.0, 0.0, -projectionCoordinate.z, 1.0);
vec4 reprojectedCoord = reprojectionMat * vec4(zw.w * (projectionCoordinate.xy * 2.0 - 1.0), zw.z, zw.w);
reprojectedCoord.xy /= reprojectedCoord.w;
return reprojectedCoord.xy * 0.5 + 0.5;
}`)}function wi(e,t){e.fragment.uniforms.add("nearFar","vec2"),e.fragment.uniforms.add("depthMapView","sampler2D"),e.fragment.uniforms.add("ssrViewMat","mat4"),e.fragment.uniforms.add("invResolutionHeight","float"),e.fragment.include(Se),e.include(Si),e.fragment.code.add(ye`
  const int maxSteps = ${t.highStepCount?"150;":"75;"}

  vec4 applyProjectionMat(mat4 projectionMat, vec3 x)
  {
    vec4 projectedCoord =  projectionMat * vec4(x, 1.0);
    projectedCoord.xy /= projectedCoord.w;
    projectedCoord.xy = projectedCoord.xy*0.5 + 0.5;
    return projectedCoord;
  }

  vec3 screenSpaceIntersection(vec3 dir, vec3 startPosition, vec3 viewDir, vec3 normal)
  {
    vec3 viewPos = startPosition;
    vec3 viewPosEnd = startPosition;

    // Project the start position to the screen
    vec4 projectedCoordStart = applyProjectionMat(rpProjectionMat, viewPos);
    vec3  Q0 = viewPos / projectedCoordStart.w; // homogeneous camera space
    float k0 = 1.0/ projectedCoordStart.w;

    // advance the position in the direction of the reflection
    viewPos += dir;

    vec4 projectedCoordVanishingPoint = applyProjectionMat(rpProjectionMat, dir);

    // Project the advanced position to the screen
    vec4 projectedCoordEnd = applyProjectionMat(rpProjectionMat, viewPos);
    vec3  Q1 = viewPos / projectedCoordEnd.w; // homogeneous camera space
    float k1 = 1.0/ projectedCoordEnd.w;

    // calculate the reflection direction in the screen space
    vec2 projectedCoordDir = (projectedCoordEnd.xy - projectedCoordStart.xy);
    vec2 projectedCoordDistVanishingPoint = (projectedCoordVanishingPoint.xy - projectedCoordStart.xy);

    float yMod = min(abs(projectedCoordDistVanishingPoint.y), 1.0);

    float projectedCoordDirLength = length(projectedCoordDir);
    float maxSt = float(maxSteps);

    // normalize the projection direction depending on maximum steps
    // this determines how blocky the reflection looks
    vec2 dP = yMod * (projectedCoordDir)/(maxSt * projectedCoordDirLength);

    // Normalize the homogeneous camera space coordinates
    vec3  dQ = yMod * (Q1 - Q0)/(maxSt * projectedCoordDirLength);
    float dk = yMod * (k1 - k0)/(maxSt * projectedCoordDirLength);

    // initialize the variables for ray marching
    vec2 P = projectedCoordStart.xy;
    vec3 Q = Q0;
    float k = k0;
    float rayStartZ = -startPosition.z; // estimated ray start depth value
    float rayEndZ = -startPosition.z;   // estimated ray end depth value
    float prevEstimateZ = -startPosition.z;
    float rayDiffZ = 0.0;
    float dDepth;
    float depth;
    float rayDiffZOld = 0.0;

    // early outs
    if (dot(normal, dir) < 0.0 || dot(-viewDir, normal) < 0.0)
      return vec3(P, 0.0);

    for(int i = 0; i < maxSteps-1; i++)
    {
      depth = -linearDepthFromTexture(depthMapView, P, nearFar); // get linear depth from the depth buffer

      // estimate depth of the marching ray
      rayStartZ = prevEstimateZ;
      dDepth = -rayStartZ - depth;
      rayEndZ = (dQ.z * 0.5 + Q.z)/ ((dk * 0.5 + k));
      rayDiffZ = rayEndZ- rayStartZ;
      prevEstimateZ = rayEndZ;

      if(-rayEndZ > nearFar[1] || -rayEndZ < nearFar[0] || P.y < 0.0  || P.y > 1.0 )
      {
        return vec3(P, 0.);
      }

      // If we detect a hit - return the intersection point, two conditions:
      //  - dDepth > 0.0 - sampled point depth is in front of estimated depth
      //  - if difference between dDepth and rayDiffZOld is not too large
      //  - if difference between dDepth and 0.025/abs(k) is not too large
      //  - if the sampled depth is not behind far plane or in front of near plane

      if((dDepth) < 0.025/abs(k) + abs(rayDiffZ) && dDepth > 0.0 && depth > nearFar[0] && depth < nearFar[1] && abs(P.y - projectedCoordStart.y) > invResolutionHeight)
      {
          return vec3(P, depth);
      }

      // continue with ray marching
      P += dP;
      Q.z += dQ.z;
      k += dk;
      rayDiffZOld = rayDiffZ;
    }
    return vec3(P, 0.0);
  }
  `)}function Ci(e,t){t.ssrEnabled&&(e.bindTexture(t.linearDepthTexture,"depthMapView"),e.setUniform2fv("nearFar",t.camera.nearFar),e.setUniformMatrix4fv("ssrViewMat",t.camera.viewMatrix),e.setUniform1f("invResolutionHeight",1/t.camera.height),function(e,t){e.bindTexture(t.lastFrameColorTexture,"lastFrameColorMap"),e.setUniformMatrix4fv("reprojectionMat",t.reprojectionMat),e.setUniformMatrix4fv("rpProjectionMat",t.camera.projectionMatrix)}(e,t))}function Ei(e){e.fragment.code.add(ye`float normals2FoamIntensity(vec3 n, float waveStrength){
float normalizationFactor =  max(0.015, waveStrength);
return max((n.x + n.y)*0.3303545/normalizationFactor + 0.3303545, 0.0);
}`)}function Ri(e){e.fragment.code.add(ye`vec3 foamIntensity2FoamColor(float foamIntensityExternal, float foamPixelIntensity, vec3 skyZenitColor, float dayMod){
return foamIntensityExternal * (0.075 * skyZenitColor * pow(foamPixelIntensity, 4.) +  50.* pow(foamPixelIntensity, 23.0)) * dayMod;
}`)}function Ti(e){e.fragment.uniforms.add("texWaveNormal","sampler2D"),e.fragment.uniforms.add("texWavePerturbation","sampler2D"),e.fragment.uniforms.add("waveParams","vec4"),e.fragment.uniforms.add("waveDirection","vec2"),e.include(Ei),e.fragment.code.add(ye`const vec2  FLOW_JUMP = vec2(6.0/25.0, 5.0/24.0);
vec2 textureDenormalized2D(sampler2D _tex, vec2 _uv) {
return 2.0 * texture2D(_tex, _uv).rg - 1.0;
}
float sampleNoiseTexture(vec2 _uv) {
return texture2D(texWavePerturbation, _uv).b;
}
vec3 textureDenormalized3D(sampler2D _tex, vec2 _uv) {
return 2.0 * texture2D(_tex, _uv).rgb - 1.0;
}
float computeProgress(vec2 uv, float time) {
return fract(time);
}
float computeWeight(vec2 uv, float time) {
float progress = computeProgress(uv, time);
return 1.0 - abs(1.0 - 2.0 * progress);
}
vec3 computeUVPerturbedWeigth(sampler2D texFlow, vec2 uv, float time, float phaseOffset) {
float flowStrength = waveParams[2];
float flowOffset = waveParams[3];
vec2 flowVector = textureDenormalized2D(texFlow, uv) * flowStrength;
float progress = computeProgress(uv, time + phaseOffset);
float weight = computeWeight(uv, time + phaseOffset);
vec2 result = uv;
result -= flowVector * (progress + flowOffset);
result += phaseOffset;
result += (time - progress) * FLOW_JUMP;
return vec3(result, weight);
}
const float TIME_NOISE_TEXTURE_REPEAT = 0.3737;
const float TIME_NOISE_STRENGTH = 7.77;
vec3 getWaveLayer(sampler2D _texNormal, sampler2D _dudv, vec2 _uv, vec2 _waveDir, float time) {
float waveStrength = waveParams[0];
vec2 waveMovement = time * -_waveDir;
float timeNoise = sampleNoiseTexture(_uv * TIME_NOISE_TEXTURE_REPEAT) * TIME_NOISE_STRENGTH;
vec3 uv_A = computeUVPerturbedWeigth(_dudv, _uv + waveMovement, time + timeNoise, 0.0);
vec3 uv_B = computeUVPerturbedWeigth(_dudv, _uv + waveMovement, time + timeNoise, 0.5);
vec3 normal_A = textureDenormalized3D(_texNormal, uv_A.xy) * uv_A.z;
vec3 normal_B = textureDenormalized3D(_texNormal, uv_B.xy) * uv_B.z;
vec3 mixNormal = normalize(normal_A + normal_B);
mixNormal.xy *= waveStrength;
mixNormal.z = sqrt(1.0 - dot(mixNormal.xy, mixNormal.xy));
return mixNormal;
}
vec4 getSurfaceNormalAndFoam(vec2 _uv, float _time) {
float waveTextureRepeat = waveParams[1];
vec3 normal = getWaveLayer(texWaveNormal, texWavePerturbation, _uv * waveTextureRepeat, waveDirection, _time);
float foam  = normals2FoamIntensity(normal, waveParams[0]);
return vec4(normal, foam);
}`)}function Oi(e,t){1===t.viewingMode?e.vertex.code.add(ye`vec3 getLocalUp(in vec3 pos, in vec3 origin) {
return normalize(pos + origin);
}`):e.vertex.code.add(ye`vec3 getLocalUp(in vec3 pos, in vec3 origin) {
return vec3(0.0, 0.0, 1.0);
}`),1===t.viewingMode?e.vertex.code.add(ye`mat3 getTBNMatrix(in vec3 n) {
vec3 t = normalize(cross(vec3(0.0, 0.0, 1.0), n));
vec3 b = normalize(cross(n, t));
return mat3(t, b, n);
}`):e.vertex.code.add(ye`mat3 getTBNMatrix(in vec3 n) {
vec3 t = vec3(1.0, 0.0, 0.0);
vec3 b = normalize(cross(n, t));
return mat3(t, b, n);
}`)}function Di(e,t){e.include(Nt,t),e.include(qt),e.include(Ri),t.ssrEnabled&&e.include(wi,t),e.fragment.constants.add("fresnelSky","vec3",[.02,1,15]).add("fresnelMaterial","vec2",[.02,.1]).add("roughness","float",.015).add("foamIntensityExternal","float",1.7).add("ssrIntensity","float",.65).add("ssrHeightFadeStart","float",3e5).add("ssrHeightFadeEnd","float",5e5).add("waterDiffusion","float",.775).add("waterSeeColorMod","float",.8).add("correctionViewingPowerFactor","float",.4).add("skyZenitColor","vec3",[.52,.68,.9]).add("skyColor","vec3",[.67,.79,.9]),e.fragment.code.add(ye`PBRShadingWater shadingInfo;
vec3 getSkyGradientColor(in float cosTheta, in vec3 horizon, in vec3 zenit) {
float exponent = pow((1.0 - cosTheta), fresnelSky[2]);
return mix(zenit, horizon, exponent);
}`),e.fragment.code.add(ye`vec3 getSeaColor(in vec3 n, in vec3 v, in vec3 l, vec3 color, in vec3 lightIntensity, in vec3 localUp, in float shadow, float foamIntensity, vec3 positionView) {
float reflectionHit = 0.;
vec3 seaWaterColor = linearizeGamma(color);
vec3 h = normalize(l + v);
shadingInfo.NdotL = clamp(dot(n, l), 0.0, 1.0);
shadingInfo.NdotV = clamp(dot(n, v), 0.001, 1.0);
shadingInfo.VdotN = clamp(dot(v, n), 0.001, 1.0);
shadingInfo.NdotH = clamp(dot(n, h), 0.0, 1.0);
shadingInfo.VdotH = clamp(dot(v, h), 0.0, 1.0);
shadingInfo.LdotH = clamp(dot(l, h), 0.0, 1.0);
float upDotV = max(dot(localUp,v), 0.0);
vec3 skyHorizon = linearizeGamma(skyColor);
vec3 skyZenit = linearizeGamma(skyZenitColor);
vec3 skyColor = getSkyGradientColor(upDotV, skyHorizon, skyZenit );
float upDotL = max(dot(localUp,l),0.0);
float daytimeMod = 0.1 + upDotL * 0.9;
skyColor *= daytimeMod;
float shadowModifier = clamp(shadow, 0.8, 1.0);
vec3 fresnelModifier = fresnelReflection(shadingInfo.VdotN, vec3(fresnelSky[0]), fresnelSky[1]);
vec3 reflSky = fresnelModifier * skyColor * shadowModifier;
vec3 reflSea = seaWaterColor * mix(skyColor, upDotL * lightIntensity * LIGHT_NORMALIZATION, 2.0 / 3.0) * shadowModifier;
vec3 specular = vec3(0.0);
if(upDotV > 0.0 && upDotL > 0.0) {
vec3 specularSun = brdfSpecularWater(shadingInfo, roughness, vec3(fresnelMaterial[0]), fresnelMaterial[1]);
vec3 incidentLight = lightIntensity * LIGHT_NORMALIZATION * shadow;
specular = shadingInfo.NdotL * incidentLight * specularSun;
}
vec3 foam = vec3(0.0);
if(upDotV > 0.0) {
foam = foamIntensity2FoamColor(foamIntensityExternal, foamIntensity, skyZenitColor, daytimeMod);
}`),t.ssrEnabled?e.fragment.code.add(ye`vec4 viewPosition = vec4(positionView.xyz, 1.0);
vec3 viewDir = normalize(viewPosition.xyz);
vec4 viewNormalVectorCoordinate = ssrViewMat *vec4(n, 0.0);
vec3 viewNormal = normalize(viewNormalVectorCoordinate.xyz);
vec4 viewUp = ssrViewMat *vec4(localUp, 0.0);
float correctionViewingFactor = pow(max(dot(-viewDir, viewUp.xyz), 0.0), correctionViewingPowerFactor);
vec3 viewNormalCorrected = mix(viewUp.xyz, viewNormal, correctionViewingFactor);
vec3 reflected = normalize(reflect(viewDir, viewNormalCorrected));
vec3 hitCoordinate = screenSpaceIntersection( normalize(reflected), viewPosition.xyz, viewDir, viewUp.xyz);
vec3 reflectedColor = vec3(0.0);
if (hitCoordinate.z > 0.0)
{
vec2 reprojectedCoordinate = reprojectionCoordinate(hitCoordinate);
vec2 dCoords = smoothstep(0.3, 0.6, abs(vec2(0.5, 0.5) - hitCoordinate.xy));
float heightMod = smoothstep(ssrHeightFadeEnd, ssrHeightFadeStart, -positionView.z);
reflectionHit = waterDiffusion * clamp(1.0 - (1.3*dCoords.y), 0.0, 1.0) * heightMod;
reflectedColor = linearizeGamma(texture2D(lastFrameColorMap, reprojectedCoordinate).xyz)* reflectionHit * fresnelModifier.y * ssrIntensity;
}
float seeColorMod =  mix(waterSeeColorMod, waterSeeColorMod*0.5, reflectionHit);
return tonemapACES((1. - reflectionHit) * reflSky + reflectedColor + reflSea * seeColorMod + specular + foam);
}`):e.fragment.code.add(ye`return tonemapACES(reflSky + reflSea * waterSeeColorMod + specular + foam);
}`)}var Pi=Object.freeze({__proto__:null,build:function(e){const t=new be;return t.include(et,{linearDepth:!1}),t.attributes.add("position","vec3"),t.attributes.add("uv0","vec2"),t.vertex.uniforms.add("proj","mat4").add("view","mat4").add("localOrigin","vec3"),t.vertex.uniforms.add("waterColor","vec4"),0!==e.output&&7!==e.output||(t.include(Oi,e),t.include(Ut,e),t.varyings.add("vuv","vec2"),t.varyings.add("vpos","vec3"),t.varyings.add("vnormal","vec3"),t.varyings.add("vtbnMatrix","mat3"),e.multipassTerrainEnabled&&t.varyings.add("depth","float"),t.vertex.code.add(ye`
      void main(void) {
        if (waterColor.a < ${ye.float(Re)}) {
          // Discard this vertex
          gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
          return;
        }

        vuv = uv0;
        vpos = position;

        vnormal = getLocalUp(vpos, localOrigin);
        vtbnMatrix = getTBNMatrix(vnormal);

        ${e.multipassTerrainEnabled?"depth = (view * vec4(vpos, 1.0)).z;":""}

        gl_Position = transformPosition(proj, view, vpos);
        ${0===e.output?"forwardLinearDepth();":""}
      }
    `)),e.multipassTerrainEnabled&&(t.fragment.include(Se),t.include(we,e)),7===e.output&&(t.include(Ce,e),t.fragment.uniforms.add("waterColor","vec4"),t.fragment.code.add(ye`
        void main() {
          discardBySlice(vpos);
          ${e.multipassTerrainEnabled?"terrainDepthTest(gl_FragCoord, depth);":""}

          gl_FragColor = vec4(waterColor.a);
        }
      `)),0===e.output&&(t.include(Ti,e),t.include(Ce,e),e.receiveShadows&&t.include(jt,e),t.include(Di,e),t.fragment.uniforms.add("waterColor","vec4").add("lightingMainDirection","vec3").add("lightingMainIntensity","vec3").add("camPos","vec3").add("timeElapsed","float").add("view","mat4"),t.fragment.include(Ee),t.fragment.code.add(ye`
      void main() {
        discardBySlice(vpos);
        ${e.multipassTerrainEnabled?"terrainDepthTest(gl_FragCoord, depth);":""}
        vec3 localUp = vnormal;
        // the created normal is in tangent space
        vec4 tangentNormalFoam = getSurfaceNormalAndFoam(vuv, timeElapsed);

        // we rotate the normal according to the tangent-bitangent-normal-Matrix
        vec3 n = normalize(vtbnMatrix * tangentNormalFoam.xyz);
        vec3 v = -normalize(vpos - camPos);
        float shadow = ${e.receiveShadows?ye`1.0 - readShadowMap(vpos, linearDepth)`:"1.0"};
        vec4 vPosView = view*vec4(vpos, 1.0);
        vec4 final = vec4(getSeaColor(n, v, lightingMainDirection, waterColor.rgb, lightingMainIntensity, localUp, shadow, tangentNormalFoam.w, vPosView.xyz), waterColor.w);

        // gamma correction
        gl_FragColor = delinearizeGamma(final);
        gl_FragColor = highlightSlice(gl_FragColor, vpos);
        ${e.OITEnabled?"gl_FragColor = premultiplyAlpha(gl_FragColor);":""}
      }
    `)),2===e.output&&(t.include(Oi,e),t.include(Ti,e),t.include(Ce,e),t.varyings.add("vpos","vec3"),t.varyings.add("vuv","vec2"),t.vertex.code.add(ye`
        void main(void) {
          if (waterColor.a < ${ye.float(Re)}) {
            // Discard this vertex
            gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
            return;
          }

          vuv = uv0;
          vpos = position;

          gl_Position = transformPosition(proj, view, vpos);
        }
    `),t.fragment.uniforms.add("timeElapsed","float"),t.fragment.code.add(ye`void main() {
discardBySlice(vpos);
vec4 tangentNormalFoam = getSurfaceNormalAndFoam(vuv, timeElapsed);
tangentNormalFoam.xyz = normalize(tangentNormalFoam.xyz);
gl_FragColor = vec4((tangentNormalFoam.xyz + vec3(1.0)) * 0.5, tangentNormalFoam.w);
}`)),5===e.output&&(t.varyings.add("vpos","vec3"),t.vertex.code.add(ye`
        void main(void) {
          if (waterColor.a < ${ye.float(Re)}) {
            // Discard this vertex
            gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
            return;
          }

          vpos = position;
          gl_Position = transformPosition(proj, view, vpos);
        }
    `),t.fragment.uniforms.add("waterColor","vec4"),t.fragment.code.add(ye`void main() {
gl_FragColor = waterColor;
}`)),4===e.output&&(t.include(tt),t.varyings.add("vpos","vec3"),t.vertex.code.add(ye`
      void main(void) {
        if (waterColor.a < ${ye.float(Re)}) {
          // Discard this vertex
          gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
          return;
        }

        vpos = position;
        gl_Position = transformPosition(proj, view, vpos);
      }
    `),t.include(Ce,e),t.fragment.code.add(ye`void main() {
discardBySlice(vpos);
outputHighlight();
}`)),t}});class Ai extends Pe{constructor(e,t,r){super(e,t,r),this._textureRepository=e.waterTextureRepository}initializeProgram(e){const t=Ai.shader.get(),r=this.configuration,i=t.build({OITEnabled:0===r.transparencyPassType,output:r.output,viewingMode:e.viewingMode,slicePlaneEnabled:r.slicePlaneEnabled,sliceHighlightDisabled:!1,sliceEnabledForVertexPrograms:!1,receiveShadows:r.receiveShadows,pbrMode:3,useCustomDTRExponentForWater:!0,ssrEnabled:r.useSSR,highStepCount:!0,multipassTerrainEnabled:r.multipassTerrainEnabled,cullAboveGround:r.cullAboveGround});return new Ae(e.rctx,i,rt)}ensureResource(e){return this._textureRepository.ready||this._textureRepository.updating||this._textureRepository.loadTextures(e),this._textureRepository.ready?2:1}bindPass(e,t){var r,i;Me(this.program,t.camera.projectionMatrix),t.multipassTerrainEnabled&&(this.program.setUniform2fv("cameraNearFar",t.camera.nearFar),this.program.setUniform2fv("inverseViewport",t.inverseViewport),Le(this.program,t)),0===this.configuration.output&&(t.lighting.setUniforms(this.program,!1),Ci(this.program,t)),0!==this.configuration.output&&2!==this.configuration.output||(r=this.program,i=e,r.setUniform4f("waveParams",i.waveStrength,i.waveTextureRepeat,i.flowStrength,i.flowOffset),r.setUniform2f("waveDirection",i.waveDirection[0]*i.waveVelocity,i.waveDirection[1]*i.waveVelocity),this._textureRepository.bind(this.program)),this.program.setUniform4fv("waterColor",e.color),4===this.configuration.output&&Ie(this.program,t)}bindDraw(e){ze(this.program,e),this.program.rebindTextures(),0!==this.configuration.output&&7!==this.configuration.output||it(this.program,e.origin,e.camera.viewInverseTransposeMatrix),0===this.configuration.output&&Ht(this.program,e),0!==this.configuration.output&&7!==this.configuration.output&&4!==this.configuration.output||Fe(this.program,this.configuration,e)}setPipelineState(e){const t=this.configuration,r=3===e,i=2===e;return le({blending:2!==t.output&&4!==t.output&&t.transparent?r?Ne:Ue(e):null,depthTest:{func:je(e)},depthWrite:r?t.writeDepth&&de:He(e),colorWrite:ce,polygonOffset:r||i?null:st(t.enableOffset)})}initializePipeline(){return this.setPipelineState(this.configuration.transparencyPassType)}}Ai.shader=new Oe(Pi,(()=>Promise.resolve().then((function(){return Pi}))));class Mi extends De{constructor(){super(...arguments),this.output=0,this.receiveShadows=!1,this.slicePlaneEnabled=!1,this.transparent=!1,this.enableOffset=!0,this.writeDepth=!1,this.useSSR=!1,this.isDraped=!1,this.transparencyPassType=3,this.multipassTerrainEnabled=!1,this.cullAboveGround=!1}}q([Te({count:8})],Mi.prototype,"output",void 0),q([Te()],Mi.prototype,"receiveShadows",void 0),q([Te()],Mi.prototype,"slicePlaneEnabled",void 0),q([Te()],Mi.prototype,"transparent",void 0),q([Te()],Mi.prototype,"enableOffset",void 0),q([Te()],Mi.prototype,"writeDepth",void 0),q([Te()],Mi.prototype,"useSSR",void 0),q([Te()],Mi.prototype,"isDraped",void 0),q([Te({count:4})],Mi.prototype,"transparencyPassType",void 0),q([Te()],Mi.prototype,"multipassTerrainEnabled",void 0),q([Te()],Mi.prototype,"cullAboveGround",void 0);class Ii extends Xe{constructor(e){super(e),this.updateParameters()}updateParameters(e){this._technique=this._techniqueRep.releaseAndAcquire(Ai,this._material.getTechniqueConfig(this._output,e),this._technique)}beginSlot(e){if(2===this._output)return 24===e;if(5===this._output)return 23===e;if(4===this._output)return 3===e||23===e;let t=3;return this._material.params.transparent&&(t=this._material.params.writeDepth?5:8),e===t}setElapsedTimeUniform(e){const t=.001*this._material.animation.time;e.setUniform1f("timeElapsed",t*this._material.params.animationSpeed)}_updateShadowState(e){e.shadowMappingEnabled!==this._material.params.receiveShadows&&this._material.setParameterValues({receiveShadows:e.shadowMappingEnabled})}_updateSSRState(e){e.ssrEnabled!==this._material.params.ssrEnabled&&this._material.setParameterValues({ssrEnabled:e.ssrEnabled})}ensureResources(e){return this._technique.ensureResource(e)}ensureParameters(e){0===this._output&&(this._updateShadowState(e),this._updateSSRState(e)),this.updateParameters(e)}bind(e){this._technique.bindPass(this._material.params,e),2!==this._output&&0!==this._output||this.setElapsedTimeUniform(this._technique.program)}}class Li{constructor(e,t,r,i,s,a){this.from=e,this.to=t,this.isVisible=r,this.hasHighlights=i,this.hasOccludees=s,this.transformation=a,null!=a&&(this.transformationNormal=U(a),P(this.transformationNormal,this.transformationNormal),A(this.transformationNormal,this.transformationNormal))}}function zi(e,t){const r=e=>({first:e.from,count:e.to-e.from});if(0===e.length)return void e.push(r(t));const i=e[e.length-1];if(a=t,(s=i).first+s.count>=a.from){const e=t.from-i.first+t.to-t.from;i.count=e}else e.push(r(t));var s,a}function Fi(e){const t=e.capabilities.disjointTimerQuery;return _(t)?null:t.timestampBits()>0?new Ni(t):ji?null:new Ui(t)}class Ni{constructor(e){this.timer=e,this.start=e.createQuery(),e.createTimestamp(this.start)}stop(e,t=50){this.end=this.timer.createQuery(),this.timer.createTimestamp(this.end),this.checkQueryResult(e,t)}checkQueryResult(e,t){if(!this.timer.resultAvailable(this.end))return void setTimeout((()=>this.checkQueryResult(e,t)),t);if(this.timer.disjoint())return void e(null);const r=this.timer.getResult(this.start),i=this.timer.getResult(this.end);e((i-r)/1e6)}}class Ui{constructor(e){this.timer=e,this.query=e.createQuery(),ji=!0,this.timer.beginTimeElapsed(this.query)}stop(e,t=50){this.timer.endTimeElapsed(),ji=!1,this.checkQueryResult(e,t)}checkQueryResult(e,t){const r=this.timer.resultAvailable(this.query),i=this.timer.disjoint();if(!r||i)i?e(null):setTimeout((()=>this.checkQueryResult(e,t)),t);else{const t=this.timer.getResult(this.query);e(t/1e6)}}}let ji=!1;const Hi=["prepare","shadowmap","lineardepth","normals","ssao","opaque","opaque edges","transparent","transparent edges","hudvisibility","transparent terrain","atmosphere","laserline","occluded","antialiasing","highlights","hudOccluded","hudNotoccluded"];class Vi{constructor(){this.triangles=0,this.drawCalls=0}reset(){this.triangles=0,this.drawCalls=0}}function Gi(e,t,r){y(r)&&(r.drawCalls+=e,r.triangles+=t)}class Wi extends K{constructor(){super("total"),this.total=0,this.frameCount=0}}class Bi{constructor(){this._startTime=0,this._lastSample=0,this._enableGPUTimer=0,this.totalTime=new Wi,this.gpuTime=new K("gpu",9),this.renderPassTimings=Hi.map((e=>new K(e))),this.stats=new Vi}enableGPUTimer(){return++this._enableGPUTimer,{remove:Gt((()=>--this._enableGPUTimer))}}prerender(e){this._startTime=this._lastSample=performance.now(),this._enableGPUTimer&&(this._gpuTimer=Fi(e))}advance(e){const t=performance.now();this.renderPassTimings[e].record(t-this._lastSample),this._lastSample=t}postrender(){y(this._gpuTimer)&&(this._gpuTimer.stop((e=>y(e)&&this.gpuTime.record(e)),16),this._gpuTimer=null);const e=performance.now()-this._startTime;this.totalTime.record(e),this.totalTime.total+=e,this.totalTime.frameCount++}}class qi{constructor(e,t,r){this.type="MergedRenderer",this._dataByOrigin=new Map,this._hasHighlights=!1,this._hasOccludees=!1,this._rctx=e,this._material=r,this._materialRep=t,this._glMaterials=Mt(this._material,this._materialRep),this._bufferWriter=r.createBufferWriter()}dispose(){It(this._material,this._materialRep),this._dataByOrigin&&(this._dataByOrigin.forEach((e=>{e.vao.dispose(!0),e.vao=null})),this._dataByOrigin.clear(),this._dataByOrigin=null),this._glMaterials&&(this._glMaterials.forEach((e=>{e&&e.dispose()})),this._glMaterials.clear(),this._glMaterials=null)}get isEmpty(){return 0===this._dataByOrigin.size}get hasHighlights(){return this._hasHighlights}get hasOccludees(){return this._hasOccludees}get hasWater(){return!this.isEmpty&&J(this._glMaterials,(e=>e instanceof Ii))}get rendersOccluded(){return!this.isEmpty&&1!==this._material.renderOccluded}modify(e){this.updateGeometries(e.updates),this.addAndRemoveGeometries(e.adds,e.removes),this.updateRenderCommands()}addAndRemoveGeometries(e,t){const r=this._bufferWriter,i=r.vertexBufferLayout,s=i.stride/4,a=this._dataByOrigin,o=function(e,t,r,i){const s=new Map,a=t.vertexBufferLayout.stride/4,o=(r,i)=>{const o=r.origin;if(_(o))return;const n=e.get(o.id);let l=s.get(o.id);null==l&&(l={optimalCount:null==n?0:n.optimalCount,sparseCount:null==n?0:n.buffer.size,toAdd:[],toRemove:[],origin:o.vec3},s.set(o.id,l));const d=t.elementCount(r.data)*a;i?(l.optimalCount+=d,l.sparseCount+=d,l.toAdd.push(r)):(l.optimalCount-=d,l.toRemove.push(r))};for(const e of r)o(e,!0);for(const e of i)o(e,!1);return s}(a,r,e,t);o.forEach(((e,t)=>{o.delete(t);const r=e.optimalCount,n=e.sparseCount;let l=a.get(t);if(null==l)ht(r>0),l=this.createData(i,r,e.origin),a.set(t,l);else if(0===r)return l.vao.dispose(!0),l.vao=null,void a.delete(t);const d=r<e.sparseCount/2,c=d?r:n,h=Zi,p=l.buffer.size,u=l.buffer.array,m=l.buffer.resize(c,!1);d||m?this.removeAndRebuild(l,e.toRemove,s,u,h):e.toRemove.length>0?(this.removeByErasing(l,e.toRemove,s,h),e.toAdd.length>0&&(h.end=p)):(h.begin=p,h.end=p);const f=$i;ut(f,-e.origin[0],-e.origin[1],-e.origin[2]),this.append(l,e.toAdd,s,f,h);const g=l.vao.vertexBuffers.geometry;if(g.byteSize!==l.buffer.array.buffer.byteLength)g.setData(l.buffer.array);else{const{begin:e,end:t}=h;if(e<t){const r=l.buffer.array,i=4,s=e*i,a=t*i;g.setSubData(r,s,s,a)}}l.drawCommandsDirty=!0}))}updateGeometries(e){const t=this._bufferWriter,r=t.vertexBufferLayout.stride/4;for(const i of e){const e=i.updateType,s=i.renderGeometry,a=this._dataByOrigin.get(s.origin.id),o=a&&a.instances.get(s.id);if(!o)return;if(1&e&&(o.isVisible=s.instanceParameters.visible),9&e){const e=s.instanceParameters.visible;o.hasHighlights=!!s.instanceParameters.highlights&&e}if(16&e&&(o.hasOccludees=!!s.instanceParameters.occludees),6&e){const e=a.buffer.array,i=a.vao;Lt(s,Qi,Yi),t.write({transformation:Qi,invTranspTransformation:Yi},s.data,t.vertexBufferLayout.createView(e.buffer),o.from),ht(o.from+t.elementCount(s.data)===o.to,"material VBO layout has changed"),i.vertexBuffers.geometry.setSubData(e,o.from*r*4,o.from*r*4,o.to*r*4)}a.drawCommandsDirty=!0}}updateRenderCommands(){this._hasHighlights=!1,this._hasOccludees=!1,this._dataByOrigin.forEach((e=>{e.hasHiddenInstances=!1,e.hasHighlights=!1,e.hasOccludees=!1,J(e.instances,(t=>(t.isVisible?(t.hasHighlights&&(this._hasHighlights=!0,e.hasHighlights=!0),t.hasOccludees&&(this._hasOccludees=!0,e.hasOccludees=!0)):e.hasHiddenInstances=!0,e.hasHiddenInstances&&e.hasHighlights&&e.hasOccludees)))}));this._dataByOrigin.forEach((e=>{e.drawCommandsDirty&&((e=>{if(e.drawCommandsDefault=null,e.drawCommandsHighlight=null,e.drawCommandsOccludees=null,e.drawCommandsShadowHighlightRest=null,e.stats={default:0,highlight:0,occludees:0,shadowHighlightRest:0},0===e.instances.size)return;if(!ki(e)){const t=4*e.buffer.size/ue(e.vao.layout.geometry);return e.drawCommandsDefault=[{first:0,count:t}],void(e.stats={default:t,highlight:0,occludees:0,shadowHighlightRest:0})}const t=[...e.instances.values()].sort(((e,t)=>e.from===t.from?e.to>t.to?1:e.to<t.to?-1:0:e.from>t.from?1:e.from<t.from?-1:0));e.drawCommandsDefault=[],e.drawCommandsHighlight=[],e.drawCommandsOccludees=[],e.drawCommandsShadowHighlightRest=[];for(const r of t)r.isVisible&&(r.hasOccludees?zi(e.drawCommandsOccludees,r):zi(e.drawCommandsDefault,r),r.hasHighlights?zi(e.drawCommandsHighlight,r):zi(e.drawCommandsShadowHighlightRest,r));const r=e=>{let t=0;for(const r of e)t+=r.count;return t/3};e.stats={default:r(e.drawCommandsDefault),highlight:r(e.drawCommandsHighlight),occludees:r(e.drawCommandsOccludees),shadowHighlightRest:r(e.drawCommandsShadowHighlightRest)}})(e),e.drawCommandsDirty=!1)}))}updateLogic(e){return this._material.update(e)}render(e,t,r,i){const s=this._rctx,a=this._glMaterials.get(t),o=5===t||7===t,n=6===t,l=!(o||n);if(!a||2!==a.ensureResources(s)||null!=e&&!a.beginSlot(e)||o&&!this._hasHighlights)return!1;a.ensureParameters(r);const d=a.getPipelineState(e,!1);s.setPipelineState(d);const c=a.technique;s.useProgram(c.program),a.bind(r);let h=!1;return this._dataByOrigin.forEach((t=>{if(_(t.drawCommandsDefault)&&_(t.drawCommandsHighlight)&&_(t.drawCommandsOccludees)&&_(t.drawCommandsShadowHighlightRest))return;if(o&&!t.hasHighlights)return;r.origin=t.origin,c.bindDraw(r,{},{}),c.ensureAttributeLocations(t.vao),s.bindVAO(t.vao);const p=c.primitiveType,u=o?t.drawCommandsHighlight:n&&ki(t)?t.drawCommandsShadowHighlightRest:t.drawCommandsDefault;if(y(u)){this.renderCommands(s,p,u);const e=o?t.stats.highlight:n&&ki(t)?t.stats.shadowHighlightRest:t.stats.default;Gi(u.length,e,i),h=!0}if(l){const r=t.drawCommandsOccludees;if(y(r)){const o=a.getPipelineState(e,!0);s.setPipelineState(o),this.renderCommands(s,p,r),s.setPipelineState(d),Gi(r.length,t.stats.occludees,i),h=!0}}})),h}renderCommands(e,t,r){for(let i=0;i<r.length;i++)e.drawArrays(t,r[i].first,r[i].count)}createData(e,t,r){return{instances:new Map,vao:new he(this._rctx,this._material.vertexAttributeLocations,{geometry:Vt(e)},{geometry:pe.createVertex(this._rctx,35044)}),buffer:new xi(t),optimalCount:0,origin:r,hasHiddenInstances:!1,hasHighlights:!1,hasOccludees:!1,drawCommandsDirty:!1,drawCommandsDefault:null,drawCommandsOccludees:null,drawCommandsHighlight:null,drawCommandsShadowHighlightRest:null,stats:{default:0,highlight:0,occludees:0,shadowHighlightRest:0}}}removeAndRebuild(e,t,r,i,s){for(const i of t){const t=i.id,s=e.instances.get(t);e.optimalCount-=(s.to-s.from)*r,e.instances.delete(t)}let a=0;const o=e.buffer.array;s.begin=0,s.end=0;let n=-1,l=-1,d=0;e.instances.forEach((e=>{const t=e.from*r,s=e.to*r,c=s-t;n!==l&&l!==t?(o.set(i.subarray(n,l),d),d+=l-n,n=t):-1===n&&(n=t),l=s,e.from=a/r,a+=c,e.to=a/r})),n!==l&&o.set(i.subarray(n,l),d),s.end=a}removeByErasing(e,t,r,i){i.begin=1/0,i.end=-1/0;let s=-1,a=-1;for(const o of t){const t=o.id,n=e.instances.get(t),l=n.from*r,d=n.to*r;s!==a&&a!==l?(e.buffer.erase(s,a),s=l):-1===s&&(s=l),a=d,e.instances.delete(t),e.optimalCount-=d-l,l<i.begin&&(i.begin=l),d>i.end&&(i.end=d)}s!==a&&e.buffer.erase(s,a)}append(e,t,r,i,s){const a=this._bufferWriter;for(const o of t){const t=y(o.transformation)?M(Qi,i,o.transformation):i;P(Yi,t),A(Yi,Yi);const n=s.end;a.write({transformation:t,invTranspTransformation:Yi},o.data,a.vertexBufferLayout.createView(e.buffer.array.buffer),s.end/r);const l=a.elementCount(o.data)*r,d=n+l;ht(null==e.instances.get(o.id));const c=o.instanceParameters.visible,h=!!o.instanceParameters.highlights&&c,p=!!o.instanceParameters.occludees,u=new Li(n/r,d/r,c,h,p);e.instances.set(o.id,u),e.optimalCount+=l,s.end+=l}}get test(){return{material:this._material,glMaterials:this._glMaterials}}}function ki(e){return e.hasOccludees||e.hasHighlights||e.hasHiddenInstances}const Zi={begin:0,end:0},$i=F(),Qi=F(),Yi=F();let Ji=class extends k{constructor(){super(...arguments),this._pending=new Xi,this._changes=new gi,this._materialRenderers=new Map,this._sortedMaterialRenderers=new X,this._hasHighlights=!1,this._hasWater=!1}dispose(){this._changes.prune(),this._materialRenderers.forEach((e=>e.dispose())),this._materialRenderers.clear(),this._sortedMaterialRenderers.clear()}get updating(){return!this._pending.empty||this._changes.updates.length>0}get hasHighlights(){return this._hasHighlights}get hasWater(){return this._hasWater}get rendersOccluded(){return J(this._materialRenderers,(e=>e.rendersOccluded))}get isEmpty(){return!this.updating&&0===this._materialRenderers.size}commitChanges(){if(!this.updating)return!1;this._processAddsRemoves();const e=_i(this._changes);let t=!1,r=!1,i=!1;return e.forEach(((e,s)=>{let a=this._materialRenderers.get(s);if(!a&&e.adds.length>0&&(a=new qi(this.rctx,this.materialRepository,s),this._materialRenderers.set(s,a),t=!0,r=!0,i=!0),!a)return;const o=r||a.hasHighlights,n=i||a.hasWater;a.modify(e),r=r||o!==a.hasHighlights,i=i||n!==a.hasWater,a.isEmpty&&(this._materialRenderers.delete(s),a.dispose(),t=!0)})),this._changes.clear(),t&&this.updateSortedMaterialRenderers(),r&&(this._hasHighlights=J(this._materialRenderers,(e=>e.hasHighlights))),i&&(this._hasWater=J(this._materialRenderers,(e=>e.hasWater))),this.notifyChange("updating"),!0}add(e){if(0===e.length)return;const t=this._pending.empty;for(const t of e)this._pending.adds.add(t);t&&this.notifyChange("updating")}remove(e){const t=this._pending.empty;for(const t of e)this._pending.adds.has(t)?(this._pending.removed.add(t),this._pending.adds.delete(t)):this._pending.removed.has(t)||this._pending.removes.add(t);t&&!this._pending.empty&&this.notifyChange("updating")}modify(e,t){const r=0===this._changes.updates.length;for(const r of e){const e=this._changes.updates.pushNew();e.renderGeometry=r,e.updateType=t}r&&this._changes.updates.length>0&&this.notifyChange("updating")}updateLogic(e){let t=!1;return this._sortedMaterialRenderers.forAll((({materialRenderer:r})=>t=r.updateLogic(e)||t)),t}render(e,t){for(let r=0;r<this._sortedMaterialRenderers.length;r++){const i=this._sortedMaterialRenderers.data[r];at(i.material,e)&&i.materialRenderer.render(t.slot,e.pass,t,null)}}updateSortedMaterialRenderers(){this._sortedMaterialRenderers.clear();let e=0;this._materialRenderers.forEach(((t,r)=>{r.insertOrder=e++,this._sortedMaterialRenderers.push({material:r,materialRenderer:t})})),this._sortedMaterialRenderers.sort(((e,t)=>{const r=t.material.renderPriority-e.material.renderPriority;return 0!==r?r:e.material.insertOrder-t.material.insertOrder}))}_processAddsRemoves(){this._changes.adds.clear(),this._changes.removes.clear(),this._changes.adds.pushArray(Array.from(this._pending.adds)),this._changes.removes.pushArray(Array.from(this._pending.removes));for(let e=0;e<this._changes.updates.length;){const t=this._changes.updates.data[e];this._pending.has(t.renderGeometry)?this._changes.updates.removeUnorderedIndex(e):e++}this._pending.clear()}get test(){return{sortedMaterialRenderers:this._sortedMaterialRenderers}}};q([te()],Ji.prototype,"rctx",void 0),q([te()],Ji.prototype,"materialRepository",void 0),q([te()],Ji.prototype,"updating",null),Ji=q([re("esri.views.3d.webgl-engine.lib.SortedRenderGeometryRenderer")],Ji);class Xi{constructor(){this.adds=new Set,this.removes=new Set,this.removed=new Set}get empty(){return 0===this.adds.size&&0===this.removes.size&&0===this.removed.size}has(e){return this.adds.has(e)||this.removes.has(e)||this.removed.has(e)}clear(){this.adds.clear(),this.removes.clear(),this.removed.clear()}}var Ki=Object.freeze({__proto__:null,build:function(){const e=new be;return e.include(B),e.fragment.uniforms.add("tex","sampler2D"),e.fragment.uniforms.add("color","vec4"),e.fragment.code.add(ye`void main() {
vec4 texColor = texture2D(tex, uv);
gl_FragColor = texColor * color;
}`),e}});class es extends Pe{initializeProgram(e){const t=es.shader.get().build();return new Ae(e.rctx,t,rt)}initializePipeline(){return this.configuration.hasAlpha?le({blending:me(770,1,771,771),colorWrite:ce}):le({colorWrite:ce})}}es.shader=new Oe(Ki,(()=>Promise.resolve().then((function(){return Ki}))));class ts extends De{constructor(){super(...arguments),this.hasAlpha=!1}}function rs(e,t,r){(r=r||e).length=e.length;for(let i=0;i<e.length;i++)r[i]=e[i]*t[i];return r}function is(e,t,r){(r=r||e).length=e.length;for(let i=0;i<e.length;i++)r[i]=e[i]*t;return r}function ss(e,t,r){(r=r||e).length=e.length;for(let i=0;i<e.length;i++)r[i]=e[i]+t[i];return r}function as(e){return(e+1)*(e+1)}function os(e,t,r){const i=e[0],s=e[1],a=e[2],o=r||[];return o.length=as(t),t>=0&&(o[0]=.28209479177),t>=1&&(o[1]=.4886025119*i,o[2]=.4886025119*a,o[3]=.4886025119*s),t>=2&&(o[4]=1.09254843059*i*s,o[5]=1.09254843059*s*a,o[6]=.31539156525*(3*a*a-1),o[7]=1.09254843059*i*a,o[8]=.54627421529*(i*i-s*s)),o}function ns(e,t){const r=(s=t.r.length,i(Math.floor(Math.sqrt(s)-1),0,2));var s;for(const i of e)u(ms,i.direction),os(ms,r,ps),rs(ps,fs),is(ps,i.intensity[0],us),ss(t.r,us),is(ps,i.intensity[1],us),ss(t.g,us),is(ps,i.intensity[2],us),ss(t.b,us);return t}function ls(e,t,r,i){!function(e,t){const r=as(e),i=t||{r:[],g:[],b:[]};i.r.length=i.g.length=i.b.length=r;for(let e=0;e<r;e++)i.r[e]=i.g[e]=i.b[e]=0}(t,i),s(r.intensity,0,0,0);let a=!1;const o=ds,n=cs,l=hs;o.length=0,n.length=0,l.length=0;for(const t of e)t instanceof $t&&!a?(d(r.direction,t.direction),r.intensity[0]=t.intensity[0],r.intensity[1]=t.intensity[1],r.intensity[2]=t.intensity[2],r.castShadows=t.castShadows,a=!0):t instanceof $t||t instanceof Zt?o.push(t):t instanceof kt?n.push(t):t instanceof Qt&&l.push(t);ns(o,i),function(e,t){os(ms,0,ps);for(const r of e)t.r[0]+=ps[0]*fs[0]*r.intensity[0]*4*Math.PI,t.g[0]+=ps[0]*fs[0]*r.intensity[1]*4*Math.PI,t.b[0]+=ps[0]*fs[0]*r.intensity[2]*4*Math.PI}(n,i);for(const e of l)ss(i.r,e.r),ss(i.g,e.g),ss(i.b,e.b)}q([Te()],ts.prototype,"hasAlpha",void 0);const ds=[],cs=[],hs=[],ps=[0],us=[0],ms=e(),fs=[3.141593,2.094395,2.094395,2.094395,.785398,.785398,.785398,.785398,.785398];class gs{constructor(){this._shOrder=2,this._ambientBoost=.4,this._oldSunlight={direction:e(),ambient:{color:e(),intensity:1},diffuse:{color:e(),intensity:1}},this.globalFactor=.5,this.groundLightingFactor=.5,this._sphericalHarmonics=new Qt,this._mainLight={intensity:e(),direction:t(1,0,0),castShadows:!1}}get lightingMainDirection(){return this._mainLight.direction}setLightDirectionUniform(e){e.setUniform3fv("lightingMainDirection",this._mainLight.direction)}setUniforms(e,t=!1){const r=t?(1-this.groundLightingFactor)*(1-this.globalFactor):0;e.setUniform1f("lightingFixedFactor",r),e.setUniform1f("lightingGlobalFactor",this.globalFactor),this.setLightDirectionUniform(e),e.setUniform3fv("lightingMainIntensity",this._mainLight.intensity),e.setUniform1f("ambientBoostFactor",this._ambientBoost);const i=this._sphericalHarmonics;0===this._shOrder?e.setUniform3f("lightingAmbientSH0",i.r[0],i.g[0],i.b[0]):1===this._shOrder?(e.setUniform4f("lightingAmbientSH_R",i.r[0],i.r[1],i.r[2],i.r[3]),e.setUniform4f("lightingAmbientSH_G",i.g[0],i.g[1],i.g[2],i.g[3]),e.setUniform4f("lightingAmbientSH_B",i.b[0],i.b[1],i.b[2],i.b[3])):2===this._shOrder&&(e.setUniform3f("lightingAmbientSH0",i.r[0],i.g[0],i.b[0]),e.setUniform4f("lightingAmbientSH_R1",i.r[1],i.r[2],i.r[3],i.r[4]),e.setUniform4f("lightingAmbientSH_G1",i.g[1],i.g[2],i.g[3],i.g[4]),e.setUniform4f("lightingAmbientSH_B1",i.b[1],i.b[2],i.b[3],i.b[4]),e.setUniform4f("lightingAmbientSH_R2",i.r[5],i.r[6],i.r[7],i.r[8]),e.setUniform4f("lightingAmbientSH_G2",i.g[5],i.g[6],i.g[7],i.g[8]),e.setUniform4f("lightingAmbientSH_B2",i.b[5],i.b[6],i.b[7],i.b[8]))}set(e){ls(e,this._shOrder,this._mainLight,this._sphericalHarmonics),d(this._oldSunlight.direction,this._mainLight.direction);const t=1/Math.PI;this._oldSunlight.ambient.color[0]=.282095*this._sphericalHarmonics.r[0]*t,this._oldSunlight.ambient.color[1]=.282095*this._sphericalHarmonics.g[0]*t,this._oldSunlight.ambient.color[2]=.282095*this._sphericalHarmonics.b[0]*t,n(this._oldSunlight.diffuse.color,this._mainLight.intensity,t),d(vs,this._oldSunlight.diffuse.color),n(vs,vs,this._ambientBoost*this.globalFactor),l(this._oldSunlight.ambient.color,this._oldSunlight.ambient.color,vs)}get old(){return this._oldSunlight}}const vs=e();class ys{constructor(e){this._rctx=e,this.cache=new Map}dispose(){this.cache.forEach((e=>e.texture=v(e.texture))),this.cache.clear()}acquire(e){if(_(e))return null;const t=this.patternId(e),r=this.cache.get(t);if(r)return r.refCount++,r.bind;const{encodedData:i,sdfNormalizer:s}=this.patternToTextureData(e,2),a=i.length/4,o=a/2,n={refCount:1,texture:null,bind:e=>(_(n.texture)&&(n.texture=new ve(this._rctx,{width:a,height:1,internalFormat:6408,pixelFormat:6408,dataType:5121,wrapMode:33071},i)),e.bindTexture(n.texture,"stipplePatternTexture"),{pixelSize:o,sdfNormalizer:s})};return this.cache.set(t,n),n.bind}release(e){if(_(e))return;const t=this.patternId(e),r=this.cache.get(t);r&&(r.refCount--,0===r.refCount&&(y(r.texture)&&r.texture.dispose(),this.cache.delete(t)))}swap(e,t){const r=this.acquire(t);return this.release(e),r}patternId(e){return e.join(",")}patternToTextureData(e,t){const r=Math.floor(e.reduce(((e,t)=>e+t))*t),i=.5*(e.reduce(((e,t)=>Math.max(e,t)))+1)*t,s=new Uint8Array(4*r);let a=1,o=0;for(const r of e){const e=r*t;for(let t=0;t<e;t++){const r=a*(Math.min(t,e-t)+.5);mt(r/i*.5+.5,s,o),o+=4}a=-a}return{encodedData:s,sdfNormalizer:i}}}const _s=Y.getLogger("esri.views.3d.webgl-engine.lib.OverlayRenderer");let bs=class extends(nt(k)){constructor(e){super(e),this._overlays=null,this._overlayRenderTarget=null,this._hasHighlights=!1,this._rendersOccluded=!1,this._hasWater=!1,this._lighting=new gs,this._handles=new Q,this._layerRenderers=new Map,this._sortedLayerRenderersDirty=!1,this._sortedLayerRenderers=new X,this._geometries=new Map,this.worldToPCSRatio=1,this.events=new $,this.longitudeCyclical=null}initialize(){const e=this.view._stage.renderView;this._rctx=e.renderingContext,this._renderContext=new ui(this._rctx);const r=e.waterTextureRepository;this._stippleTextureRepository=new ys(e.renderingContext),this._shaderTechniqueRepository=new vr({rctx:this._rctx,viewingMode:2,stippleTextureRepository:this._stippleTextureRepository,waterTextureRepository:r}),this._handles.add([ee(r,"loadingState",(()=>this.events.emit("content-changed"))),ee(this,"spatialReference",(e=>this._localOrigins=new ci(e)))]),this._materialRepository=new wr(e.textureRepository,this._shaderTechniqueRepository),this._materialRepository.onMaterialChanged=e=>{(e.renderOccluded&Ts)>0!==this._rendersOccluded&&this.updateRendersOccluded(),this.events.emit("content-changed"),this.notifyChange("updating")},this._lighting.groundLightingFactor=1,this._lighting.globalFactor=0,this._lighting.set([new kt(t(1,1,1))]),this._bindParameters={slot:23,highlightDepthTexture:lt(this._rctx),camera:ws,inverseViewport:ie(),origin:null,screenToWorldRatio:null,screenToPCSRatio:null,shadowMappingEnabled:!1,slicePlane:null,ssaoEnabled:!1,hasOccludees:!1,linearDepthTexture:null,lastFrameColorTexture:null,reprojectionMat:null,ssrEnabled:!1,lighting:this._lighting,transparencyPassType:3,terrainLinearDepthTexture:null,geometryLinearDepthTexture:null,multipassTerrainEnabled:!1,cullAboveGround:!1,multipassGeometryEnabled:!1,highlightColorTexture:null},this._handles.add(this.view.resourceController.scheduler.registerTask(Wt.STAGE,this))}dispose(){this._handles.destroy(),this._layerRenderers.forEach((e=>e.dispose())),this._layerRenderers.clear(),this._debugTextureTechnique=x(this._debugTextureTechnique),this._debugPatternTexture=v(this._debugPatternTexture),this._bindParameters.highlightDepthTexture=v(this._bindParameters.highlightDepthTexture),this._shaderTechniqueRepository=v(this._shaderTechniqueRepository),this._temporaryFBO=v(this._temporaryFBO),this._quadVAO=v(this._quadVAO),this.disposeOverlays()}get updating(){return this._sortedLayerRenderersDirty||J(this._layerRenderers,(e=>e.updating))}get hasOverlays(){return y(this._overlays)&&y(this._overlayRenderTarget)}get gpuMemoryUsage(){return y(this._overlayRenderTarget)?this._overlayRenderTarget.gpuMemoryUsage:0}collectUnusedRenderTargetMemory(e){let t=!1;if(y(this._overlayRenderTarget))for(const r of this._overlayRenderTarget.renderTargets){const i=this.overlays[0].validTargets[r.type]||!this.overlays[1].validTargets[r.type];t=this._overlayRenderTarget.validateUsageForTarget(i,r,e)||t}return t}get overlays(){return g(this._overlays,[])}ensureDrapeTargets(e){y(this._overlays)&&this._overlays.forEach((t=>{t.hasTargetWithoutRasterImage=Z(e,(e=>1===e.drapeTargetType))}))}ensureDrapeSources(e){y(this._overlays)&&this._overlays.forEach((t=>{t.hasDrapedFeatureSource=J(e,((e,t)=>1===t.drapeSourceType)),t.hasDrapedRasterSource=J(e,((e,t)=>0===t.drapeSourceType))}))}ensureOverlays(e,t){_(this._overlays)&&(this._overlayRenderTarget=new mr(this._rctx),this._overlays=[new hr(0,this._overlayRenderTarget),new hr(1,this._overlayRenderTarget)]),this.ensureDrapeTargets(e),this.ensureDrapeSources(t)}disposeOverlays(){this._overlays=null,this._overlayRenderTarget=v(this._overlayRenderTarget),this.events.emit("textures-disposed")}get running(){return this.updating}runTask(e,t=(()=>!0)){let r=!1;for(const[i,s]of this._layerRenderers){if(e.done)break;t(i)&&(s.commitChanges()&&(r=!0,e.madeProgress()),s.isEmpty&&(this._sortedLayerRenderersDirty=!0,this._layerRenderers.delete(i),this._handles.remove(i)))}this._sortedLayerRenderersDirty&&(this.updateSortedLayerRenderers(),r=!0),r&&(y(this._overlays)&&0===this._layerRenderers.size&&this.disposeOverlays(),this.notifyChange("updating"),this.events.emit("content-changed"),this.updateHasHighlights(),this.updateRendersOccluded(),this.updateHasWater())}processSyncLayers(){this.runTask(Bt,(e=>1===e.updatePolicy))}addGeometries(e,t,r){for(const t of e)_(t.origin)&&(t.origin=this._localOrigins.getOrigin(t.boundingSphere)),this._geometries.set(t.id,t);this.ensureLayerRenderer(t).add(e),2===r&&this.notifyGraphicGeometryChanged(e,t)}removeGeometries(e,t,r){for(const t of e)this._geometries.delete(b(t.id));const i=this._layerRenderers.get(t);i&&(i.remove(e),2===r&&this.notifyGraphicGeometryChanged(e,t))}updateGeometries(e,t,r){const i=this._layerRenderers.get(t);if(i)switch(i.modify(e,r),r){case 4:case 2:return this.notifyGraphicGeometryChanged(e,t);case 1:return this.notifyGraphicVisibilityChanged(e,t)}else _s.warn("Attempted to update geometry for nonexistent layer")}notifyGraphicGeometryChanged(e,t){if(_(t.notifyGraphicGeometryChanged))return;let r;for(const i of e){const e=i.graphicUid;y(e)&&e!==r&&(t.notifyGraphicGeometryChanged(e),r=e)}}notifyGraphicVisibilityChanged(e,t){if(_(t.notifyGraphicVisibilityChanged))return;let r;for(const i of e){const e=i.graphicUid;y(e)&&e!==r&&(t.notifyGraphicVisibilityChanged(e),r=e)}}updateHighlights(e,t){const r=this._layerRenderers.get(t);r?r.modify(e,8):_s.warn("Attempted to update highlights for nonexistent layer")}isEmpty(){return 0===this._geometries.size&&!Jt.OVERLAY_DRAW_DEBUG_TEXTURE}get hasHighlights(){return this._hasHighlights}get hasWater(){return this._hasWater}get rendersOccluded(){return this._rendersOccluded}updateLogic(e){let t=!1;return this._layerRenderers.forEach((r=>t=r.updateLogic(e)||t)),t}updateLayerOrder(){this._sortedLayerRenderersDirty=!0}drawTarget(e,t,r){const i=e.canvasGeometries;if(0===i.numViews)return!1;const s=e.pixelRatio*r;this._screenToWorldRatio=s*Math.abs(i.extents[0][2]-i.extents[0][0])/e.resolution;const a=t.renderPass;if(this.isEmpty()||5===a&&!this.hasHighlights||3===a&&!this.hasWater)return!1;if(!e.hasSomeSizedView())return!1;const o=t.fbo,n=2*e.resolution,l=e.resolution,d=1===t.type?2:4===t.type?1:0;if(!o.isValid())return!1;o.resize(n,l);const c=this._rctx;if(ws.pixelRatio=s||1,this._renderContext.pass=a,this._bindParameters.screenToWorldRatio=this._screenToWorldRatio,this._bindParameters.screenToPCSRatio=this._screenToWorldRatio*this.worldToPCSRatio,this._bindParameters.slot=3===a?24:23,e.applyViewport(this._rctx),o.bind(c),0===e.index&&(c.setClearColor(0,0,0,0),c.clearSafe(16384)),1===d&&(this._renderContext.renderOccludedMask=Ts),Jt.OVERLAY_DRAW_DEBUG_TEXTURE&&1!==d)for(let t=0;t<i.numViews;t++)this.setViewParameters(i.extents[t],e,ws),this.drawDebugTexture(e.resolution,Ss[e.index]);return this._layerRenderers.size>0&&this._sortedLayerRenderers.forAll((({layerView:t,renderer:r})=>{if(2===d&&y(t)&&0===t.drapeSourceType)return;const s=y(t)&&y(t.fullOpacity)&&t.fullOpacity<1&&0===a;s&&(this.bindTemporaryFramebuffer(this._rctx,n,l),c.clearSafe(16384));for(let t=0;t<i.numViews;t++)this.setViewParameters(i.extents[t],e,ws),r.render(this._renderContext,this._bindParameters);s&&y(this._temporaryFBO)&&(o.bind(c),this.view._stage.renderView.compositingHelper.composite(this._temporaryFBO.getTexture(),2,b(b(t).fullOpacity),3,e.index))})),c.bindFramebuffer(null),o.generateMipMap(),this._renderContext.resetRenderOccludedMask(),!0}bindTemporaryFramebuffer(e,t,r){_(this._temporaryFBO)&&(this._temporaryFBO=new ur(e,!1)),this._temporaryFBO.resize(t,r),this._temporaryFBO.bind(e)}async reloadShaders(){await this._shaderTechniqueRepository.hotReload()}intersect(e,t,r){let i=0;this._geometries.forEach((s=>{if(r&&!r(s))return;this.intersectRenderGeometry(s,t,0,e,i);const a=this.longitudeCyclical;a&&(s.boundingSphere[0]-s.boundingSphere[3]<a.min&&this.intersectRenderGeometry(s,t,a.range,e,i),s.boundingSphere[0]+s.boundingSphere[3]>a.max&&this.intersectRenderGeometry(s,t,-a.range,e,i)),i++}))}intersectRenderGeometry(e,t,r,i,s){if(!e.instanceParameters.visible)return;let a=0;y(e.transformation)&&(r+=e.transformation[12],a=e.transformation[13]),Cs[0]=t[0]-r,Cs[1]=t[1]-a,Cs[2]=1,Es[0]=t[0]-r,Es[1]=t[1]-a,Es[2]=0,e.screenToWorldRatio=this._screenToWorldRatio,e.material.intersect(e,null,e.getShaderTransformation(),i,Cs,Es,((t,r,a)=>{this.addIntersectionResult(a,e.material.renderPriority,s,i,e.layerUid,e.graphicUid)}),e.calculateShaderTransformation,!0)}addIntersectionResult(e,t,r,i,s,a){const o={type:"external",metadata:{layerUid:s,graphicUid:a}},n=s=>{s.set(o,null,i.results.ground.dist,i.results.ground.normal,i.results.ground.transformation,t,null,null,e,r),s.intersector="OverlayRenderer"};if((null==i.results.min.drapedLayerOrder||t>=i.results.min.drapedLayerOrder)&&(null==i.results.min.dist||i.results.ground.dist<=i.results.min.dist)&&n(i.results.min),0!==i.options.store&&(null==i.results.max.drapedLayerOrder||t<i.results.max.drapedLayerOrder)&&(null==i.results.max.dist||i.results.ground.dist>i.results.max.dist)&&n(i.results.max),2===i.options.store){const e=new gt(i.ray);n(e),i.results.all.push(e)}}ensureLayerRenderer(e){let t=this._layerRenderers.get(e);return t||(t=new Ji({rctx:this._rctx,materialRepository:this._materialRepository}),this._layerRenderers.set(e,t),this._sortedLayerRenderersDirty=!0,"fullOpacity"in e&&this._handles.add(e.watch("fullOpacity",(()=>this.events.emit("content-changed"))),e),this._handles.add(ee(t,"updating",(()=>this.notifyChange("updating"))),e)),t}updateSortedLayerRenderers(){if(!this._sortedLayerRenderersDirty)return;if(this._sortedLayerRenderersDirty=!1,this._sortedLayerRenderers.clear(),0===this._layerRenderers.size)return;const e=new Set(this._layerRenderers.values());this.view.allLayerViews.forEach((t=>{const r=t,i=this._layerRenderers.get(r);i&&(this._sortedLayerRenderers.push(new xs(r,i)),e.delete(i))})),e.forEach((e=>this._sortedLayerRenderers.push(new xs(null,e))))}setViewParameters(e,t,r){r.viewport[0]=r.viewport[1]=0,r.viewport[2]=r.viewport[3]=t.resolution,I(r.projectionMatrix,0,e[2]-e[0],0,e[3]-e[1],r.near,r.far),L(r.viewMatrix),z(r.viewMatrix,r.viewMatrix,[-e[0],-e[1],0]),this._renderContext.camera=r,this._bindParameters.camera=r,this._bindParameters.inverseViewport[0]=1/r.fullViewport[2],this._bindParameters.inverseViewport[1]=1/r.fullViewport[3]}updateHasWater(){const e=J(this._layerRenderers,(e=>e.hasWater));e!==this._hasWater&&(this._hasWater=e,this.events.emit("has-water",e))}updateHasHighlights(){const e=J(this._layerRenderers,(e=>e.hasHighlights));e!==this._hasHighlights&&(this._hasHighlights=e,this.events.emit("has-highlights",e))}updateRendersOccluded(){const e=J(this._layerRenderers,(e=>e.rendersOccluded));e!==this._rendersOccluded&&(this._rendersOccluded=e,this.events.emit("renders-occluded",e))}drawDebugTexture(e,t){const r=this._rctx;this.ensureDebugPatternResources(e,e);const i=this._debugTextureTechnique.program;r.useProgram(i),r.setPipelineState(this._debugTextureTechnique.pipeline),i.setUniform4f("color",t[0],t[1],t[2],1),i.bindTexture(this._debugPatternTexture,"tex"),r.bindVAO(this._quadVAO),r.drawArrays(5,0,fe(this._quadVAO,"geometry"))}ensureDebugPatternResources(e,t){if(this._debugPatternTexture)return;const r=new Uint8Array(e*t*4);let i=0;for(let s=0;s<t;s++)for(let a=0;a<e;a++){const o=Math.floor(a/10),n=Math.floor(s/10);o<2||n<2||10*o>e-20||10*n>t-20?(r[i++]=255,r[i++]=255,r[i++]=255,r[i++]=255):(r[i++]=255,r[i++]=255,r[i++]=255,r[i++]=1&o&&1&n?1&a^1&s?0:255:1&o^1&n?0:128)}this._debugPatternTexture=new ve(this._rctx,{target:3553,pixelFormat:6408,dataType:5121,samplingMode:9728,width:e,height:t},r);const s=new ts;s.hasAlpha=!0,this._debugTextureTechnique=this._shaderTechniqueRepository.acquire(es,s),this._quadVAO=dt(this._rctx)}get test(){return{layerRenderers:this._layerRenderers}}};q([ot()],bs.prototype,"_shaderTechniqueRepository",void 0),q([ot()],bs.prototype,"_stippleTextureRepository",void 0),q([te({constructOnly:!0})],bs.prototype,"view",void 0),q([te()],bs.prototype,"worldToPCSRatio",void 0),q([te()],bs.prototype,"spatialReference",void 0),q([te({type:Boolean,readOnly:!0})],bs.prototype,"updating",null),bs=q([re("esri.views.3d.terrain.OverlayRenderer")],bs);class xs{constructor(e,t){this.layerView=e,this.renderer=t}}const Ss=[[1,.5,.5],[.5,.5,1]],ws=new ct;ws.near=1,ws.far=1e4,ws.relativeElevation=null;const Cs=e(),Es=e(),Rs=-2,Ts=4,Os=1.2,Ds=T,Ps=R;function As(e){const t=[],r=[];!function(e,t,r){const{attributeData:{position:i},removeDuplicateStartEnd:s}=e,a=function(e){const t=e.length;return e[0]===e[t-3]&&e[1]===e[t-2]&&e[2]===e[t-1]}(i)&&1===s,o=i.length/3-(a?1:0),n=new Uint32Array(2*(o-1)),l=a?S(i,0,i.length-3):i;let d=0;for(let e=0;e<o-1;e++)n[d++]=e,n[d++]=e+1;t.push(["position",{size:3,data:l,exclusive:a}]),r.push(["position",n])}(e,r,t);const i=r[0][1].data,a=t[0][1].length,l=new Uint16Array(a);return function(e,t,r){const i=e.attributeData.mapPosition;if(_(i))return;r.push(["mapPos",r[0][1]]),t.push(["mapPos",{size:3,data:i}])}(e,r,t),function(e,t,r,i){if(y(e.attributeData.colorFeature))return;const s=e.attributeData.color;t.push(["color",{size:4,data:g(s,Ps)}]),r.push(["color",i])}(e,r,t,l),function(e,t,r,i){if(y(e.attributeData.sizeFeature))return;const s=e.attributeData.size;t.push(["size",{size:1,data:[g(s,1)]}]),r.push(["size",i])}(e,r,t,l),function(e,t,r,i){const s=e.attributeData.colorFeature;if(_(s))return;t.push(["colorFeatureAttribute",{size:1,data:new Float32Array([s])}]),r.push(["color",i])}(e,r,t,l),function(e,t,r,i){const s=e.attributeData.sizeFeature;if(_(s))return;t.push(["sizeFeatureAttribute",{size:1,data:new Float32Array([s])}]),r.push(["sizeFeatureAttribute",i])}(e,r,t,l),function(e,t,r,i){const s=e.attributeData.opacityFeature;if(_(s))return;t.push(["opacityFeatureAttribute",{size:1,data:new Float32Array([s])}]),r.push(["opacityFeatureAttribute",i])}(e,r,t,l),function(e,t,r,i){if("round"!==e.join)return;const a=i.length/3,l=new Float32Array(a),d=Fs,c=Ns;s(d,0,0,0);const h=g(e.uniformSize,1);for(let e=-1;e<a;++e){const t=e<0?a+e:e,r=(e+1)%a;if(s(c,i[3*r+0]-i[3*t+0],i[3*r+1]-i[3*t+1],i[3*r+2]-i[3*t+2]),m(c,c),e>=0){const t=1*((Math.PI-f(o(d,c)))*Us)*zs(h);l[e]=Math.max(Math.floor(t),0)}n(d,c,-1)}t.push(["subdivisions",{size:1,data:l}]),r.push(["subdivisions",r[0][1]])}(e,r,t,i),new Ke(r,t,2)}function Ms(e,t,r,i){const s="polygon"===e.type?1:0,a="polygon"===e.type?e.rings:e.paths,{position:o,outlines:n}=E(a,e.hasZ,s),l=new Float64Array(o.length),d=Xt(o,e.spatialReference,0,l,0,o,0,o.length/3,t,r,i),c=null!=d;return{lines:c?Is(n,o,l):[],projectionSuccess:c,sampledElevation:d}}function Is(e,t,r){const i=new Array;for(const{index:s,count:a}of e){if(a<=1)continue;const e=3*s,o=e+3*a;i.push({position:t.subarray(e,o),mapPosition:r?r.subarray(e,o):void 0})}return i}function Ls(e,t){const r="polygon"===e.type?1:0,i="polygon"===e.type?e.rings:e.paths,{position:s,outlines:a}=E(i,!1,r),o=w(s,e.spatialReference,0,s,t,0,s.length/3);for(let e=2;e<s.length;e+=3)s[e]=-2;return{lines:o?Is(a,s):[],projectionSuccess:o}}function zs(e){return 1.863798+-2.0062872/(1+e/18.2313)**.8856294}const Fs=e(),Ns=e(),Us=4/Math.PI;export{kt as A,Ii as B,gi as C,Rs as D,ir as E,Zt as F,qt as G,Os as H,Tr as L,$t as M,Oi as N,bs as O,Bi as R,gs as S,es as T,Er as V,Di as W,ci as a,Ci as b,pr as c,Jt as d,mi as e,cr as f,qi as g,Fi as h,ts as i,ys as j,vr as k,wr as l,Kt as m,sr as n,Ts as o,er as p,tr as q,Xt as r,_i as s,rr as t,Ds as u,Lr as v,Ms as w,As as x,Ls as y,Mi as z};
