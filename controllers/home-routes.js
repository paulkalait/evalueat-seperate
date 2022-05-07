const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment} = require('../models');
const fs = require('fs')
const multer = require("multer");
const path = require("path")
const { findAll } = require('../models/Post');

const upload = multer({
  dest: path.join(__dirname, "../public/images")
})

router.post(
  "/upload",
  upload.single("image"),
  (req,res) => {
    // console.log(req.body)
    const tempPath = req.file.path;
    // console.log(tempPath)
    const targetPath = path.join(__dirname, `../public/images/${req.file.originalname}`)
    // console.log(req.file.originalname)
    if(path.extname(req.file.originalname).toLowerCase() === ".png" || ".jpeg" || ".gif" ){
      // fs.rename(tempPath, targetPath, err => {
      //   console.log(targetPath)
      //   if(err) return handleError(err, res)
      // })
      console.log(req.body)
      console.log(req.file.originalname)
      
      console.log({
        title: req.body["post-title"],
        post_text: req.body['post-text'],
        user_id: req.session.user_id,
        image_name: req.file.originalname
      })
      Post.create({
        title: req.body["post-title"],
        post_text: req.body['post-text'],
        user_id: req.session.user_id,
        image_name: req.file.originalname
  
      })
        .then(dbPostData => 
          res.status(200)
          .contentType("text/plain")
          .redirect("/"))
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        })
    }else{
      fs.unlink(tempPath, err=> {
        if(err) throw(err)

        res
        .status(404)
        .contentType("text/plain"
        .end("only .png files are allowed!"))
      })
    }
  }
)

router.put(
  "/upload",
  upload.single("image"),
  (req,res) => {
    // console.log(req.body)
    const tempPath = req.file.path;
    // console.log(tempPath)
    const targetPath = path.join(__dirname, `../public/images/${req.file.originalname}`)
    // console.log(req.file.originalname)
    if(path.extname(req.file.originalname).toLowerCase() === ".png" || ".jpeg" || ".gif" ){
      // fs.rename(tempPath, targetPath, err => {
      //   console.log(targetPath)
      //   if(err) return handleError(err, res)
      // })
      console.log(req.body)
      console.log(req.file.originalname)
      
      console.log({
        title: req.body["post-title"],
        post_text: req.body['post-text'],
        user_id: req.session.user_id,
        image_name: req.file.originalname
      })
      Post.update({
        title: req.body["post-title"],
        post_text: req.body['post-text'],
        user_id: req.session.user_id,
        image_name: req.file.originalname
  
      })
        .then(dbPostData => 
          res.status(200)
          .contentType("text/plain")
          .redirect("/"))
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        })
    }else{
      fs.unlink(tempPath, err=> {
        if(err) throw(err)

        res
        .status(404)
        .contentType("text/plain"
        .end("only .png files are allowed!"))
      })
    }
  }
)

// router.get("/image/:image", (req,res) => {
//   // findAll(req.params.)

//   let imageToSearch = req.params;
//   console.log(imageToSearch);
//   res.sendFile(path.join(__dirname, `../public/image/${imageToSearch.image}`));
// })

// get all posts for homepage
router.get('/', (req, res) => {
  console.log('======================');
  Post.findAll({
    attributes: [
      'id',
      'post_text',
      'title',
      'image_name',
      'created_at',
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({ plain: true }));

      res.render('homepage', {
        posts,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get single post
router.get('/post/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'post_text',
      'title',
      'image_name',
      'created_at',
      // [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }

      const post = dbPostData.get({ plain: true });

      res.render('single-post', {
        post,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

module.exports = router;
