const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname,"..", "data", "posts.json");

function getStoredPosts() {
	const fileData = fs.readFileSync(filePath);
	const storedPosts = JSON.parse(fileData);
	
	return storedPosts;
}

function storePosts (storablePosts){
	fs.writeFileSync(filePath, JSON.stringify((storablePosts)));
}

module.exports={
	getStoredPosts: getStoredPosts,
	// 다른 파일에서 사용할 이름: 이 파일에서 함수 이름
	storePosts: storePosts
} 