/**
 * 区域操作处理模块
 */
import { uiElements, updateStatus } from "../ui/uiManager.js";
import { createVideoElement } from "../utils/videoUtils.js";

/**
 * 新建视频区域
 */
export function handleAddRegion(appState, updateUICallback) {
  const region = appState.regionManager.createRegion(createVideoElement);
  selectRegion(appState, region, updateUICallback);
  updateUICallback();
  updateStatus(`已创建 ${region.name}`);
}

/**
 * 选择视频区域
 */
export function selectRegion(appState, region, updateUICallback) {
  // 退出之前的状态
  appState.drawingManager.exitEditMode();

  appState.regionManager.selectRegion(region);

  // 更新按钮状态
  if (region.isComplete) {
    uiElements.btnStartDraw.disabled = true;
    uiElements.btnFinishDraw.disabled = true;
    uiElements.btnAddPoint.disabled = true;
    uiElements.btnAddRedPoint.disabled = false;
    uiElements.btnClearDraw.disabled = false;
    uiElements.drawHint.textContent =
      "已完成！可以拖动黄点调整视频大小，或添加红点进行切割";
    appState.drawingManager.enterEditMode(region);
  } else {
    uiElements.btnStartDraw.disabled = false;
    uiElements.btnFinishDraw.disabled = true;
    uiElements.btnAddPoint.disabled = true;
    uiElements.btnAddRedPoint.disabled = true;
    uiElements.btnClearDraw.disabled = false;
    uiElements.drawHint.textContent =
      '点击"开始绘制"后，在地图上依次点击添加4个黄色顶点';
  }

  updateUICallback();
  updateStatus(`已选择 ${region.name}`);
}

/**
 * 删除视频区域
 */
export function deleteRegion(appState, region, updateUICallback) {
  if (!confirm(`确定要删除 ${region.name} 吗？`)) return;

  appState.regionManager.deleteRegion(appState.viewer, region);

  // 如果删除的是当前区域，清空选择
  if (appState.regionManager.getCurrentRegion() === null) {
    uiElements.btnStartDraw.disabled = true;
    uiElements.btnFinishDraw.disabled = true;
    uiElements.btnAddPoint.disabled = true;
    uiElements.btnAddRedPoint.disabled = true;
    uiElements.btnClearDraw.disabled = true;
    uiElements.drawHint.textContent = "请先选择或新建一个视频区域";
    appState.drawingManager.exitEditMode();
  }

  updateUICallback();
  updateStatus(`已删除 ${region.name}`);
}
