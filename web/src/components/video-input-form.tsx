import { FileVideo, Upload } from "lucide-react";
import { Separator } from "./ui/separator";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { ChangeEvent, FormEvent, useMemo, useRef, useState } from "react";
import { convertVideoToAudio } from "@/utils/convertVideoToAudio";
import { api } from "@/lib/axios";

interface IVideoInputFormProps {
  onVideoUploaded: (videoId: string) => void;
}

type StatusStateType =
  | "waiting"
  | "converting"
  | "uploading"
  | "generating"
  | "success"
  | "error";

const statusMessages = {
  converting: "Convertendo...",
  generating: "Transcrevendo...",
  uploading: "Carregando...",
  success: "Sucesso!",
  error: "Falhou!"
};

export function VideoInputForm(props: IVideoInputFormProps) {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [status, setStatus] = useState<StatusStateType>("waiting");

  const promptInputRef = useRef<HTMLTextAreaElement>(null);

  function handleFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.currentTarget;

    if (files) {
      const selectedFile = files[0];
      setVideoFile(selectedFile);
    }
  }  

  async function handleUploadVideo(event: FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();

      const prompt = promptInputRef.current?.value;

      if (!videoFile) {
        throw new Error("Missing videoFile");
      }

      setStatus("converting");

      const audioFile = await convertVideoToAudio(videoFile);

      const data = new FormData();
  
      data.append("file", audioFile);
  
      setStatus("uploading");
  
      const response = await api.post("/videos", data);
  
      const videoId = response.data.video.id as string; //uuid
  
      setStatus("generating");
  
      await api.post(`/videos/${videoId}/transcription`, {
        prompt,
      });
  
      setStatus("success");
  
      props.onVideoUploaded(videoId);
    } catch (error: any) {
      console.log(error);
      setStatus("error");
    }
  }

  const previewURL = useMemo(() => {
    if (videoFile) {
      return URL.createObjectURL(videoFile);
    }
  }, [videoFile]);

  return (
    <form onSubmit={handleUploadVideo} className="space-y-4">
      <label
        htmlFor="video"
        className="relative border flex rounded-md aspect-video cursor-pointer border-dashed text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-primary/5"
      >
        {previewURL ? (
          <video src={previewURL} controls={false} className="pointer-events-none absolute inset-0 h-44 mx-auto" />
        ) : (
          <>
            <FileVideo className="w-4 h-4" />
            Selecione um vídeo
          </>
        )}
      </label>

      <input
        type="file"
        id="video"
        accept="video/mp4"
        className="sr-only"
        onChange={handleFileSelected}
      />

      <Separator />

      <div className="space-y-2">
        <Label htmlFor="transcription_prompt">Prompt de transcrição</Label>
        <Textarea
          ref={promptInputRef}
          id="transcription_prompt"
          disabled={status !== "waiting"}
          className="h-20 leading-relaxed resize-none"
          placeholder="Inclua palavras-chave mencionadas no vídeo separadas por vírgula (,)"
        />
      </div>

      <Button
        data-success={status === "success"}
        data-error={status === "error"}
        disabled={status !== "waiting" && status !== "error"}
        type="submit"
        className="w-full data-[success=true]:bg-emerald-400 data-[error=true]:bg-red-500"
      >
        {status === "waiting" ? (
          <>
            Carregar video
            <Upload className="w-4 h-4 ml-2" />
          </>
        ) : (
          statusMessages[status]
        )}
      </Button>
    </form>
  );
}
