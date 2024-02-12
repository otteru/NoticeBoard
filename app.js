const express = require("express");

const app = express();

//app.set("vies", path.join(__dirname, "views"));
//app.set("view engine", "ejs");

app.get("/", function(req,res) {
	res.send("<h1>hello</h1>");
})

app.get("/home", function(req, res) {
	const htmlFilePath = path.join(__dirname, "views", "home.html");
	res.sendFile("home.html");
})
app.listen(3000); 