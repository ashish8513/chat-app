import { getReciverSocketId, io } from '../SocketIO/server.js';
import Conversation from '../models/conversation.model.js'
import Message from '../models/message.model.js';
export const sendMessage = async (req, res) => {
    // console.log("message sent", req.params.id, req.body.message)
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id; //current logged in user 
        let conversation = await Conversation.findOne({
            members: { $all: [senderId, receiverId] }
        })
        if (!conversation) {
            conversation = await Conversation.create({
                members: [senderId, receiverId]
            })
        }
        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        })
        if (newMessage) {
            conversation.messages.push(newMessage._id)
        }
        // await conversation.save()

        // await newMessage.save()

        await Promise.all([conversation.save(), newMessage.save()])
        const reciverSocketId = getReciverSocketId(receiverId)
        if (reciverSocketId) {
            io.to(reciverSocketId).emit("newMessage", newMessage)
        }

        res.status(201).json(newMessage);

    } catch (error) {
        console.log("error sending message", error)
        req.status(500).json({ error: "internal severver error" })
    }
}

export const getMessages = async (req, res) => {
    try {
        const { id: chatUser } = req.params;
        const senderId = req.user._id; //current logged in user 
        let conversation = await Conversation.findOne({
            members: { $all: [senderId, chatUser] },
        }).populate("messages")
        if (!conversation) {
            return res.status(201).json([])
        }
        const messages = conversation.messages;
        res.status(201).json( messages )
    } catch (error) {
        console.log("error in getMessage to the sending message", error)
        req.status(500).json({ error: "internal severver error" })
    }
}
