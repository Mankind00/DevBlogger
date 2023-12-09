// mongoose.connect(
//   "mongodb+srv://admin-makinde:makinde@cluster0.yecmt.mongodb.net/blogDB",
//   { useNewUrlParser: true }
// );
const multer = require("multer");

const mongoose = require("mongoose");
const mongoosePagination = require("mongoose-paginate-v2");
const passport = require("passport")
const passportLocalMongoose = require("passport-local-mongoose")
// const slug = require("mongoose-slug-generator");
const dompurify = require('dompurify');
// const {DOMPurify} = require("dompurify")
const { stripHtml } =  require("string-strip-html");
const {JSDOM} = require("jsdom");
const htmlPurify = dompurify(new JSDOM().window)
// const { post } = require("../routes/composePost");


mongoose.set("strictQuery", false);

mongoose.connect("mongodb://127.0.0.1:27017/blogDB", { useNewUrlParser: true });

// mongoose.plugin(slug)
const postSchema = new mongoose.Schema({
    postTitle: {
      type: String,
      required: true,
    },
    postContent: {
      type: String,
      required: true,
    },
    tags: {
      type: Array,
    },
    snippet: String,
    categories: {
      type: Array,
    },
    published: Boolean,
    views: 0,
    timeCreated : {
      type: Date,
      default: () => Date.now()
    },
    userId: String,
    img: {
      type: String,
      default: "placeholder.jpg",
    },
    // slug: {type: String, slug: "postTitle", unique: true}
  },
  { timestamps: true }
);

const draftSchema = new mongoose.Schema({
  postTitle: String,
  postContent: String,
  snippet: String,
  categories: Array,
  timeCreated : {
    type: Date,
    default: () => Date.now()
  },
  userId: String,
  img: {
    type: String,
    default: "placeholder.jpg",
  },
},

);
const userSchema = new mongoose.Schema(
  {
    fullname: String,
    username: String,
    password: String,
    post : postSchema,
  }
)

postSchema.plugin(mongoosePagination);
// userSchema.plugin(passportLocalMongoose)

// postSchema.pre("validate", function(next) {
//   // check if there is a content
//   if(this.postContent){
//     this.postContent = htmlPurify.sanitize(this.postContent)
//     this.snippet = stripHtml(this.postContent.substring(0,200).result)
//   }
//   next();
// })


const Post = mongoose.model("Post", postSchema);
const User = mongoose.model("User", userSchema);
const Draft = mongoose.model("Draft", draftSchema);
// passport.use(User.createStrategy());

// use static serialize and deserialize of model for passport session support
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

module.exports = {Post, Draft};
