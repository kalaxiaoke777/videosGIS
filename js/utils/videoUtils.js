/**
 * 视频辅助工具模块
 */

/**
 * 创建视频元素
 */
export function createVideoElement(src) {
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
