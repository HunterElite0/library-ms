const { pool } = require("../config/database");

class User {
  static async all() {
    const [rows] = await pool.query("SELECT * FROM users");
    return rows;
  }

  static async create(params) {
    if (!params) {
      return null;
    }

    const { name, email, password } = params;
    const [result] = await pool.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, password]
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
      setColumns.push(`${key} = ?`);
      setValues.push(value);
    }

    setValues.push(id);

    const [result] = await pool.query(
      `UPDATE users SET ${setColumns.join(", ")} WHERE id = ?`,
      setValues
    );

    return result.affectedRows;
  }

  static async delete(id) {
    if (!id) {
      return null;
    }

    const [result] = await pool.query("DELETE FROM users WHERE id = ?", [id]);
    return result.affectedRows;
  }
}
