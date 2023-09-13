import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import { createTranscriptionRoute } from "./routes/create-transcription";
import { generateAiCompletionRoute } from "./routes/generate-ai-completion";
import { getAllPromptsRoute } from "./routes/get-all-prompts";
import { uploadVideoRoute } from "./routes/upload-video";

const app = fastify();

app.register(fastifyCors, {
  origin: "*",
});

app.register(getAllPromptsRoute);
app.register(uploadVideoRoute);
app.register(createTranscriptionRoute);
app.register(generateAiCompletionRoute);

app
  .listen({
    port: Number(process.env.PORT),
  })
  .then(() => {
    console.log(`Server is running at PORT: ${process.env.PORT}`);
  });
