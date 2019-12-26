import React from 'react'
import axios from 'axios'
import history from '../utils/history'
import TextField from '@material-ui/core/TextField'
import { connect } from 'react-redux'

import React, { Component } from 'react'

class AddPost extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const uid = this.props.db_profile[0].uid
    const username = this.props.db_profile[0].username
    const data = {
      title: e.target.value,
      body: e.target.body.value,
      username,
      uid,
    }

    axios.post('api/post/posttodb', data)
      .then(res => console.log(res))
      .then(setTimeout(() => history.replace('/', 700)))
      .catch(err => console.error(err))
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <TextField
            id="title"
            label="Title"
            margin="normal"
          />
          <br />
          <TextField
            id="body"
            label="Body"
            multiline
            rows="4"
            margin="normal"
          />
          <br />
          <button type="submit">Submit</button>
        </form>
        <br />
        <button onClick={() => history.replace('/posts')}>Cancel</button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    db_profile: state.auth_reducer.db_profile
  }
}

export default connect(mapStateToProps)(AddPost)
