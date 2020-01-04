import React, { Component } from 'react';
import axios from 'axios'
import { connect } from 'react-redux';

import history from '../utils/history'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

class ReplyMessage extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const message_sender = this.props.db_profile[0].username
    const message_recipient = this.props.location.state.props.profile.username
    const message_title = e.target.value
    const message_body = e.target.body.value

    const data = {
      message_sender,
      message_recipient,
      message_title,
      message_body
    }

    axios.post('/api/post/messagetodb', data)
      .then(res => console.log("ReplyMessage.js", res))
      .catch(err => console.error(err))
      .then(setTimeout(() => history.replace('/'), 500))
  }

  render() {
    return (
      <div>
        <h2>Message:</h2>
        <div className="FlexColumn">
          <div>
            <p>Title: {this.props.location.state.props.message.message_title}</p>
          </div>
          <div>
            <p>Body: {this.props.location.state.props.message.message_body}</p>
          </div>
          <div>
            <p>Sender: {this.props.location.state.props.message.message_sender}</p>
          </div>
        </div>
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
              multiline
              rows="4"
              margin="normal"
            />
            <br />
            <Button type="submit" variant="contained" color="primary">
              Submit
          </Button>
            <Button onClick={() => history.replace('/')}>
              Cancel
          </Button>
          </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    db_profile: state.auth_reducer.db_profile,
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReplyMessage)
