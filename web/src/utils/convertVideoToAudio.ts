import { getFFmpeg } from "@/lib/ffmpeg";
import { fetchFile } from "@ffmpeg/util";

export async function convertVideoToAudio(video: File) {
  console.log("Convert started.");

  const ffmpeg = await getFFmpeg();

  await ffmpeg.writeFile("input.mp4", await fetchFile(video));

  ffmpeg.on("progress", (progress) => {
    console.log("Convert progress: " + Math.round(progress.progress * 100));
  });

  await ffmpeg.exec([
    "-i",
    "input.mp4",
    "-map",
    "0:a",
    "-b:a",
    "20k",
    "-acodec",
    "libmp3lame",
    "output.mp3",
  ]);

  const data = await ffmpeg.readFile("output.mp3");

  const audioFileBlob = new Blob([data], { type: "audio/mp3" });
  const audioFile = new File([audioFileBlob], "output.mp3", {
    type: "audio/mpeg",
  });

  console.log("Convert finished.");

  return audioFile;
}
