import Message from "./Message";

const ChatMessages = ({ messages, userId, messagesEndRef }) => {
    return (
        <div className="flex-grow-1 p-3 overflow-auto" style={{ height: '400px' }}>
            {messages.map((msg, index) => (
                <Message
                    key={index}
                    message={msg}
                    isOwnMessage={msg.sender === userId}
                />
            ))}
            <div ref={messagesEndRef} />
        </div>
    );
};

export default ChatMessages;