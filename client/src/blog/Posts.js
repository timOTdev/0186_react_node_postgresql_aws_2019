import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as ACTIONS from '../store/actions/actions'
import axios from 'axios'

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'

class Posts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      opacity: 0
    }
  }

  componentDidMount() {
    this.handleTransition()
    axios.get('/api/get/allposts')
      .then(res => this.props.set_db_posts(res.data))
      .then(() => this.addPostsToState(this.props.posts))
      .catch(err => console.error(err))
  }

  handleTransition = () => {
    setTimeout(() => this.setState({ opacity: 1 }), 400)
  }

  addPostsToState = (posts) => {
    this.setState({ posts })
  }

  RenderPost = post => (
    <div>
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
            </div>
          }
        />
        <br />
        <CardContent>
          <span style={{ overflow: 'hidden' }}>{post.post.body}</span>
        </CardContent>
      </Card>
    </div>
  )

  render() {
    return (
      <div>
        <div style={{ opacity: this.state.opacity, transition: 'opacity 2s ease' }}>
          <br />
          <Link to="/addpost">
            <Button color="primary">Add Post</Button>
          </Link>
        </div>
        <div style={{ opacity: this.state.opacity, transition: 'opacity 2s ease' }}>
          <h1>Posts</h1>
          <div>
            {this.state.posts ? (
              this.state.posts.map(post => <this.RenderPost id={post.pid} post={post} />)
            ) : ''}
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts_reducer.posts
  }
}

function mapDispatchToProps(dispatch) {
  return {
    set_db_posts: (posts) => dispatch(ACTIONS.set_db_posts(posts))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)
