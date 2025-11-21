/**
 * 绘制操作处理模块
 */
import { uiElements, updateStatus } from "../ui/uiManager.js";

/**
 * 开始绘制
 */
export function handleStartDraw(appState, updateUICallback) {
  const currentRegion = appState.regionManager.getCurrentRegion();
  if (!currentRegion) return;

  appState.drawingManager.startDrawing(currentRegion);

  uiElements.btnStartDraw.disabled = true;
  uiElements.btnFinishDraw.disabled = false;
  uiElements.drawHint.textContent =
    "在地图上点击添加4个黄色顶点（视频的四个角）";
  updateUICallback();
  updateStatus("绘制中...");
}

/**
 * 完成绘制
 */
export function handleFinishDraw(appState, updateUICallback) {
  const currentRegion = appState.regionManager.getCurrentRegion();
  if (!currentRegion) return;

  const success = appState.drawingManager.finishDrawing(currentRegion);

  if (success) {
    uiElements.btnStartDraw.disabled = true;
    uiElements.btnFinishDraw.disabled = true;
    uiElements.btnAddPoint.disabled = true;
    uiElements.btnAddRedPoint.disabled = false;
    uiElements.btnClearDraw.disabled = false;
    uiElements.drawHint.textContent =
      "已完成！可以拖动黄点调整视频大小，或添加红点进行切割";
    updateStatus("视频映射成功 - 可编辑模式");
  } else {
    uiElements.drawHint.textContent = "必须绘制4个黄色顶点";
    updateStatus("绘制失败 - 需要4个点", false);
  }

  updateUICallback();
}

/**
 * 添加红点按钮
 */
export function handleAddRedPoint(appState) {
  const currentRegion = appState.regionManager.getCurrentRegion();
  if (!appState.drawingManager.editMode || !currentRegion) return;

  const isActive = appState.drawingManager.toggleRedPointMode();

  if (isActive) {
    uiElements.btnAddRedPoint.textContent = "✓ 完成添加红点";
    uiElements.btnAddRedPoint.classList.remove("btn-danger");
    uiElements.btnAddRedPoint.classList.add("btn-success");
    uiElements.drawHint.textContent =
      "点击黄色边缘添加红色切割点（只能向内切割）";
    updateStatus("添加红点模式");
  } else {
    uiElements.btnAddRedPoint.textContent = "➕ 添加红点（切割）";
    uiElements.btnAddRedPoint.classList.remove("btn-success");
    uiElements.btnAddRedPoint.classList.add("btn-danger");
    uiElements.drawHint.textContent =
      "已完成！可以拖动黄点调整视频大小，或添加红点进行切割";
    updateStatus("编辑模式");
  }
}

/**
 * 清除当前区域
 */
export function handleClearDraw(appState, updateUICallback) {
  const currentRegion = appState.regionManager.getCurrentRegion();
  if (!currentRegion) return;

  if (!confirm(`确定要清除 ${currentRegion.name} 的绘制内容吗？`)) return;

  appState.drawingManager.clearDrawing(currentRegion);

  uiElements.btnStartDraw.disabled = false;
  uiElements.btnFinishDraw.disabled = true;
  uiElements.btnAddPoint.disabled = true;
  uiElements.btnAddRedPoint.disabled = true;
  uiElements.drawHint.textContent =
    '点击"开始绘制"后，在地图上依次点击添加4个黄色顶点';

  updateUICallback();
  updateStatus("已清除绘制内容");
}
