const db = require("../db");

class Book {
  static async all() {
    const [rows] = await db.query("SELECT * FROM books");
    return rows;
  }

  static async find(id) {
    const [rows] = await db.query("SELECT * FROM books WHERE id = ?", [id]);
    return rows[0];
  }

  static async create(params) {
    const { title, author, ISBN, quantity, location } = params;
    const [result] = await db.query(
      "INSERT INTO books (title, author, ISBN, quantity, location ) VALUES (?, ?)",
      [title, author, ISBN, quantity, location]
    );
    return result.insertId;
  }

  static async update(id, params) {
    const { title, author, ISBN, quantity, location } = params;
    const [result] = await db.query(
      "UPDATE books SET title = ?, author = ?, ISBN = ?, quantity = ?, location = ? WHERE id = ?",
      [title, author, ISBN, quantity, location, id]
    );
    return result.affectedRows;
  }

  static async delete(id) {
    const [result] = await db.query("DELETE FROM books WHERE id = ?", [id]);
    return result.affectedRows;
  }

  static async search(term) {
    const [rows] = await db.query(
      "SELECT * FROM books WHERE title LIKE ? OR author LIKE ? OR ISBN LIKE ?",
      [`%${term}%`, `%${term}%`, `%${term}%`]
    );
    return rows;
  }
}

module.exports = Book;
