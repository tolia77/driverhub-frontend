import { format } from "date-fns";

const Message = ({ message, isOwnMessage }) => {
    return (
        <div className={`d-flex mb-3 ${isOwnMessage ? 'justify-content-end' : 'justify-content-start'}`}>
            <div
                className={`p-3 rounded-3 ${isOwnMessage ? 'bg-primary text-white' : 'bg-light'}`}
                style={{ maxWidth: '75%' }}
            >
                <div className="mb-1">{message.text}</div>
                <small className={`d-block text-end ${isOwnMessage ? 'text-white-50' : 'text-muted'}`}>
                    {format(new Date(message.timestamp), 'HH:mm')}
                </small>
            </div>
        </div>
    );
};

export default Message;