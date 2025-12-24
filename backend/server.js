import http from 'http'
import dotenv from 'dotenv'
import app from './index.js'
import { initSocket } from './socket.js'

dotenv.config()

const PORT = process.env.PORT || 2500

const server = http.createServer(app)

// 🔥 Init socket
initSocket(server)

server.listen(PORT, () => {
  console.log(`🚀 Server running with Socket.io on ${PORT}`)
})
