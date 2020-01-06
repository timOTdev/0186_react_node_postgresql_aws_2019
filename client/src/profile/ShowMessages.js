import React, { Component } from 'react';
import axios from 'axios'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as ACTIONS from '../store/actions/actions'
import history from '../utils/history'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

class ShowMessages extends Component {
  componentDidMount() {
    const username = this.props.db_profile[0].username
    axios.get('/api/get/usermessages', { params: { username: username } })
      .then(res => this.props.set_user_messages(res.data))
      .catch(err => console.error(err))
  }

  RenderMessages = (props) => (
    <TableRow>
      <TableCell>
        <p>From: {props.message.message_sender}</p>
        <p>Title: {props.message.message_title}</p>
        <p>Message: {props.message.message_body}</p>
        <small>{props.message.date_created}</small>
        <Link to={{ pathname: '/replytomessage', state: { props } }}>
          <button>Reply</button>
        </Link>
        <button onClick={() => this.DeleteMessage(props.message.mid)}>Delete</button>
        <br />
        <br />
        <button onClick={() => history.goBack()}>Cancel</button>
      </TableCell>
    </TableRow>
  )

  DeleteMessage = (mid) => {
    axios.delete('/api/delete/usermessage', { data: { mid } })
      .then(res => console.log(`Message ${mid} delete successfully.`))
      .then(() => setTimeout(() => history.replace('/'), 500))
      .catch(err => console.error(err))
  }

  render() {
    return (
      <div>
        <div className="FlexRow">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Messages</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.user_messages ? (
                this.props.user_messages.map(message => <this.RenderMessages message={message} key={message.mid} />)
              ) : ''}
            </TableBody>
          </Table>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    db_profile: state.auth_reducer.db_profile,
    user_messages: state.user_reducer.user_messages,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    set_user_messages: (messages) => dispatch(ACTIONS.set_user_messages(messages))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowMessages)
