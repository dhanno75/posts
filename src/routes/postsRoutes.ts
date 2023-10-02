import express from "express";
import {
  createPost,
  deletePost,
  getAllPost,
  getOnePost,
  updatePost,
} from "../controllers/postsController";
import { Schemas, ValidateSchema } from "../middleware/ValidateSchema";
import mwBasicAuth from "../middleware/basicAuth";

const router = express.Router();

router
  .route("/post")
  .post(ValidateSchema(Schemas.post.create), createPost)
  .get(getAllPost);
router
  .route("/post/:id")
  .get(mwBasicAuth, getOnePost)
  .put(ValidateSchema(Schemas.post.create), updatePost)
  .delete(deletePost);

export default router;
