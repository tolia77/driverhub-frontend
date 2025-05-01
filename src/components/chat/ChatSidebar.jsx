const ChatSidebar = ({drivers, selectedDriver, onSelectDriver}) => {
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
                            style={{cursor: 'pointer'}}
                        >
                            <span className="fw-bold">{driver.first_name} {driver.last_name}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ChatSidebar;