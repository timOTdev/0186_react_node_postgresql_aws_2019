import React, { Component } from 'react'
import axios from 'axios'
import history from '../utils/history'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'

class EditPost extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      body: '',
    }
  }

  componentDidMount() {
    this.setState({
      title: this.props.location.state.post.post.title,
      body: this.props.location.post.post.body
    })
  }

  handleTitleChange = (e) => {
    this.setState({ title: e.target.value })
  }

  handleBodyChange = (e) => {
    this.setState({ body: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const user_id = this.props.db_profile[0].uid
    const username = this.props.db_profile[0].username
    const pid = this.props.location.state.post.post.pid
    const title = e.target.title.value
    const body = e.target.body.value
    const data = { title, body, pid, uid: user_id, username }

    axios.put("/apit/put/post", data)
      .then(res => console.log(res))
      .then(setTimeout(() => history.replace('/profile'), 700))
      .catch(err => console.error(err))
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} >
          <TextField
            id='title'
            label='Title'
            margin='normal'
            value={this.state.title}
            onChange={this.handleTitleChange}
          />
          <TextField
            id='body'
            label='Bitle'
            margin='normal'
            multiline
            row="4"
            value={this.state.body}
            onChange={this.handleBodyChange}
          />
          <Button type="submit">Submit</Button>
        </form>
        <Button onClick={() => history.goBack()}>Cancel</Button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPost)
