import express from "express";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";
import { supabase } from "./lib/supabaseClient.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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

app.post("/signup", async (req,res) => {	
	const {data: data1, error: error1} = await supabase.auth.signUp({ email: req.body.email, password: req.body.password });
	console.log(error1);

	if (!error1){
		const {data: data2, error: error2} = await supabase.from("users").insert({
				user_id: data1.user.id,
				username: req.body.username,
				user_first_name: req.body["first-name"],
				user_surname: req.body["last-name"]}
		);

		console.log(error2);

		if (!error1 && !error2) {
			res.json({data1: data1, data2: data2});
		} else{
			res.status(400).json({error1: error1, error2: error2});
		};
	} else{
		res.status(400).json(error1);
	}
});

app.listen(PORT, () => console.log("Running on http://localhost:3000"));
