import express from "express";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";

// Needed to get filepaths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Getting port from .env
const PORT = process.env.PORT || 3000;

const app = express();

// Middleware
app.use(express.json()); // Allows the server to read JSON sent from your browser
app.use(express.urlencoded({ extended: true })); // Allows server to read form data

app.use(express.static("public"));

// --- ROUTES ---
app.get("/", (req, res) => {
	res.sendFile("index.html", { root: path.join(__dirname, "public/html") });
});

app.get("/login", (req, res) => {
	res.sendFile("login.html", { root: path.join(__dirname, "public/html") });
});

app.get("/signup", (req,res) => {
	res.sendFile("signup.html", { root: path.join(__dirname, "public/html") });
});

app.listen(PORT, () => console.log("Running on http://localhost:3000"));
