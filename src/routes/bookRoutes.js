const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

router.get("/all", bookController.getAllBooks);
router.get("/search", bookController.searchBook);
router.post("/", bookController.createBook);
router.put("/:id", bookController.updateBook);
router.delete("/:id", bookController.deleteBook);

module.exports = router;
