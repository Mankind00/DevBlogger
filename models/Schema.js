// mongoose.connect(
//   "mongodb+srv://admin-makinde:makinde@cluster0.yecmt.mongodb.net/blogDB",
//   { useNewUrlParser: true }
// );
const multer = require("multer");

const mongoose = require("mongoose");
const mongoosePagination = require("mongoose-paginate-v2");
const passport = require("passport")
const passportLocalMongoose = require("passport-local-mongoose")
// const { post } = require("../routes/composePost");


mongoose.set("strictQuery", false);

mongoose.connect("mongodb://127.0.0.1:27017/blogDB", { useNewUrlParser: true });

const postSchema = new mongoose.Schema(
  {
    postTitle: String,
    postContent: String,
    categories: Array,
    userId: String,
    img: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

const userSchema = new mongoose.Schema(
  {
    fullname: String,
    username: String,
    password: String,
  }
)

postSchema.plugin(mongoosePagination);
userSchema.plugin(passportLocalMongoose)


const Post = mongoose.model("Post", postSchema);
const User = mongoose.model("User", userSchema)

passport.use(User.createStrategy());

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

module.exports = {User, Post};
