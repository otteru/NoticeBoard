const path = require("path");
// path는 따로 패키지가 아니라 node.js에 기본적으로 있는 거다.

const express = require("express");

const app = express();

app.use(express.static("public"));
// 정적인 css, js 파일 불러오는 것을 위한 코드
//(public 폴더에 정적인 파일들이 있음)
  
//app.set("vies", path.join(__dirname, "views"));
//app.set("view engine", "ejs");

app.get("/", function(req,res) {
	const htmlFilePath = path.join(__dirname, "views", "logIn.html");
	res.sendFile(htmlFilePath);
})
 
app.get("/home", function(req, res) {
	const htmlFilePath = path.join(__dirname, "views", "home.html");
	res.sendFile(htmlFilePath);
});
app.listen(3000);   