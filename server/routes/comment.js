const { Router } = require("express");
const commentController = require("../controllers/comment");
const router = Router();

router.post("/post/:post_id", commentController.create);
router.get("/post/:post_id", commentController.find);
router.get("/all/post/:post_id", commentController.findAll);
router.get("/:id", commentController.findOne);
router.patch("/:id", commentController.update);
router.delete("/:id", commentController.delete);

module.exports = router;
