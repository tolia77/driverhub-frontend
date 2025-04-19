import { useEffect, useRef, useState } from "react";
import { ref, push, off, onChildAdded, onValue } from "firebase/database";
import { realtimeDB } from "src/services/firebase";
import { driversIndex } from "src/services/backend/driversRequests";
import ChatSidebar from "src/pages/dispatcher/chat/ChatSidebar";
import ChatMessages from "src/pages/dispatcher/chat/ChatMessages";
import MessageInput from "src/pages/dispatcher/chat/MessageInput";

function ChatDispatcher() {
    const [drivers, setDrivers] = useState([]);
    const [selectedDriver, setSelectedDriver] = useState(null);
    const [messages, setMessages] = useState([]);
    const [lastMessages, setLastMessages] = useState({});
    const userId = localStorage.getItem("userId");
    const messagesEndRef = useRef(null);

    useEffect(() => {
        fetchDrivers();
        return () => {
            // Clean up listeners when component unmounts
            drivers.forEach(driver => {
                off(ref(realtimeDB, `chats/${driver.id}`));
            });
        };
    }, []);

    const fetchDrivers = async () => {
        const response = await driversIndex({}, localStorage.getItem("accessToken"));
        setDrivers(response.data.data.drivers);

        response.data.data.drivers.forEach(driver => {
            const chatRef = ref(realtimeDB, `chats/${driver.id}`);
            onValue(chatRef, (snapshot) => {
                const messages = snapshot.val();
                if (messages) {
                    const lastMsg = Object.values(messages).pop();
                    setLastMessages(prev => ({ ...prev, [driver.id]: lastMsg }));
                }
            });
        });
    };

    useEffect(() => {
        if (!selectedDriver) return;

        setMessages([]);

        const chatRef = ref(realtimeDB, `chats/${selectedDriver.id}`);
        onChildAdded(chatRef, (snapshot) => {
            setMessages((prev) => [...prev, snapshot.val()]);
        });

        return () => {
            off(chatRef);
        };
    }, [selectedDriver]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const sendMessage = (message) => {
        if (!message.trim() || !selectedDriver) return;
        push(ref(realtimeDB, `chats/${selectedDriver.id}`), {
            sender: userId,
            text: message,
            timestamp: new Date().toISOString()
        });
    };

    return (
        <div className="container-fluid py-4">
            <div className="row g-4">
                <div className="col-md-4">
                    <ChatSidebar
                        drivers={drivers}
                        selectedDriver={selectedDriver}
                        lastMessages={lastMessages}
                        onSelectDriver={setSelectedDriver}
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
                                    messages={messages}
                                    userId={userId}
                                    messagesEndRef={messagesEndRef}
                                />
                                <MessageInput
                                    onSendMessage={sendMessage}
                                />
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