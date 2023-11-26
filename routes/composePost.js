const express = require("express");
const {
  homeView,
  postView,
  newPost,
  pageView,
  loginView,
  adminTest,
  registerUser,
  composeView,
  admin,
  loginUser,
  testPost,
  aboutView,
  contactView,
  adminPanel,
  registerView
} = require("../controllers/composeController");

const router = express.Router();
router.get("/compose", composeView);
router.get("/", homeView);
router.get("/page/:pageNum", pageView);
router.get("/post/:postid", postView);
router.get("/login", loginView);
router.post("/login", loginUser);
router.get("/signup", registerView)
router.post("/register", registerUser)
// router.get("/admin", adminPanel);
router.get("/admin", admin);
// router.get("/about", aboutView);
// router.get("/contact", contactView);
router.post("/compose", newPost);

module.exports = router;
