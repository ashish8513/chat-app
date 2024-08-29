import React from 'react'

function Message({ message }) {
  const authUser = JSON.parse(localStorage.getItem("chat-app"))
  const itsMe = message.senderId === authUser.user._id;
  const chatName = itsMe ? "chat-end" : "chat-start"
  const chatColor = itsMe ? "bg-green-800" : ""
  // console.log(message.sender._id)
  // console.log(authUser.user._id)
  const createdAt=new Date(message.createdAt);
  const formattedTime=createdAt.toLocaleDateString([],{
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    // hour12: false,
    // timeZone: 'India/Punjab',
    // timeZoneName: 'long'
  })
  return (
    <div>
      <div className='p-4'>
        <div className={`chat ${chatName}`}>
          <div className={`chat-bubble  text-white ${chatColor}`}>
          {message.message}
          </div>
          <div className='chat-footer text-black text-sm'>
            {formattedTime}
          </div>
        </div>

      </div>
    </div>
  )
}

export default Message;
