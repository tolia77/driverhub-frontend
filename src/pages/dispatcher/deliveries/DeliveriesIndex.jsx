import {useState, useEffect} from "react";
import {
    deliveriesIndexRequest,
    deliveryShowRequest,
    deliveriesCreateRequest,
    deliveriesUpdateRequest,
} from "src/services/backend/deliveriesRequests";
import {driversIndexRequest} from "src/services/backend/driversRequests";
import DeliveriesTable from "src/pages/dispatcher/deliveries/DeliveriesTable";
import DeliveryModal from "src/components/deliveries/DeliveryModal";
import {getAccessToken} from "src/utils/auth.js";
import {clientsIndexRequest} from "src/services/backend/clientsRequests.js";

const DeliveriesIndex = () => {
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
        driver_id: '',
        client_id: '',
        pickup_address: '',
        dropoff_address: '',
        status: '',
        package_details: '',
        delivery_notes: '',
        created_at: ''
    });
    const authorization = getAccessToken();

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
            driver_id: '',
            client_id: '',
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
        if (!currentDelivery.pickup_location?.latitude) errors.pickup_location = "Pickup location is required";
        if (!currentDelivery.dropoff_location?.latitude) errors.dropoff_location = "Dropoff location is required";
        if (!currentDelivery.package_details?.trim()) errors.package_details = "Package details are required";

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const filteredDeliveries = deliveries.filter(delivery => {
        return (
            (filters.driver_id === '' || delivery.driver_id === filters.driver_id) &&
            (filters.client_id === '' || delivery.client_id === filters.client_id) &&
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
                <h1 className="mb-0">Deliveries</h1>
                <button className="btn btn-success" onClick={handleAddDelivery}>
                    <i className="bi bi-plus-circle me-2"></i>Add Delivery
                </button>
            </div>

            <div className="card mb-4">
                <div className="card-header">
                    <div className="d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">Filters</h5>
                        <button className="btn btn-sm btn-outline-secondary" onClick={resetFilters}>
                            Reset Filters
                        </button>
                    </div>
                </div>
                <div className="card-body">
                    <div className="row g-3">
                        <div className="col-md-3">
                            <label className="form-label">Driver</label>
                            <select
                                className="form-select"
                                name="driver_id"
                                value={filters.driver_id}
                                onChange={handleFilterChange}
                            >
                                <option value="">All Drivers</option>
                                {drivers.map(driver => (
                                    <option key={driver.id} value={driver.id}>
                                        {driver.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Client</label>
                            <select
                                className="form-select"
                                name="client_id"
                                value={filters.client_id}
                                onChange={handleFilterChange}
                            >
                                <option value="">All Clients</option>
                                {clients.map(client => (
                                    <option key={client.id} value={client.id}>
                                        {client.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Pickup Address</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Filter by pickup address"
                                name="pickup_address"
                                value={filters.pickup_address}
                                onChange={handleFilterChange}
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Dropoff Address</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Filter by dropoff address"
                                name="dropoff_address"
                                value={filters.dropoff_address}
                                onChange={handleFilterChange}
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Status</label>
                            <select
                                className="form-select"
                                name="status"
                                value={filters.status}
                                onChange={handleFilterChange}
                            >
                                <option value="">All Statuses</option>
                                <option value="Pending">Pending</option>
                                <option value="In-Transit">In-Transit</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Package Details</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Filter by package details"
                                name="package_details"
                                value={filters.package_details}
                                onChange={handleFilterChange}
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Delivery Notes</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Filter by delivery notes"
                                name="delivery_notes"
                                value={filters.delivery_notes}
                                onChange={handleFilterChange}
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Created At</label>
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
        </div>
    );
};

export default DeliveriesIndex;