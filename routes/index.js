var express = require('express');
var router = express.Router();
var posts = require('../db.json');
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home', posts: posts.post });
});

/* GET Create post. */
router.get('/create', function(req, res, next) {
  res.render('create');
});

router.post('/create', function(req, res, next) {
  // res.(req.body);
  let obj = {
    "title" : req.body.title,
    "author" : req.body.author,
    "date" : req.body.date,
    "content" : req.body.content,
    "story" : req.body.story
  }

  request.post({
    url: 'http://localhost:8000/post',
    body: obj,
    json: true
  },function (error, response, body) {
      res.redirect('/create');
  });
});


router.get('/post/:id', function(req,res,next){
  let urlPath = req.path;
  let postId = urlPath.slice(-1);
  res.render('blog', {
    posts: posts.post[postId -1]
  })
});

router.get('/delete/:id', function(req,res,next){
  request ({
    url: "http://localhost:8000/post/" + req.params.id,
    method: "Delete",
  }, function(error, response, body){

    res.redirect('/archive');
  });
});

/* GET Create post. */
router.get('/edit', function(req, res, next) {
  res.render('edit');
});



/* GET contact us */
router.get('/archive', function(req, res, next) {
  res.render('archive', { posts: posts.post });
});

module.exports = router;
