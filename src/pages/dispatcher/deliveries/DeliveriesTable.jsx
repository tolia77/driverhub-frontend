import {format} from "date-fns";

const DeliveriesTable = ({ deliveries, onUpdate }) => {
    return (
        <div className="card">
            <div className="card-body p-0">
                <div className="table-responsive" style={{ maxHeight: '500px' }}>
                    <table className="table table-hover table-striped mb-0">
                        <thead className="table-dark sticky-top">
                        <tr>
                            <th>Водій</th>
                            <th>Client</th>
                            <th>Адреса завантаження</th>
                            <th>Адреса вивантаження</th>
                            <th>Package details</th>
                            <th>Delivery notes</th>
                            <th>Статус</th>
                            <th>Дата створення</th>
                            <th>Дії</th>
                        </tr>
                        </thead>
                        <tbody>
                        {deliveries.map(delivery => (
                            <tr key={delivery.id}>
                                <td>{delivery.driver ? `${delivery.driver.first_name} ${delivery.driver.last_name}` : 'None'}</td>
                                <td>{delivery.client ? `${delivery.client.first_name} ${delivery.client.last_name}` : 'None'}</td>
                                <td>{delivery?.pickup_location?.address || `${delivery.pickup_location.latitude}, ${delivery.pickup_location.longitude}`}</td>
                                <td>{delivery?.dropoff_location?.address || `${delivery.dropoff_location.latitude}, ${delivery.dropoff_location.longitude}`}</td>
                                <td>{delivery.package_details}</td>
                                <td>{delivery.delivery_notes}</td>
                                <td>{delivery.status}</td>
                                <td>{format(new Date(delivery.created_at), "yyyy-MM-dd HH:mm")}</td>
                                <td>
                                    <div className="d-flex gap-2">
                                        <button
                                            className="btn btn-sm btn-warning"
                                            onClick={() => onUpdate(delivery.id)}
                                        >
                                            <i className="bi bi-pencil"></i> Оновити
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