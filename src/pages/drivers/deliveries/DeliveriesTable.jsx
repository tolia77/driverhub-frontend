const DeliveriesTable = ({ deliveries, onUpdateStatus, onLogBreak }) => {
    if (deliveries.length === 0) {
        return <div className="alert alert-info">No deliveries found</div>;
    }

    return (
        <div className="card">
            <div className="card-body p-0">
                <div className="table-responsive">
                    <table className="table table-hover table-striped mb-0">
                        <thead className="table-dark sticky-top">
                        <tr>
                            <th>ID</th>
                            <th>Pickup Location</th>
                            <th>Dropoff Location</th>
                            <th>Delivery Window</th>
                            <th>Package Details</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {deliveries.map(delivery => (
                            <tr key={delivery.id}>
                                <td>{delivery.id}</td>
                                <td>{delivery.pickup_location}</td>
                                <td>{delivery.dropoff_location}</td>
                                <td>{delivery.delivery_window}</td>
                                <td>{delivery.package_details}</td>
                                <td>{delivery.status}</td>
                                <td>
                                    <div className="d-flex gap-2">
                                        <button
                                            className="btn btn-sm btn-warning"
                                            onClick={() => onUpdateStatus(delivery)}
                                        >
                                            <i className="bi bi-pencil"></i> Update
                                        </button>
                                        <button
                                            className="btn btn-sm btn-info"
                                            onClick={() => onLogBreak(delivery)}
                                        >
                                            <i className="bi bi-stopwatch"></i> Log Break
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