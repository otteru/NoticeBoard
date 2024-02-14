const fs = require("fs");
// file 편집하기 위한 file system.
const path = require("path");
// path는 따로 패키지가 아니라 node.js에 기본적으로 있는 거다.

const express = require("express");

const app = express();

app.use(express.static("public"));
// 정적인 css, js 파일 불러오는 것을 위한 코드
//(public 폴더에 정적인 파일들이 있음)
app.use(express.urlencoded({ extended: false }));
// POST 요청의 본문 해석하기 위한 미들웨어
  
//app.set("vies", path.join(__dirname, "views"));
//app.set("view engine", "ejs");

app.get("/", function(req,res) {
	const htmlFilePath = path.join(__dirname, "views", "signIn.html");
	res.sendFile(htmlFilePath);
});

app.get("/signUp", function(req, res) {
	const htmlFilePath = path.join(__dirname, "views", "signUp.html");
	res.sendFile(htmlFilePath);
});

app.post("/signUp", function(req, res){
	const user = req.body;
	
	const filePath = path.join(__dirname, "data", "users.json");
	
	const fileData = fs.readFileSync(filePath);
	const storedUsers = JSON.parse(fileData);
	
	//1. 이메일 중복 체크
	let isDuplicate = false;
	for (let i=0; i<storedUsers.length; i++) {
		if(storedUsers[i].userName === user.userName) {
			isDuplicate = true;
			break;
		}
	}
	
	if(isDuplicate) {
		res.send("<script>alert('중복된 아이디 입니다.');</script>");
		res.redirect("/signUp");
	}
	
	//2. 비번 더블체크
	if(user.userPassword !== user.userPasswordCheck){
		
		res.redirect("/signUp");
	}
	
	storedUsers.push(user);
	 
	fs.writeFileSync(filePath, JSON.stringify(storedUsers));
	
	res.redirect("/");
});


app.get("/home", function(req, res) {
	const htmlFilePath = path.join(__dirname, "views", "home.html");
	res.sendFile(htmlFilePath);
});



app.listen(3000);  