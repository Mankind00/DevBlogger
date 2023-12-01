//js

// For Home Page
// const upload = require("../models/Post");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const {Post, User} = require("../models/Schema");
const passport = require("passport");
const session = require("express-session");



// const { result } = require("lodash");
// const helper = require("../config/helper");
// const helper = require("../config/helper");
// const bcrypt = require("bcrypt")
// const saltRounds = 10


// const obj = { c: "T", "&gt;": ">" };
// console.log(helper.obj);
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
const size = 9;

const homeView = (req, res) => {
  Post.paginate({}, { sort: { _id: -1 }, offset: 0, limit: size }).then(
    (result) => {
      // console.log(result.totalPages);
      res.render("home", {
        posts: result.docs,
        pageCount: result.totalPages,
        currPage: result.page,
      });
    }
  );
};

const postView = (req, res) => {
  const requestedid = req.params.postid;
  console.log(requestedid);
  Post.findById(requestedid, function (err, post) {
    if (!err) {
      if (post) {
        res.render("post", {
          title: post.postTitle,
          content: post.postContent,
          addImage: post.img,
        });
        // console.log(post.img.data.toString("base64"));
      }
    } else {
      console.log("Failed");
    }
  });
};


const loginUser = (req, res) => {
  const user = new User({
    username : req.body.username,
    password : req.body.password
})

req.login(function(err) {
    if(err) {
        console.log(err)
    } else {
        passport.authenticate("locals")(req, res, function() {
            res.redirect("/secrets")
        })
    }
    
})
};

const loginView = (req, res) => {
  res.render("login")
}

const registerView = (req, res) => {
  res.render("signup", {})
}

const registerUser = (req, res) => {

  User.register({fullname: req.body.fullName, username: req.body.email }, req.body.password, function(err, user) {
    if(err) {
        console.log(err);
        res.redirect("/register")
    } else {
        passport.authenticate("local")(req, res, function() {
            res.redirect("/admin")
        })
    }
})
}


const pageView = (req, res) => {
  const pageNumber = req.params.pageNum;
  Post.paginate(
    {},
    { sort: { _id: -1 }, offset: size * (pageNumber - 1), limit: size }
  ).then((result) => {
    console.log(result);
    res.render("page", {
      posts: result.docs,
      pageCount: result.totalPages,
      currPage: result.page,
    });
  });
};

// const testPost = (req, res) => {

// };

// const adminPanel = (req, res) => {
//   res.render("admin-layout", {});
// };

const admin = (req, res) => {
  res.render("admin")
}

const adminTest = (req, res) => {
  if(req.isAuthenticated()) {
    res.render("admin")
} else {
    res.redirect("/login")
}
}

const newPostView = (req, res) => {
  // if(req.isAuthenticated()) {
  //   res.render(newPost.ejs)
  // } else {
  //   res.redirect("/login")
  // }
  res.render("newPost")
}

const allPostView = (req, res) => {
  Post.paginate({}, { sort: { _id: -1 }, offset: 0, limit: size }).then(
    (result) => {
      // console.log(result.totalPages);
      res.render("allPost", {
        posts: result.docs,
        pageCount: result.totalPages,
        currPage: result.page,
      });
    }
  );
}

const composeView = (req, res) => {
  res.render("compose")
}

const newPost = (req, res) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      console.log(err);
    } else {
      const post = new Post({
        postTitle: req.body.postTitle,
        postContent: req.body.postBody,

        img: req.file.path,
      });
      post
        .save()
        .then(() => res.redirect("/"))
        .catch((err) => console.log(err));
    }
  });
};

const aboutView = (req, res) => {
  res.render("about", {});
};

const contactView = (req, res) => {
  res.render("contact", {});
};

// const newPost =

module.exports = {
  homeView,
  newPost,
  pageView,
  postView,
  loginView,
  loginUser,
  adminTest,
  registerView,
  registerUser,
  composeView,
  admin,
  newPostView,
  allPostView
};
