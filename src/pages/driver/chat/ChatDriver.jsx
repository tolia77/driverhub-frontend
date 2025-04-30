import useChatSocket from "src/hooks/useChatSocket";
import ChatMessages from "src/components/chat/ChatMessages";
import MessageInput from "src/components/chat/MessageInput";
import { useRef, useEffect } from "react";

const ChatDriver = () => {
    const { messages, sendMessage } = useChatSocket();
    const messagesEndRef = useRef(null);
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

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
                <MessageInput onSendMessage={sendMessage} />
            </div>
        </div>
    );
};

export default ChatDriver;
