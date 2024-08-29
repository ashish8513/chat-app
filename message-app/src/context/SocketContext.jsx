import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./Authprovider";
import io from "socket.io-client"

const socketContext = createContext();
// it is a hook of the react 
export const userSocketContext=()=>{
    return useContext(socketContext)
}

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null)
    const [onlineUsers,setOnlineUser]=useState([])
    const [authUser] = useAuth();

    useEffect(() => {
        if (authUser) {
            const socket = io("http://localhost:4002", {
                query: {
                    userId: authUser.user._id,
                },
            })
            setSocket(socket);
            socket.on("getOnlineUsers", (users) => {
                    setOnlineUser(users)
            });
            return()=>socket.close();
        }
        else{
            if(socket){
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser]);
    return (
        <socketContext.Provider value={{ socket,onlineUsers }}>
            {children}
        </socketContext.Provider>
    )
};
