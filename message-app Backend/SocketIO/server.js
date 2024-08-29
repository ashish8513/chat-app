import { Server } from "socket.io";
import http from "http";
import express from 'express'

const app = express();

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3001",
        methods: ["GET", "POST"],
    }
})
//realtime message code goes here 
export const getReciverSocketId=(reciverId)=>{
    return users[reciverId];
}
const users = {};
// used to listen events on server side
io.on("connection", (socket) => {
    console.log("a user connected", socket.id)
    const userId = socket.handshake.query.userId;
    if (userId) {
        users[userId] = socket.id;
        console.log("ashish prabhakar", users)
    }

    io.emit("getOnlineUsers", Object.keys(users))//used to send the events to all the connected clients
    // used to listen client side  events emiited on server side(server and client side)
    socket.on("disconnect", () => {
        console.log(" some user disconnected", socket.id)
        delete users[userId];
        io.emit("getOnlineUsers", Object.keys(users))//used to send the events to all the connected clients
    })
})
// ------------




export { app, io, server };