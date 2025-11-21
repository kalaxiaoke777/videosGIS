/**
 * 导入导出处理模块
 */
import { updateStatus } from "../ui/uiManager.js";
import { createVideoElement } from "../utils/videoUtils.js";

/**
 * 导出配置
 */
export function handleExport(appState) {
  const allRegions = appState.regionManager.getAllRegions();
  if (allRegions.length === 0) {
    alert("没有可导出的视频区域");
    return;
  }

  const config = appState.regionManager.exportConfig();
  const json = JSON.stringify(config, null, 2);

  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "video_regions_config.json";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);

  alert("导出成功！已保存所有视频区域配置");
}

/**
 * 导入配置
 */
export function handleImport(
  appState,
  file,
  selectRegionCallback,
  updateUICallback
) {
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    try {
      const config = JSON.parse(reader.result);
      appState.regionManager.importConfig(
        appState.viewer,
        config,
        createVideoElement
      );

      // 为每个区域创建多边形
      const allRegions = appState.regionManager.getAllRegions();
      allRegions.forEach((region) => {
        if (region.isComplete) {
          appState.polygonManager.createVideoPolygon(region);
        }
      });

      // 选择第一个区域
      if (allRegions.length > 0) {
        selectRegionCallback(allRegions[0]);
      }

      updateUICallback();
      updateStatus(`已导入 ${allRegions.length} 个视频区域`);
    } catch (err) {
      alert("解析 JSON 失败: " + err);
      console.error(err);
    }
  };
  reader.readAsText(file);
}
