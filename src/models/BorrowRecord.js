const { pool } = require("../config/database");

class BorrowRecord {
  static async all() {
    const [rows] = await pool.query("SELECT * FROM borrow_records");
    return rows;
  }

  static async create(params) {
    if (!params) {
      return null;
    }

    const { book_id, user_id, return_date } = params;
    const [result] = await pool.query(
      "INSERT INTO borrow_records (book_id, user_id, return_date) VALUES (?, ?, ?)",
      [book_id, user_id, return_date]
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
      setColumns.push(`${key} = ?`);
      setValues.push(value);
    }

    setValues.push(id);

    const [result] = await pool.query(
      `UPDATE borrow_records SET ${setColumns.join(", ")} WHERE id = ?`,
      setValues
    );

    return result.affectedRows;
  }

  static async delete(id) {
    if (!id) {
      return null;
    }

    const [result] = await pool.query(
      "DELETE FROM borrow_records WHERE id = ?",
      [id]
    );
    return result.affectedRows;
  }

  static async getBorrowedBooksByUserId(user_id) {
    if (!user_id) {
      return null;
    }

    const [rows] = await pool.query(
      "SELECT * FROM borrow_records WHERE user_id = ?",
      [user_id]
    );
    return rows;
  }

  static async listOverdueBooks() {
    const [rows] = await pool.query(
      "SELECT * FROM borrow_records WHERE return_date < NOW()"
    );
    return rows;
  }

  static async getBorrowRecordsPeriod(start_date, end_date) {
    if (!start_date || !end_date) {
      return null;
    }

    const [rows] = await pool.query(
      "SELECT * FROM borrow_records WHERE borrow_date BETWEEN ? AND ?",
      [start_date, end_date]
    );
    return rows;
  }

}

module.exports = BorrowRecord;
