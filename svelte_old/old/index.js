const express = require("express");
const app = express();
const path = require("path");
//const bodyParser = require("body-parser");
const port = 3000

app.use(express.static(path.join(__dirname, "html")));
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
	res.send(`Ciao mondo!<br><a href="/search">search</a><br><a href="/insert">insert</a>`)
});
app.get("/insert", (req, res) => {
	res.sendFile(path.join(__dirname, "html", "insert.html"));
});
app.post("/submit", (req, res) => {
	const { English, Italian, Chinese, p_chinese, Japanese, p_japanese, German, Russian, French } = req.body;
	const word = {
		english: English,
		italian: Italian,
		chinese: {
			character: Chinese,
			pronunciation: p_chinese
		},
		japanese: {
			character: Japanese,
			pronunciation: p_japanese
		},
		german: German,
		russian: Russian,
		french: French
	}
	console.log(JSON.stringify(word, null, 2));
});
app.get("/search", (req, res) => {
	res.sendFile(path.join(__dirname, "html", "search.html"));
});

app.listen(port, () => {
	console.log("Server is running on http://localhost:"+port);
});
 
