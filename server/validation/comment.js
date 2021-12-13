const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const options = {
  errors: {
    wrap: {
      label: "",
    },
  },
};

const createCommentSchema = Joi.object({
  text: Joi.string().min(3).max(1255).required(),
  post: Joi.objectId(),
});

const updateCommentSchema = Joi.object({
  text: Joi.string().min(3).max(1255),
  post: Joi.objectId(),
  _id: Joi.objectId(),
});

module.exports.createCommentValidate = body =>
  createCommentSchema.validate(body, options);

module.exports.updateCommentValidate = body =>
  updateCommentSchema.validate(body, options);
