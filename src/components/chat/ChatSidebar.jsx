const ChatSidebar = ({ drivers, selectedDriver, lastMessages, onSelectDriver }) => {
    return (
        <div className="card h-100">
            <div className="card-header">
                <h2 className="mb-0">Drivers</h2>
            </div>
            <div className="card-body p-0">
                <ul className="list-group list-group-flush">
                    {drivers.map(driver => (
                        <li
                            key={driver.id}
                            className={`list-group-item list-group-item-action ${selectedDriver?.id === driver.id ? 'active' : ''}`}
                            onClick={() => onSelectDriver(driver)}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="d-flex flex-column">
                                <span className="fw-bold">{driver.first_name} {driver.last_name}</span>
                                <small className="text-truncate">
                                    {lastMessages[driver.id]?.text || "No messages yet"}
                                </small>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ChatSidebar;