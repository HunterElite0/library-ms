const BorrowRecord = require("../models/BorrowRecord");
const Book = require("../models/Book");

exports.getAllBorrowRecords = async (req, res) => {
  try {
    const borrowRecords = await BorrowRecord.all();
    res.json(borrowRecords);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateBorrowRecord = async (req, res) => {
  try {
    const affectedRows = await BorrowRecord.update(req.params.id, req.body);
    affectedRows
      ? res.json({ affectedRows })
      : res.status(500).json({ error: "Failed to update borrow record" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update borrow record" });
  }
};

exports.deleteBorrowRecord = async (req, res) => {
  try {
    const affectedRows = await BorrowRecord.delete(req.params.id);
    affectedRows
      ? res.json({ affectedRows })
      : res.status(500).json({ error: "Failed to delete borrow record" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete borrow record" });
  }
};

exports.getBorrowedBooksByUserId = async (req, res) => {
  try {
    const borrowRecords = await BorrowRecord.getBorrowedBooksByUserId(
      req.params.user_id
    );
    res.json(borrowRecords);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.listOverdueBooks = async (req, res) => {
  try {
    const borrowRecords = await BorrowRecord.listOverdueBooks();
    res.json(borrowRecords);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.borrowBook = async (req, res) => {
  const user_id = req.header("token");
  const book_id = req.body.book_id;
  const return_date = req.body.return_date;

  if (!user_id || !book_id || !return_date) {
    return res.status(400).json({ error: "Invalid request" });
  }

  if (Book.checkAvailability(book_id) === 0) {
    return res.status(400).json({ error: "Book is not available" });
  }

  try {
    const borrow = await Book.update(book_id, { quantity: "-1" });
    if (!borrow) {
      return res.status(500).json({ error: "Failed to borrow book" });
    }
    const id = await BorrowRecord.create({ user_id, book_id, return_date });
    id
      ? res.json({ id })
      : res.status(500).json({ error: "Failed to borrow book" });
  } catch (error) {
    res.status(500).json({ error: "Failed to borrow book" });
  }
};

exports.returnBook = async (req, res) => {
  const user_id = req.header("token");
  const book_id = req.body.book_id;

  if (!user_id || !book_id) {
    return res.status(400).json({ error: "Invalid request" });
  }

  try {
    const borrow = await Book.update(book_id, { quantity: "+1" });
    if (!borrow) {
      return res.status(500).json({ error: "Failed to return book" });
    }
    const affectedRows = await BorrowRecord.update(book_id, {
      status: "returned",
    });
    affectedRows
      ? res.json({ affectedRows })
      : res.status(500).json({ error: "Failed to return book" });
  } catch (error) {
    res.status(500).json({ error: "Failed to return book" });
  }
};

exports.getBorrowRecordsPeriod = async (req, res) => {
  try {
    const borrowRecords = await BorrowRecord.getBorrowRecordsPeriod(
      req.query.start_date,
      req.query.end_date
    );
    const noOfBorrowRecords = borrowRecords.length;
    const overdueBooks = borrowRecords.filter(
      (record) => record.return_date < new Date()
    ).length;
    const onTimeBooks = noOfBorrowRecords - overdueBooks;
    res.json({ noOfBorrowRecords, overdueBooks, onTimeBooks });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
