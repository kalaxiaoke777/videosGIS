/**
 * 点位列表UI模块
 */
import { uiElements } from "./uiManager.js";

/**
 * 更新点位列表
 */
export function updatePointList(currentRegion) {
  if (!currentRegion) {
    uiElements.pointList.innerHTML =
      '<div class="hint-text" style="margin: 0;">暂无点位</div>';
    return;
  }

  uiElements.pointList.innerHTML = "";

  // 显示黄色点
  if (currentRegion.yellowPositions.length > 0) {
    const yellowHeader = document.createElement("div");
    yellowHeader.style.cssText =
      "font-weight: 600; color: #f39c12; margin-bottom: 8px; padding: 8px; background: #fff8e1; border-radius: 4px;";
    yellowHeader.textContent = `🟡 黄色顶点 (${currentRegion.yellowPositions.length})`;
    uiElements.pointList.appendChild(yellowHeader);

    currentRegion.yellowPositions.forEach((position, index) => {
      const cartographic = Cesium.Cartographic.fromCartesian(position);
      const lon = Cesium.Math.toDegrees(cartographic.longitude).toFixed(6);
      const lat = Cesium.Math.toDegrees(cartographic.latitude).toFixed(6);
      const height = cartographic.height.toFixed(2);

      const pointItem = document.createElement("div");
      pointItem.className = "point-item";
      pointItem.style.borderLeftColor = "#f39c12";
      pointItem.innerHTML = `
        <div class="point-item-header">黄点 ${index + 1}</div>
        <div class="point-coords">
          经度: ${lon}°<br>
          纬度: ${lat}°<br>
          高度: ${height}m
        </div>
      `;
      uiElements.pointList.appendChild(pointItem);
    });
  }

  // 显示红色点
  if (currentRegion.redPositions.length > 0) {
    const redHeader = document.createElement("div");
    redHeader.style.cssText =
      "font-weight: 600; color: #e74c3c; margin: 12px 0 8px 0; padding: 8px; background: #ffebee; border-radius: 4px;";
    redHeader.textContent = `🔴 红色切割点 (${currentRegion.redPositions.length})`;
    uiElements.pointList.appendChild(redHeader);

    currentRegion.redPositions.forEach((redPoint, index) => {
      const cartographic = Cesium.Cartographic.fromCartesian(redPoint.position);
      const lon = Cesium.Math.toDegrees(cartographic.longitude).toFixed(6);
      const lat = Cesium.Math.toDegrees(cartographic.latitude).toFixed(6);
      const height = cartographic.height.toFixed(2);

      const pointItem = document.createElement("div");
      pointItem.className = "point-item";
      pointItem.style.borderLeftColor = "#e74c3c";
      pointItem.innerHTML = `
        <div class="point-item-header">红点 ${index + 1} (边${
        redPoint.edgeIndex + 1
      })</div>
        <div class="point-coords">
          经度: ${lon}°<br>
          纬度: ${lat}°<br>
          高度: ${height}m
        </div>
      `;
      uiElements.pointList.appendChild(pointItem);
    });
  }

  if (
    currentRegion.yellowPositions.length === 0 &&
    currentRegion.redPositions.length === 0
  ) {
    uiElements.pointList.innerHTML =
      '<div class="hint-text" style="margin: 0;">暂无点位</div>';
  }
}
