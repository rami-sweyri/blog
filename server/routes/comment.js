const { Router } = require("express");
const commentController = require("../controllers/comment");
const router = Router();

router.get("/:id", commentController.findOne);
router.patch("/:id", commentController.update);
router.delete("/:id", commentController.delete);

module.exports = router;
