import {useState, useEffect} from "react";
import {
    deliveriesIndex,
    deliveryShow,
    deliveryCreate,
    deliveryUpdate,
} from "src/services/backend/deliveriesRequests";
import {driversIndex} from "src/services/backend/driversRequests";
import DeliveriesTable from "src/pages/dispatcher/deliveries/DeliveriesTable";
import DeliveryModal from "./DeliveryModal";
import SearchBar from "src/components/SearchBar";
import {getAccessToken} from "src/utils/auth.js";
import {clientsIndex} from "src/services/backend/clientsRequests.js";

const DeliveriesIndex = () => {
    const [deliveries, setDeliveries] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('add');
    const [formErrors, setFormErrors] = useState({});
    const [drivers, setDrivers] = useState([]);
    const [clients, setClients] = useState([]);
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
            const response = await clientsIndex(authorization);
            setClients(response.data);
        } catch (error) {
            console.error("Error fetching clients:", error);
        }
    };
    const fetchDrivers = async () => {
        try {
            const response = await driversIndex({}, authorization);
            setDrivers(response.data);
        } catch (error) {
            console.error("Error fetching driver:", error);
        }
    };

    const fetchDeliveries = async () => {
        try {
            const response = await deliveriesIndex({}, authorization);
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
            pickup_location: '',
            dropoff_location: '',
            package_details: '',
            status: 'Pending',
            delivery_notes: '',
            created_at: new Date().toISOString().split('T')[0],
        });
        setIsModalOpen(true);
    };

    const handleUpdateDelivery = async (id) => {
        try {
            const response = await deliveryShow(id, authorization);
            setModalType('update');
            setCurrentDelivery(response.data);
            setIsModalOpen(true);
        } catch (error) {
            console.error("Error fetching delivery details:", error);
        }
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setCurrentDelivery({...currentDelivery, [name]: value});
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleConfirm = async () => {
        if (!validateForm()) return;
        const cleanedDelivery = { ...currentDelivery };
        if (!cleanedDelivery.driver_id) delete cleanedDelivery.driver_id;
        if (!cleanedDelivery.client_id) delete cleanedDelivery.client_id;
        try {
            if (modalType === 'add') {
                const response = await deliveryCreate(cleanedDelivery, authorization);
                setDeliveries([...deliveries, response.data]);
            } else {
                await deliveryUpdate(cleanedDelivery.id, cleanedDelivery, authorization);
                setDeliveries(deliveries.map(delivery =>
                    delivery.id === cleanedDelivery.id ? cleanedDelivery : delivery
                ));
            }
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error saving delivery:", error);
        }
    };

    const validateForm = () => {
        const errors = {};
        if (!currentDelivery.pickup_location.trim()) errors.pickup_location = "Pickup location is required";
        if (!currentDelivery.dropoff_location.trim()) errors.dropoff_location = "Dropoff location is required";
        if (!currentDelivery.package_details.trim()) errors.package_details = "Package details are required";

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
                <button
                    className="btn btn-success"
                    onClick={handleAddDelivery}
                >
                    <i className="bi bi-plus-circle me-2"></i>Add Delivery
                </button>
            </div>

            <SearchBar
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
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