const DriversTable = ({ drivers, vehiclesMap, onUpdate, onDelete }) => {
    return (
        <div className="card">
            <div className="card-body p-0">
                <div className="table-responsive" style={{ maxHeight: '500px' }}>
                    <table className="table table-hover table-striped mb-0">
                        <thead className="table-dark sticky-top">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>License Number</th>
                            <th>Vehicle</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {drivers.map((driver) => (
                            <tr key={driver.id}>
                                <td>{driver.name}</td>
                                <td>{driver.email}</td>
                                <td>{driver.license_number}</td>
                                <td>
                                    {driver.vehicle_id && vehiclesMap[driver.vehicle_id]
                                        ? `${vehiclesMap[driver.vehicle_id].model} (${vehiclesMap[driver.vehicle_id].license_plate})`
                                        : "None"}
                                </td>
                                <td>
                                    <div className="d-flex gap-2">
                                        <button
                                            className="btn btn-sm btn-warning"
                                            onClick={() => onUpdate(driver.id)}
                                        >
                                            <i className="bi bi-pencil"></i> Update
                                        </button>
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() => onDelete(driver.id)}
                                        >
                                            <i className="bi bi-trash"></i> Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DriversTable;