import { useState, useEffect } from "react";
import {
    vehiclesIndex,
    vehicleShow,
    vehicleCreate,
    vehicleUpdate,
    vehicleDelete,
} from "src/services/backend/vehiclesRequests";
import VehiclesTable from "src/pages/dispatcher/vehicles/VehiclesTable";
import VehicleModal from "src/pages/dispatcher/vehicles/VehicleModal";
import SearchBar from "src/components/SearchBar";
import {getAccessToken} from "src/utils/auth.js";

const VehiclesIndex = () => {
    const [vehicles, setVehicles] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState("add");
    const [formErrors, setFormErrors] = useState({});
    const [currentVehicle, setCurrentVehicle] = useState({
        id: "",
        model: "",
        license_plate: "",
        capacity: "",
        mileage: "",
        maintenance_due_date: ""
    });
    const [searchTerm, setSearchTerm] = useState('');

    const authorization = getAccessToken()

    useEffect(() => {
        fetchVehicles();
    }, []);

    const fetchVehicles = async () => {
        try {
            const response = await vehiclesIndex({}, authorization);
            setVehicles(response.data.data.vehicles);
        } catch (error) {
            console.error("Error fetching vehicles:", error);
        }
    };

    const handleAddVehicle = () => {
        setModalType("add");
        setCurrentVehicle({
            id: "",
            model: "",
            license_plate: "",
            capacity: "",
            mileage: "",
            maintenance_due_date: ""
        });
        setIsModalOpen(true);
    };

    const handleUpdateVehicle = async (id) => {
        try {
            const response = await vehicleShow(id, authorization);
            setModalType('update');
            setCurrentVehicle(response.data.data);
            setIsModalOpen(true);
        } catch (error) {
            console.error("Error fetching vehicle details:", error);
        }
    };

    const handleDeleteVehicle = async (id) => {
        try {
            await vehicleDelete(id, authorization);
            setVehicles(vehicles.filter(vehicle => vehicle.id !== id));
        } catch (error) {
            console.error("Error deleting vehicle:", error);
        }
    };

    const handleConfirm = async () => {
        if (!validateForm()) return;

        try {
            if (modalType === 'add') {
                const response = await vehicleCreate(currentVehicle, authorization);
                setVehicles([...vehicles, response.data.data]);
            } else {
                await vehicleUpdate(currentVehicle.id, currentVehicle, authorization);
                setVehicles(vehicles.map(vehicle =>
                    vehicle.id === currentVehicle.id ? currentVehicle : vehicle
                ));
            }
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error saving vehicle:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentVehicle({ ...currentVehicle, [name]: value });
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const validateForm = () => {
        const errors = {};
        if (!currentVehicle.model.trim()) errors.model = "Model is required";
        if (!currentVehicle.license_plate.trim()) errors.license_plate = "License plate is required";
        if (!currentVehicle.capacity || isNaN(currentVehicle.capacity) || currentVehicle.capacity <= 0) {
            errors.capacity = "Capacity must be a positive number";
        }
        if (!currentVehicle.mileage || isNaN(currentVehicle.mileage) || currentVehicle.mileage < 0) {
            errors.mileage = "Mileage must be a non-negative number";
        }
        if (!currentVehicle.maintenance_due_date.trim()) {
            errors.maintenance_due_date = "Maintenance due date is required";
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const filteredVehicles = vehicles.filter(vehicle => {
        const search = searchTerm.toLowerCase();
        return (
            vehicle.model.toLowerCase().includes(search) ||
            vehicle.license_plate.toLowerCase().includes(search) ||
            vehicle.capacity.toString().includes(search) ||
            vehicle.mileage.toString().includes(search) ||
            (vehicle.maintenance_due_date && vehicle.maintenance_due_date.toLowerCase().includes(search))
        );
    });

    return (
        <div className="container-fluid py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="mb-0">Vehicles</h1>
                <button
                    className="btn btn-success"
                    onClick={handleAddVehicle}
                >
                    <i className="bi bi-plus-circle me-2"></i>Add Vehicle
                </button>
            </div>

            <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />

            <VehiclesTable
                vehicles={filteredVehicles}
                onUpdate={handleUpdateVehicle}
                onDelete={handleDeleteVehicle}
            />

            <VehicleModal
                isOpen={isModalOpen}
                modalType={modalType}
                vehicle={currentVehicle}
                errors={formErrors}
                onInputChange={handleInputChange}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirm}
            />
        </div>
    );
};

export default VehiclesIndex;