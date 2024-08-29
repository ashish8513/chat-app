import React, { useEffect, useRef } from 'react'
import Message from './Message.jsx'
import UseGetMessage from '../context/UseGetMessage.js'
import Loading from '../components/Loading.jsx'
import UseGetSocketMessage from '../context/UseGetSocketMessage.jsx';

function Messages() {
    const { loading, messages } = UseGetMessage();
    UseGetSocketMessage(); //listing incoming the messages
    // console.log(messages)
    const lastMsgRef = useRef()
    useEffect(() => {
        setTimeout(() => {

            if (lastMsgRef.current) {
                lastMsgRef.current.scrollIntoView({
                    behavior: 'smooth'
                })
            }
        }, 100);
    }, [messages])
    return (
        <div className='scrollbar-hidden overflow-y-auto'
         style={{ minHeight: "calc(92vh - 8vh)" }}>

            {loading ? (
                <Loading />
            ) : (
                messages.length > 0 &&
                messages.map((message) => (
                    <div key={message._id} ref={lastMsgRef}>
                        <Message message={message} />
                    </div>
                ))
            )}


            {!loading && messages.length === 0 && (
                <div>
                    <p className='text-center mt-[20%] text-black '>Say ! hii welcome to ashish world and enjoy your chatting message</p>
                </div>
            )}

        </div>
    )
}

export default Messages
