const Message = ({ message, isOwnMessage }) => {
    return (
        <div className={`d-flex mb-3 ${isOwnMessage ? 'justify-content-end' : 'justify-content-start'}`}>
            <div
                className={`p-3 rounded-3 text-white ${isOwnMessage ? 'bg-primary' : 'bg-secondary'}`}
                style={{ maxWidth: '75%' }}
            >
                <div className="mb-1">{message.text}</div>
            </div>
        </div>
    );
};

export default Message;