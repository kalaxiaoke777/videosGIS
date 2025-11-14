# 用于裁剪视频文件的前30秒

from moviepy import VideoFileClip
import os


def clip_video(input_path, output_path, duration=30):
    """
    裁剪视频文件的前N秒

    参数:
        input_path: 输入视频文件路径
        output_path: 输出视频文件路径
        duration: 裁剪时长(秒),默认30秒
    """
    try:
        # 加载视频
        print(f"正在加载视频: {input_path}")
        video = VideoFileClip(input_path)

        # 获取视频总时长
        total_duration = video.duration
        print(f"视频总时长: {total_duration:.2f} 秒")        # 确定裁剪时长
        clip_duration = min(duration, total_duration)
        print(f"裁剪时长: {clip_duration:.2f} 秒")

        # 裁剪视频
        clipped_video = video.subclipped(0, clip_duration)

        # 保存裁剪后的视频
        print(f"正在保存裁剪后的视频到: {output_path}")
        clipped_video.write_videofile(output_path, codec="libx264", audio_codec="aac")

        # 关闭视频对象
        video.close()
        clipped_video.close()

        print("视频裁剪完成!")

    except Exception as e:
        print(f"发生错误: {str(e)}")


if __name__ == "__main__":
    # 输入和输出文件路径
    input_video = "data/data.mp4"
    output_video = "data/data_clipped_30s.mp4"

    # 检查输入文件是否存在
    if not os.path.exists(input_video):
        print(f"错误: 找不到输入文件 {input_video}")
    else:
        # 裁剪视频前30秒
        clip_video(input_video, output_video, duration=30)
