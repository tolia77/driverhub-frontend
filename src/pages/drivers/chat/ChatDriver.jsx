import { useEffect, useRef, useState } from "react";
import { ref, push, onChildAdded, off } from "firebase/database";
import { realtimeDB } from "src/services/firebase";
import ChatMessages from "src/components/chat/ChatMessages";
import MessageInput from "src/components/chat/MessageInput";

const ChatDriver = () => {
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        if (!userId) return;
        const chatRef = ref(realtimeDB, `chats/${userId}`);
        onChildAdded(chatRef, (snapshot) => {
            setMessages((prev) => [...prev, snapshot.val()]);
        });
        return () => {
            off(chatRef);
        };
    }, [userId]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const handleSendMessage = (text) => {
        if (!text.trim()) return;
        push(ref(realtimeDB, `chats/${userId}`), {
            sender: userId,
            text: text,
        });
    };

    return (
        <div className="container py-4">
            <div className="card shadow-sm">
                <div className="card-header bg-primary text-white">
                    <h5 className="mb-0">Chat with Dispatcher</h5>
                </div>
                <ChatMessages
                    messages={messages}
                    userId={userId}
                    messagesEndRef={messagesEndRef}
                />
                <MessageInput onSendMessage={handleSendMessage} />
            </div>
        </div>
    );
};

export default ChatDriver;
