import express from 'express'
import { createClient } from 'redis'

const app = express()

const client = createClient({
  host: 'redis-server',
  port: 6379,
})
client.set('visits', 0)

app.get('/', (req, res, next) => {
  client.get('visits').then(visits => {
    res.send('Number of visits is' + visits)
    if (visits) {
      client.set('visits', parseInt(visits + 1))
    }
  })
})

app.listen(8081, () => {
  console.log('====================================')
  console.log('Listening on port 8081')
  console.log('====================================')
})
