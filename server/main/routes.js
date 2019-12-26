var express = require('express')
var router = express.Router()
var pool = require('./db')

/*
  POSTS ROUTES SECTION
*/
router.get('/hello', function (req, res) {
  res.json("hello world")
})

router.get('/api/get/allposts', (req, res, next) => {
  pool.query("SELECT * FROM posts ORDER BY date_created DESC",
    (q_err, q_res) => {
      res.json(q_res.rows)
      console.log(q_err)
    })
})

router.post('/api/posts/posttodb', (req, res, next) => {
  const values = [req.body.title, req.body.body, req.body.uid, req.body.username]
  pool.query(`INSERT INTO posts(title, body, user_id, author, date_created) VALUES($1, $2, $3, $4, NOW() )`,
    values,
    (q_err, q_res) => {
      if (q_err) return next(q_err)
      res.json(q_res.rows)
      console.log(q_err)
    }
  )
})

router.put('api/put/post', (req, res, next) => {
  const values = [req.body.title, req.body.body, req.body.uid, req.body.pid, req.body.username]
  pool.query(
    `UPDATE posts SET title=$1, body=$2, user_id=$3, author=$5, date_created=NOW() WHERE pid=$4`,
    values,
    (q_err, q_res) => {
      res.json(q_res.rows)
      console.log(q_err)
    }
  )
})

router.delete('/api/delete/postcomments', (req, res, next) => {
  const post_id = req.body.post_id
  pool.query(
    `DELETE FROM comments WHERE post_id=$1`,
    [post_id],
    (q_err, q_res) => {
      res.json(q_res.rows)
      console.log(q_err)
    }
  )
})

router.delete('/api/delete/post', (req, res, next) => {
  const post_id = req.body.post_id
  pool.query(
    `DELETE FROM posts WHERE post_id=$1`,
    [post_id],
    (q_err, q_res) => {
      res.json(q_res.rows)
      console.log(q_err)
    }
  )
})

/*
  COMMENTS ROUTES SECTION
*/
router.post('/api/post/commenttodb', (req, res, next) => {
  const values = [res.body.comment, req.body.user_id, req.body.username, req.body.post_id]
  pool.query(
    `INSERT INTO comments(comment, user_id, author, post_id, date_created) VALUES($1, $2, $3, $4, NOW())`,
    values,
    (q_err, q_res) => {
      res.json(q_res.rows)
      console.log(q_err)
    }
  )
})

router.put('/api/put/commenttodb', (req, res, next) => {
  const values = [req.body.comment, req.body.user_id, req.body.post_id, req.body.username, req.body.cid]
  pool.query(
    `UPDATE comments SET comment=$1, user_id=$2, post_id=$3, author=$4, date_created=NOW() WHERE cid=$5`,
    values,
    (q_err, q_res) => {
      res.json(q_res.rows)
      console.log(q_err)
    }
  )
})

router.delete('api/delete/comment', (req, res, next) => {
  const cid = req.body.cid
  pool.query(
    `DELETE FROM comments WHERE cid=$1`,
    [cid],
    (q_err, q_res) => {
      res.json(q_res.rows)
      console.log(q_err)
    }
  )
})

router.get('/api/get/allpostcomments', (req, res, next) => {
  const post_id = String(req.query.post_id)
  pool.query(
    `SELECT * FROM comments WHERE post_id=$1`,
    [post_id],
    (q_err, q_res) => {
      res.json(q_res.rows)
      console.log(q_err)
    }
  )
})

/*
  USERS ROUTES SECTION
*/
router.post('api/post/userprofiletodb', (req, res, next) => {
  const values = [req.body.profile.nickname, req.body.profile.email, req.body.profile.email_verified]
  pool.query(
    `INSERT INTO users(username, email, email_verified, date_created) VALUES($1, $2, $3, NOW()) ON CONFLICT DO NOTHING`,
    values,
    (q_err, q_res) => {
      res.json(q_res.rows)
      console.log(q_err)
    }
  )
})

router.get('api/get/userprofiletodb', (req, res, next) => {
  const email = String(req.body.email)
  pool.query(
    `SELECT * FROM users WHERE email=$1`,
    [email],
    (q_err, q_res) => {
      req.json(q_res.rows)
      console.log(q_err)
    }
  )
})

router.get('api/get/userposts', (req, res, next) => {
  const user_id = String(req.body.userid)
  pool.query(
    `SELECT * FROM posts WHERE user_id=$1`,
    [user_id],
    (q_err, q_res) => {
      req.json(q_res.rows)
      console.log(q_err)
    }
  )
})

module.exports = router
