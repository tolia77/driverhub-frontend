import {useEffect, useState, useRef} from "react";
import ChatSidebar from "src/components/chat/ChatSidebar";
import ChatMessages from "src/components/chat/ChatMessages";
import MessageInput from "src/components/chat/MessageInput";
import {driversIndexRequest} from "src/services/backend/driversRequests";
import {getAccessToken, getUserId} from "src/utils/auth";
import useChatSocket from "src/hooks/useChatSocket";
import {messagesIndexRequest} from "src/services/backend/messagesRequest.js";

const ChatDispatcher = () => {
    const [drivers, setDrivers] = useState([]);
    const [selectedDriver, setSelectedDriver] = useState(null);
    const [historyMessages, setHistoryMessages] = useState([]);
    const userId = getUserId();
    const messagesEndRef = useRef(null);

    const {messages: socketMessages, sendMessage} = useChatSocket(selectedDriver?.id);

    useEffect(() => {
        const fetchDrivers = async () => {
            const response = await driversIndexRequest({}, getAccessToken());
            setDrivers(response.data);
        };
        fetchDrivers();
    }, []);

    useEffect(() => {
        const fetchMessages = async () => {
            if (!selectedDriver) return;
            try {
                const res = await messagesIndexRequest(selectedDriver.id, null, getAccessToken());
                setHistoryMessages(res.data);
            } catch (err) {
                console.error("Failed to fetch message history", err);
            }
        };
        fetchMessages();
    }, [selectedDriver]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({behavior: "smooth"});
        }
    }, [socketMessages, historyMessages]);

    const combinedMessages = [...historyMessages, ...socketMessages]
        .filter((msg, index, self) =>
            index === self.findIndex(m => m.id === msg.id)
        ).filter(msg =>
            msg.sender_id === selectedDriver?.id ||
            msg.receiver_id === selectedDriver?.id ||
            (msg.sender_id === parseInt(userId) && msg.receiver_id === selectedDriver?.id));

    return (
        <div className="container-fluid py-4">
            <div className="row g-4">
                <div className="col-md-4">
                    <ChatSidebar
                        drivers={drivers}
                        selectedDriver={selectedDriver}
                        onSelectDriver={setSelectedDriver}
                    />
                </div>
                <div className="col-md-8">
                    {selectedDriver ? (
                        <div className="card h-100">
                            <div className="card-header">
                                <h3 className="mb-0">Чат with {selectedDriver.name}</h3>
                            </div>
                            <div className="card-body d-flex flex-column p-0">
                                <ChatMessages
                                    messages={combinedMessages}
                                    userId={userId}
                                    messagesEndRef={messagesEndRef}
                                />
                                <MessageInput onSendMessage={sendMessage}/>
                            </div>
                        </div>
                    ) : (
                        <div className="card h-100">
                            <div className="card-body d-flex align-items-center justify-content-center">
                                <p className="mb-0 text-muted">Select a driver to start chatting</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ChatDispatcher;
