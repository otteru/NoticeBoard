const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname,"..", "data", "users.json");

function getStoredUsers() {
	const fileData = fs.readFileSync(filePath);
	const storedUsers = JSON.parse(fileData);
	
	return storedUsers;
}

function storeUsers (storableUsers){
	fs.writeFileSync(filePath, JSON.stringify((storableUsers)));
}

module.exports={
	getStoredUsers: getStoredUsers,
	// 다른 파일에서 사용할 이름: 이 파일에서 함수 이름
	storeUsers: storeUsers
} 