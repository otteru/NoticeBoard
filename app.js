const fs = require("fs");
// file 편집하기 위한 file system.
const path = require("path");
// path는 따로 패키지가 아니라 node.js에 기본적으로 있는 거다.

const express = require("express");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
//ejs 사용을 위한 setting

app.use(express.static("public"));
// 정적인 css, js 파일 불러오는 것을 위한 코드
//(public 폴더에 정적인 파일들이 있음)
app.use(express.urlencoded({ extended: false }));
// POST 요청의 본문 해석하기 위한 미들웨어

app.get("/", function(req,res) {
	// const htmlFilePath = path.join(__dirname, "views", "signIn.html");
	// res.sendFile(htmlFilePath); --> ejs를 사용하지 않았을 때의 코드
	
	const filePath = path.join(__dirname, "data", "users.json");
	
	const fileData = fs.readFileSync(filePath);
	const storedUsers = JSON.parse(fileData);
	
	res.render("signIn", {numberOfUsers: storedUsers.length});
});

app.post("/", function(req, res) {
	const user = req.body;
	
	const filePath = path.join(__dirname, "data", "users.json");
	
	const fileData = fs.readFileSync(filePath);
	const storedUsers = JSON.parse(fileData);
	
	//1. 이메일 존재 확인
	let isDuplicate = false;
	let i = 0;
	for (i = 0; i<storedUsers.length; i++) {
		if(storedUsers[i].userName === user.userName) {
			isDuplicate = true;
			break;
		}
	}
	
	if(isDuplicate){
		if(storedUsers[i].userPassword == user.userPassword){
			res.redirect("/home");
		}else{
			res.redirect("/?error=password");
		}
	}else{
		res.redirect("/?error=email");
	}
})

app.get("/signUp", function(req, res) {
	res.render("signUp");
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
		res.redirect("/signUp?error=duplicate");
	} else if(user.userPassword !== user.userPasswordCheck){
		//2. 비번 더블체크
		res.redirect("/signUp?error=passCheck");
	}else{
		// userPasswordCheck는 데이터에 넣지 않기 위해 새로운 객체를 만들어서 넣는 것
		const newUser = {
			userName : user.userName,
			userPassword : user.userPassword
		};
			
		storedUsers.push(newUser);
			 
		fs.writeFileSync(filePath, JSON.stringify(storedUsers));
			
		res.redirect("/");
	}
});

app.get("/home", function(req, res) {
	res.render("home");
});

app.get("/write", function(req, res) {
	res.render("write");
});


app.listen(3000);  