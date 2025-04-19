const DriverSelect = ({ drivers, selectedDriver, onSelect }) => {
    return (
        <div className="card mb-4">
            <div className="card-body">
                <div className="mb-3">
                    <label className="form-label">Select Driver</label>
                    <select
                        className="form-select"
                        value={selectedDriver || ""}
                        onChange={(e) => onSelect(e.target.value)}
                    >
                        <option value="">-- Select a Driver --</option>
                        {drivers.map(driver => (
                            <option key={driver.id} value={driver.id}>
                                {driver.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default DriverSelect;