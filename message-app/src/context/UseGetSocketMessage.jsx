import React, { useEffect } from 'react'
import {  userSocketContext } from '../context/SocketContext.jsx'
import useConversation from '../zustand/useConversation.js'
// import sound from '../assets/notification sound.mp3'
import watsapp from '../assets/watsapp web.mp3'

const UseGetSocketMessage = () => {
    const { socket } = userSocketContext()
    const { messages, setMessage } = useConversation()
    useEffect(() => {
        socket.on('newMessage', (newMessage) => {
            const notification=new Audio(watsapp)
            notification.play();
            
            setMessage([...messages, newMessage]);
        })
        return () => {
            socket.off('newMessage')
        };
    }, [socket,messages,setMessage])
   
};

export default UseGetSocketMessage;

