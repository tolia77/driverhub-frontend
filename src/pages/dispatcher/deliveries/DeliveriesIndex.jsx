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
        pickup_location: '',
        dropoff_location: '',
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
        const newDelivery = {
            id: '',
            driver_id: '',
            client_id: '',
            pickup_location: '',
            dropoff_location: '',
            package_details: '',
            status: 'Pending',
            delivery_notes: '',
            created_at: new Date().toISOString().split('T')[0],
        };
        setCurrentDelivery(newDelivery);
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
        setCurrentDelivery({...currentDelivery, [name]: value || null});
    };

    const getModifiedFields = () => {
        if (!originalDelivery) return currentDelivery;

        const modified = {};
        for (const key in currentDelivery) {
            if (key === 'id') continue;
            if (currentDelivery[key] !== originalDelivery[key]) {
                modified[key] = currentDelivery[key] || null;
            }
        }
        return modified;
    };

    const handleConfirm = async () => {
        if (!validateForm()) return;

        try {
            if (modalType === 'add') {
                const cleanedDelivery = { ...currentDelivery };
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
        if (!currentDelivery.pickup_location?.trim()) errors.pickup_location = "Pickup location is required";
        if (!currentDelivery.dropoff_location?.trim()) errors.dropoff_location = "Dropoff location is required";
        if (!currentDelivery.package_details?.trim()) errors.package_details = "Package details are required";

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const filteredDeliveries = deliveries.filter(delivery => {
        const search = searchTerm.toLowerCase();
        return (
            delivery.pickup_location.toLowerCase().includes(search) ||
            delivery.dropoff_location.toLowerCase().includes(search) ||
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
