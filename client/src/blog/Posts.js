import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as ACTIONS from '../sore/actions/actions'
import axios from 'axios'

import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

const RenderPost = post => (
  <TableRow>
    <TableCell>
      <Link to={{ pathname: '/post/' + post.post.pid, state: { post } }}>
        <h4>{post.post.title}</h4>
      </Link>
      <br />
      <p>{post.post.body}</p>
    </TableCell>
  </TableRow>
)

class Posts extends Component {
  componentDidMount() {
    axios.get('/api/get/allposts')
      .then(res => this.props.set_props(res.data))
      .catch(err => console.error(err))
  }

  render() {
    return (
      <div>
        <br />
        <Link to="/newpost">
          <Button color="primary">AddButton</Button>
        </Link>
        <h1>Posts</h1>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Title
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.posts ? (
                this.props.posts.map(post => {
                  <RenderPost id={post.pid} post={post} />
                })
              ) : ''}
            </TableBody>
          </Table>
        </Paper>
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
    set_posts: (posts) => dispatch(ACTIONS.fetch_db_posts(posts))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)
