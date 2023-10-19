import { Router } from "express";

import newsPostService from "../services/news-post.service.ts";
import newsPostMiddleware from "../middleware/news-post.middleware.ts";
const newsPostRouter = Router();

/* ARTICLE: GetWithPagination */
newsPostRouter.get("/newsposts", async (req, res) => {
  const { page, size } = req.query;

  if (!Number.isNaN(Number(page)) && !Number.isNaN(Number(size))) {
    try {
      let numberPage = Number(page);
      let numberSize = Number(size);
      const start = (numberPage - 1) * numberSize;
      const end = numberPage * numberSize;
      const newsPosts = await newsPostService.getNewsPosts();
      const newsPostsLength = newsPosts.length;
      if (start >= newsPostsLength) {
        return res.status(200).end(JSON.stringify([]));
      } else if (end >= newsPostsLength) {
        return res
          .status(200)
          .end(JSON.stringify(newsPosts.slice(start, newsPostsLength)));
      } else {
        return res.status(200).end(JSON.stringify(newsPosts.slice(start, end)));
      }
    } catch {
      return res.status(500).end("Server error!");
    }
  } else {
    return res.status(404).end("Page and Size should be a number");
  }
});

/* ARTICLE: GetById */
newsPostRouter.get("/newsposts/:id", async (req, res) => {
  const { id } = req.params;
  if (!Number.isNaN(Number(id))) {
    try {
      const newsPost = (await newsPostService.getNewsPostById(+id)) || false;

      if (newsPost) {
        return res.status(200).end(JSON.stringify(newsPost));
      }
      return res.status(404).end("404 | News post was not found!");
    } catch {
      return res.status(500).end("Server error!");
    }
  }
  return res.status(404).end("Id should be a number!");
});

/* ARTICLE: Create */
newsPostRouter.post("/newsposts", async (req, res) => {
  newsPostMiddleware.validateNewsPost("create");

  try {
    await newsPostService.createNewsPost(req.body);
    return res.status(200).end("News post was created successfully!");
  } catch {
    return res.status(500).end("Server error!");
  }
});

/* ARTICLE: UpdateById  */
newsPostRouter.put("/newsposts/:id", async (req, res) => {
  newsPostMiddleware.validateNewsPost("update");
  const { id } = req.params;

  if (!Number.isNaN(Number(id))) {
    try {
      const newsPost = (await newsPostService.getNewsPostById(+id)) || false;
      if (!newsPost) {
        return res.status(404).end("News post was not found!");
      }

      await newsPostService.updateNewsPostById(+id, req.body);

      return res.status(201).end("News post was updated successfully!");
    } catch {
      return res.status(500).end("Server error!");
    }
  }

  return res.status(404).end("Id should be a number!");
});

/* ARTICLE: DeleteById  */
newsPostRouter.delete("/newsposts/:id", async (req, res) => {
  const { id } = req.params;

  if (!Number.isNaN(Number(id))) {
    try {
      const newsPost = (await newsPostService.getNewsPostById(+id)) || false;
      if (!newsPost) {
        return res.status(404).end("News post was not found!");
      }
      await newsPostService.deleteNewsPostById(+id);
      return res.status(200).end("News post was deleted successfully!");
    } catch {
      return res.status(500).end("Server error!");
    }
  }

  return res.status(404).end("Id should be a number!");
});

export default newsPostRouter;
