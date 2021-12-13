const { Router } = require("express");
const postController = require("../controllers/post");
const commentController = require("../controllers/comment");

const router = Router();

router.post("/", postController.create);
router.get("/", postController.find);
router.get("/:id", postController.findOne);
router.patch("/:id", postController.update);
router.delete("/:id", postController.delete);

router.post("/:post_id/comments", commentController.create);
router.get("/:post_id/comments", commentController.find);
module.exports = router;
