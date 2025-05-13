import {format} from "date-fns";
import {useState} from "react";
import LocationMapModal from "src/components/deliveries/LocationMapModal.jsx";

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
    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: 'ascending',
    });
    const [mapModalOpen, setMapModalOpen] = useState(false);
    const [mapModalPosition, setMapModalPosition] = useState(null);
    const [mapModalTitle, setMapModalTitle] = useState("");

    if (deliveries.length === 0) {
        return <div className="alert alert-info">Доставок не знайдено</div>;
    }

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({key, direction});
    };

    const getSortableValue = (delivery, key) => {
        switch (key) {
            case 'driver':
                return delivery.driver
                    ? `${delivery.driver.first_name} ${delivery.driver.last_name}`.toLowerCase()
                    : '';
            case 'client':
                return delivery.client
                    ? `${delivery.client.first_name} ${delivery.client.last_name}`.toLowerCase()
                    : '';
            case 'pickup_address':
                return (delivery?.pickup_location?.address ||
                    `${delivery.pickup_location.latitude}, ${delivery.pickup_location.longitude}`).toLowerCase();
            case 'dropoff_address':
                return (delivery?.dropoff_location?.address ||
                    `${delivery.dropoff_location.latitude}, ${delivery.dropoff_location.longitude}`).toLowerCase();
            case 'created_at':
                return new Date(delivery.created_at).getTime();
            default:
                return delivery[key]?.toString().toLowerCase() || '';
        }
    };

    const sortedDeliveries = [...deliveries].sort((a, b) => {
        if (!sortConfig.key) return 0;

        const aValue = getSortableValue(a, sortConfig.key);
        const bValue = getSortableValue(b, sortConfig.key);

        if (aValue < bValue) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
    });

    const SortableHeader = ({children, sortKey}) => (
        <th
            onClick={() => requestSort(sortKey)}
            style={{cursor: 'pointer', position: 'relative'}}
            className="sortable-header"
        >
            {children}
            {sortConfig.key === sortKey && (
                <span className="sort-icon">
          {sortConfig.direction === 'ascending' ? '↑' : '↓'}
        </span>
            )}
        </th>
    );

    return (
        <div className="card">
            <div className="card-body p-0">
                <div className="table-responsive" style={{maxHeight: '500px'}}>
                    <table className="table table-hover table-striped mb-0">
                        <thead className="table-dark sticky-top">
                        <tr>
                            {showDriver && (
                                <SortableHeader sortKey="driver">Водій</SortableHeader>
                            )}
                            {showClient && (
                                <SortableHeader sortKey="client">Клієнт</SortableHeader>
                            )}
                            <SortableHeader sortKey="pickup_address">Адреса завантаження</SortableHeader>
                            <SortableHeader sortKey="dropoff_address">Адреса вивантаження</SortableHeader>
                            <SortableHeader sortKey="package_details">Деталі доставки</SortableHeader>
                            <SortableHeader sortKey="delivery_notes">Примітки</SortableHeader>
                            <SortableHeader sortKey="status">Статус</SortableHeader>
                            <SortableHeader sortKey="created_at">Дата створення</SortableHeader>
                            {showActions && <th>Дії</th>}
                        </tr>
                        </thead>
                        <tbody>
                        {sortedDeliveries.map((delivery) => (
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
                                    {delivery?.pickup_location?.address || `${delivery.pickup_location.latitude}, ${delivery.pickup_location.longitude}`}
                                    <button
                                        className="btn btn-sm btn-outline-primary ms-2"
                                        title="Показати на карті"
                                        onClick={() => {
                                            setMapModalPosition({
                                                lat: parseFloat(delivery.pickup_location.latitude),
                                                lng: parseFloat(delivery.pickup_location.longitude),
                                            });
                                            setMapModalTitle("Місце завантаження");
                                            setMapModalOpen(true);
                                        }}
                                    >
                                        <i className="bi bi-geo-alt-fill"></i>
                                    </button>
                                </td>

                                <td>
                                    {delivery?.dropoff_location?.address || `${delivery.dropoff_location.latitude}, ${delivery.dropoff_location.longitude}`}
                                    <button
                                        className="btn btn-sm btn-outline-success ms-2"
                                        title="Показати на карті"
                                        onClick={() => {
                                            setMapModalPosition({
                                                lat: parseFloat(delivery.dropoff_location.latitude),
                                                lng: parseFloat(delivery.dropoff_location.longitude),
                                            });
                                            setMapModalTitle("Місце вивантаження");
                                            setMapModalOpen(true);
                                        }}
                                    >
                                        <i className="bi bi-geo-alt-fill"></i>
                                    </button>
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
                                                                    onClick={() => onOpenReviewModal(delivery, "edit")}
                                                                >
                                                                    <i className="bi bi-pencil"></i> Редагувати відгук
                                                                </button>
                                                                <button
                                                                    className="btn btn-sm btn-danger"
                                                                    onClick={() => onOpenReviewModal(delivery, "delete")}
                                                                >
                                                                    <i className="bi bi-trash"></i> Видалити
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
            <LocationMapModal
                isOpen={mapModalOpen}
                onClose={() => setMapModalOpen(false)}
                position={mapModalPosition}
                title={mapModalTitle}
            />

        </div>
    );
};

export default DeliveriesTable;