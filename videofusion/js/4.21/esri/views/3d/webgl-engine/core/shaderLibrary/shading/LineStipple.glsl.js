// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.21/esri/copyright.txt for details.
//>>built
define(["exports","../../../../support/debugFlags","../util/RgbaFloatEncoding.glsl","../../shaderModules/interfaces"],function(e,f,g,b){e.LineStipple=function(a,c){a.constants.add("stippleAlphaColorDiscard","float",.001);a.constants.add("stippleAlphaHighlightDiscard","float",.5);if(c.stippleEnabled){{a.fragment.include(g.RgbaFloatEncoding);const d=c.draped&&f.ENABLE_CONTINUOUS_LINE_PATTERNS;d?a.vertex.uniforms.add("worldToScreenRatio","float"):a.vertex.uniforms.add("stipplePatternPixelSizeInv","float");
c.stippleUVMaxEnabled&&a.varyings.add("stipplePatternUvMax","float");a.varyings.add("stipplePatternUv","float");a.fragment.uniforms.add("stipplePatternTexture","sampler2D");a.fragment.uniforms.add("stipplePatternSDFNormalizer","float");d&&a.fragment.uniforms.add("stipplePatternPixelSizeInv","float");c.stippleOffColorEnabled&&a.fragment.uniforms.add("stippleOffColor","vec4");d?a.fragment.code.add(b.glsl`float getStippleValue() {
return rgba2float(texture2D(stipplePatternTexture, vec2(mod(stipplePatternUv * stipplePatternPixelSizeInv, 1.0), 0.5)));
}`):a.fragment.code.add(b.glsl`
      float getStippleValue() {
        float stipplePatternUvClamped = stipplePatternUv * gl_FragCoord.w;
        ${c.stippleUVMaxEnabled?"stipplePatternUvClamped \x3d clamp(stipplePatternUvClamped, 0.0, stipplePatternUvMax);":""}
        return rgba2float(texture2D(stipplePatternTexture, vec2(mod(stipplePatternUvClamped, 1.0), 0.5)));
      }
    `);a.fragment.code.add(b.glsl`float getStippleSDF() {
return (getStippleValue() * 2.0 - 1.0) * stipplePatternSDFNormalizer;
}
float getStippleAlpha() {
return clamp(getStippleSDF() + 0.5, 0.0, 1.0);
}`);c.stippleOffColorEnabled?a.fragment.code.add(b.glsl`#define discardByStippleAlpha(stippleAlpha, threshold) {}
#define blendStipple(color, stippleAlpha) mix(color, stippleOffColor, stippleAlpha)`):a.fragment.code.add(b.glsl`#define discardByStippleAlpha(stippleAlpha, threshold) if (stippleAlpha < threshold) { discard; }
#define blendStipple(color, stippleAlpha) vec4(color.rgb, color.a * stippleAlpha)`)}}else a.fragment.code.add(b.glsl`float getStippleAlpha() { return 1.0; }
#define discardByStippleAlpha(_stippleAlpha_, _threshold_) {}
#define blendStipple(color, _stippleAlpha_) color`)};Object.defineProperty(e,"__esModule",{value:!0})});