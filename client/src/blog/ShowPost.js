import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as ACTIONS from '../sore/actions/actions'
import axios from 'axios'
import history from '../utils/history'

import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'

const RenderComment = (comment) => {
  <div>
    <h3>{comment.comment.comment}</h3>
    <small>{comment.comment.date_created}</small>
    <p>By: {comment.comment.author}</p>
    {comment.cur_user_id == comment.comment.user_id ? (
      <Button onClick={() => this.handleClick(comment.comment.id, comment.comment.comment)}>
        Edit
      </Button>
    ) : ''}
  </div>
}

class ShowPost extends Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
      comment: '',
      cid: '',
    }
  }

  componentDidMount() {
    axios.get('/api/get/allpostcomments', { params: { post_id: this.props.location.state.post.post.pid } })
      .then(res => this.props.set_comments(res.data))
      .catch(err => console.error(err))
  }

  handleClickOpen = (cid, comment) => {
    this.setState({ open: true, comment, cid })
  }

  handleClickClose = () => {
    this.setState({ open: false, comment: '', cid: '' })
  }

  handleCommentChange = (e) => {
    this.setState({ comment: e.target.value })
  }

  handleUpdateComment = () => {
    const comment = this.state.comments
    const cid = this.state.cid
    const user_id = this.props.db_profile[0].uid
    const post_id = this.props.location.state.post.post.post_id
    const username = this.props.db_profile[0].username
    const data = { comment, cid, post_id, user_id, username }

    axios.put('/api/put/commenttodb', data)
      .then(res => console.log(res))
      .then(setTimeout(() => history.replace('/posts'), 700))
      .catch(err => console.error(err))
  }

  handleDeleteComment = () => {
    const cid = this.state.cid

    axios.delete('/api/delete/commenttodb', { data: { cid } })
      .then(res => console.log(res))
      .then(setTimeout(() => history.replace('/posts'), 700))
      .catch(err => console.error(err))
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const user_id = this.props.db_profile[0].uid
    const post_id = this.props.location.state.post.post.post_id
    const username = this.props.db_profile[0].username
    const data = { comment: e.target.comment.value, post_id, user_id, username }

    axios.post('/api/post/commenttodb', data)
      .then(res => console.log(res))
      .then(setTimeout(() => history.replace('/posts'), 700))
      .catch(err => console.error(err))
  }


  render() {
    return (
      <div>
        <div>
          <h2>Post</h2>
          <h4>{this.props.location.state.post.post.title}</h4>
          <p>{this.props.location.state.post.post.body}</p>
          <p>{this.props.location.state.post.post.author}</p>
        </div>
        <div>
          <h2>Comments:</h2>
          {this.props.comments ? (
            this.props.comments.map(comment => {
              <RenderComment
                key={comment.cid}
                comment={comment}
                cur_user_id={this.props.db_profile[0].uid}
              />
            })
          ) : ' '}
        </div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <TextField
              id="comment"
              label="Comment"
              margin="normal"
            />
            <br />
            <Button type="submit">Submit</Button>
          </form>
        </div>
        <div>
          <Dialog
            open={this.state.open}
            onClose={this.handleClickClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Edit Comment</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description" >
                <input type="text" value={this.state.comment} onChange={this.handleCommentChange} />
              </DialogContentText>
              <DialogActions>
                <Button onClick={() => { this.handleUpdateComment(); this.setState({ open: false }) }}>
                  Agree
                </Button>
                <Button onClick={() => this.handleClickClose()}>
                  Cancel
                </Button>
                <Button onClick={() => this.handleDeleteComment()}>
                  Delete
                </Button>
              </DialogActions>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    comments: state.posts_reducer.comments,
    db_profile: state.auth_reducer.db_profile
  }
}

function mapDispatchToProps(dispatch) {
  return {
    set_comments: (comments) => dispatch(ACTIONS.fetch_post_comments(comments))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowPost)
