const Post = require("../models/Post");
const { paginatedResults } = require("../utils/paginatedResults");
const { queryString } = require("../utils/queryString");
const {
  createPostValidate,
  updatePostValidate,
} = require("../validation/post");

exports.create = async (req, res) => {
  const { error } = createPostValidate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      status: "error",
      priority: "high",
    });

  const post = new Post(req.body);
  try {
    await post.save();
    res.status(201).send({
      data: post,
      message: "Post successfully created",
      status: "success",
      priority: "high",
    });
  } catch (error) {
    res.status(error.status || 500).send({
      message: "Something went wrong. please try again later",
      status: "error",
      priority: "high",
    });
  }
};

exports.find = async (req, res) => {
  try {
    const paginationQuery = await paginatedResults(req, Post);
    const posts = await Post.find(queryString(req))
      .limit(paginationQuery.pagination.limit)
      .skip(paginationQuery.startIndex)
      .sort({ createdAt: -1 })
      .exec();

    res.status(200).send({
      pagination: { ...paginationQuery.pagination, count: posts.length },
      data: posts,
      message: "Posts successfully fetched",
      status: "success",
      priority: "low",
    });
  } catch (error) {
    res.status(error.status || 500).send({
      message: "Something went wrong. please try again later",
      status: "error",
      priority: "high",
    });
  }
};

exports.findOne = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post)
      return res.status(404).send({
        message: "Post doesn't exist",
        status: "error",
        priority: "high",
      });
    res.status(200).send({
      data: post,
      message: "Post successfully fetched",
      status: "success",
      priority: "low",
    });
  } catch (error) {
    res.status(error.status || 500).send({
      message: "Something went wrong. please try again later",
      status: "error",
      priority: "high",
    });
  }
};

exports.update = async (req, res) => {
  const { error } = updatePostValidate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      status: "error",
      priority: "high",
    });
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!post) {
      return res.status(404).send({
        message: "Post doesn't exist",
        status: "error",
        priority: "high",
      });
    }
    res.status(200).send({
      data: post,
      message: "Post successfully updated",
      status: "success",
      priority: "high",
    });
  } catch (error) {
    res.status(error.status || 500).send({
      message: "Something went wrong. please try again later",
      status: "error",
      priority: "high",
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).send({
        message: "Post doesn't exist",
        status: "error",
        priority: "high",
      });
    }
    res.status(200).send({
      data: post,
      message: "Post successfully deleted",
      status: "success",
      priority: "high",
    });
  } catch (error) {
    res.status(error.status || 500).send({
      message: "Something went wrong. please try again later",
      status: "error",
      priority: "high",
    });
  }
};
