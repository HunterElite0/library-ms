const Book = require("../models/Book");

exports.getAllBooks = async (req, res) => {
  const books = await Book.all();
  res.json(books);
}

exports.getBook = async (req, res) => {
  const book = await Book.find(req.params.id);
  res.json(book);
}

exports.createBook = async (req, res) => {
  const id = await Book.create(req.body);
  res.json({ id });
}

exports.updateBook = async (req, res) => {
  const affectedRows = await Book.update(req.params.id, req.body);
  res.json({ affectedRows });
}

exports.deleteBook = async (req, res) => {
  const affectedRows = await Book.delete(req.params.id);
  res.json({ affectedRows });
}

exports.searchBooks = async (req, res) => {
  const books = await Book.search(req.query.term);
  res.json(books);
}
