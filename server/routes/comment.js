const { Router } = require("express");
const commentController = require("../controllers/comment");
const router = Router();

router.post("/", commentController.create);
router.get("/", commentController.find);
router.get("/all", commentController.findAll);
router.get("/:id", commentController.findOne);
router.patch("/:id", commentController.update);
router.delete("/:id", commentController.delete);

module.exports = router;
