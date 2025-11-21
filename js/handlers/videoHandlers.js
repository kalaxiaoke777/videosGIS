/**
 * 视频控制处理模块
 */
import { uiElements, updateStatus } from "../ui/uiManager.js";
import { createVideoElement } from "../utils/videoUtils.js";

/**
 * 旋转角度滑块
 */
export function handleRotationChange(appState, degrees) {
  const currentRegion = appState.regionManager.getCurrentRegion();
  if (!currentRegion) return;

  currentRegion.rotation = Cesium.Math.toRadians(degrees);
  uiElements.rotationValue.textContent = `${degrees}°`;

  if (currentRegion.polygonEntity) {
    appState.polygonManager.updateVideoRotation(currentRegion);
  }
}

/**
 * 重置旋转角度
 */
export function handleResetRotation(appState) {
  const currentRegion = appState.regionManager.getCurrentRegion();
  if (!currentRegion) return;

  currentRegion.rotation = 0;
  uiElements.rotationSlider.value = 0;
  uiElements.rotationValue.textContent = "0°";

  if (currentRegion.polygonEntity) {
    appState.polygonManager.updateVideoRotation(currentRegion);
  }
}

/**
 * 视频文件选择
 */
export function handleVideoFileChange(appState, file, updateUICallback) {
  const currentRegion = appState.regionManager.getCurrentRegion();
  if (!currentRegion || !file) return;

  const url = URL.createObjectURL(file);

  // 移除旧的视频元素
  if (currentRegion.videoElement) {
    currentRegion.videoElement.remove();
  }

  // 创建新的视频元素
  currentRegion.videoSrc = file.name;
  currentRegion.videoElement = createVideoElement(url);

  // 更新多边形材质
  if (currentRegion.polygonEntity && currentRegion.isComplete) {
    appState.polygonManager.createVideoPolygon(currentRegion);
  }

  updateUICallback();
  updateStatus(`已更新视频源: ${file.name}`);
}
