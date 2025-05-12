const DeliveriesTable = ({deliveries, onOpenReviewModal}) => {
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
                            <th>Адреса завантаження</th>
                            <th>Адреса вивантаження</th>
                            <th>Деталі доставки</th>
                            <th>Статус</th>
                            <th>Дії</th>
                        </tr>
                        </thead>
                        <tbody>
                        {deliveries.map((delivery) => (
                            <tr key={delivery.id}>
                                <td>{delivery.id}</td>
                                <td>{delivery?.pickup_location?.address || `${delivery.pickup_location.latitude}, ${delivery.pickup_location.longitude}`}</td>
                                <td>{delivery?.dropoff_location?.address || `${delivery.dropoff_location.latitude}, ${delivery.dropoff_location.longitude}`}</td>
                                <td>{delivery.package_details}</td>
                                <td>{delivery.status}</td>
                                <td>
                                    {["Delivered", "Failed"].includes(delivery.status) && (
                                        <div className="btn-group">
                                            {delivery.review ? (
                                                <>
                                                    <button
                                                        className="btn btn-sm btn-warning"
                                                        onClick={() => onOpenReviewModal(delivery, 'edit')}
                                                    >
                                                        Редагувати відгук
                                                    </button>
                                                    <button
                                                        className="btn btn-sm btn-danger"
                                                        onClick={() => onOpenReviewModal(delivery, 'delete')}
                                                    >
                                                        Видалити
                                                    </button>
                                                </>
                                            ) : (
                                                <button
                                                    className="btn btn-sm btn-primary"
                                                    onClick={() => onOpenReviewModal(delivery, 'create')}
                                                >
                                                    Залишити відгук
                                                </button>
                                            )}
                                        </div>
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