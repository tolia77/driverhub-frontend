import {useEffect, useRef, useState} from "react";
import {getAccessToken} from "src/utils/auth";

const useChatSocket = (selectedDriverId = null) => {
    const [messages, setMessages] = useState([]);
    const socketRef = useRef(null);
    const accessToken = getAccessToken();

    useEffect(() => {
        const ws = new WebSocket(`ws://localhost:8000/ws/chat?token=${accessToken}`);
        socketRef.current = ws;

        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                if (data.type === "message") {
                    setMessages(prev => [...prev, {
                        id: data.id,
                        text: data.text,
                        sender_id: data.sender_id,
                        receiver_id: data.receiver_id,
                        created_at: data.created_at
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
            ? {message: text, driver_id: selectedDriverId}
            : {message: text};
        socketRef.current.send(JSON.stringify(msg));
    };

    return {messages, sendMessage};
};

export default useChatSocket;