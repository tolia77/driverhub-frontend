import { useState, useEffect } from "react";
import {
    deliveriesIndex,
    deliveryShow,
    deliveryCreate,
    deliveryUpdate,
    deliveryDelete,
} from "src/services/backend/deliveriesRequests";
import DeliveriesTable from "src/pages/dispatcher/deliveries/DeliveriesTable";
import DeliveryModal from "./DeliveryModal";
import SearchBar from "src/components/SearchBar";

const DeliveriesIndex = () => {
    const [deliveries, setDeliveries] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('add');
    const [formErrors, setFormErrors] = useState({});
    const [currentDelivery, setCurrentDelivery] = useState({
        id: '',
        driver_id: '',
        pickup_location: '',
        dropoff_location: '',
        delivery_window: '',
        package_details: '',
        status: 'Pending',
        delivery_notes: '',
        created_at: new Date().toISOString().split('T')[0],
    });
    const [searchTerm, setSearchTerm] = useState('');

    const authorization = localStorage.getItem("accessToken");

    useEffect(() => {
        fetchDeliveries();
    }, []);

    const fetchDeliveries = async () => {
        try {
            const response = await deliveriesIndex({}, authorization);
            setDeliveries(response.data.data.deliveries);
        } catch (error) {
            console.error("Error fetching deliveries:", error);
        }
    };

    const handleAddDelivery = () => {
        setModalType('add');
        setCurrentDelivery({
            id: '',
            driver_id: '',
            pickup_location: '',
            dropoff_location: '',
            delivery_window: '',
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
            setCurrentDelivery(response.data.data);
            setIsModalOpen(true);
        } catch (error) {
            console.error("Error fetching delivery details:", error);
        }
    };

    const handleDeleteDelivery = async (id) => {
        try {
            await deliveryDelete(id, authorization);
            setDeliveries(deliveries.filter(delivery => delivery.id !== id));
        } catch (error) {
            console.error("Error deleting delivery:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentDelivery({ ...currentDelivery, [name]: value });
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleConfirm = async () => {
        if (!validateForm()) return;

        try {
            if (modalType === 'add') {
                const response = await deliveryCreate(currentDelivery, authorization);
                setDeliveries([...deliveries, response.data.data]);
            } else {
                await deliveryUpdate(currentDelivery.id, currentDelivery, authorization);
                setDeliveries(deliveries.map(delivery =>
                    delivery.id === currentDelivery.id ? currentDelivery : delivery
                ));
            }
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error saving delivery:", error);
        }
    };

    const validateForm = () => {
        const errors = {};
        if (!currentDelivery.driver_id.trim()) errors.driver_id = "Driver ID is required";
        if (!currentDelivery.pickup_location.trim()) errors.pickup_location = "Pickup location is required";
        if (!currentDelivery.dropoff_location.trim()) errors.dropoff_location = "Dropoff location is required";
        if (!currentDelivery.delivery_window.trim()) errors.delivery_window = "Delivery window is required";
        if (!currentDelivery.package_details.trim()) errors.package_details = "Package details are required";

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const filteredDeliveries = deliveries.filter(delivery => {
        const search = searchTerm.toLowerCase();
        return (
            delivery.driver_id.toLowerCase().includes(search) ||
            delivery.pickup_location.toLowerCase().includes(search) ||
            delivery.dropoff_location.toLowerCase().includes(search) ||
            delivery.delivery_window.toLowerCase().includes(search) ||
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
            />
        </div>
    );
};

export default DeliveriesIndex;