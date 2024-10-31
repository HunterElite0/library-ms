const express = require("express");
const { dbConnect } = require("./src/config/database");

const app = express();
app.use(express.json());

// Mounting routes to express app
app.use("/api/books", require("./src/routes/bookRoutes"));
app.use("/api/users", require("./src/routes/userRoutes"));

// Healthcheck
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Bookstore API" });
});

async function startServer() {
  try {
    // First, try to connect to the database
    await dbConnect();

    // If database connection is successful, start the Express server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

// Start the server
startServer();
