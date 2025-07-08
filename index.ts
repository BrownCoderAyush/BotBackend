import AppDataSource from "./config/db";
import app from "./app";

const PORT = 3000;

AppDataSource.initialize()
  .then(async () => {
    console.log("Database initialized");

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database initialization failed:", error);
    process.exit(1);
  });
