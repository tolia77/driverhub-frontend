import {useRef, useEffect, useState} from "react";
import useChatSocket from "src/hooks/useChatSocket";
import ChatMessages from "src/components/chat/ChatMessages";
import MessageInput from "src/components/chat/MessageInput";
import {messagesIndexRequest} from "src/services/backend/messagesRequest";
import {getAccessToken, getUserId} from "src/utils/auth";

const ChatDriver = () => {
    const {messages: socketMessages, sendMessage} = useChatSocket();
    const [historyMessages, setHistoryMessages] = useState([]);
    const messagesEndRef = useRef(null);
    const userId = getUserId();

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await messagesIndexRequest(null, userId, getAccessToken());
                setHistoryMessages(res.data);
            } catch (err) {
                console.error("Failed to load chat history", err);
            }
        };
        fetchMessages();
    }, []);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({behavior: "smooth"});
        }
    }, [socketMessages, historyMessages]);

    const combinedMessages = [...historyMessages, ...socketMessages].filter(
        (msg, index, self) =>
            index === self.findIndex((m) => m.id === msg.id)
    );

    return (
        <div className="container py-4">
            <div className="card shadow-sm">
                <div className="card-header bg-primary text-white">
                    <h5 className="mb-0">Чат з Диспетчером</h5>
                </div>
                <ChatMessages
                    messages={combinedMessages}
                    userId={userId}
                    messagesEndRef={messagesEndRef}
                />
                <MessageInput onSendMessage={sendMessage}/>
            </div>
        </div>
    );
};

export default ChatDriver;
