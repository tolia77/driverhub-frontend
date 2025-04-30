import { useEffect, useRef, useState } from "react";
import { getAccessToken } from "src/utils/auth";

const useChatSocket = (selectedDriverId = null) => {
    const [messages, setMessages] = useState([]);
    const socketRef = useRef(null);
    const accessToken = getAccessToken();
    const userId = parseInt(localStorage.getItem("userId"));
    useEffect(() => {
        const ws = new WebSocket(`ws://localhost:8000/ws/chat?token=${accessToken}`);
        socketRef.current = ws;

        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                if (data.type === "message") {
                    setMessages(prev => [...prev, {
                        text: data.text,
                        sender: data.sender
                    }]);
                }
            } catch (error) {
                console.error("Error parsing message:", error);
            }
        };

        ws.onclose = () => console.log("WebSocket closed");
        return () => ws.close();
    }, [accessToken]);

    const sendMessage = (text) => {
        if (!text.trim() || socketRef.current?.readyState !== WebSocket.OPEN) return;
        const msg = selectedDriverId
            ? { message: text, driver_id: selectedDriverId }
            : { message: text };
        socketRef.current.send(JSON.stringify(msg));
        setMessages(prev => [...prev, {
            text: text,
            driver_id: selectedDriverId,
            sender: userId
        }]);
    };

    return { messages, sendMessage };
};

export default useChatSocket;