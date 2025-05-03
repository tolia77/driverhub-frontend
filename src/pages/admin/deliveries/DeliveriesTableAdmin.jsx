const DeliveriesTableAdmin = ({ deliveries, onUpdate, onDelete }) => {
    if (deliveries.length === 0) {
        return <div className="alert alert-info">No deliveries found</div>;
    }

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
                                <td>{delivery.pickup_location}</td>
                                <td>{delivery.dropoff_location}</td>
                                <td>{delivery.status}</td>
                                <td>{delivery.created_at}</td>
                                <td>
                                    <div className="d-flex gap-2">
                                        <button
                                            className="btn btn-sm btn-warning"
                                            onClick={() => onUpdate(delivery.id)}
                                        >
                                            <i className="bi bi-pencil"></i> Edit
                                        </button>
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() => onDelete(delivery.id)}
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

export default DeliveriesTableAdmin;