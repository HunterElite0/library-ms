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
      if (key === "id" || key === "created_at") {
        continue;
      }
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

  static async authUser(email, password) {
    if (!email || !password) {
      return null;
    }

    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (!rows.length) {
      return null;
    }

    if (rows[0].password !== password) {
      return null;
    }

    return rows[0];
  }
}

module.exports = User;
