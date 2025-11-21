/**
 * 应用状态管理
 */
export class AppState {
  constructor() {
    this.viewer = null;
    this.regionManager = null;
    this.pointManager = null;
    this.polygonManager = null;
    this.drawingManager = null;
    this.handler = null;
    this.snapEnabled = true;
    this.snapIndicator = null;
  }

  setViewer(viewer) {
    this.viewer = viewer;
  }

  setManagers(regionManager, pointManager, polygonManager, drawingManager) {
    this.regionManager = regionManager;
    this.pointManager = pointManager;
    this.polygonManager = polygonManager;
    this.drawingManager = drawingManager;
  }

  setHandler(handler) {
    this.handler = handler;
  }

  setSnapEnabled(enabled) {
    this.snapEnabled = enabled;
  }

  setSnapIndicator(indicator) {
    this.snapIndicator = indicator;
  }
}

export const appState = new AppState();
