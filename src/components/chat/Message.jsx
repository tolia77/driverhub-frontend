const Message = ({message, isOwnMessage}) => {
    return (
        <div className={`d-flex mb-3 ${isOwnMessage ? 'justify-content-end' : 'justify-content-start'}`}>
            <div
                className={`p-3 rounded-3 text-white ${isOwnMessage ? 'bg-primary' : 'bg-secondary'}`}
                style={{maxWidth: '75%'}}
            >
                <div className="mb-1">{message.text}</div>
                <small className="text-muted">
                    {new Date(message.created_at).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </small>
            </div>
        </div>
    );
};
export default Message;
