const DeliveriesTable = ({ deliveries, onUpdate }) => {
    return (
        <div className="card">
            <div className="card-body p-0">
                <div className="table-responsive" style={{ maxHeight: '500px' }}>
                    <table className="table table-hover table-striped mb-0">
                        <thead className="table-dark sticky-top">
                        <tr>
                            <th>ID</th>
                            <th>Driver ID</th>
                            <th>Pickup Location</th>
                            <th>Dropoff Location</th>
                            <th>Status</th>
                            <th>Created At</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {deliveries.map(delivery => (
                            <tr key={delivery.id}>
                                <td>{delivery.id}</td>
                                <td>{delivery.driver_id || 'None'}</td>
                                <td>{delivery?.pickup_location?.address || `${delivery.pickup_location.latitude}, ${delivery.pickup_location.longitude}`}</td>
                                <td>{delivery?.dropoff_location?.address || `${delivery.dropoff_location.latitude}, ${delivery.dropoff_location.longitude}`}</td>
                                <td>{delivery.status}</td>
                                <td>{delivery.created_at}</td>
                                <td>
                                    <div className="d-flex gap-2">
                                        <button
                                            className="btn btn-sm btn-warning"
                                            onClick={() => onUpdate(delivery.id)}
                                        >
                                            <i className="bi bi-pencil"></i> Update
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

export default DeliveriesTable;