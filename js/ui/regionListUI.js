/**
 * 区域列表UI模块
 */
import { uiElements } from "./uiManager.js";

/**
 * 更新视频区域列表
 */
export function updateRegionList(
  regionManager,
  selectRegionCallback,
  deleteRegionCallback
) {
  const allRegions = regionManager.getAllRegions();
  const currentRegion = regionManager.getCurrentRegion();

  if (allRegions.length === 0) {
    uiElements.regionList.innerHTML = `
      <div class="hint-text" style="margin: 0; text-align: center;">
        暂无视频区域，点击上方按钮新建
      </div>
    `;
    return;
  }

  uiElements.regionList.innerHTML = "";
  allRegions.forEach((region) => {
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
        黄点: ${region.yellowPositions.length} | 红点: ${
      region.redPositions.length
    } | 状态: ${region.isComplete ? "已完成" : "未完成"}
      </div>
    `;

    // 点击选择
    item.addEventListener("click", (e) => {
      if (
        !e.target.classList.contains("icon-btn") &&
        !e.target.closest(".icon-btn")
      ) {
        selectRegionCallback(region);
      }
    });

    // 编辑名称
    item.querySelector(".btn-edit").addEventListener("click", (e) => {
      e.stopPropagation();
      const newName = prompt("输入新名称:", region.name);
      if (newName && newName.trim()) {
        region.name = newName.trim();
        updateRegionList(
          regionManager,
          selectRegionCallback,
          deleteRegionCallback
        );
      }
    });

    // 删除
    item.querySelector(".btn-delete").addEventListener("click", (e) => {
      e.stopPropagation();
      deleteRegionCallback(region);
    });

    uiElements.regionList.appendChild(item);
  });
}
