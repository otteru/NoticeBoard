const express = require("express");

const userData = require("../util/user-data");
const appData = require("../app");

const router = express.Router();

router.get("/", function(req,res) {
	// const htmlFilePath = path.join(__dirname, "views", "signIn.html");
	// res.sendFile(htmlFilePath); --> ejs를 사용하지 않았을 때의 코드
	
	const storedUsers = userData.getStoredUsers();
	
	res.render("signIn", {numberOfUsers: storedUsers.length});	
});

router.post("/", function(req, res) {
	const user = req.body;
	
	const storedUsers = userData.getStoredUsers();
	
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
			appData.isSignIn = true;
			appData.member = user.userName; 
			res.redirect("/home");
		}else{
			res.redirect("/?error=password");
		}
	}else{
		res.redirect("/?error=email");
	}
})

router.get("/signUp", function(req, res) {
	res.render("signUp");
});


router.post("/signUp", function(req, res){
	const user = req.body;
	
	const storedUsers = userData.getStoredUsers();;
	
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
			 
		userData.storeUsers(storedUsers);
			
		res.redirect("/");
	}
});

module.exports = router;