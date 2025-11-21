/**
 * Cesium 初始化模块
 */
import { CESIUM_TOKEN, VIEWER_CONFIG } from "../config.js";

/**
 * 初始化 Cesium Viewer
 */
export function initCesiumViewer() {
  Cesium.Ion.defaultAccessToken = CESIUM_TOKEN;

  const viewer = new Cesium.Viewer("cesiumContainer", VIEWER_CONFIG);

  // 添加默认的 OpenStreetMap 底图（无需 Token）
  viewer.imageryLayers.removeAll();
  viewer.imageryLayers.addImageryProvider(
    new Cesium.OpenStreetMapImageryProvider({
      url: "https://a.tile.openstreetmap.org/",
    })
  );

  viewer.cesiumWidget.creditContainer.style.display = "none";
  console.log("Cesium Viewer 初始化成功");

  return viewer;
}
