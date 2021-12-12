const Comment = require("../models/Comment");
const { paginatedResults } = require("../utils/paginatedResults");
const { queryString } = require("../utils/queryString");
const {
  createCommentValidate,
  updateCommentValidate,
} = require("../validation/comment");

exports.create = async (req, res) => {
  const { error } = createCommentValidate(req.body);
  if (error)
    return res.status(400).send({
      error: error.details[0].message,
    });

  const comment = new Comment(req.body);
  try {
    await comment.save();
    res.status(201).send({
      data: comment,
      message: "Comment successfully created",
      status: "success",
    });
  } catch (error) {
    res.status(error.status || 500).send({
      message: "Something went wrong. please try again later",
      status: "error",
    });
  }
};

exports.findAll = async (req, res) => {
  try {
    const comments = await Comment.find(queryString(req));
    res.status(200).send({
      data: comments,
      message: "Comments successfully fetched",
      status: "success",
    });
  } catch (error) {
    res.status(error.status || 500).send({
      message: "Something went wrong. please try again later",
      status: "error",
    });
  }
};
exports.find = async (req, res) => {
  try {
    const paginationQuery = await paginatedResults(req, Comment);
    const comments = await Comment.find(queryString(req))
      .limit(paginationQuery.pagination.limit)
      .skip(paginationQuery.startIndex)
      .sort({ createdAt: -1 })
      .exec();

    res.status(200).send({
      pagination: { ...paginationQuery.pagination, count: comments.length },
      data: comments,
      message: "Comments successfully fetched",
      status: "success",
    });
  } catch (error) {
    res.status(error.status || 500).send({
      message: "Something went wrong. please try again later",
      status: "error",
    });
  }
};

exports.findOne = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment)
      return res.status(404).send({
        message: "Comment doesn't exist",
        status: "error",
      });
    res.status(200).send({
      data: comment,
      message: "Comment successfully fetched",
      status: "success",
    });
  } catch (error) {
    res.status(error.status || 500).send({
      message: "Something went wrong. please try again later",
      status: "error",
    });
  }
};

exports.update = async (req, res) => {
  const { error } = updateCommentValidate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      status: "error",
    });
  try {
    const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!comment) {
      return res.status(404).send({
        message: "Comment doesn't exist",
        status: "error",
      });
    }
    res.status(200).send({
      data: comment,
      message: "Comment successfully updated",
      status: "success",
    });
  } catch (error) {
    res.status(error.status || 500).send({
      message: "Something went wrong. please try again later",
      status: "error",
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) {
      return res.status(404).send({
        message: "Comment doesn't exist",
        status: "error",
      });
    }
    res.status(200).send({
      data: comment,
      message: "Comment successfully deleted",
      status: "success",
    });
  } catch (error) {
    res.status(error.status || 500).send({
      message: "Something went wrong. please try again later",
      status: "error",
    });
  }
};
