import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'

import * as ACTIONS from '../store/actions/actions'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Button from '@material-ui/core/Button'

class ShowUser extends Component {
  componentDidMount() {
    const username = this.props.location.state.post.post.author

    axios.get('/api/get/otheruserprofilefromdb', { params: { username } })
      .then(res => this.props.set_other_user_db_profile(res.data))
      .catch(err => console.error(err))
    axios.get('/api/get/otheruserposts', { params: { username } })
      .then(res => this.props.set_other_user_db_posts(Array.from(res.data)))
      .catch(err => console.error(err))
    window.scroll({ top: 0, left: 0, behavior: 'smooth' })
  }

  RenderPosts = post => (
    <div className="CardStyles">
      <Card style={{ width: '500px', height: '200px', marginBottom: '10px', paddingBottom: '80px' }}>
        <CardHeader
          title={
            <Link to={{ pathname: '/post/' + post.post.pid, state: { post } }}>
              {post.post.title}
            </Link>
          }
          subheader={
            <div className="FlexColumn">
              <div className="FlexRow">
                {moment(post.post.date_created).format('MMMM Do, YYYY | h:mm a')}
                <br />
                By: {post.post.author}
              </div>
              <div className="FlexRow">
                <i className="material-icons">thumb_up</i>
                <div className="notification-num-posts">
                  {post.post.likes}
                </div>
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

  RenderProfile = (props) => (
    <div>
      <div className="FlexRow">
        <h1>{this.props.OtherUserDBProfile.username}</h1>
      </div>
      <div>
        <Link to={{ pathname: '/sendmessage', state: { props } }}>
          <Button variant="contained" color="primary" type="submit">
            Send Message
          </Button>
        </Link>
      </div>
    </div>
  )

  render() {
    return (
      <div>
        <div className="FlexRow">
          {this.props.OtherUserDBProfile
            ? <this.RenderProfile profile={this.props.OtherUserDBProfile[0]} />
            : ''}
        </div>
        <div>
          <h3>Latest Activity:</h3>
          <div>
            {this.props.db_other_user_posts
              ? this.props.db_other_user_posts.map(post =>
                <div key={post.pid}>
                  <this.RenderPosts post={post} />
                  <br />
                </div>
              ) : ''}
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    OtherUserDBProfile: state.user_reducer.OtherUserDBProfile,
    db_other_user_posts: state.user_reducer.db_other_user_posts,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    set_other_user_db_profile: (profile) => dispatch(ACTIONS.set_other_user_db_profile(profile)),
    set_other_user_db_posts: (posts) => dispatch(ACTIONS.set_other_user_db_posts(posts)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowUser)
