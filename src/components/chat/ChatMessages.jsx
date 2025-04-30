import Message from "./Message.jsx";

const ChatMessages = ({ messages, userId, messagesEndRef }) => {
    return (
        <div className="flex-grow-1 p-3 overflow-auto" style={{ height: '400px' }}>
            {messages
                .sort((b, a) => new Date(a.created_at) - new Date(b.created_at))
                .map((msg) => (
                    <Message
                        key={msg.id}
                        message={msg}
                        isOwnMessage={msg.sender.toString() === userId.toString()}
                    />
                ))}
            <div ref={messagesEndRef} />
        </div>
    );
};

export default ChatMessages;