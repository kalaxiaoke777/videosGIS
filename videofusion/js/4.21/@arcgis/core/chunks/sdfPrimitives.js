/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.21/esri/copyright.txt for details.
*/
import{e,t,n as i,s as o,f as r,k as a,l as s,w as n,x as l,d as c,c as d,g as p,S as u,b as f,j as v}from"./mathUtils.js";import{i as m}from"../core/lang.js";import{d as h}from"./screenUtils.js";import{f as g}from"./mat3.js";import{c as x}from"./quatf64.js";import{d as b}from"./mat4.js";import{c as y,I as P}from"./mat4f64.js";import{c as S}from"./vec2.js";import{a as C,f as O}from"./vec2f64.js";import{c as w}from"./aaBoundingRect.js";import{n as z}from"./InterleavedLayout.js";import{b as D}from"./geometryDataUtils.js";import{G as A}from"./Texture2.js";import{g as j,R as T,f as E,S as F,q as U,C as V,B as q,N as _,r as H,p as M,a as R,b as G,c as B,P as $,D as I,h as N,ae as k,W,F as L,$ as Q,ac as Y,a0 as Z,H as J,a9 as K,am as X,i as ee,an as te,al as ie,a8 as oe}from"./OutputDepth.glsl.js";import{a as re,b as ae}from"./Util.js";import{w as se,a as ne,d as le,b as ce}from"./VertexColor.glsl.js";import{i as de}from"./verticalOffsetUtils.js";import{Z as pe}from"./vec4f64.js";import{S as ue,b as fe,a as ve}from"./VerticalOffset.glsl.js";import{V as me,g as he}from"./PhysicallyBasedRendering.glsl.js";import{_ as ge}from"./tslib.es6.js";import{a as xe,c as be,m as ye,d as Pe}from"./VertexArrayObject.js";import{projectPointToVector as Se}from"../geometry/projection.js";import{v as Ce}from"./aaBoundingBox.js";import{b as Oe,a as we}from"../geometry/Polygon.js";import{m as ze}from"./dehydratedFeatures.js";import{r as De,E as Ae}from"./lineUtils.js";import{c as je}from"./ScreenSpacePass.js";import{O as Te}from"./Intersector.js";function Ee(e){const t=j`vec4 alignToPixelCenter(vec4 clipCoord, vec2 widthHeight) {
vec2 xy = vec2(0.500123) + 0.5 * clipCoord.xy / clipCoord.w;
vec2 pixelSz = vec2(1.0) / widthHeight;
vec2 ij = (floor(xy * widthHeight) + vec2(0.5)) * pixelSz;
vec2 result = (ij * 2.0 - vec2(1.0)) * clipCoord.w;
return vec4(result, clipCoord.zw);
}`,i=j`vec4 alignToPixelOrigin(vec4 clipCoord, vec2 widthHeight) {
vec2 xy = vec2(0.5) + 0.5 * clipCoord.xy / clipCoord.w;
vec2 pixelSz = vec2(1.0) / widthHeight;
vec2 ij = floor((xy + 0.5 * pixelSz) * widthHeight) * pixelSz;
vec2 result = (ij * 2.0 - vec2(1.0)) * clipCoord.w;
return vec4(result, clipCoord.zw);
}`;e.vertex.code.add(t),e.vertex.code.add(i),e.fragment.code.add(t),e.fragment.code.add(i)}function Fe(e){return function(e){return e instanceof Float32Array&&e.length>=16}(e)||function(e){return Array.isArray(e)&&e.length>=16}(e)}function Ue(e,t){const i=e;i.include(ue),i.attributes.add("position","vec3"),i.attributes.add("normal","vec3"),i.attributes.add("auxpos1","vec4"),i.vertex.uniforms.add("proj","mat4"),i.vertex.uniforms.add("view","mat4"),i.vertex.uniforms.add("viewNormal","mat4"),i.vertex.uniforms.add("viewport","vec4"),i.vertex.uniforms.add("camPos","vec3"),i.vertex.uniforms.add("polygonOffset","float"),i.vertex.uniforms.add("cameraGroundRelative","float"),i.vertex.uniforms.add("pixelRatio","float"),i.vertex.uniforms.add("perDistancePixelRatio","float"),i.vertex.uniforms.add("uRenderTransparentlyOccludedHUD","float"),t.verticalOffsetEnabled&&i.vertex.uniforms.add("verticalOffset","vec4"),t.screenSizePerspectiveEnabled&&i.vertex.uniforms.add("screenSizePerspectiveAlignment","vec4"),i.vertex.uniforms.add("hudVisibilityTexture","sampler2D"),i.vertex.constants.add("smallOffsetAngle","float",.984807753012208),i.vertex.code.add(j`struct ProjectHUDAux {
vec3 posModel;
vec3 posView;
vec3 vnormal;
float distanceToCamera;
float absCosAngle;
};`),i.vertex.code.add(j`float applyHUDViewDependentPolygonOffset(float pointGroundDistance, float absCosAngle, inout vec3 posView) {
float pointGroundSign = sign(pointGroundDistance);
if (pointGroundSign == 0.0) {
pointGroundSign = cameraGroundRelative;
}
float groundRelative = cameraGroundRelative * pointGroundSign;
if (polygonOffset > .0) {
float cosAlpha = clamp(absCosAngle, 0.01, 1.0);
float tanAlpha = sqrt(1.0 - cosAlpha * cosAlpha) / cosAlpha;
float factor = (1.0 - tanAlpha / viewport[2]);
if (groundRelative > 0.0) {
posView *= factor;
}
else {
posView /= factor;
}
}
return groundRelative;
}`),t.isDraped||i.vertex.code.add(j`void applyHUDVerticalGroundOffset(vec3 normalModel, inout vec3 posModel, inout vec3 posView) {
float distanceToCamera = length(posView);
float pixelOffset = distanceToCamera * perDistancePixelRatio * 0.5;
vec3 modelOffset = normalModel * cameraGroundRelative * pixelOffset;
vec3 viewOffset = (viewNormal * vec4(modelOffset, 1.0)).xyz;
posModel += modelOffset;
posView += viewOffset;
}`),i.vertex.code.add(j`
    vec4 projectPositionHUD(out ProjectHUDAux aux) {
      // centerOffset is in view space and is used to implement world size offsetting
      // of labels with respect to objects. It also pulls the label towards the viewer
      // so that the label is visible in front of the object.
      vec3 centerOffset = auxpos1.xyz;

      // The pointGroundDistance is the distance of the geometry to the ground and is
      // negative if the point is below the ground, or positive if the point is above
      // ground.
      float pointGroundDistance = auxpos1.w;

      aux.posModel = position;
      aux.posView = (view * vec4(aux.posModel, 1.0)).xyz;
      aux.vnormal = normal;
      ${t.isDraped?"":"applyHUDVerticalGroundOffset(aux.vnormal, aux.posModel, aux.posView);"}

      // Screen sized offset in world space, used for example for line callouts
      // Note: keep this implementation in sync with the CPU implementation, see
      //   - MaterialUtil.verticalOffsetAtDistance
      //   - HUDMaterial.applyVerticalOffsetTransformation

      aux.distanceToCamera = length(aux.posView);

      vec3 viewDirObjSpace = normalize(camPos - aux.posModel);
      float cosAngle = dot(aux.vnormal, viewDirObjSpace);

      aux.absCosAngle = abs(cosAngle);

      ${t.screenSizePerspectiveEnabled&&(t.verticalOffsetEnabled||1===t.screenCenterOffsetUnitsEnabled)?"vec4 perspectiveFactor = screenSizePerspectiveScaleFactor(aux.absCosAngle, aux.distanceToCamera, screenSizePerspectiveAlignment);":""}

      ${t.verticalOffsetEnabled?t.screenSizePerspectiveEnabled?"float verticalOffsetScreenHeight = applyScreenSizePerspectiveScaleFactorFloat(verticalOffset.x, perspectiveFactor);":"float verticalOffsetScreenHeight = verticalOffset.x;":""}

      ${t.verticalOffsetEnabled?j`
            float worldOffset = clamp(verticalOffsetScreenHeight * verticalOffset.y * aux.distanceToCamera, verticalOffset.z, verticalOffset.w);
            vec3 modelOffset = aux.vnormal * worldOffset;
            aux.posModel += modelOffset;
            vec3 viewOffset = (viewNormal * vec4(modelOffset, 1.0)).xyz;
            aux.posView += viewOffset;
            // Since we elevate the object, we need to take that into account
            // in the distance to ground
            pointGroundDistance += worldOffset;`:""}

      float groundRelative = applyHUDViewDependentPolygonOffset(pointGroundDistance, aux.absCosAngle, aux.posView);

      ${1!==t.screenCenterOffsetUnitsEnabled?j`
            // Apply x/y in view space, but z in screen space (i.e. along posView direction)
            aux.posView += vec3(centerOffset.x, centerOffset.y, 0.0);

            // Same material all have same z != 0.0 condition so should not lead to
            // branch fragmentation and will save a normalization if it's not needed
            if (centerOffset.z != 0.0) {
              aux.posView -= normalize(aux.posView) * centerOffset.z;
            }
          `:""}

      vec4 posProj = proj * vec4(aux.posView, 1.0);

      ${1===t.screenCenterOffsetUnitsEnabled?t.screenSizePerspectiveEnabled?"float centerOffsetY = applyScreenSizePerspectiveScaleFactorFloat(centerOffset.y, perspectiveFactor);":"float centerOffsetY = centerOffset.y;":""}

      ${1===t.screenCenterOffsetUnitsEnabled?"posProj.xy += vec2(centerOffset.x, centerOffsetY) * pixelRatio * 2.0 / viewport.zw * posProj.w;":""}

      // constant part of polygon offset emulation
      posProj.z -= groundRelative * polygonOffset * posProj.w;
      return posProj;
    }
  `),i.vertex.code.add(j`bool testVisibilityHUD(vec4 posProj) {
vec4 posProjCenter = alignToPixelCenter(posProj, viewport.zw);
vec4 occlusionPixel = texture2D(hudVisibilityTexture, .5 + .5 * posProjCenter.xy / posProjCenter.w);
if (uRenderTransparentlyOccludedHUD > 0.5) {
return occlusionPixel.r * occlusionPixel.g > 0.0 && occlusionPixel.g * uRenderTransparentlyOccludedHUD < 1.0;
}
return occlusionPixel.r * occlusionPixel.g > 0.0 && occlusionPixel.g == 1.0;
}`)}function Ve(e,t){e.setUniform1f("uRenderTransparentlyOccludedHUD",0===t.renderTransparentlyOccludedHUD?1:1===t.renderTransparentlyOccludedHUD?0:.75)}function qe(e){e.include(T),e.uniforms.add("geometryDepthTexture","sampler2D"),e.uniforms.add("cameraNearFar","vec2"),e.code.add(j`bool geometryDepthTest(vec2 pos, float elementDepth) {
float geometryDepth = linearDepthFromTexture(geometryDepthTexture, pos, cameraNearFar);
return (elementDepth < (geometryDepth - 1.0));
}`)}function _e(e,t){t.multipassGeometryEnabled&&t.geometryLinearDepthTexture&&e.bindTexture(t.geometryLinearDepthTexture,"geometryDepthTexture")}function He(e,t){t.multipassGeometryEnabled&&e.vertex.include(qe),t.multipassTerrainEnabled&&e.varyings.add("depth","float"),e.vertex.code.add(j`
  void main(void) {
    vec4 posProjCenter;
    if (dot(position, position) > 0.0) {
      // Render single point to center of the pixel to avoid subpixel
      // filtering to affect the marker color
      ProjectHUDAux projectAux;
      vec4 posProj = projectPositionHUD(projectAux);
      posProjCenter = alignToPixelCenter(posProj, viewport.zw);

      ${t.multipassGeometryEnabled?j`
        // Don't draw vertices behind geometry
        if(geometryDepthTest(.5 + .5 * posProjCenter.xy / posProjCenter.w, projectAux.posView.z)){
          posProjCenter = vec4(1e038, 1e038, 1e038, 1.0);
        }`:""}

      ${t.multipassTerrainEnabled?"depth = projectAux.posView.z;":""}
      vec3 vpos = projectAux.posModel;
      if (rejectBySlice(vpos)) {
        // Project out of clip space
        posProjCenter = vec4(1e038, 1e038, 1e038, 1.0);
      }

    } else {
      // Project out of clip space
      posProjCenter = vec4(1e038, 1e038, 1e038, 1.0);
    }

    gl_Position = posProjCenter;
    gl_PointSize = 1.0;
  }
  `),t.multipassTerrainEnabled&&e.fragment.include(T),e.fragment.uniforms.add("terrainDepthTexture","sampler2D"),e.fragment.uniforms.add("cameraNearFar","vec2"),e.fragment.uniforms.add("inverseViewport","vec2"),e.fragment.include(E),e.fragment.code.add(j`
  void main() {
    gl_FragColor = vec4(1, 1, 1, 1);
    ${t.multipassTerrainEnabled?j`

          vec2 uv = gl_FragCoord.xy * inverseViewport;

          //Read the rgba data from the texture linear depth
          vec4 terrainDepthData = texture2D(terrainDepthTexture, uv);

          float terrainDepth = linearDepthFromFloat(rgba2float(terrainDepthData), cameraNearFar);

          //If HUD vertex is behind terrain and the terrain depth is not the initialize value (e.g. we are not looking at the sky)
          //Mark the HUD vertex as occluded by transparent terrain
          if(depth < terrainDepth && terrainDepthData != vec4(0,0,0,1)){
            gl_FragColor.g = 0.5;
          }`:""}
  }
  `)}function Me(e,t,i){e.setUniform4fv("materialColor",t.color),t.textureIsSignedDistanceField&&(t.outlineColor[3]<=0||t.outlineSize<=0?(e.setUniform4fv("outlineColor",pe),e.setUniform1f("outlineSize",0)):(e.setUniform4fv("outlineColor",t.outlineColor),e.setUniform1f("outlineSize",t.outlineSize))),e.setUniform2f("screenOffset",2*t.screenOffset[0]*i,2*t.screenOffset[1]*i),e.setUniform2fv("anchorPos",Re(t))}function Re(e,t=Ge){var i,o,r;return e.textureIsSignedDistanceField?(i=e.anchorPos,o=e.distanceFieldBoundingBox,(r=t)[0]=i[0]*(o[2]-o[0])+o[0],r[1]=i[1]*(o[3]-o[1])+o[1]):S(t,e.anchorPos),t}const Ge=C();var Be=Object.freeze({__proto__:null,build:function(e){const t=new F,i=e.signedDistanceFieldEnabled;if(t.include(Ee),t.include(Ue,e),t.include(U,e),6===e.output)return t.include(He,e),t;t.include(ue),t.fragment.include(E),t.fragment.include(V),t.include(me,e),t.varyings.add("vcolor","vec4"),t.varyings.add("vtc","vec2"),t.varyings.add("vsize","vec2"),e.binaryHighlightOcclusionEnabled&&t.varyings.add("voccluded","float"),t.vertex.uniforms.add("screenOffset","vec2").add("anchorPos","vec2").add("textureCoordinateScaleFactor","vec2").add("materialColor","vec4"),i&&t.vertex.uniforms.add("outlineColor","vec4"),e.screenSizePerspectiveEnabled&&t.vertex.uniforms.add("screenSizePerspective","vec4"),(e.debugDrawBorder||e.binaryHighlightOcclusionEnabled)&&t.varyings.add("debugBorderCoords","vec4"),t.attributes.add("uv0","vec2"),t.attributes.add("color","vec4"),t.attributes.add("size","vec2"),t.attributes.add("auxpos2","vec4"),t.vertex.code.add(j`
    void main(void) {
      ProjectHUDAux projectAux;
      vec4 posProj = projectPositionHUD(projectAux);

      if (rejectBySlice(projectAux.posModel)) {
        // Project outside of clip plane
        gl_Position = vec4(1e038, 1e038, 1e038, 1.0);
        return;
      }
      vec2 inputSize;
      ${e.screenSizePerspectiveEnabled?j`
      inputSize = screenSizePerspectiveScaleVec2(size, projectAux.absCosAngle, projectAux.distanceToCamera, screenSizePerspective);
      vec2 screenOffsetScaled = screenSizePerspectiveScaleVec2(screenOffset, projectAux.absCosAngle, projectAux.distanceToCamera, screenSizePerspectiveAlignment);
         `:j`
      inputSize = size;
      vec2 screenOffsetScaled = screenOffset;`}

      ${e.vvSize?"inputSize *= vvScale(auxpos2).xx;":""}

      vec2 combinedSize = inputSize * pixelRatio;
      vec4 quadOffset = vec4(0.0);

      ${e.occlusionTestEnabled||e.binaryHighlightOcclusionEnabled?"bool visible = testVisibilityHUD(posProj);":""}

      ${e.binaryHighlightOcclusionEnabled?"voccluded = visible ? 0.0 : 1.0;":""}
    `);const o=j`vec2 uv01 = floor(uv0);
vec2 uv = uv0 - uv01;
quadOffset.xy = ((uv01 - anchorPos) * 2.0 * combinedSize + screenOffsetScaled) / viewport.zw * posProj.w;`,r=e.pixelSnappingEnabled?i?j`posProj = alignToPixelOrigin(posProj, viewport.zw) + quadOffset;`:j`posProj += quadOffset;
if (inputSize.x == size.x) {
posProj = alignToPixelOrigin(posProj, viewport.zw);
}`:j`posProj += quadOffset;`;t.vertex.code.add(j`
      ${e.occlusionTestEnabled?"if (visible) {":""}
      ${o}
      ${e.vvColor?"vcolor = vvGetColor(auxpos2, vvColorValues, vvColorColors) * materialColor;":"vcolor = color / 255.0 * materialColor;"}

      bool alphaDiscard = vcolor.a < ${j.float(q)};
      ${i?`alphaDiscard = alphaDiscard && outlineColor.a < ${j.float(q)};`:""}
      if (alphaDiscard) {
        // "early discard" if both symbol color (= fill) and outline color (if applicable) are transparent
        gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
        return;
      } else {
        ${r}
        gl_Position = posProj;
      }

      vtc = uv * textureCoordinateScaleFactor;

      ${e.debugDrawBorder?"debugBorderCoords = vec4(uv01, 1.5 / combinedSize);":""}
      vsize = inputSize;
      ${e.occlusionTestEnabled?j`} else { vtc = vec2(0.0);
        ${e.debugDrawBorder?"debugBorderCoords = vec4(0.5, 0.5, 1.5 / combinedSize);}":"}"}`:""}
    }
    `),t.fragment.uniforms.add("tex","sampler2D"),i&&(t.fragment.uniforms.add("outlineColor","vec4"),t.fragment.uniforms.add("outlineSize","float"));const a=e.debugDrawBorder?j`(isBorder > 0.0 ? 0.0 : ${j.float(_)})`:j.float(_),s=j`
    ${e.debugDrawBorder?j`
      float isBorder = float(any(lessThan(debugBorderCoords.xy, debugBorderCoords.zw)) || any(greaterThan(debugBorderCoords.xy, 1.0 - debugBorderCoords.zw)));`:""}

    ${i?j`
      vec4 fillPixelColor = vcolor;

      // Attempt to sample texel centers to avoid that thin cross outlines
      // disappear with large symbol sizes.
      // see: https://devtopia.esri.com/WebGIS/arcgis-js-api/issues/7058#issuecomment-603041
      const float txSize = 128.0;
      const float texelSize = 1.0 / txSize;
      // Calculate how much we have to add/subtract to/from each texel to reach the size of an onscreen pixel
      vec2 scaleFactor = (vsize - txSize) * texelSize;
      vec2 samplePos = vtc + (vec2(1.0, -1.0) * texelSize) * scaleFactor;

      // Get distance and map it into [-0.5, 0.5]
      float d = rgba2float(texture2D(tex, samplePos)) - 0.5;

      // Distance in output units (i.e. pixels)
      float dist = d * vsize.x;

      // Create smooth transition from the icon into its outline
      float fillAlphaFactor = clamp(0.5 - dist, 0.0, 1.0);
      fillPixelColor.a *= fillAlphaFactor;

      if (outlineSize > 0.25) {
        vec4 outlinePixelColor = outlineColor;
        float clampedOutlineSize = min(outlineSize, 0.5*vsize.x);

        // Create smooth transition around outline
        float outlineAlphaFactor = clamp(0.5 - (abs(dist) - 0.5*clampedOutlineSize), 0.0, 1.0);
        outlinePixelColor.a *= outlineAlphaFactor;

        if (
          outlineAlphaFactor + fillAlphaFactor < ${a} ||
          fillPixelColor.a + outlinePixelColor.a < ${j.float(q)}
        ) {
          discard;
        }

        // perform un-premultiplied over operator (see https://en.wikipedia.org/wiki/Alpha_compositing#Description)
        float compositeAlpha = outlinePixelColor.a + fillPixelColor.a * (1.0 - outlinePixelColor.a);
        vec3 compositeColor = vec3(outlinePixelColor) * outlinePixelColor.a +
          vec3(fillPixelColor) * fillPixelColor.a * (1.0 - outlinePixelColor.a);

        gl_FragColor = vec4(compositeColor, compositeAlpha);
      } else {
        if (fillAlphaFactor < ${a}) {
          discard;
        }

        gl_FragColor = premultiplyAlpha(fillPixelColor);
      }

      // visualize SDF:
      // gl_FragColor = vec4(clamp(-dist/vsize.x*2.0, 0.0, 1.0), clamp(dist/vsize.x*2.0, 0.0, 1.0), 0.0, 1.0);
      `:j`
          vec4 texColor = texture2D(tex, vtc, -0.5);
          if (texColor.a < ${a}) {
            discard;
          }
          gl_FragColor = texColor * premultiplyAlpha(vcolor);
          `}

    ${e.debugDrawBorder?j`gl_FragColor = mix(gl_FragColor, vec4(1.0, 0.0, 1.0, 1.0), isBorder);`:""}
  `;return 7===e.output&&t.fragment.code.add(j`
      void main() {
        ${s}
        gl_FragColor = vec4(gl_FragColor.a);
      }
      `),0===e.output&&t.fragment.code.add(j`
    void main() {
      ${s}
      ${e.FrontFacePass?"gl_FragColor.rgb /= gl_FragColor.a;":""}
    }
    `),4===e.output&&(t.include(H),t.fragment.code.add(j`
    void main() {
      ${s}
      ${e.binaryHighlightOcclusionEnabled?j`
          if (voccluded == 1.0) {
            gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);
          } else {
            gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0);
          }`:"outputHighlight();"}
    }
    `)),t},bindHUDMaterialUniforms:Me,calculateAnchorPosForRendering:Re});class $e extends B{initializeProgram(e){const t=$e.shader.get(),i=this.configuration,o=t.build({output:i.output,FrontFacePass:2===i.transparencyPassType,viewingMode:e.viewingMode,occlusionTestEnabled:i.occlusionTestEnabled,signedDistanceFieldEnabled:i.sdf,slicePlaneEnabled:i.slicePlaneEnabled,sliceHighlightDisabled:!1,sliceEnabledForVertexPrograms:!0,debugDrawBorder:i.debugDrawBorder,binaryHighlightOcclusionEnabled:i.binaryHighlightOcclusion,screenCenterOffsetUnitsEnabled:i.screenCenterOffsetUnitsEnabled,screenSizePerspectiveEnabled:i.screenSizePerspective,verticalOffsetEnabled:i.verticalOffset,pixelSnappingEnabled:i.pixelSnappingEnabled,vvSize:i.vvSize,vvColor:i.vvColor,vvInstancingEnabled:!1,isDraped:i.isDraped,multipassGeometryEnabled:i.multipassGeometryEnabled,multipassTerrainEnabled:i.multipassTerrainEnabled,cullAboveGround:i.cullAboveGround});return new $(e.rctx,o,I)}bindPass(e,t){N(this.program,t.camera.projectionMatrix),this.program.setUniform1f("cameraGroundRelative",t.camera.aboveGround?1:-1),this.program.setUniform1f("perDistancePixelRatio",Math.tan(t.camera.fovY/2)/(t.camera.fullViewport[2]/2)),this.program.setUniformMatrix4fv("viewNormal",t.camera.viewInverseTransposeMatrix),this.program.setUniform1f("polygonOffset",e.shaderPolygonOffset),fe(this.program,e,t),ve(this.program,e),this.program.setUniform1f("pixelRatio",t.camera.pixelRatio||1),k(this.program,t),6===this.configuration.output?(this.program.setUniform2fv("cameraNearFar",t.camera.nearFar),this.program.setUniform2fv("inverseViewport",t.inverseViewport),_e(this.program,t),W(this.program,t)):(Ve(this.program,t),Me(this.program,e,t.camera.pixelRatio||1),he(this.program,e),this.configuration.occlusionTestEnabled&&this.program.bindTexture(t.hudVisibilityTexture,"hudVisibilityTexture")),4===this.configuration.output&&L(this.program,t)}bindDraw(e){Q(this.program,e),Y(this.program,e.origin,e.camera.viewInverseTransposeMatrix),Z(this.program,this.configuration,e),this.program.rebindTextures()}setPipelineState(e){const t=this.configuration,i=3===e,o=2===e,r=this.configuration.polygonOffsetEnabled&&Ie,a=(i||o)&&4!==t.output?(t.depthEnabled||6===t.output)&&be:null;return ye({blending:0===t.output||7===t.output||4===t.output?i?Ne:J(e):null,depthTest:{func:515},depthWrite:a,colorWrite:Pe,polygonOffset:r})}initializePipeline(){return this.setPipelineState(this.configuration.transparencyPassType)}get primitiveType(){return 6===this.configuration.output?0:4}}$e.shader=new R(Be,(()=>Promise.resolve().then((function(){return Be}))));const Ie={factor:0,units:-4},Ne=xe(1,771);class ke extends G{constructor(){super(...arguments),this.output=0,this.occlusionTestEnabled=!0,this.sdf=!1,this.vvSize=!1,this.vvColor=!1,this.verticalOffset=!1,this.screenSizePerspective=!1,this.screenCenterOffsetUnitsEnabled=0,this.debugDrawBorder=!0,this.binaryHighlightOcclusion=!0,this.slicePlaneEnabled=!1,this.polygonOffsetEnabled=!1,this.depthEnabled=!0,this.transparencyPassType=3,this.pixelSnappingEnabled=!0,this.isDraped=!1,this.multipassGeometryEnabled=!1,this.multipassTerrainEnabled=!1,this.cullAboveGround=!1}}ge([M({count:8})],ke.prototype,"output",void 0),ge([M()],ke.prototype,"occlusionTestEnabled",void 0),ge([M()],ke.prototype,"sdf",void 0),ge([M()],ke.prototype,"vvSize",void 0),ge([M()],ke.prototype,"vvColor",void 0),ge([M()],ke.prototype,"verticalOffset",void 0),ge([M()],ke.prototype,"screenSizePerspective",void 0),ge([M({count:2})],ke.prototype,"screenCenterOffsetUnitsEnabled",void 0),ge([M()],ke.prototype,"debugDrawBorder",void 0),ge([M()],ke.prototype,"binaryHighlightOcclusion",void 0),ge([M()],ke.prototype,"slicePlaneEnabled",void 0),ge([M()],ke.prototype,"polygonOffsetEnabled",void 0),ge([M()],ke.prototype,"depthEnabled",void 0),ge([M({count:4})],ke.prototype,"transparencyPassType",void 0),ge([M()],ke.prototype,"pixelSnappingEnabled",void 0),ge([M()],ke.prototype,"isDraped",void 0),ge([M()],ke.prototype,"multipassGeometryEnabled",void 0),ge([M()],ke.prototype,"multipassTerrainEnabled",void 0),ge([M()],ke.prototype,"cullAboveGround",void 0);class We extends K{constructor(e){super(e,vt),this.techniqueConfig=new ke}getTechniqueConfig(e,t){return this.techniqueConfig.output=e,this.techniqueConfig.slicePlaneEnabled=this.params.slicePlaneEnabled,this.techniqueConfig.verticalOffset=!!this.params.verticalOffset,this.techniqueConfig.screenSizePerspective=!!this.params.screenSizePerspective,this.techniqueConfig.screenCenterOffsetUnitsEnabled="screen"===this.params.centerOffsetUnits?1:0,this.techniqueConfig.polygonOffsetEnabled=this.params.polygonOffset,this.techniqueConfig.isDraped=this.params.isDraped,this.techniqueConfig.occlusionTestEnabled=this.params.occlusionTest,this.techniqueConfig.pixelSnappingEnabled=this.params.pixelSnappingEnabled,this.techniqueConfig.sdf=this.params.textureIsSignedDistanceField,this.techniqueConfig.vvSize=!!this.params.vvSizeEnabled,this.techniqueConfig.vvColor=!!this.params.vvColorEnabled,0===e&&(this.techniqueConfig.debugDrawBorder=!!this.params.debugDrawBorder),4===e&&(this.techniqueConfig.binaryHighlightOcclusion=this.params.binaryHighlightOcclusion),this.techniqueConfig.depthEnabled=this.params.depthEnabled,this.techniqueConfig.transparencyPassType=t?t.transparencyPassType:3,this.techniqueConfig.multipassGeometryEnabled=!!t&&t.multipassGeometryEnabled,this.techniqueConfig.multipassTerrainEnabled=!!t&&t.multipassTerrainEnabled,this.techniqueConfig.cullAboveGround=!!t&&t.cullAboveGround,this.techniqueConfig}intersect(e,t,i,o,r,a,s,n,l){l?this.intersectDrapedHudGeometry(e,a,s,n):this.intersectHudGeometry(e,t,i,o,s,n)}intersectDrapedHudGeometry(e,t,i,o){const r=e.vertexAttributes.get("position"),a=e.vertexAttributes.get("size"),s=this.params,n=Re(s);let l=1,c=1;if(m(o)){const e=o(ct);l=e[0],c=e[5]}l*=e.screenToWorldRatio,c*=e.screenToWorldRatio;const d=pt*e.screenToWorldRatio;for(let o=0;o<r.data.length/r.size;o++){const p=o*r.size,u=r.data[p],f=r.data[p+1],v=o*a.size;let m;ut[0]=a.data[v]*l,ut[1]=a.data[v+1]*c,s.textureIsSignedDistanceField&&(m=s.outlineSize*e.screenToWorldRatio/2),Ze(t,u,f,ut,d,m,s,n)&&i()}}intersectHudGeometry(l,c,d,p,u,v){if(!p.options.selectionMode||!p.options.hud)return;if(de(c))return;const h=this.params;let x=1,y=1;if(g(rt,d),m(v)){const e=v(ct);x=e[0],y=e[5],function(e){const t=e[0],i=e[1],o=e[2],r=e[3],a=e[4],s=e[5],n=e[6],l=e[7],c=e[8],d=1/Math.sqrt(t*t+i*i+o*o),p=1/Math.sqrt(r*r+a*a+s*s),u=1/Math.sqrt(n*n+l*l+c*c);e[0]=t*d,e[1]=i*d,e[2]=o*d,e[3]=r*p,e[4]=a*p,e[5]=s*p,e[6]=n*u,e[7]=l*u,e[8]=c*u}(rt)}const P=l.vertexAttributes.get("position"),S=l.vertexAttributes.get("size"),C=l.vertexAttributes.get("normal"),O=l.vertexAttributes.get("auxpos1");re(P.size>=3);const w=p.point,z=p.camera,D=Re(h);x*=z.pixelRatio,y*=z.pixelRatio;const A="screen"===this.params.centerOffsetUnits;for(let l=0;l<P.data.length/P.size;l++){const c=l*P.size;e(Xe,P.data[c],P.data[c+1],P.data[c+2]),t(Xe,Xe,d);const v=l*S.size;ut[0]=S.data[v]*x,ut[1]=S.data[v+1]*y,t(Xe,Xe,z.viewMatrix);const m=l*O.size;if(e(nt,O.data[m+0],O.data[m+1],O.data[m+2]),!A&&(Xe[0]+=nt[0],Xe[1]+=nt[1],0!==nt[2])){const e=nt[2];i(nt,Xe),o(Xe,Xe,r(nt,nt,e))}const g=l*C.size;if(e(et,C.data[g],C.data[g+1],C.data[g+2]),this.normalAndViewAngle(et,rt,z,lt),this.applyVerticalOffsetTransformationView(Xe,lt,z,Je),z.applyProjection(Xe,tt),tt[0]>-1){let e=Math.floor(tt[0])+this.params.screenOffset[0],i=Math.floor(tt[1])+this.params.screenOffset[1];A&&(e+=nt[0],0!==nt[1]&&(i+=X(nt[1],Je.factorAlignment))),ee(ut,Je.factor,ut);const o=dt*z.pixelRatio;let l;if(h.textureIsSignedDistanceField&&(l=h.outlineSize*z.pixelRatio/2),Ze(w,e,i,ut,o,l,h,D)){const e=p.ray;if(t(ot,Xe,b(st,z.viewMatrix)),tt[0]=w[0],tt[1]=w[1],z.unprojectFromRenderScreen(tt,Xe)){const t=f();a(t,e.direction);const i=1/s(t);r(t,t,i);u(n(e.origin,Xe)*i,t,-1,1,!0,ot)}}}}}computeAttachmentOrigin(e,t){const i=e.vertexAttributes;if(!i)return!1;const o=i.get("position"),r=e.indices.get("position");return D(o,r,t)}createBufferWriter(){return new ht(this)}normalAndViewAngle(e,i,o,r){return Fe(i)&&(i=g(at,i)),l(r.normal,e,i),t(r.normal,r.normal,o.viewInverseTransposeMatrix),r.cosAngle=c(it,ft),r}updateScaleInfo(e,t,i){const o=this.params;o.screenSizePerspective?te(i,t,o.screenSizePerspective,e.factor):(e.factor.scale=1,e.factor.factor=0,e.factor.minPixelSize=0,e.factor.paddingPixels=0),o.screenSizePerspectiveAlignment?te(i,t,o.screenSizePerspectiveAlignment,e.factorAlignment):(e.factorAlignment.factor=e.factor.factor,e.factorAlignment.scale=e.factor.scale,e.factorAlignment.minPixelSize=e.factor.minPixelSize,e.factorAlignment.paddingPixels=e.factor.paddingPixels)}applyShaderOffsetsView(e,t,i,o,r,a,s){const n=this.normalAndViewAngle(t,i,r,lt);return this.applyVerticalGroundOffsetView(e,n,r,s),this.applyVerticalOffsetTransformationView(s,n,r,a),this.applyPolygonOffsetView(s,n,o[3],r,s),this.applyCenterOffsetView(s,o,s),s}applyShaderOffsetsNDC(e,t,i,o,r){return this.applyCenterOffsetNDC(e,t,i,o),m(r)&&a(r,o),this.applyPolygonOffsetNDC(o,t,i,o),o}applyPolygonOffsetView(e,t,i,o,s){const n=o.aboveGround?1:-1;let l=u(i);0===l&&(l=n);const c=n*l;if(this.params.shaderPolygonOffset<=0)return a(s,e);const p=d(Math.abs(t.cosAngle),.01,1),f=1-Math.sqrt(1-p*p)/p/o.viewport[2];return r(s,e,c>0?f:1/f),s}applyVerticalGroundOffsetView(e,t,i,o){const a=s(e),n=i.aboveGround?1:-1,l=.5*i.computeRenderPixelSizeAtDist(a),c=r(Xe,t.normal,n*l);return p(o,e,c),o}applyVerticalOffsetTransformationView(e,t,i,o){const a=this.params;if(!a.verticalOffset||!a.verticalOffset.screenLength){if(a.screenSizePerspective||a.screenSizePerspectiveAlignment){const i=s(e);this.updateScaleInfo(o,i,t.cosAngle)}else o.factor.scale=1,o.factorAlignment.scale=1;return e}const n=s(e),l=a.screenSizePerspectiveAlignment||a.screenSizePerspective,c=ie(i,n,a.verticalOffset,t.cosAngle,l);return this.updateScaleInfo(o,n,t.cosAngle),r(t.normal,t.normal,c),p(e,e,t.normal)}applyCenterOffsetView(e,t,o){const s="screen"!==this.params.centerOffsetUnits;return o!==e&&a(o,e),s&&(o[0]+=t[0],o[1]+=t[1],t[2]&&(i(et,o),p(o,o,r(et,et,t[2])))),o}applyCenterOffsetNDC(e,t,i,o){const r="screen"!==this.params.centerOffsetUnits;return o!==e&&a(o,e),r||(o[0]+=t[0]/i.fullWidth*2,o[1]+=t[1]/i.fullHeight*2),o}applyPolygonOffsetNDC(e,t,i,o){const r=this.params.shaderPolygonOffset;if(e!==o&&a(o,e),r){const e=i.aboveGround?1:-1,a=e*u(t[3]);o[2]-=(a||e)*r}return o}getGLMaterial(e){return 0===e.output||7===e.output?new Qe(e):4===e.output?new Ye(e):void 0}calculateRelativeScreenBounds(e,t,i=w()){return function(e,t,i,o=Ke){S(o,e.anchorPos),o[0]*=-t[0],o[1]*=-t[1],o[0]+=e.screenOffset[0]*i,o[1]+=e.screenOffset[1]*i}(this.params,e,t,i),i[2]=i[0]+e[0],i[3]=i[1]+e[1],i}}class Le extends A{constructor(e){super({...e,...e.material.params}),this.updateParameters()}beginSlot(e){return e===(this._material.params.drawInSecondSlot?20:19)||23===e}updateParameters(e){this.updateTexture(this._material.params.textureId),this.selectProgram(e)}selectProgram(e){this._technique=this._techniqueRep.releaseAndAcquire($e,this._material.getTechniqueConfig(this._output,e),this._technique)}ensureParameters(e){this.updateParameters(e)}bind(e){this.bindTextures(this._technique.program),this.bindTextureScale(this._technique.program),this._technique.bindPass(this._material.params,e)}}class Qe extends Le{constructor(e){super(e),this._isOcclusionSlot=!1}beginSlot(e){if(23===e)return!0;const t=this._material.params.drawInSecondSlot?20:19;return this._material.params.occlusionTest?(this._isOcclusionSlot=12===e,12===e||e===t):(this._isOcclusionSlot=!1,e===t)}get technique(){return this._isOcclusionSlot?this._occlusionTechnique:this._technique}selectProgram(e){this._technique=this._techniqueRep.releaseAndAcquire($e,this._material.getTechniqueConfig(this._output,e),this._technique),this._occlusionTechnique=this._techniqueRep.releaseAndAcquire($e,this._material.getTechniqueConfig(6,e),this._occlusionTechnique)}bind(e){const t=this.technique;this._isOcclusionSlot||(this.bindTextures(t.program),this.bindTextureScale(t.program)),t.bindPass(this._material.params,e)}}class Ye extends Le{constructor(e){super({...e,output:4})}}function Ze(e,t,i,o,r,a,s,n){let l=t-r-(n[0]>0?o[0]*n[0]:0),c=l+o[0]+2*r,d=i-r-(n[1]>0?o[1]*n[1]:0),p=d+o[1]+2*r;if(s.textureIsSignedDistanceField){const e=s.distanceFieldBoundingBox;l+=o[0]*e[0],d+=o[1]*e[1],c-=o[0]*(1-e[2]),p-=o[1]*(1-e[3]),l-=a,c+=a,d-=a,p+=a}return e[0]>l&&e[0]<c&&e[1]>d&&e[1]<p}const Je={factor:{scale:0,factor:0,minPixelSize:0,paddingPixels:0},factorAlignment:{scale:0,factor:0,minPixelSize:0,paddingPixels:0}},Ke=C(),Xe=f(),et=f(),tt=h(),it=f(),ot=f(),rt=x(),at=x(),st=y(),nt=f(),lt={normal:it,cosAngle:0},ct=y(),dt=1,pt=2,ut=[0,0],ft=v(0,0,1),vt={texCoordScale:[1,1],occlusionTest:!0,binaryHighlightOcclusion:!0,drawInSecondSlot:!1,color:[1,1,1,1],outlineColor:[1,1,1,1],outlineSize:0,textureIsSignedDistanceField:!1,distanceFieldBoundingBox:null,vvSizeEnabled:!1,vvSizeMinSize:[1,1,1],vvSizeMaxSize:[100,100,100],vvSizeOffset:[0,0,0],vvSizeFactor:[1,1,1],vvColorEnabled:!1,vvColorValues:[0,0,0,0,0,0,0,0],vvColorColors:[1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],screenOffset:[0,0],verticalOffset:null,screenSizePerspective:null,screenSizePerspectiveAlignment:null,slicePlaneEnabled:!1,anchorPos:O(.5,.5),shaderPolygonOffset:1e-5,polygonOffset:!1,textureId:null,centerOffsetUnits:"world",depthEnabled:!0,pixelSnappingEnabled:!0,debugDrawBorder:!1,isDraped:!1,...oe},mt=z().vec3f("position").vec3f("normal").vec2f("uv0").vec4u8("color").vec2f("size").vec4f("auxpos1").vec4f("auxpos2");class ht{constructor(e){this.material=e,this.vertexBufferLayout=mt}allocate(e){return this.vertexBufferLayout.createBuffer(e)}elementCount(e){return 6*e.indices.get("position").length}write(e,t,i,o){se(t.indices.get("position"),t.vertexAttributes.get("position").data,e.transformation,i.position,o,6),ne(t.indices.get("normal"),t.vertexAttributes.get("normal").data,e.invTranspTransformation,i.normal,o,6);{const e=t.vertexAttributes.get("uv0").data;let r,a,s,n;if(null==e||e.length<4){const e=this.material.params;r=0,a=0,s=e.texCoordScale[0],n=e.texCoordScale[1]}else r=e[0],a=e[1],s=e[2],n=e[3];s=Math.min(1.99999,s+1),n=Math.min(1.99999,n+1);const l=t.indices.get("position").length,c=i.uv0;let d=o;for(let e=0;e<l;++e)c.set(d,0,r),c.set(d,1,a),d+=1,c.set(d,0,s),c.set(d,1,a),d+=1,c.set(d,0,s),c.set(d,1,n),d+=1,c.set(d,0,s),c.set(d,1,n),d+=1,c.set(d,0,r),c.set(d,1,n),d+=1,c.set(d,0,r),c.set(d,1,a),d+=1}le(t.indices.get("color"),t.vertexAttributes.get("color").data,4,i.color,o,6);{const e=t.indices.get("size"),r=t.vertexAttributes.get("size").data,a=e.length,s=i.size;let n=o;for(let t=0;t<a;++t){const i=r[2*e[t]],o=r[2*e[t]+1];for(let e=0;e<6;++e)s.set(n,0,i),s.set(n,1,o),n+=1}}t.indices.get("auxpos1")&&t.vertexAttributes.get("auxpos1")&&ce(t.indices.get("auxpos1"),t.vertexAttributes.get("auxpos1").data,i.auxpos1,o,6),t.indices.get("auxpos2")&&t.vertexAttributes.get("auxpos2")&&ce(t.indices.get("auxpos2"),t.vertexAttributes.get("auxpos2").data,i.auxpos2,o,6)}}const gt=f();function xt(e,t,i,o,r,a,s,n,l,c){const d=i?i.length:0,p=e.clippingExtent;if(Se(t,gt,e.elevationProvider.spatialReference),m(p)&&!Ce(p,gt))return null;const u=e.renderCoordsHelper.spatialReference;Se(t,gt,u);const f=e.localOriginFactory.getOrigin(gt),v=new Te({castShadow:!1,metadata:{layerUid:n,graphicUid:l,usesVerticalDistanceToGround:!0}});for(let e=0;e<d;e++){const t=r?r[e]:P;v.addGeometry(i[e],o[e],t,a,f,c)}return{object:v,sampledElevation:Ae(v,t,e.elevationProvider,e.renderCoordsHelper,s)}}function bt(e,t,i){const o=e.elevationContext,r=i.spatialReference;Se(t,gt,r),o.centerPointInElevationSR=ze(gt[0],gt[1],t.hasZ?gt[2]:0,r)}function yt(e){switch(e.type){case"point":return e;case"polygon":case"extent":return je(e);case"polyline":{const t=e.paths[0];if(!t||0===t.length)return null;const i=Oe(t,we(t)/2);return ze(i[0],i[1],i[2],e.spatialReference)}case"mesh":return e.origin}return null}function Pt(e,t,i,o,r){const a=new Float64Array(3*e.length),s=new Float64Array(a.length);e.forEach(((e,t)=>{a[3*t+0]=e[0],a[3*t+1]=e[1],a[3*t+2]=e.length>2?e[2]:0}));const n=De(a,t,0,s,0,a,0,a.length/3,i,o,r),l=null!=n;return{numVertices:e.length,position:a,mapPosition:s,projectionSuccess:l,sampledElevation:n}}function St(e,t,i){switch(e){case"circle":return Ct(t,i);case"square":return Ot(t,i);case"cross":return zt(t,i);case"x":return Dt(t,i);case"kite":return wt(t,i);case"triangle":return At(t,i);default:return Ct(t,i)}}function Ct(e,t){const i=e,o=new Uint8Array(4*i*i),r=i/2-.5,a=t/2;for(let t=0;t<i;t++)for(let s=0;s<i;s++){const n=s+i*t,l=s-r,c=t-r;let d=Math.sqrt(l*l+c*c)-a;d=d/e+.5,ae(d,o,4*n)}return o}function Ot(e,t){return jt(e,t,!1)}function wt(e,t){return jt(e,t,!0)}function zt(e,t){return Tt(e,t,!1)}function Dt(e,t){return Tt(e,t,!0)}function At(e,t){const i=new Uint8Array(4*e*e),o=-.5,r=Math.sqrt(1.25),a=(e-t)/2;for(let s=0;s<e;s++)for(let n=0;n<e;n++){const l=s*e+n,c=(n-a)/t,d=(s-a+.75)/t,p=-(1*c+o*d)/r,u=(1*(c-1)+o*-d)/r,f=-d,v=Math.max(p,u,f);ae(v*t/e+.5,i,4*l)}return i}function jt(e,t,i){i&&(t/=Math.SQRT2);const o=new Uint8Array(4*e*e);for(let r=0;r<e;r++)for(let a=0;a<e;a++){let s=a-.5*e+.25,n=.5*e-r-.75;const l=r*e+a;if(i){const e=(s+n)/Math.SQRT2;n=(n-s)/Math.SQRT2,s=e}let c=Math.max(Math.abs(s),Math.abs(n))-.5*t;c=c/e+.5,ae(c,o,4*l)}return o}function Tt(e,t,i){i&&(t*=Math.SQRT2);const o=.5*t,r=new Uint8Array(4*e*e);for(let t=0;t<e;t++)for(let a=0;a<e;a++){let s=a-.5*e,n=.5*e-t-1;const l=t*e+a;if(i){const e=(s+n)/Math.SQRT2;n=(n-s)/Math.SQRT2,s=e}let c;s=Math.abs(s),n=Math.abs(n),c=s>n?s>o?Math.sqrt((s-o)*(s-o)+n*n):n:n>o?Math.sqrt(s*s+(n-o)*(n-o)):s,c=c/e+.5,ae(c,r,4*l)}return r}export{Ee as A,We as H,Ue as a,Ve as b,_e as c,xt as d,bt as e,At as f,Dt as g,zt as h,wt as i,Ot as j,Ct as k,St as l,qe as m,Pt as n,yt as p};
