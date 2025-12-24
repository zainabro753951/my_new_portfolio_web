// src/socket/socket.js
import { io } from 'socket.io-client'

const SOCKET_URL =
  import.meta.env.VITE_BACKEND_URL || 'http://localhost:2500'

const socket = io(SOCKET_URL, {
  withCredentials: true,
  autoConnect: false, // 👈 manual control
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
  transports: ['websocket'], // 👈 production best practice
})

export default socket
