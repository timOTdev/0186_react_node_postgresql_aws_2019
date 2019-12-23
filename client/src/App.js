import React, { Component } from 'react'
import './App.css'
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com"
})

class App extends Component {
  state = {
    hello: null
  }

  componentDidMount() {
    // API call via local server
    axios.get('/hello')
      .then(res => this.setState({ hello: res.data }))
      .catch(error => console.error(error))

    // API call via Axios
    axiosInstance.get('/posts')
      .then(res => console.log("From axios:", res.data))
      .catch(error => console.error(error))

    // API call via fetch
    this.asyncFetch()
  }

  asyncFetch = async () => {
    await fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(json => console.log("From fetch:", json))
      .catch(error => console.error(error))
  }

  render() {
    return (
      <div className="App">
        {this.state.hello
          ? <div>{this.state.hello}</div>
          : ''}
      </div>
    )
  }
}

export default App;
