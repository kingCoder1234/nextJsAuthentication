import dotenv from "dotenv";
import connectDB from "./config/connectdb.js";
import app from "./app.js"; // Importing the app directly

dotenv.config();

const port = process.env.PORT;

// Database Connection
const DATABASE_URL = process.env.DATABASE_URL;
connectDB(DATABASE_URL);

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
