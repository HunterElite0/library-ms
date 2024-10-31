const Book = require("../models/Book");

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.all();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.searchBook = async (req, res) => {
  try {
    const books = await Book.search(req.query.term);
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.createBook = async (req, res) => {
  try {
    const id = await Book.create(req.body);
    id
      ? res.json({ id })
      : res.status(500).json({ error: "Failed to create book" });
  } catch (error) {
    res.status(500).json({ error: "Failed to create book" });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const affectedRows = await Book.update(req.params.id, req.body);
    affectedRows
      ? res.json({ affectedRows })
      : res.status(500).json({ error: "Failed to update book" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update book" });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const affectedRows = await Book.delete(req.params.id);
    affectedRows
      ? res.json({ affectedRows })
      : res.status(500).json({ error: "Failed to delete book" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete book" });
  }
};
