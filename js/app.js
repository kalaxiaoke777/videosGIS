/**
 * 多视频融合地图系统 - 主应用脚本
 * 使用 Cesium 在地图上绘制多边形区域，并将视频投放到绘制的区域上
 */

// 设置 Cesium Ion Token
Cesium.Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkOGFjOTU5Zi0xOTU1LTRlOTctOTg4Ny05MGJmYmNhMDdhNTgiLCJpZCI6MTUxNTAxLCJpYXQiOjE3MDUzOTQ0OTl9.8SXHmK_7zqWsYcIY5GLJbeez-4JTQo9ePfpKV8Q5Stg";

// 初始化 Cesium Viewer
const viewer = new Cesium.Viewer("cesiumContainer", {
  baseLayerPicker: false,
  geocoder: false,
  homeButton: false,
  sceneModePicker: false,
  navigationHelpButton: false,
  timeline: false,
  animation: false,
  fullscreenButton: false,
  vrButton: false,
  shouldAnimate: true,
  terrain: Cesium.Terrain.fromWorldTerrain(),
});

// 隐藏版权信息
viewer.cesiumWidget.creditContainer.style.display = "none";
console.log("Cesium Viewer 初始化成功");

// ==================== 数据结构 ====================
// 视频区域数据结构
class VideoRegion {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.positions = []; // Cartesian3 数组
    this.rotation = 0; // 旋转角度（弧度）
    this.videoSrc = "data/data_clipped_30s.mp4"; // 视频源
    this.videoElement = null; // video DOM元素
    this.polygonEntity = null; // Cesium 多边形实体
    this.pointEntities = []; // 点标记实体
    this.isComplete = false; // 是否完成绘制
  }
}

// 全局状态
let videoRegions = []; // 所有视频区域
let currentRegion = null; // 当前选中的区域
let regionIdCounter = 1; // 区域ID计数器

// 绘制状态
let drawing = false;
let editMode = false;
let addingPoint = false;
let draggedPointIndex = -1;
let previewLine = null;
let drawEntity = null; // 临时绘制实体

const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

// ==================== UI 元素 ====================
const statusText = document.getElementById("statusText");
const drawHint = document.getElementById("drawHint");
const pointCount = document.getElementById("pointCount");
const videoStatus = document.getElementById("videoStatus");
const currentRegionName = document.getElementById("currentRegionName");
const totalRegions = document.getElementById("totalRegions");
const rotationSlider = document.getElementById("rotationSlider");
const rotationValue = document.getElementById("rotationValue");
const rotationSection = document.getElementById("rotationSection");
const pointListSection = document.getElementById("pointListSection");
const videoSourceSection = document.getElementById("videoSourceSection");
const currentVideoFile = document.getElementById("currentVideoFile");
const btnAddRegion = document.getElementById("btnAddRegion");
const btnStartDraw = document.getElementById("btnStartDraw");
const btnFinishDraw = document.getElementById("btnFinishDraw");
const btnAddPoint = document.getElementById("btnAddPoint");
const btnClearDraw = document.getElementById("btnClearDraw");
const btnResetRotation = document.getElementById("btnResetRotation");
const btnExport = document.getElementById("btnExport");
const btnImport = document.getElementById("btnImport");
const importFileInput = document.getElementById("importFileInput");
const videoFileInput = document.getElementById("videoFileInput");
const regionList = document.getElementById("regionList");
const pointList = document.getElementById("pointList");
const enableSnapCheckbox = document.getElementById("enableSnap");

// 捕捉功能开关状态
let snapEnabled = true;

// ==================== 工具函数 ====================
function updateStatus(text, isSuccess = true) {
  statusText.textContent = text;
  statusText.style.background = isSuccess
    ? "rgba(76, 175, 80, 0.3)"
    : "rgba(244, 67, 54, 0.3)";
}

function updateUI() {
  totalRegions.textContent = videoRegions.length;

  if (currentRegion) {
    currentRegionName.textContent = currentRegion.name;
    pointCount.textContent = currentRegion.positions.length;
    rotationSlider.value = Cesium.Math.toDegrees(currentRegion.rotation);
    rotationValue.textContent = `${Cesium.Math.toDegrees(
      currentRegion.rotation
    ).toFixed(0)}°`;
    currentVideoFile.textContent = currentRegion.videoSrc;

    if (currentRegion.isComplete) {
      videoStatus.textContent = "已映射";
      rotationSection.style.display = "block";
      videoSourceSection.style.display = "block";
      pointListSection.style.display = "block";
    } else {
      videoStatus.textContent = "绘制中";
      rotationSection.style.display = "none";
      videoSourceSection.style.display = "none";
      pointListSection.style.display = "block";
    }
  } else {
    currentRegionName.textContent = "未选择";
    pointCount.textContent = "0";
    videoStatus.textContent = "未加载";
    rotationSection.style.display = "none";
    videoSourceSection.style.display = "none";
    pointListSection.style.display = "none";
  }

  updateRegionList();
  updatePointList();
}

// 创建视频元素
function createVideoElement(src) {
  const video = document.createElement("video");
  video.src = src;
  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  video.autoplay = true;
  video.style.display = "none";
  document.body.appendChild(video);

  video.addEventListener("loadedmetadata", () => {
    console.log(`视频加载成功: ${src}`);
    video.play().catch((e) => console.warn("自动播放失败:", e));
  });
  return video;
}

// 监听捕捉功能开关
enableSnapCheckbox.addEventListener("change", (e) => {
  snapEnabled = e.target.checked;
  if (!snapEnabled && window.snapIndicator) {
    window.snapIndicator.show = false;
  }
  console.log(`边缘捕捉功能: ${snapEnabled ? "启用" : "禁用"}`);
});

// ==================== 视频区域管理 ====================
// 新建视频区域
btnAddRegion.onclick = () => {
  const region = new VideoRegion(
    regionIdCounter++,
    `区域 ${regionIdCounter - 1}`
  );
  region.videoElement = createVideoElement(region.videoSrc);
  videoRegions.push(region);
  selectRegion(region);
  updateUI();
  updateStatus(`已创建 ${region.name}`);
};

// 选择视频区域
function selectRegion(region) {
  // 取消之前的编辑状态
  if (drawing) {
    drawing = false;
    btnStartDraw.disabled = false;
    btnFinishDraw.disabled = true;
  }
  if (editMode) {
    editMode = false;
  }
  if (addingPoint) {
    addingPoint = false;
    btnAddPoint.textContent = "➕ 添加点位";
    btnAddPoint.classList.remove("btn-success");
    btnAddPoint.classList.add("btn-primary");
  }

  // 移除临时绘制实体
  if (drawEntity) {
    viewer.entities.remove(drawEntity);
    drawEntity = null;
  }
  if (previewLine) {
    viewer.entities.remove(previewLine);
    previewLine = null;
  }

  currentRegion = region;

  // 启用绘制按钮
  if (region.isComplete) {
    btnStartDraw.disabled = true;
    btnFinishDraw.disabled = true;
    btnAddPoint.disabled = false;
    btnClearDraw.disabled = false;
    editMode = true;
    drawHint.textContent = "绘制完成！可以拖动点位调整形状或添加新点";
    createEditablePoints();
  } else {
    btnStartDraw.disabled = false;
    btnFinishDraw.disabled = true;
    btnAddPoint.disabled = true;
    btnClearDraw.disabled = false;
    drawHint.textContent = '点击"开始绘制"后，在地图上依次点击添加多边形顶点';
  }

  updateUI();
  updateStatus(`已选择 ${region.name}`);
}

// 删除视频区域
function deleteRegion(region) {
  if (!confirm(`确定要删除 ${region.name} 吗？`)) return;

  // 移除多边形实体
  if (region.polygonEntity) {
    viewer.entities.remove(region.polygonEntity);
  }

  // 移除点标记
  region.pointEntities.forEach((entity) => {
    if (entity) viewer.entities.remove(entity);
  });

  // 移除视频元素
  if (region.videoElement) {
    region.videoElement.remove();
  }

  // 从数组中移除
  const index = videoRegions.indexOf(region);
  if (index > -1) {
    videoRegions.splice(index, 1);
  }

  // 如果删除的是当前区域，清空选择
  if (currentRegion === region) {
    currentRegion = null;
    btnStartDraw.disabled = true;
    btnFinishDraw.disabled = true;
    btnAddPoint.disabled = true;
    btnClearDraw.disabled = true;
    drawHint.textContent = "请先选择或新建一个视频区域";
  }

  updateUI();
  updateStatus(`已删除 ${region.name}`);
}

// 更新视频区域列表
function updateRegionList() {
  if (videoRegions.length === 0) {
    regionList.innerHTML = `
      <div class="hint-text" style="margin: 0; text-align: center;">
        暂无视频区域，点击上方按钮新建
      </div>
    `;
    return;
  }

  regionList.innerHTML = "";
  videoRegions.forEach((region) => {
    const item = document.createElement("div");
    item.className = "video-region-item";
    if (region === currentRegion) {
      item.classList.add("active");
    }

    item.innerHTML = `
      <div class="video-region-header">
        <span class="video-region-name">${region.name}</span>
        <div class="video-region-actions">
          <button class="icon-btn btn-edit" title="编辑">✏️</button>
          <button class="icon-btn btn-delete" title="删除">🗑️</button>
        </div>
      </div>
      <div class="video-region-info">
        点位: ${region.positions.length} | 状态: ${
      region.isComplete ? "已完成" : "未完成"
    }
      </div>
    `;

    // 点击选择
    item.addEventListener("click", (e) => {
      if (
        !e.target.classList.contains("icon-btn") &&
        !e.target.closest(".icon-btn")
      ) {
        selectRegion(region);
      }
    });

    // 编辑名称
    item.querySelector(".btn-edit").addEventListener("click", (e) => {
      e.stopPropagation();
      const newName = prompt("输入新名称:", region.name);
      if (newName && newName.trim()) {
        region.name = newName.trim();
        updateUI();
      }
    });

    // 删除
    item.querySelector(".btn-delete").addEventListener("click", (e) => {
      e.stopPropagation();
      deleteRegion(region);
    });

    regionList.appendChild(item);
  });
}

// 更新点位列表
function updatePointList() {
  if (!currentRegion || currentRegion.positions.length === 0) {
    pointList.innerHTML =
      '<div class="hint-text" style="margin: 0;">暂无点位</div>';
    return;
  }

  pointList.innerHTML = "";
  currentRegion.positions.forEach((position, index) => {
    const cartographic = Cesium.Cartographic.fromCartesian(position);
    const lon = Cesium.Math.toDegrees(cartographic.longitude).toFixed(6);
    const lat = Cesium.Math.toDegrees(cartographic.latitude).toFixed(6);
    const height = cartographic.height.toFixed(2);

    const pointItem = document.createElement("div");
    pointItem.className = "point-item";
    pointItem.innerHTML = `
      <div class="point-item-header">点位 ${index + 1}</div>
      <div class="point-coords">
        经度: ${lon}°<br>
        纬度: ${lat}°<br>
        高度: ${height}m
      </div>
    `;
    pointList.appendChild(pointItem);
  });
}

// ==================== 绘制功能 ====================
// 开始绘制
btnStartDraw.onclick = () => {
  if (!currentRegion) return;

  drawing = true;
  currentRegion.positions = [];

  if (drawEntity) {
    viewer.entities.remove(drawEntity);
    drawEntity = null;
  }

  btnStartDraw.disabled = true;
  btnFinishDraw.disabled = false;
  drawHint.textContent = "在地图上点击添加顶点，至少需要 3 个点";
  updateUI();
  updateStatus("绘制中...");
};

// 完成绘制
btnFinishDraw.onclick = () => {
  if (!currentRegion) return;

  drawing = false;
  btnStartDraw.disabled = false;
  btnFinishDraw.disabled = true;

  if (currentRegion.positions.length < 3) {
    drawHint.textContent = "点数不足 3 个，无法构成多边形";
    updateStatus("绘制失败", false);
    return;
  }

  currentRegion.isComplete = true;
  drawHint.textContent = "绘制完成！可以拖动点位调整形状或添加新点";
  createVideoPolygon(currentRegion);
  updateStatus("视频映射成功 - 可编辑模式");

  // 进入编辑模式
  editMode = true;
  btnAddPoint.disabled = false;
  createEditablePoints();
  updateUI();
};

// 添加点位按钮
btnAddPoint.onclick = () => {
  if (!editMode || !currentRegion) return;

  addingPoint = !addingPoint;

  if (addingPoint) {
    btnAddPoint.textContent = "✓ 完成添加";
    btnAddPoint.classList.remove("btn-primary");
    btnAddPoint.classList.add("btn-success");
    drawHint.textContent = "点击多边形边缘添加新点位";
    updateStatus("添加点模式");
  } else {
    btnAddPoint.textContent = "➕ 添加点位";
    btnAddPoint.classList.remove("btn-success");
    btnAddPoint.classList.add("btn-primary");
    drawHint.textContent = "绘制完成！可以拖动点位调整形状或添加新点";
    updateStatus("编辑模式");

    // 移除预览线
    if (previewLine) {
      viewer.entities.remove(previewLine);
      previewLine = null;
    }
  }
};

// 清除当前区域
btnClearDraw.onclick = () => {
  if (!currentRegion) return;

  if (!confirm(`确定要清除 ${currentRegion.name} 的绘制内容吗？`)) return;

  drawing = false;
  editMode = false;
  addingPoint = false;
  draggedPointIndex = -1;

  currentRegion.positions = [];
  currentRegion.isComplete = false;

  // 移除绘制实体
  if (drawEntity) {
    viewer.entities.remove(drawEntity);
    drawEntity = null;
  }

  // 移除视频多边形
  if (currentRegion.polygonEntity) {
    viewer.entities.remove(currentRegion.polygonEntity);
    currentRegion.polygonEntity = null;
  }

  // 移除预览线
  if (previewLine) {
    viewer.entities.remove(previewLine);
    previewLine = null;
  }

  // 移除所有点标记
  currentRegion.pointEntities.forEach((entity) => {
    if (entity) viewer.entities.remove(entity);
  });
  currentRegion.pointEntities = [];

  // 移除绘制时的黄色点标记
  const entitiesToRemove = [];
  viewer.entities.values.forEach((entity) => {
    if (
      entity.point &&
      entity.point.color &&
      entity.point.color.getValue().equals(Cesium.Color.YELLOW)
    ) {
      entitiesToRemove.push(entity);
    }
  });
  entitiesToRemove.forEach((entity) => {
    viewer.entities.remove(entity);
  });

  btnStartDraw.disabled = false;
  btnFinishDraw.disabled = true;
  btnAddPoint.disabled = true;
  drawHint.textContent = '点击"开始绘制"后，在地图上依次点击添加多边形顶点';

  updateUI();
  updateStatus("已清除绘制内容");
};

// ==================== 视频控制 ====================
// 旋转角度滑块事件
rotationSlider.addEventListener("input", (e) => {
  if (!currentRegion) return;

  const degrees = parseFloat(e.target.value);
  currentRegion.rotation = Cesium.Math.toRadians(degrees);
  rotationValue.textContent = `${degrees}°`;

  // 更新视频多边形的旋转
  if (currentRegion.polygonEntity) {
    updateVideoRotation(currentRegion);
  }
});

// 重置旋转角度按钮
btnResetRotation.onclick = () => {
  if (!currentRegion) return;

  currentRegion.rotation = 0;
  rotationSlider.value = 0;
  rotationValue.textContent = "0°";

  if (currentRegion.polygonEntity) {
    updateVideoRotation(currentRegion);
  }
};

// 视频文件选择
videoFileInput.addEventListener("change", (e) => {
  if (!currentRegion) return;

  const file = e.target.files && e.target.files[0];
  if (!file) return;

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
    createVideoPolygon(currentRegion);
  }

  updateUI();
  updateStatus(`已更新视频源: ${file.name}`);
});

// ==================== 导入导出 ====================
// 导出配置
function exportPoints() {
  if (videoRegions.length === 0) {
    alert("没有可导出的视频区域");
    return;
  }

  const regionsData = videoRegions.map((region) => {
    const pts = region.positions.map((pos) => {
      const carto = Cesium.Cartographic.fromCartesian(pos);
      return {
        lon: Number(Cesium.Math.toDegrees(carto.longitude).toFixed(6)),
        lat: Number(Cesium.Math.toDegrees(carto.latitude).toFixed(6)),
        height: Number(carto.height.toFixed(2)),
      };
    });

    return {
      id: region.id,
      name: region.name,
      points: pts,
      rotation: Number(Cesium.Math.toDegrees(region.rotation).toFixed(2)),
      videoSrc: region.videoSrc,
      isComplete: region.isComplete,
    };
  });

  const payload = {
    version: "2.0",
    regions: regionsData,
  };
  const json = JSON.stringify(payload, null, 2);

  // 触发下载
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

// 导入配置
function importPointsFromObject(obj) {
  // 兼容旧格式 (单个区域)
  if (obj.points && Array.isArray(obj.points)) {
    // 清空现有区域
    videoRegions.forEach((r) => deleteRegion(r));
    videoRegions = [];

    const region = new VideoRegion(regionIdCounter++, "导入区域 1");
    region.positions = obj.points.map((p) =>
      Cesium.Cartesian3.fromDegrees(p.lon, p.lat, p.height || 0)
    );
    region.rotation = obj.rotation ? Cesium.Math.toRadians(obj.rotation) : 0;
    region.videoSrc = "data/data_clipped_30s.mp4";
    region.videoElement = createVideoElement(region.videoSrc);
    region.isComplete = true;

    videoRegions.push(region);
    createVideoPolygon(region);
    selectRegion(region);
    createEditablePoints();

    updateUI();
    updateStatus("已导入配置（旧格式）");
    return;
  }

  // 新格式 (多个区域)
  if (!obj.regions || !Array.isArray(obj.regions)) {
    alert("导入 JSON 格式错误，需包含 regions 数组");
    return;
  }

  // 清空现有区域
  while (videoRegions.length > 0) {
    deleteRegion(videoRegions[0]);
  }
  videoRegions = [];

  // 导入所有区域
  obj.regions.forEach((regionData) => {
    const region = new VideoRegion(
      regionData.id || regionIdCounter++,
      regionData.name || "未命名"
    );

    region.positions = regionData.points.map((p) =>
      Cesium.Cartesian3.fromDegrees(p.lon, p.lat, p.height || 0)
    );
    region.rotation = regionData.rotation
      ? Cesium.Math.toRadians(regionData.rotation)
      : 0;
    region.videoSrc = regionData.videoSrc || "data/data_clipped_30s.mp4";
    region.isComplete = regionData.isComplete || false;
    region.videoElement = createVideoElement(region.videoSrc);

    videoRegions.push(region);

    if (region.isComplete) {
      createVideoPolygon(region);
    }
  });

  // 选择第一个区域
  if (videoRegions.length > 0) {
    selectRegion(videoRegions[0]);
    if (videoRegions[0].isComplete) {
      createEditablePoints();
    }
  }

  updateUI();
  updateStatus(`已导入 ${videoRegions.length} 个视频区域`);
}

// 处理文件输入
importFileInput.addEventListener("change", (e) => {
  const file = e.target.files && e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const obj = JSON.parse(reader.result);
      importPointsFromObject(obj);
    } catch (err) {
      alert("解析 JSON 失败: " + err);
    }
  };
  reader.readAsText(file);
  // 清空以便下次可以选同一个文件
  importFileInput.value = null;
});

// 导入/导出按钮绑定
btnExport.onclick = exportPoints;
btnImport.onclick = () => importFileInput.click();

// ==================== Cesium 事件处理 ====================
// 地图点击事件 - 采集点
handler.setInputAction((movement) => {
  if (!drawing && !addingPoint) return;
  if (!currentRegion) return;

  const ray = viewer.camera.getPickRay(movement.position);
  const position = viewer.scene.globe.pick(ray, viewer.scene);

  if (!position) {
    console.warn("无法获取点击位置");
    return;
  }

  // 如果是绘制模式
  if (drawing) {
    currentRegion.positions.push(position);
    updateUI();

    // 添加点标记
    viewer.entities.add({
      position: position,
      point: {
        pixelSize: 8,
        color: Cesium.Color.YELLOW,
        outlineColor: Cesium.Color.WHITE,
        outlineWidth: 2,
      },
    });

    if (!drawEntity) {
      drawEntity = viewer.entities.add({
        polygon: {
          hierarchy: new Cesium.CallbackProperty(() => {
            return new Cesium.PolygonHierarchy(currentRegion.positions);
          }, false),
          material: Cesium.Color.YELLOW.withAlpha(0.3),
          outline: true,
          outlineColor: Cesium.Color.YELLOW,
          outlineWidth: 3,
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
        },
      });
    }
  }

  // 如果是添加点模式
  if (addingPoint) {
    // 找到最近的边
    const result = findClosestEdge(position);
    if (result) {
      // 在该边上插入新点
      currentRegion.positions.splice(
        result.insertIndex,
        0,
        result.closestPoint
      );
      updateUI();

      // 更新所有内容
      createEditablePoints();

      // 更新视频多边形
      if (currentRegion.polygonEntity) {
        currentRegion.polygonEntity.polygon.hierarchy =
          new Cesium.PolygonHierarchy(currentRegion.positions);
      }

      updateStatus(`已添加点位 P${result.insertIndex + 1}`);
    }
  }
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);

// 鼠标按下事件 - 开始拖动
handler.setInputAction((movement) => {
  if (!editMode || !currentRegion) return;

  const pickedObject = viewer.scene.pick(movement.position);
  if (
    Cesium.defined(pickedObject) &&
    Cesium.defined(pickedObject.id) &&
    pickedObject.id.properties &&
    pickedObject.id.properties.draggable &&
    pickedObject.id.properties.draggable.getValue() === true
  ) {
    // 检查是否属于当前区域
    const regionId = pickedObject.id.properties.regionId
      ? pickedObject.id.properties.regionId.getValue()
      : null;

    if (regionId === currentRegion.id) {
      draggedPointIndex = pickedObject.id.properties.pointIndex.getValue();
      viewer.scene.screenSpaceCameraController.enableRotate = false;
      viewer.scene.screenSpaceCameraController.enableTranslate = false;
      viewer.scene.screenSpaceCameraController.enableZoom = false;
      viewer.scene.screenSpaceCameraController.enableTilt = false;
      viewer.scene.screenSpaceCameraController.enableLook = false;
    }
  }
}, Cesium.ScreenSpaceEventType.LEFT_DOWN);

// 鼠标移动事件 - 拖动点位或显示预览
handler.setInputAction((movement) => {
  if (!currentRegion) return;

  // 如果正在拖动点位
  if (editMode && draggedPointIndex !== -1) {
    const ray = viewer.camera.getPickRay(movement.endPosition);
    let position = viewer.scene.globe.pick(ray, viewer.scene);
    if (position) {
      // 自动捕捉到其他区域的边缘或点位（如果启用）
      if (snapEnabled) {
        const snapResult = findSnapTarget(position, currentRegion);
        if (snapResult) {
          position = snapResult.position;
          // 可视化捕捉提示
          if (!window.snapIndicator) {
            window.snapIndicator = viewer.entities.add({
              position: position,
              point: {
                pixelSize: 16,
                color: Cesium.Color.CYAN.withAlpha(0.5),
                outlineColor: Cesium.Color.WHITE,
                outlineWidth: 3,
              },
            });
          } else {
            window.snapIndicator.position = position;
            window.snapIndicator.show = true;
          }
        } else {
          // 隐藏捕捉指示器
          if (window.snapIndicator) {
            window.snapIndicator.show = false;
          }
        }
      } else {
        // 捕捉功能禁用时，隐藏指示器
        if (window.snapIndicator) {
          window.snapIndicator.show = false;
        }
      }

      // 更新点位位置
      currentRegion.positions[draggedPointIndex] = position;
      currentRegion.pointEntities[draggedPointIndex].position = position;

      // 更新视频多边形
      if (currentRegion.polygonEntity) {
        currentRegion.polygonEntity.polygon.hierarchy =
          new Cesium.PolygonHierarchy(currentRegion.positions);
      }

      // 更新点位列表
      updateUI();
    }
    return;
  }

  // 如果在添加点模式，显示预览线
  if (addingPoint) {
    const ray = viewer.camera.getPickRay(movement.endPosition);
    const position = viewer.scene.globe.pick(ray, viewer.scene);

    if (position) {
      const result = findClosestEdge(position);
      if (result) {
        // 移除旧的预览线
        if (previewLine) {
          viewer.entities.remove(previewLine);
        }

        // 创建新的预览线
        const p1 = currentRegion.positions[result.edgeStartIndex];
        const p2 = currentRegion.positions[result.edgeEndIndex];

        previewLine = viewer.entities.add({
          polyline: {
            positions: [p1, result.closestPoint, p2],
            width: 3,
            material: new Cesium.PolylineDashMaterialProperty({
              color: Cesium.Color.CYAN,
              dashLength: 16,
            }),
            clampToGround: true,
          },
          point: {
            position: result.closestPoint,
            pixelSize: 10,
            color: Cesium.Color.CYAN,
            outlineColor: Cesium.Color.WHITE,
            outlineWidth: 2,
          },
        });
      }
    }
  }
}, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

// 鼠标释放事件 - 结束拖动
handler.setInputAction(() => {
  if (draggedPointIndex !== -1) {
    draggedPointIndex = -1;
    viewer.scene.screenSpaceCameraController.enableRotate = true;
    viewer.scene.screenSpaceCameraController.enableTranslate = true;
    viewer.scene.screenSpaceCameraController.enableZoom = true;
    viewer.scene.screenSpaceCameraController.enableTilt = true;
    viewer.scene.screenSpaceCameraController.enableLook = false;

    // 隐藏捕捉指示器
    if (window.snapIndicator) {
      window.snapIndicator.show = false;
    }
  }
}, Cesium.ScreenSpaceEventType.LEFT_UP);

// ==================== Cesium 实体操作 ====================
// 创建视频多边形
function createVideoPolygon(region) {
  if (region.polygonEntity) {
    viewer.entities.remove(region.polygonEntity);
  }

  // 移除绘制时的点标记
  const entitiesToRemove = [];
  viewer.entities.values.forEach((entity) => {
    if (
      entity.point &&
      entity.point.color &&
      entity.point.color.getValue().equals(Cesium.Color.YELLOW)
    ) {
      entitiesToRemove.push(entity);
    }
  });
  entitiesToRemove.forEach((entity) => {
    viewer.entities.remove(entity);
  });

  // 创建视频材质
  const material = new Cesium.ImageMaterialProperty({
    image: region.videoElement,
    transparent: false,
  });

  // 创建视频多边形实体
  region.polygonEntity = viewer.entities.add({
    name: `VideoPolygon_${region.id}`,
    polygon: {
      hierarchy: new Cesium.PolygonHierarchy(region.positions),
      material: material,
      heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
      stRotation: region.rotation,
    },
  });

  // 移除黄色绘制多边形
  if (drawEntity) {
    viewer.entities.remove(drawEntity);
    drawEntity = null;
  }

  // 飞向视频多边形
  viewer.flyTo(region.polygonEntity, {
    duration: 2,
    offset: new Cesium.HeadingPitchRange(0, Cesium.Math.toRadians(-45), 500),
  });

  console.log(`视频多边形创建成功: ${region.name}`);
}

// 更新视频旋转角度
function updateVideoRotation(region) {
  if (region.polygonEntity && region.polygonEntity.polygon) {
    region.polygonEntity.polygon.stRotation = new Cesium.ConstantProperty(
      region.rotation
    );
    console.log(
      `视频旋转角度已更新: ${Cesium.Math.toDegrees(region.rotation)}°`
    );
  }
}

// 创建可编辑的点标记
function createEditablePoints() {
  if (!currentRegion) return;

  // 清除旧的点标记
  currentRegion.pointEntities.forEach((entity) => {
    if (entity) viewer.entities.remove(entity);
  });
  currentRegion.pointEntities = [];

  // 为每个顶点创建可拖动的点标记
  currentRegion.positions.forEach((position, index) => {
    const pointEntity = viewer.entities.add({
      position: position,
      point: {
        pixelSize: 12,
        color: Cesium.Color.RED,
        outlineColor: Cesium.Color.WHITE,
        outlineWidth: 2,
        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
      },
      label: {
        text: `P${index + 1}`,
        font: "12px sans-serif",
        fillColor: Cesium.Color.WHITE,
        outlineColor: Cesium.Color.BLACK,
        outlineWidth: 2,
        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        pixelOffset: new Cesium.Cartesian2(0, -15),
        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
      },
      properties: {
        pointIndex: index,
        regionId: currentRegion.id,
        draggable: true,
      },
    });
    currentRegion.pointEntities.push(pointEntity);
  });
}

// ==================== 几何计算函数 ====================
// 找到最近的边，并计算点击位置在该边上的投影点
function findClosestEdge(clickPosition) {
  if (!currentRegion || currentRegion.positions.length < 2) return null;

  let minDistance = Infinity;
  let closestEdgeIndex = -1;
  let closestPoint = null;

  // 遍历所有边
  for (let i = 0; i < currentRegion.positions.length; i++) {
    const p1 = currentRegion.positions[i];
    const p2 =
      currentRegion.positions[(i + 1) % currentRegion.positions.length];

    // 计算点到线段的最短距离和投影点
    const result = getClosestPointOnSegment(clickPosition, p1, p2);

    if (result.distance < minDistance) {
      minDistance = result.distance;
      closestEdgeIndex = i;
      closestPoint = result.point;
    }
  }

  if (closestEdgeIndex !== -1) {
    return {
      edgeStartIndex: closestEdgeIndex,
      edgeEndIndex: (closestEdgeIndex + 1) % currentRegion.positions.length,
      insertIndex: closestEdgeIndex + 1,
      closestPoint: closestPoint,
      distance: minDistance,
    };
  }

  return null;
}

// 查找捕捉目标（其他区域的点位和边缘）
function findSnapTarget(position, excludeRegion) {
  const SNAP_DISTANCE_PIXELS = 20; // 捕捉距离（像素）
  const SNAP_DISTANCE_METERS = 50; // 捕捉距离（米）- 3D空间距离

  let closestSnapPoint = null;
  let minDistance = Infinity;

  // 将3D位置转换为屏幕坐标
  const screenPos = Cesium.SceneTransforms.wgs84ToWindowCoordinates(
    viewer.scene,
    position
  );
  if (!screenPos) return null;

  // 遍历所有其他区域
  videoRegions.forEach((region) => {
    if (region === excludeRegion || !region.isComplete) return;

    // 检查该区域的所有点位
    region.positions.forEach((regionPos, index) => {
      // 计算3D空间距离
      const distance3D = Cesium.Cartesian3.distance(position, regionPos);

      // 计算屏幕距离
      const regionScreenPos = Cesium.SceneTransforms.wgs84ToWindowCoordinates(
        viewer.scene,
        regionPos
      );
      if (!regionScreenPos) return;

      const dx = screenPos.x - regionScreenPos.x;
      const dy = screenPos.y - regionScreenPos.y;
      const screenDistance = Math.sqrt(dx * dx + dy * dy);

      // 如果距离小于阈值，记录为候选捕捉点
      if (
        screenDistance < SNAP_DISTANCE_PIXELS &&
        distance3D < SNAP_DISTANCE_METERS
      ) {
        if (screenDistance < minDistance) {
          minDistance = screenDistance;
          closestSnapPoint = {
            position: regionPos,
            type: "point",
            regionId: region.id,
            pointIndex: index,
          };
        }
      }
    });

    // 检查该区域的所有边
    for (let i = 0; i < region.positions.length; i++) {
      const p1 = region.positions[i];
      const p2 = region.positions[(i + 1) % region.positions.length];

      // 计算点到边的投影
      const result = getClosestPointOnSegment(position, p1, p2);

      // 计算屏幕距离
      const edgeScreenPos = Cesium.SceneTransforms.wgs84ToWindowCoordinates(
        viewer.scene,
        result.point
      );
      if (!edgeScreenPos) continue;

      const dx = screenPos.x - edgeScreenPos.x;
      const dy = screenPos.y - edgeScreenPos.y;
      const screenDistance = Math.sqrt(dx * dx + dy * dy);

      // 如果距离小于阈值，记录为候选捕捉点
      if (
        screenDistance < SNAP_DISTANCE_PIXELS &&
        result.distance < SNAP_DISTANCE_METERS
      ) {
        if (screenDistance < minDistance) {
          minDistance = screenDistance;
          closestSnapPoint = {
            position: result.point,
            type: "edge",
            regionId: region.id,
            edgeIndex: i,
          };
        }
      }
    }
  });

  return closestSnapPoint;
}

// 计算点到线段的最短距离和投影点
function getClosestPointOnSegment(point, lineStart, lineEnd) {
  // 将 Cartesian3 转换为向量
  const ap = Cesium.Cartesian3.subtract(
    point,
    lineStart,
    new Cesium.Cartesian3()
  );
  const ab = Cesium.Cartesian3.subtract(
    lineEnd,
    lineStart,
    new Cesium.Cartesian3()
  );

  const ab2 = Cesium.Cartesian3.dot(ab, ab);
  const ap_ab = Cesium.Cartesian3.dot(ap, ab);

  // 计算投影比例
  let t = ap_ab / ab2;

  // 限制在线段范围内
  t = Math.max(0, Math.min(1, t));

  // 计算投影点
  const closestPoint = Cesium.Cartesian3.add(
    lineStart,
    Cesium.Cartesian3.multiplyByScalar(ab, t, new Cesium.Cartesian3()),
    new Cesium.Cartesian3()
  );

  // 计算距离
  const distance = Cesium.Cartesian3.distance(point, closestPoint);

  return {
    point: closestPoint,
    distance: distance,
  };
}

// ==================== 初始化 ====================
// 加载相机配置并飞行到位置
fetch("data/camera_config.json")
  .then((r) => r.json())
  .then((cfg) => {
    console.log("相机配置加载成功:", cfg);
    const lon = cfg.extrinsic.lon;
    const lat = cfg.extrinsic.lat;
    const height = cfg.extrinsic.height || 500;

    // 飞行到指定位置
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

// 初始化完成
console.log("多视频融合地图系统初始化完成");
updateUI();
