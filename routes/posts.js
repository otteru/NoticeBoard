const express = require("express");

const uuid =require("uuid");

const postData = require("../util/post-data");
const appData = require("../app");

const router = express.Router();

router.get("/home", function(req, res) {
	
	const storedPosts = postData.getStoredPosts();
	
	let order = req.query.order;
	let nextOrder = "desc";
	
	if(order !== "asc"  && order !== "desc"){
		order = "asc";
	}
	
	if(order === "desc"){
		nextOrder = "asc";
	}
	
	storedPosts.sort(function(resA, resB) {
		if((order === "asc" && resA.time > resB.time)||
		  (order === "desc" && resB.time > resA.time)){
			return 1;
		}
		return -1;
	})
	
	res.render("home", {
		userId: appData.member,
		numberOfPosts: storedPosts.length,
		posts: storedPosts,
		nextOrder : nextOrder
	});
});

router.get("/home/:id", function (req, res) {
	const postId = req.params.id;
	
	const storedPosts = postData.getStoredPosts();
	
	for(const post of storedPosts) {
		if(post.id== postId) {
			return res.render("post-detail", {post: post});
		}
	}
	
	// res.status(404).render('404');
	
});

router.post('/logOut', (req, res) => {
	appData.member = "";
	appData.isSignIn = "false";
    res.redirect('/');
});

router.get("/write", function(req, res) {
	res.render("write");
});

router.post("/write", function(req, res) {
	const post = req.body;
	
	const storedPosts = postData.getStoredPosts();
	
	const currentDate = new Date();

	const newPost = {
		title : post.title,
		author : appData.member,
		time: currentDate,
		mainText : post.mainText,
		id : uuid.v4()
		};
	
	storedPosts.push(newPost);
	 
	postData.storePosts(storedPosts);
	
	res.redirect("/home");
	
})

module.exports = router;