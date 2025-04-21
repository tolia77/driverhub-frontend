const DeliveriesTable = ({ deliveries, onOpenReviewModal }) => {
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
                            {deliveries.map((delivery) => (
                                <tr key={delivery.id}>
                                    <td>{delivery.id}</td>
                                    <td>{delivery.pickup_location}</td>
                                    <td>{delivery.dropoff_location}</td>
                                    <td>{delivery.delivery_window}</td>
                                    <td>{delivery.package_details}</td>
                                    <td>{delivery.status}</td>
                                    <td>
                                        {["Delivered", "Failed"].includes(delivery.status) && (
                                            <button
                                                className="btn btn-sm btn-primary"
                                                onClick={() => onOpenReviewModal(delivery)}
                                            >
                                                Leave Review
                                            </button>
                                        )}
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