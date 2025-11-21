/**
 * 鼠标事件处理模块
 */
import { screenToCartesian3 } from "../utils/geometryUtils.js";
import {
  findSnapTarget,
  updateSnapIndicator,
  hideSnapIndicator,
} from "../utils/snapUtils.js";
import { updateStatus } from "../ui/uiManager.js";

/**
 * 初始化鼠标事件处理器
 */
export function initMouseHandlers(appState, updateUICallback) {
  const handler = new Cesium.ScreenSpaceEventHandler(
    appState.viewer.scene.canvas
  );

  // 鼠标点击事件 - 添加点位
  handler.setInputAction((movement) => {
    handleMouseClick(appState, movement, updateUICallback);
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

  // 鼠标按下事件 - 开始拖动
  handler.setInputAction((movement) => {
    handleMouseDown(appState, movement);
  }, Cesium.ScreenSpaceEventType.LEFT_DOWN);

  // 鼠标移动事件 - 拖动点位或显示预览
  handler.setInputAction((movement) => {
    handleMouseMove(appState, movement, updateUICallback);
  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

  // 鼠标释放事件 - 结束拖动
  handler.setInputAction(() => {
    handleMouseUp(appState);
  }, Cesium.ScreenSpaceEventType.LEFT_UP);

  appState.setHandler(handler);
}

/**
 * 处理鼠标点击
 */
function handleMouseClick(appState, movement, updateUICallback) {
  const currentRegion = appState.regionManager.getCurrentRegion();
  if (!currentRegion) return;

  // 绘制模式 - 添加4个黄点
  if (appState.drawingManager.drawing) {
    const position = screenToCartesian3(appState.viewer, movement.position);
    if (!position) return;

    const success = appState.drawingManager.addYellowPointInDrawing(
      currentRegion,
      position
    );
    if (success) {
      updateUICallback();
      if (currentRegion.yellowPositions.length === 4) {
        updateStatus("已添加4个黄点，请点击完成绘制");
      }
    } else {
      updateStatus("已达到4个黄色顶点，请完成绘制", false);
    }
    return;
  }

  // 添加红点模式
  if (appState.drawingManager.addingRedPoint) {
    const position = screenToCartesian3(appState.viewer, movement.position);
    if (!position) return;

    const result = appState.drawingManager.addRedPoint(currentRegion, position);
    updateStatus(result.message, result.success);
    if (result.success) {
      updateUICallback();
    }
    return;
  }
}

/**
 * 处理鼠标按下
 */
function handleMouseDown(appState, movement) {
  const currentRegion = appState.regionManager.getCurrentRegion();
  if (!appState.drawingManager.editMode || !currentRegion) return;

  const pickedObject = appState.viewer.scene.pick(movement.position);
  appState.drawingManager.startDragging(pickedObject, currentRegion);
}

/**
 * 处理鼠标移动
 */
function handleMouseMove(appState, movement, updateUICallback) {
  const currentRegion = appState.regionManager.getCurrentRegion();
  if (!currentRegion) return;

  // 正在拖动点位
  if (appState.drawingManager.isDragging()) {
    let position = screenToCartesian3(appState.viewer, movement.endPosition);
    if (!position) return;

    // 黄点拖动时的捕捉功能
    if (
      appState.drawingManager.draggedPointInfo.type === "yellow" &&
      appState.snapEnabled
    ) {
      const snapResult = findSnapTarget(
        appState.viewer,
        position,
        appState.regionManager.getAllRegions(),
        currentRegion
      );

      if (snapResult) {
        position = snapResult.position;
        appState.snapIndicator = updateSnapIndicator(
          appState.viewer,
          position,
          appState.snapIndicator
        );
      } else if (appState.snapIndicator) {
        hideSnapIndicator(appState.snapIndicator);
      }
    } else if (appState.snapIndicator) {
      hideSnapIndicator(appState.snapIndicator);
    }

    const result = appState.drawingManager.dragPoint(currentRegion, position);
    if (result.success) {
      updateUICallback();
    }
    return;
  }

  // 添加红点模式 - 显示预览
  if (appState.drawingManager.addingRedPoint) {
    appState.drawingManager.updatePreviewLine(
      currentRegion,
      movement.endPosition
    );
  }
}

/**
 * 处理鼠标释放
 */
function handleMouseUp(appState) {
  appState.drawingManager.stopDragging();
  if (appState.snapIndicator) {
    hideSnapIndicator(appState.snapIndicator);
  }
}
