const { Router } = require("express");
const postController = require("../controllers/post");
const router = Router();

router.post("/", postController.create);
router.get("/", postController.find);
``;
router.get("/all", postController.findAll);
router.get("/:id", postController.findOne);
router.patch("/:id", postController.update);
router.delete("/:id", postController.delete);

module.exports = router;
