import {useEffect, useState, useRef} from "react";
import ChatSidebar from "src/components/chat/ChatSidebar";
import ChatMessages from "src/components/chat/ChatMessages";
import MessageInput from "src/components/chat/MessageInput";
import {driversIndex} from "src/services/backend/driversRequests";
import {getAccessToken} from "src/utils/auth";
import useChatSocket from "src/hooks/useChatSocket";

const ChatDispatcher = () => {
    const [drivers, setDrivers] = useState([]);
    const [selectedDriver, setSelectedDriver] = useState(null);
    const userId = localStorage.getItem("userId");
    const messagesEndRef = useRef(null);

    const {messages, sendMessage} = useChatSocket(selectedDriver?.id);
    useEffect(() => {
        const fetchDrivers = async () => {
            const response = await driversIndex({}, getAccessToken());
            setDrivers(response.data);
        };
        fetchDrivers();
    }, []);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({behavior: "smooth"});
        }
    }, [messages]);
    return (
        <div className="container-fluid py-4">
            <div className="row g-4">
                <div className="col-md-4">
                    <ChatSidebar
                        drivers={drivers}
                        selectedDriver={selectedDriver}
                        onSelectDriver={setSelectedDriver}
                        lastMessages={{}}
                    />
                </div>
                <div className="col-md-8">
                    {selectedDriver ? (
                        <div className="card h-100">
                            <div className="card-header">
                                <h3 className="mb-0">Chat with {selectedDriver.name}</h3>
                            </div>
                            <div className="card-body d-flex flex-column p-0">
                                <ChatMessages
                                    messages={messages.filter(msg =>
                                        msg.sender === selectedDriver?.id ||
                                        msg.receiver === selectedDriver?.id ||
                                        (msg.sender === parseInt(userId) && msg.receiver === selectedDriver?.id)
                                    )}
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
};

export default ChatDispatcher;
