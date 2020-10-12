import React, { Fragment, Component } from 'react'
import './App.css'

const connection = require('./connection.json')

export default class App extends Component {
  detectConnection() {
    switch(connection.history[0].connection) {
      case true:
        return <h1>Online</h1>
      default:
        return <h1>Offline</h1>
    }
  }

  getDateTime(time) {
    let date = new Date(0)
    date.setUTCSeconds(time)
    return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  }

  render() {
    return (
      <Fragment>
        {this.detectConnection()}
        <h2>Connection History</h2>
        {
          connection.history.slice(0, 10).map(item => (
            <Fragment>
            <p>{item.connection ? "Online" : "Offline"} - {item.duration} - {this.getDateTime(item.startTime)} - {this.getDateTime(item.endTime)}</p>
            </Fragment>
          ))
        }
      </Fragment>
    )
  }
}