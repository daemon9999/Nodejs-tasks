import express from "express";
import "dotenv/config";
import { AppDataSource } from "./data-source.ts";
import newsPostRouter from "./routes/news-post.route.ts";
import newsPostMiddleware from "./middleware/news-post.middleware.ts";
/* TYPEORM */
AppDataSource.initialize()
  .then(() => {
    console.log("Connection is ready!");
  })
  .catch((err) => {
    console.log(err);
  });

const PORT = process.env.PORT;

const app = express();
app.use(express.json());

app.use("/api", newsPostRouter);
app.use(newsPostMiddleware.logging);
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
