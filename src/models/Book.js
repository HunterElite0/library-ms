const { pool } = require("../config/database");

class Book {
  static async all() {
    const [rows] = await pool.query("SELECT * FROM books");
    return rows;
  }

  static async create(params) {
    if (!params) {
      return null;
    }

    const { title, author, ISBN, quantity, shelf_location } = params;
    const [result] = await pool.query(
      "INSERT INTO books (title, author, ISBN, quantity, shelf_location ) VALUES (?, ?, ?, ?, ?)",
      [title, author, ISBN, quantity, shelf_location]
    );
    return result.insertId;
  }

  static async update(id, params) {
    if (!id || !params) {
      return null;
    }

    const paramMap = new Map(Object.entries(params));
    const setColumns = [];
    const setValues = [];

    for (const [key, value] of paramMap) {
      if (key === "id") {
        continue;
      }
      if (key === "quantity" && typeof value === "string") {
        setColumns.push(`${key} = ${key} + ?`);
        setValues.push(parseInt(value));
      } else {
        setColumns.push(`${key} = ?`);
        setValues.push(value);
      }
    }

    setValues.push(id);

    const [result] = await pool.query(
      `UPDATE books SET ${setColumns.join(", ")} WHERE id = ?`,
      setValues
    );

    return result.affectedRows;
  }

  static async delete(id) {
    if (!id) {
      return null;
    }

    const [result] = await pool.query("DELETE FROM books WHERE id = ?", [id]);
    return result.affectedRows;
  }

  static async search(term) {
    // Input validation
    if (!term || typeof term !== "string") {
      return null;
    }

    // Sanitize the search term to prevent SQL injection
    const sanitizedTerm = term.replace(/[%_\\]/g, "\\$&");

    const [rows] = await pool.query(
      `SELECT * FROM books 
       WHERE MATCH(title, author, ISBN) 
       AGAINST (? IN NATURAL LANGUAGE MODE)`,
      [sanitizedTerm]
    );

    return rows;
  }

  static async checkAvailability(id) {
    if (!id) {
      return null;
    }

    const [rows] = await pool.query("SELECT quantity FROM books WHERE id = ?", [
      id,
    ]);

    return rows[0].quantity > 0;
  }
}

module.exports = Book;
