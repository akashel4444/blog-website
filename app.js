//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "hi i am akash if you want to post any thing then you can to to new post"
const aboutContent ="my name is akash and i am from nit meghalaya and i love to make websites and to learn new scriptual language and i am also good in data structure annd algrothim in c++" ;


const contactContent = " my email id akashel4444@gmail.com and phone number is 6393498370 if u want to contact me then u can";


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/blogDB" , {useNewUrlParser:true});

// let posts = [];
const postSchema = {
  title : String ,
  content : String
}
const Post = mongoose.model("Post" , postSchema);

// const postsarray = [];
app.get("/", function(req, res){
  Post.find({} , function(err , posts){
    if(err){
      console.log(err);
    // }else if(foundItems.length==0){
    //   Post.insertMany(postsarray , function(err){
    //     if(!err){
    //       console.log("inserted succesfully inside postarray and in mongoose");
    //     }
    //   });
    //   res.redirect("/");

    }else {

      res.render("home", {
        startingContent: homeStartingContent,
        posts: posts
        });
    }

  });
});



app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post ({

      title: req.body.postTitle,
      content: req.body.postBody

  });
  // posts.push(post);
  post.save(function(err){
    if(!err){
        res.redirect("/");
    }
  });



});

app.get("/posts/:postId", function(req, res){
  const requestedPostId = req.params.postId

  // posts.forEach(function(post){
  //   const storedTitle = _.lowerCase(post.title);
    Post.findOne({_id :requestedPostId} , function(err,post){
      res.render("post", {
        title: post.title,
        content: post.content
      });
    });




});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
