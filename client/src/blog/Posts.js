import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as ACTIONS from '../store/actions/actions'
import axios from 'axios'
import Pagination from 'react-js-pagination'

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'

class Posts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      opacity: 0,
      num_posts: 0,
      page_range: 0,
      activePage: 1,
      posts_per_page: 5,
      posts_slice: [],
      posts_motion: [],
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
    this.setState({
      num_posts: this.state.posts.length,
      page_range: this.state.num_posts / 5
    })

    this.slice_posts()
    this.animate_posts()
  }

  slice_posts = () => {
    const indexOfLastPost = this.state.activePage * this.state.posts_per_page
    const indexOfFirstPost = indexOfLastPost - this.state.posts_per_page

    this.setState({ posts_slice: this.state.posts.slice(indexOfFirstPost, indexOfLastPost) })
  }

  animate_posts = () => {
    this.setState({ posts_motion: [] })
    let i = 1
    return this.state.posts_slice.map(post => {
      setTimeout(() => this.setState({ posts_motion: [...this.state.posts_motion, post] }), 400 * i);
      return i++;
    })
  }

  handlePageChange = (pageNumber) => {
    this.setState({ activePage: pageNumber })

    setTimeout(() => this.slice_posts(), 50)
    setTimeout(() => this.animate_posts(), 100)
  }

  RenderPost = post => (
    <div className="CardStyles">
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
            {this.state.posts_motion ? (
              this.state.posts_motion.map(post => <this.RenderPost id={post.pid} key={post.pid} post={post} />)
            ) : ''}
          </div>
          <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={5}
            totalItemsCount={this.state.num_posts}
            pageRangeDisplayed={this.state.page_range}
            onChange={this.handlePageChange}
          />
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
