const express = require("express");
const router = express.Router();
const borrowController = require("../controllers/borrowController");

router.get("/all", borrowController.getAllBorrowRecords);
router.get("/overdue", borrowController.listOverdueBooks);
router.get("/user/:user_id", borrowController.getBorrowedBooksByUserId);
router.get("/stats", borrowController.getBorrowRecordsPeriod);
router.post("/", borrowController.borrowBook);
router.put("/update/:id", borrowController.updateBorrowRecord);
router.put("/return", borrowController.returnBook);
router.delete("/:id", borrowController.deleteBorrowRecord);

module.exports = router;
