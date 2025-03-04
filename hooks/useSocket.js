import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const useSocket = (serverUrl) => {
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const socketInstance = io(serverUrl);
        setSocket(socketInstance);

        socketInstance.on("message", (msg) => {
            setMessages((prev) => [...prev, msg]);
        });

        return () => {
            socketInstance.disconnect();
        };
    }, [serverUrl]);

    return { socket, messages };
};

export default useSocket;