import {useState, useEffect} from "react";
import {
    deliveriesIndexRequest,
    deliveryShowRequest,
    deliveriesCreateRequest,
    deliveriesUpdateRequest,
    deliveriesDeleteRequest
} from "src/services/backend/deliveriesRequests.js";
import {driversIndexRequest} from "src/services/backend/driversRequests.js";
import DeliveriesTable from "src/components/deliveries/DeliveriesTable.jsx";
import DeliveryModal from "src/components/deliveries/DeliveryModal.jsx";
import {getAccessToken} from "src/utils/auth.js";
import {clientsIndexRequest} from "src/services/backend/clientsRequests.js";

const DeliveriesIndex = ({userRole = 'dispatcher'}) => {
    const [deliveries, setDeliveries] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('add');
    const [formErrors, setFormErrors] = useState({});
    const [drivers, setDrivers] = useState([]);
    const [clients, setClients] = useState([]);
    const [originalDelivery, setOriginalDelivery] = useState(null);
    const [currentDelivery, setCurrentDelivery] = useState({
        id: '',
        driver_id: '',
        client_id: '',
        pickup_location: {
            latitude: 50.4501,
            longitude: 30.5234,
            address: ''
        },
        dropoff_location: {
            latitude: 50.4501,
            longitude: 30.5234,
            address: ''
        },
        package_details: '',
        status: 'Pending',
        delivery_notes: '',
        created_at: new Date().toISOString().split('T')[0],
    });
    const [filters, setFilters] = useState({
        driver_name: '',
        client_name: '',
        pickup_address: '',
        dropoff_address: '',
        status: '',
        package_details: '',
        delivery_notes: '',
        created_at: ''
    });
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const authorization = getAccessToken();

    const isAdmin = userRole === 'admin';

    useEffect(() => {
        fetchDeliveries();
        fetchDrivers();
        fetchClients();
    }, []);

    const fetchClients = async () => {
        try {
            const response = await clientsIndexRequest(authorization);
            setClients(response.data);
        } catch (error) {
            console.error("Error fetching clients:", error);
        }
    };

    const fetchDrivers = async () => {
        try {
            const response = await driversIndexRequest({}, authorization);
            setDrivers(response.data);
        } catch (error) {
            console.error("Error fetching drivers:", error);
        }
    };

    const fetchDeliveries = async () => {
        try {
            const response = await deliveriesIndexRequest({}, authorization);
            setDeliveries(response.data);
        } catch (error) {
            console.error("Error fetching deliveries:", error);
        }
    };

    const handleAddDelivery = () => {
        setModalType('add');
        setCurrentDelivery({
            id: '',
            driver_id: '',
            client_id: '',
            pickup_location: {
                latitude: 50.4501,
                longitude: 30.5234,
                address: ''
            },
            dropoff_location: {
                latitude: 50.4501,
                longitude: 30.5234,
                address: ''
            },
            package_details: '',
            status: 'Pending',
            delivery_notes: '',
            created_at: new Date().toISOString().split('T')[0],
        });
        setOriginalDelivery(null);
        setIsModalOpen(true);
    };

    const handleUpdateDelivery = async (id) => {
        try {
            const response = await deliveryShowRequest(id, authorization);
            setModalType('update');
            setCurrentDelivery(response.data);
            setOriginalDelivery(response.data);
            setIsModalOpen(true);
        } catch (error) {
            console.error("Error fetching deliveries details:", error);
        }
    };

    const handleDeleteDelivery = (id) => {
        setCurrentDelivery(deliveries.find(d => d.id === id));
        setIsDeleteModalOpen(true);
    };

    const confirmDeleteDelivery = async () => {
        try {
            setIsDeleting(true);
            await deliveriesDeleteRequest(currentDelivery.id, authorization);
            setDeliveries(deliveries.filter(d => d.id !== currentDelivery.id));
            setIsDeleteModalOpen(false);
        } catch (error) {
            console.error("Error deleting delivery:", error);
        } finally {
            setIsDeleting(false);
        }
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;

        if (name === 'pickup_location' || name === 'dropoff_location') {
            setCurrentDelivery(prev => ({
                ...prev,
                [name]: {
                    ...prev[name],
                    ...value
                }
            }));
        } else {
            setCurrentDelivery(prev => ({
                ...prev,
                [name]: value || null
            }));
        }
    };

    const handleFilterChange = (e) => {
        const {name, value} = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const resetFilters = () => {
        setFilters({
            driver_name: '',
            client_name: '',
            pickup_address: '',
            dropoff_address: '',
            status: '',
            package_details: '',
            delivery_notes: '',
            created_at: ''
        });
    };

    const getModifiedFields = () => {
        if (!originalDelivery) return currentDelivery;

        const modified = {};
        for (const key in currentDelivery) {
            if (key === 'id') continue;

            if (key === 'pickup_location' || key === 'dropoff_location') {
                if (JSON.stringify(currentDelivery[key]) !== JSON.stringify(originalDelivery[key])) {
                    modified[key] = currentDelivery[key];
                }
            } else if (currentDelivery[key] !== originalDelivery[key]) {
                modified[key] = currentDelivery[key] || null;
            }
        }
        return modified;
    };

    const handleConfirm = async () => {
        if (!validateForm()) return;

        try {
            if (modalType === 'add') {
                const cleanedDelivery = {
                    ...currentDelivery,
                    pickup_location: currentDelivery.pickup_location,
                    dropoff_location: currentDelivery.dropoff_location,
                };

                if (!cleanedDelivery.driver_id) cleanedDelivery.driver_id = null;
                if (!cleanedDelivery.client_id) cleanedDelivery.client_id = null;

                const response = await deliveriesCreateRequest(cleanedDelivery, authorization);
                setDeliveries([...deliveries, response.data]);
            } else {
                const modifiedFields = getModifiedFields();
                const response = await deliveriesUpdateRequest(currentDelivery.id, modifiedFields, authorization);
                setDeliveries(deliveries.map(delivery =>
                    delivery.id === currentDelivery.id ? response.data : delivery
                ));
            }
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error saving deliveries:", error);
        }
    };

    const validateForm = () => {
        const errors = {};
        if (!currentDelivery.pickup_location?.latitude) errors.pickup_location = "Адреса завантаження є обов'язковою";
        if (!currentDelivery.dropoff_location?.latitude) errors.dropoff_location = "Адреса вивантаження є обов'язковою";
        if (!currentDelivery.package_details?.trim()) errors.package_details = "Деталі доставки є обов'язковими";

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const filteredDeliveries = deliveries.filter(delivery => {
        const driverFullName = delivery.driver ?
            `${delivery.driver.first_name} ${delivery.driver.last_name}`.toLowerCase() : '';
        const clientFullName = delivery.client ?
            `${delivery.client.first_name} ${delivery.client.last_name}`.toLowerCase() : '';

        return (
            (filters.driver_name === '' ||
                driverFullName.includes(filters.driver_name.toLowerCase())) &&
            (filters.client_name === '' ||
                clientFullName.includes(filters.client_name.toLowerCase())) &&
            (filters.pickup_address === '' ||
                delivery.pickup_location?.address?.toLowerCase().includes(filters.pickup_address.toLowerCase())) &&
            (filters.dropoff_address === '' ||
                delivery.dropoff_location?.address?.toLowerCase().includes(filters.dropoff_address.toLowerCase())) &&
            (filters.status === '' || delivery.status.toLowerCase().includes(filters.status.toLowerCase())) &&
            (filters.package_details === '' ||
                delivery.package_details?.toLowerCase().includes(filters.package_details.toLowerCase())) &&
            (filters.delivery_notes === '' ||
                delivery.delivery_notes?.toLowerCase().includes(filters.delivery_notes.toLowerCase())) &&
            (filters.created_at === '' ||
                delivery.created_at?.includes(filters.created_at))
        );
    });

    return (
        <div className="container-fluid py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="mb-0">Доставки</h1>
                <button className="btn btn-success" onClick={handleAddDelivery}>
                    <i className="bi bi-plus-circle me-2"></i>Додати доставку
                </button>
            </div>

            <div className="card mb-4">
                <div className="card-header">
                    <div className="d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">Фільтри</h5>
                        <button className="btn btn-sm btn-outline-secondary" onClick={resetFilters}>
                            Скинути фільтри
                        </button>
                    </div>
                </div>
                <div className="card-body">
                    <div className="row g-3">
                        <div className="col-md-3">
                            <label className="form-label">Водій</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Фільтрувати за ім'ям водія"
                                name="driver_name"
                                value={filters.driver_name}
                                onChange={handleFilterChange}
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Клієнт</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Фільтрувати за ім'ям клієнта"
                                name="client_name"
                                value={filters.client_name}
                                onChange={handleFilterChange}
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Адреса завантаження</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Фільтрувати за адресою завантаження"
                                name="pickup_address"
                                value={filters.pickup_address}
                                onChange={handleFilterChange}
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Адреса вивантаження</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Фільтрувати за адресою вивантаження"
                                name="dropoff_address"
                                value={filters.dropoff_address}
                                onChange={handleFilterChange}
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Статус</label>
                            <select
                                className="form-select"
                                name="status"
                                value={filters.status}
                                onChange={handleFilterChange}
                            >
                                <option value="">Всі статуси</option>
                                <option value="Pending">Очікує</option>
                                <option value="In-Transit">В процесі</option>
                                <option value="Delivered">Завершена</option>
                                <option value="Failed">Невдала</option>
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Деталі доставки</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Фільтрувати за деталями доставки"
                                name="package_details"
                                value={filters.package_details}
                                onChange={handleFilterChange}
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Примітки</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Фільтрувати за примітками"
                                name="delivery_notes"
                                value={filters.delivery_notes}
                                onChange={handleFilterChange}
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Дата створення</label>
                            <input
                                type="date"
                                className="form-control"
                                name="created_at"
                                value={filters.created_at}
                                onChange={handleFilterChange}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <DeliveriesTable
                deliveries={filteredDeliveries}
                onUpdate={handleUpdateDelivery}
                onDelete={isAdmin ? handleDeleteDelivery : null}
                showDriver={true}
                showClient={true}
                showActions={true}
                userRole={userRole}
            />

            <DeliveryModal
                isOpen={isModalOpen}
                modalType={modalType}
                delivery={currentDelivery}
                errors={formErrors}
                onInputChange={handleInputChange}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirm}
                drivers={drivers}
                clients={clients}
            />

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && (
                <div className="modal fade show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Підтвердження видалення</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setIsDeleteModalOpen(false)}
                                    disabled={isDeleting}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <p>Ви впевнені, що хочете видалити цю доставку?</p>
                                <p className="text-danger">Цю дію не можна скасувати.</p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setIsDeleteModalOpen(false)}
                                    disabled={isDeleting}
                                >
                                    Скасувати
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={confirmDeleteDelivery}
                                    disabled={isDeleting}
                                >
                                    {isDeleting ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                                            Видалення...
                                        </>
                                    ) : (
                                        "Видалити"
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DeliveriesIndex;