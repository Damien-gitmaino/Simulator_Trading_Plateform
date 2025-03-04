"use client";
import useSocket from "@/hooks/useSocket";
import {useState} from "react";

export default function Home() {
    const {socket, messages}: any = useSocket("http://localhost:4000");
    const [message, setMessage] = useState("");

    const sendMessage: any = () => {
        if (socket && message.trim() !== "") {
            socket.emit("message", message);
            setMessage("");
        }
    };

    return (
        <div className="mb-3">
            <div style={{textAlign: "center", marginTop: "50px"}}>
                <h1>💬 Chat en Temps Réel</h1>
                <div>
                    {messages.map((msg, index) => (
                        <p key={index} style={{borderBottom: "1px solid #ddd", padding: "5px"}}>
                            {msg}
                        </p>
                    ))}
                </div>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Écris un message..."
                />
                <button onClick={sendMessage}>Envoyer</button>
            </div>
        </div>
    );
}
