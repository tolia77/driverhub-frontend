const DriversTable = ({drivers, onUpdate, onDelete}) => {
    return (
        <div className="card">
            <div className="card-body p-0">
                <div className="table-responsive" style={{maxHeight: '500px'}}>
                    <table className="table table-hover table-striped mb-0">
                        <thead className="table-dark sticky-top">
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>License Number</th>
                            <th>Vehicle</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {drivers.map((driver) => (
                            <tr key={driver.id}>
                                <td>{driver.first_name}</td>
                                <td>{driver.last_name}</td>
                                <td>{driver.email}</td>
                                <td>{driver.license_number}</td>
                                <td>
                                    {driver.vehicle && `${driver.vehicle.model} (${driver.vehicle.license_plate})`}
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