import React, { Component } from 'react'
import Button from '@material-ui/core/Button'

const Signup = (props) => (
  <div>
    <h1>Signup and create an account</h1>
    <Button color="primary" size="large" variant="contained" onClick={() => props.auth.login()}>Signup</Button>
  </div>
)

export default Signup
