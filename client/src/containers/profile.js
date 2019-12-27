import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import axios from 'axios'
import * as ACTIONS from '../store/actions/actions'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import history from '../utils/history'

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      post_id: null
    }
  }

  componentDidMount() {
    const user_id = this.props.db_profile[0].uid
    axios.get('/api/get/userposts', { params: { user_id } })
      .then(res => this.props.set_user_posts(res.data))
      .catch(err => console.error(err))
  }

  RenderProfile = (props) => (
    <div>
      <h1>{props.profile.profile.nickname}</h1>
      <br />
      <img src={props.profile.profile.picture} alt="" />
      <br />
      <h4> {props.profile.profile.email}</h4>
      <br />
      <h5> {props.profile.profile.name} </h5>
      <br />
      <h6> Email Verified: {props.profile.profile.email_verified ? <p>Yes</p> : <p>No</p>}</h6>
      <br />
    </div>
  )

  RenderPosts = (post) => (
    <Card style={{ width: '500px', height: '200px', marginBottom: '10px', paddingBottom: '80px' }}>
      <CardHeader
        title={
          <Link to={{ pathname: '/post' + post.post.id, state: { post } }}>
            {post.post.title}
          </Link>
        }
        subheader={
          <div className="FlexColumn">
            <div className="FlexRow">
              {post.post.date_created}
            </div>
            <div className="FlexRow">
              <Link to={{ pathname: '/editpost/' + post.post.pid, state: { post } }}>
                <button>Edit</button>
              </Link>
              <button onClick={() => this.handleClickOpen(post.post.pid)}>Delete</button>
            </div>
          </div>
        }
      />
      <br />
      <CardContent>
        <span style={{ overflow: 'hidden' }}>{post.post.body}</span>
      </CardContent>
    </Card>
  )

  handleClickOpen = (post_id) => {
    this.setState({ open: true, post_id })
  }

  handleClickClose = () => {
    this.setState({ open: false, post_id: null })
  }

  deletePost = () => {
    const post_id = this.state.post_id
    axios.delete('api/delete/postcomments', { data: { post_id } })
      .then(() => axios.delete('/api/delete/post', { data: { post_id } }))
      .then(res => console.log(res))
      .catch(err => console.error(err))
      .then(() => this.handleClickClose())
      .then(() => setTimeout(() => history.replaceState('/'), 700))
  }

  render() {
    return (
      <div>
        <div>
          <this.RenderProfile profile={this.props.profile} />
        </div>
        <div>
          {this.props.user_posts ? (
            this.props.user_posts.map(post => <this.RenderPosts post={post} key={post.pid} />)
          ) : ''}
        </div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClickClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Confirm Delete?</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description" >
              Deleting Post
            </DialogContentText>
            <DialogActions>
              <Button onClick={() => { this.deletePost() }}>
                Agree
              </Button>
              <Button onClick={() => this.handleClickClose()}>
                Cancel
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    profile: state.auth_reducer.profile,
    user_posts: state.posts_reducer.user_posts,
    db_profile: state.auth_reducer.db_profile
  }
}

function mapDispatchToProps(dispatch) {
  return {
    set_user_posts: (posts) => dispatch(ACTIONS.fetch_user_posts(posts))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
