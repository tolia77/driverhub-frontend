import Message from "./Message.jsx";

const ChatMessages = ({ messages, userId, messagesEndRef }) => {
    console.log(messages)
    return (
        <div className="flex-grow-1 p-3 overflow-auto" style={{ height: '400px' }}>
            {messages
                .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
                .map((msg) => (
                    <Message
                        key={msg.id}
                        message={msg}
                        isOwnMessage={msg.sender_id.toString() === userId.toString()}
                    />
                ))}
            <div ref={messagesEndRef} />
        </div>
    );
};

export default ChatMessages;