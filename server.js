import express from "express";
import "dotenv/config";

const app = express();

app.use(express.static("public"));

app.listen(3000, () => console.log("Running on http://localhost:3000"));

app.get("/", (req, res) => {
	res.sendFile("index.html", {root: "public/html"});
});
