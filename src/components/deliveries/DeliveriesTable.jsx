import { format } from "date-fns";

const DeliveriesTable = ({
                             deliveries,
                             onUpdate,
                             onDelete,
                             onOpenReviewModal,
                             onUpdateStatus,
                             onLogBreak,
                             userRole,
                             showDriver = true,
                             showClient = true,
                             showActions = true,
                         }) => {
    if (deliveries.length === 0) {
        return <div className="alert alert-info">Доставок не знайдено</div>;
    }

    return (
        <div className="card">
            <div className="card-body p-0">
                <div className="table-responsive" style={{ maxHeight: '500px' }}>
                    <table className="table table-hover table-striped mb-0">
                        <thead className="table-dark sticky-top">
                        <tr>
                            {showDriver && <th>Водій</th>}
                            {showClient && <th>Клієнт</th>}
                            <th>Адреса завантаження</th>
                            <th>Адреса вивантаження</th>
                            <th>Деталі доставки</th>
                            <th>Примітки</th>
                            <th>Статус</th>
                            <th>Дата створення</th>
                            {showActions && <th>Дії</th>}
                        </tr>
                        </thead>
                        <tbody>
                        {deliveries.map((delivery) => (
                            <tr key={delivery.id}>
                                {showDriver && (
                                    <td>
                                        {delivery.driver
                                            ? `${delivery.driver.first_name} ${delivery.driver.last_name}`
                                            : 'Не вказано'}
                                    </td>
                                )}
                                {showClient && (
                                    <td>
                                        {delivery.client
                                            ? `${delivery.client.first_name} ${delivery.client.last_name}`
                                            : 'Не вказано'}
                                    </td>
                                )}
                                <td>
                                    {delivery?.pickup_location?.address ||
                                        `${delivery.pickup_location.latitude}, ${delivery.pickup_location.longitude}`}
                                </td>
                                <td>
                                    {delivery?.dropoff_location?.address ||
                                        `${delivery.dropoff_location.latitude}, ${delivery.dropoff_location.longitude}`}
                                </td>
                                <td>{delivery.package_details}</td>
                                <td>{delivery.delivery_notes}</td>
                                <td>{delivery.status}</td>
                                <td>
                                    {format(new Date(delivery.created_at), "yyyy-MM-dd HH:mm")}
                                </td>
                                {showActions && (
                                    <td>
                                        <div className="d-flex gap-2">
                                            {onUpdate && (
                                                <button
                                                    className="btn btn-sm btn-warning"
                                                    onClick={() => onUpdate(delivery.id)}
                                                >
                                                    <i className="bi bi-pencil"></i>{" "}
                                                    {userRole === "admin" ? "Редагувати" : "Оновити"}
                                                </button>
                                            )}

                                            {userRole === "admin" && onDelete && (
                                                <button
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() => onDelete(delivery.id)}
                                                >
                                                    <i className="bi bi-trash"></i> Видалити
                                                </button>
                                            )}

                                            {onOpenReviewModal &&
                                                ["Delivered", "Failed"].includes(delivery.status) && (
                                                    <div className="btn-group">
                                                        {delivery.review ? (
                                                            <>
                                                                <button
                                                                    className="btn btn-sm btn-warning"
                                                                    onClick={() =>
                                                                        onOpenReviewModal(delivery, "edit")
                                                                    }
                                                                >
                                                                    Редагувати відгук
                                                                </button>
                                                                <button
                                                                    className="btn btn-sm btn-danger"
                                                                    onClick={() =>
                                                                        onOpenReviewModal(delivery, "delete")
                                                                    }
                                                                >
                                                                    Видалити
                                                                </button>
                                                            </>
                                                        ) : (
                                                            <button
                                                                className="btn btn-sm btn-primary"
                                                                onClick={() =>
                                                                    onOpenReviewModal(delivery, "create")
                                                                }
                                                            >
                                                                Залишити відгук
                                                            </button>
                                                        )}
                                                    </div>
                                                )}

                                            {onUpdateStatus && (
                                                <button
                                                    className="btn btn-sm btn-warning"
                                                    onClick={() => onUpdateStatus(delivery)}
                                                >
                                                    <i className="bi bi-pencil"></i> Оновити
                                                </button>
                                            )}

                                            {onLogBreak && (
                                                <button
                                                    className="btn btn-sm btn-info"
                                                    onClick={() => onLogBreak(delivery)}
                                                >
                                                    <i className="bi bi-stopwatch"></i> Перерва
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                )}
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