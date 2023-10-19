import { Request, Response, NextFunction, RequestHandler } from "express";
import * as Yup from "yup";
const newsPostSchemaToCreate = Yup.object()
  .shape({
    title: Yup.string().required("Title is required!"),
    text: Yup.string().required("Text is required!"),
  })
  .noUnknown(true)
  .strict();
const newsPostSchemaToUpdate = Yup.object()
  .shape({
    title: Yup.string(),
    text: Yup.string(),
  })
  .noUnknown(true)
  .strict();

const logging: RequestHandler = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const { method, url, query, body } = req;
  console.log(
    `${method} ${url} query:${JSON.stringify(query)} body:${JSON.stringify(
      body
    )}`
  );
  next();
};

const validateNewsPost = async (type: "update" | "create") => {
  const innerFn: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (type === "update") {
        await newsPostSchemaToUpdate.validate(req.body);
      } else {
        await newsPostSchemaToCreate.validate(req.body);
      }

      next();
    } catch (err) {
      return res.status(404).json({ type: err.name, message: err.message });
    }
  };
  return innerFn;
};

export default {
  logging,
  validateNewsPost,
};
