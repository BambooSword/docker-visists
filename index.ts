import express from 'express'
import { createClient } from 'redis'

const app = express()
console.log('====================================')
console.log('run run run')
console.log('====================================')
const client = createClient({
  url: 'redis://redis-server:6379',
}).on('error', err => console.log('Redis Client Error', err))

client.connect()
client.set('visits', 0)

app.get('/', (req, res, next) => {
  client.get('visits').then(visits => {
    res.send('Number of visits is ' + visits)
    if (visits) {
      client.set('visits', parseInt(visits) + 1)
    }
  })
})

app.listen(8081, () => {
  console.log('====================================')
  console.log('Listening on port 8081')
  console.log('====================================')
})
