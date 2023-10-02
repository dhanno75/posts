import mongoose from "mongoose";
import Post from "../models/postsModel";
import { NextFunction, Request, Response } from "express";

// CREATE POST
export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, content, category_id } = req.body;

    const newPost = await Post.create({
      title,
      content,
      category_id,
      created_at: Date.now(),
    });

    return res.status(201).json({
      status: "success",
      message: "Post created successfully",
      data: newPost,
    });
  } catch (err) {
    return res.status(500).json({
      status: "fail",
      message: "Please try again",
      error: err,
    });
  }
};

// GET ONE POST
export const getOnePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);

    return res.status(200).json({
      status: "success",
      data: post,
    });
  } catch (err) {
    return res.status(500).json({
      status: "fail",
      message: "Please try again",
    });
  }
};

// GET ALL POSTS
export const getAllPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const posts = await Post.find();

    res.status(200).json({
      status: "success",
      data: posts,
    });
  } catch (err) {
    return res.status(500).json({
      status: "fail",
      message: "Please try again",
      error: err,
    });
  }
};

// UPDATE POST
export const updatePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      {
        title,
        content,
        updated_at: Date.now(),
      },
      { new: true }
    );

    res.status(200).json({
      status: "success",
      data: updatedPost,
    });
  } catch (err) {
    return res.status(500).json({
      status: "fail",
      message: "Please try again",
      error: err,
    });
  }
};

// DELETE POST
export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await Post.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    return res.status(500).json({
      status: "fail",
      message: "Something went wrong. Please try again after sometime.",
    });
  }
};
