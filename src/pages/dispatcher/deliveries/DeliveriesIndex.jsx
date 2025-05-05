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
import SearchBar from "src/components/SearchBar";
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
    const [searchTerm, setSearchTerm] = useState('');
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
        const search = searchTerm.toLowerCase();
        return (
            delivery?.pickup_location?.address?.toLowerCase()?.includes(search) ||
            delivery?.dropoff_location?.address?.toLowerCase()?.includes(search) ||
            delivery.status.toLowerCase().includes(search)
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

            <SearchBar
                searchTerm={searchTerm}
                onSearchChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search deliveries..."
            />

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