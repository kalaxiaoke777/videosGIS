/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.21/esri/copyright.txt for details.
*/
import{g as e,t as r}from"./OutputDepth.glsl.js";function t(r){r.vertex.code.add(e`float screenSizePerspectiveMinSize(float size, vec4 factor) {
float nonZeroSize = 1.0 - step(size, 0.0);
return (
factor.z * (
1.0 +
nonZeroSize *
2.0 * factor.w / (
size + (1.0 - nonZeroSize)
)
)
);
}`),r.vertex.code.add(e`float screenSizePerspectiveViewAngleDependentFactor(float absCosAngle) {
return absCosAngle * absCosAngle * absCosAngle;
}`),r.vertex.code.add(e`vec4 screenSizePerspectiveScaleFactor(float absCosAngle, float distanceToCamera, vec4 params) {
return vec4(
min(params.x / (distanceToCamera - params.y), 1.0),
screenSizePerspectiveViewAngleDependentFactor(absCosAngle),
params.z,
params.w
);
}`),r.vertex.code.add(e`float applyScreenSizePerspectiveScaleFactorFloat(float size, vec4 factor) {
return max(mix(size * factor.x, size, factor.y), screenSizePerspectiveMinSize(size, factor));
}`),r.vertex.code.add(e`float screenSizePerspectiveScaleFloat(float size, float absCosAngle, float distanceToCamera, vec4 params) {
return applyScreenSizePerspectiveScaleFactorFloat(
size,
screenSizePerspectiveScaleFactor(absCosAngle, distanceToCamera, params)
);
}`),r.vertex.code.add(e`vec2 applyScreenSizePerspectiveScaleFactorVec2(vec2 size, vec4 factor) {
return mix(size * clamp(factor.x, screenSizePerspectiveMinSize(size.y, factor) / size.y, 1.0), size, factor.y);
}`),r.vertex.code.add(e`vec2 screenSizePerspectiveScaleVec2(vec2 size, float absCosAngle, float distanceToCamera, vec4 params) {
return applyScreenSizePerspectiveScaleFactorVec2(size, screenSizePerspectiveScaleFactor(absCosAngle, distanceToCamera, params));
}`)}function a(e,t){if(t.screenSizePerspective){r(t.screenSizePerspective,e,"screenSizePerspective");const a=t.screenSizePerspectiveAlignment||t.screenSizePerspective;r(a,e,"screenSizePerspectiveAlignment")}}function c(r,a){const c=r.vertex.code;a.verticalOffsetEnabled?(r.vertex.uniforms.add("verticalOffset","vec4"),a.screenSizePerspectiveEnabled&&(r.include(t),r.vertex.uniforms.add("screenSizePerspectiveAlignment","vec4")),c.add(e`
    vec3 calculateVerticalOffset(vec3 worldPos, vec3 localOrigin) {
      float viewDistance = length((view * vec4(worldPos, 1.0)).xyz);
      ${1===a.viewingMode?e`vec3 worldNormal = normalize(worldPos + localOrigin);`:e`vec3 worldNormal = vec3(0.0, 0.0, 1.0);`}
      ${a.screenSizePerspectiveEnabled?e`
          float cosAngle = dot(worldNormal, normalize(worldPos - camPos));
          float verticalOffsetScreenHeight = screenSizePerspectiveScaleFloat(verticalOffset.x, abs(cosAngle), viewDistance, screenSizePerspectiveAlignment);`:e`
          float verticalOffsetScreenHeight = verticalOffset.x;`}
      // Screen sized offset in world space, used for example for line callouts
      float worldOffset = clamp(verticalOffsetScreenHeight * verticalOffset.y * viewDistance, verticalOffset.z, verticalOffset.w);
      return worldNormal * worldOffset;
    }

    vec3 addVerticalOffset(vec3 worldPos, vec3 localOrigin) {
      return worldPos + calculateVerticalOffset(worldPos, localOrigin);
    }
    `)):c.add(e`vec3 addVerticalOffset(vec3 worldPos, vec3 localOrigin) { return worldPos; }`)}function s(e,r,t){if(!r.verticalOffset)return;const a=function(e,r,t,a=i){return a.screenLength=e.screenLength,a.perDistance=Math.tan(.5*r)/(.5*t),a.minWorldLength=e.minWorldLength,a.maxWorldLength=e.maxWorldLength,a}(r.verticalOffset,t.camera.fovY,t.camera.fullViewport[3]),c=t.camera.pixelRatio||1;e.setUniform4f("verticalOffset",a.screenLength*c,a.perDistance,a.minWorldLength,a.maxWorldLength)}const i={screenLength:0,perDistance:0,minWorldLength:0,maxWorldLength:0};export{t as S,c as V,a,s as b};
