import {useState, useEffect} from "react";
import {
    deliveriesIndexRequest,
    deliveryShowRequest,
    deliveriesCreateRequest,
    deliveriesUpdateRequest,
    deliveriesDeleteRequest
} from "src/services/backend/deliveriesRequests";
import {driversIndexRequest} from "src/services/backend/driversRequests";
import DeliveriesTableAdmin from "./DeliveriesTableAdmin.jsx";
import DeliveryModal from "../../../components/deliveries/DeliveryModal.jsx";
import SearchBar from "src/components/SearchBar";
import {getAccessToken} from "src/utils/auth.js";
import {clientsIndexRequest} from "src/services/backend/clientsRequests.js";

const DeliveriesIndexAdmin = () => {
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
    const [searchTerm, setSearchTerm] = useState('');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
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
            console.error("Error deleting deliveries:", error);
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
                    pickup_location: {
                        ...currentDelivery.pickup_location,
                        address: `Місцезнаходження ${currentDelivery.pickup_location.latitude.toFixed(6)}, ${currentDelivery.pickup_location.longitude.toFixed(6)}`
                    },
                    dropoff_location: {
                        ...currentDelivery.dropoff_location,
                        address: `Місцезнаходження ${currentDelivery.dropoff_location.latitude.toFixed(6)}, ${currentDelivery.dropoff_location.longitude.toFixed(6)}`
                    }
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
        const search = searchTerm.toLowerCase();
        return (
            (delivery.pickup_location?.address?.toLowerCase().includes(search) ||
                (delivery.dropoff_location?.address?.toLowerCase().includes(search)) ||
                delivery.status.toLowerCase().includes(search)
            ));
    });

    return (
        <div className="container-fluid py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="mb-0">Керування Доставками</h1>
                <button className="btn btn-success" onClick={handleAddDelivery}>
                    <i className="bi bi-plus-circle me-2"></i>Додати доставку
                </button>
            </div>

            <SearchBar
                searchTerm={searchTerm}
                onSearchChange={(e) => setSearchTerm(e.target.value)}
            />

            <DeliveriesTableAdmin
                deliveries={filteredDeliveries}
                onUpdate={handleUpdateDelivery}
                onDelete={handleDeleteDelivery}
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

            {isDeleteModalOpen && (
                <div className="modal fade show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirm Deletion</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setIsDeleteModalOpen(false)}
                                    disabled={isDeleting}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete delivery #{currentDelivery.id}?</p>
                                <p className="text-danger">This action cannot be undone.</p>
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
                                            Deleting...
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

export default DeliveriesIndexAdmin;