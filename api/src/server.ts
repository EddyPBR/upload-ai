import { fastify } from "fastify";
import { getAllPromptsRoute } from "./routes/get-all-prompts";

const app = fastify();

app.register(getAllPromptsRoute);

app
  .listen({
    port: Number(process.env.PORT),
  })
  .then(() => {
    console.log(`Server is running at PORT: ${process.env.PORT}`);
  });
