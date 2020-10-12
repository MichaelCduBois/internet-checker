// Imports
const fetch = require(`node-fetch`)
const fs = require(`fs`)

// Imports connection.json for use
const rawData = fs.readFileSync(`./src/connection.json`)
const connection = JSON.parse(rawData)

// Record Template
const record = { "connection": null, "startTime": null, "endTime": null, "duration": null }

// Make the API Call

function checkConnection() {
  try {
    fetch(`https://ipv4.icanhazip.com`)
      .then(response => {
        return response
      })
      .then(response => {
        writeData(response.status)
      })
  } catch {
    writeData(response.status = false)
  }
}

// Writes the Data
function writeData(statusCode) {
  // If there is history in connection.json
  if (connection.history.length !== 0) {
    let current = connection.history[0]
    if (current.connection === (statusCode === 200) ? true : false) {
      current.endTime = getTime()
      current.duration = (current.endTime - current.startTime)
    } else {
      record.connection = (statusCode === 200) ? true : false
    record.startTime = getTime()
    record.endTime = getTime()
      record.duration = (record.endTime - record.startTime)
      connection.history.unshift(record)
    }
    fs.writeFileSync(`./src/connection.json`, JSON.stringify(connection, null, 2))
  } else {
    record.connection = (statusCode === 200) ? true : false
    record.startTime = getTime()
    record.endTime = getTime()
    record.duration = (record.endTime - record.startTime)
    connection.history.unshift(record)
    fs.writeFileSync(`./src/connection.json`, JSON.stringify(connection, null, 2))
  }
}

function getTime() {
  return parseInt(Date.now().toString().slice(0, -3))
}

checkConnection()