import { useState } from "react";

const MessageInput = ({ onSendMessage }) => {
    const [message, setMessage] = useState("");

    const handleSend = () => {
        if (message.trim()) {
            onSendMessage(message);
            setMessage("");
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="p-3 border-top">
            <div className="input-group">
                <input
                    type="text"
                    className="form-control"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Type a message"
                />
                <button
                    className="btn btn-primary"
                    onClick={handleSend}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default MessageInput;