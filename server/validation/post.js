const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const options = {
  errors: {
    wrap: {
      label: "",
    },
  },
};

const createPostSchema = Joi.object({
  name: Joi.string().min(3).max(255).required(),
  body: Joi.string().min(3).max(1255).required(),
});

const updatePostSchema = Joi.object({
  name: Joi.string().min(3).max(255),
  body: Joi.string().min(3).max(1255),
  comments: Joi.array().items(Joi.objectId()),
  _id: Joi.objectId(),
});

module.exports.createPostValidate = body =>
  createPostSchema.validate(body, options);

module.exports.updatePostValidate = body =>
  updatePostSchema.validate(body, options);
