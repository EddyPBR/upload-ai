import { fastify } from "fastify";
import { getAllPromptsRoute } from "./routes/get-all-prompts";
import { uploadVideoRoute } from "./routes/upload-video";

const app = fastify();

app.register(getAllPromptsRoute);
app.register(uploadVideoRoute);

app
  .listen({
    port: Number(process.env.PORT),
  })
  .then(() => {
    console.log(`Server is running at PORT: ${process.env.PORT}`);
  });
