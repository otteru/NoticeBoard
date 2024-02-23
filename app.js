const fs = require("fs");
// file 편집하기 위한 file system.
const path = require("path");
// path는 따로 패키지가 아니라 node.js에 기본적으로 있는 거다.
const uuid =require("uuid");

const express = require("express");

const defaultRoutes = require("./routes/default");
const postsRoutes = require("./routes/posts");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
//ejs 사용을 위한 setting

app.use(express.static("public"));
// 정적인 css, js 파일 불러오는 것을 위한 코드
//(public 폴더에 정적인 파일들이 있음)
app.use(express.urlencoded({ extended: false }));
// POST 요청의 본문 해석하기 위한 미들웨어

let isSignIn = false;
let member = "";

app.use("/", defaultRoutes);

app.use("/", postsRoutes);

app.listen(3000);  