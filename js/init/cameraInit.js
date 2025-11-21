/**
 * 相机初始化模块
 */

/**
 * 加载相机配置并定位
 */
export function initCamera(viewer, updateStatus) {
  fetch("data/camera_config.json")
    .then((r) => r.json())
    .then((cfg) => {
      console.log("相机配置加载成功:", cfg);
      const lon = cfg.extrinsic.lon;
      const lat = cfg.extrinsic.lat;
      const height = cfg.extrinsic.height || 500;

      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(lon, lat, height),
        orientation: {
          heading: Cesium.Math.toRadians(cfg.extrinsic.heading || 0),
          pitch: Cesium.Math.toRadians(cfg.extrinsic.pitch || -45),
          roll: Cesium.Math.toRadians(cfg.extrinsic.roll || 0),
        },
        duration: 3,
        complete: () => {
          console.log("相机定位完成");
          updateStatus("相机定位完成");
        },
      });
    })
    .catch((e) => {
      console.error("加载 camera_config.json 失败:", e);
      updateStatus("配置加载失败", false);

      // 使用默认位置
      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(121.420765, 29.67175, 500),
        duration: 3,
      });
    });
}
