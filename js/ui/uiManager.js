/**
 * UI管理模块
 */

// UI 元素引用
export const uiElements = {
  statusText: null,
  drawHint: null,
  pointCount: null,
  videoStatus: null,
  currentRegionName: null,
  totalRegions: null,
  rotationSlider: null,
  rotationValue: null,
  rotationSection: null,
  pointListSection: null,
  videoSourceSection: null,
  currentVideoFile: null,
  btnAddRegion: null,
  btnStartDraw: null,
  btnFinishDraw: null,
  btnAddPoint: null,
  btnAddRedPoint: null,
  btnClearDraw: null,
  btnResetRotation: null,
  btnExport: null,
  btnImport: null,
  importFileInput: null,
  videoFileInput: null,
  regionList: null,
  pointList: null,
  enableSnapCheckbox: null,
};

/**
 * 初始化UI元素引用
 */
export function initUIElements() {
  uiElements.statusText = document.getElementById("statusText");
  uiElements.drawHint = document.getElementById("drawHint");
  uiElements.pointCount = document.getElementById("pointCount");
  uiElements.videoStatus = document.getElementById("videoStatus");
  uiElements.currentRegionName = document.getElementById("currentRegionName");
  uiElements.totalRegions = document.getElementById("totalRegions");
  uiElements.rotationSlider = document.getElementById("rotationSlider");
  uiElements.rotationValue = document.getElementById("rotationValue");
  uiElements.rotationSection = document.getElementById("rotationSection");
  uiElements.pointListSection = document.getElementById("pointListSection");
  uiElements.videoSourceSection = document.getElementById("videoSourceSection");
  uiElements.currentVideoFile = document.getElementById("currentVideoFile");
  uiElements.btnAddRegion = document.getElementById("btnAddRegion");
  uiElements.btnStartDraw = document.getElementById("btnStartDraw");
  uiElements.btnFinishDraw = document.getElementById("btnFinishDraw");
  uiElements.btnAddPoint = document.getElementById("btnAddPoint");
  uiElements.btnAddRedPoint = document.getElementById("btnAddRedPoint");
  uiElements.btnClearDraw = document.getElementById("btnClearDraw");
  uiElements.btnResetRotation = document.getElementById("btnResetRotation");
  uiElements.btnExport = document.getElementById("btnExport");
  uiElements.btnImport = document.getElementById("btnImport");
  uiElements.importFileInput = document.getElementById("importFileInput");
  uiElements.videoFileInput = document.getElementById("videoFileInput");
  uiElements.regionList = document.getElementById("regionList");
  uiElements.pointList = document.getElementById("pointList");
  uiElements.enableSnapCheckbox = document.getElementById("enableSnap");
}

/**
 * 更新状态栏
 */
export function updateStatus(text, isSuccess = true) {
  uiElements.statusText.textContent = text;
  uiElements.statusText.style.background = isSuccess
    ? "rgba(76, 175, 80, 0.3)"
    : "rgba(244, 67, 54, 0.3)";
}

/**
 * 更新主UI
 */
export function updateUI(regionManager) {
  const currentRegion = regionManager.getCurrentRegion();
  const allRegions = regionManager.getAllRegions();

  uiElements.totalRegions.textContent = allRegions.length;

  if (currentRegion) {
    uiElements.currentRegionName.textContent = currentRegion.name;
    const totalPoints =
      currentRegion.yellowPositions.length + currentRegion.redPositions.length;
    uiElements.pointCount.textContent = `${currentRegion.yellowPositions.length}黄 + ${currentRegion.redPositions.length}红 = ${totalPoints}`;
    uiElements.rotationSlider.value = Cesium.Math.toDegrees(
      currentRegion.rotation
    );
    uiElements.rotationValue.textContent = `${Cesium.Math.toDegrees(
      currentRegion.rotation
    ).toFixed(0)}°`;
    uiElements.currentVideoFile.textContent = currentRegion.videoSrc;

    if (currentRegion.isComplete) {
      uiElements.videoStatus.textContent = "已映射";
      uiElements.rotationSection.style.display = "block";
      uiElements.videoSourceSection.style.display = "block";
      uiElements.pointListSection.style.display = "block";
    } else {
      uiElements.videoStatus.textContent = "绘制中";
      uiElements.rotationSection.style.display = "none";
      uiElements.videoSourceSection.style.display = "none";
      uiElements.pointListSection.style.display = "block";
    }
  } else {
    uiElements.currentRegionName.textContent = "未选择";
    uiElements.pointCount.textContent = "0";
    uiElements.videoStatus.textContent = "未加载";
    uiElements.rotationSection.style.display = "none";
    uiElements.videoSourceSection.style.display = "none";
    uiElements.pointListSection.style.display = "none";
  }
}
