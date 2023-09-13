import { FastifyInstance } from "fastify";
import { createReadStream } from "node:fs";
import { z } from "zod";
import { openai } from "../lib/openai";
import { prisma } from "../lib/prisma";

const paramsSchema = z.object({
  videoId: z.string().uuid(),
});

const bodySchema = z.object({
  prompt: z.string(),
});

export async function createTranscriptionRoute(app: FastifyInstance) {
  app.post("/videos/:videoId/transcription", async (request, reply) => {
    const { videoId } = paramsSchema.parse(request.params);

    const { prompt } = bodySchema.parse(request.body);

    const video = await prisma.video.findUniqueOrThrow({
      where: {
        id: videoId,
      },
    });

    const audioReadStream = createReadStream(video.path);

    const response = await openai.audio.transcriptions.create({
      file: audioReadStream,
      model: "whisper-1",
      language: "pt",
      response_format: "json",
      temperature: 0,
      prompt,
    });

    await prisma.video.update({
      where: {
        id: videoId,
      },
      data: {
        transcription: response.text,
      },
    });

    return reply.status(200).send({
      transcription: response.text,
    });
  });
}
