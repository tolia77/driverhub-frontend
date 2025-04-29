import {useState, useEffect} from "react";
import {
    driversIndex,
    driverUpdate,
    driverDelete,
} from "src/services/backend/driversRequests.js";
import {
    vehiclesIndex,
} from "src/services/backend/vehiclesRequests.js";
import DriversTable from "src/pages/dispatcher/drivers/DriversTable.jsx";
import DriverModal from "src/pages/dispatcher/drivers/DriverModal";
import VehicleSelectModal from "src/pages/dispatcher/drivers/VehicleSelectModal";
import SearchBar from "src/components/SearchBar.jsx";
import {driversCreate} from "src/services/backend/driversRequests.js";
import {getAccessToken} from "src/utils/auth.js";

const DriversIndex = () => {
    const [drivers, setDrivers] = useState([]);
    const [vehiclesMap, setVehiclesMap] = useState({});
    const [vehicles, setVehicles] = useState([]);
    const [formErrors, setFormErrors] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('add');
    const [currentDriver, setCurrentDriver] = useState({
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        license_number: '',
        vehicle_id: ''
    });
    const [isSelectVehicleOpen, setIsSelectVehicleOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const authorization = getAccessToken()

    useEffect(() => {
        fetchDrivers();
    }, []);

    const fetchDrivers = async () => {
        try {
            const response = await driversIndex({}, authorization);
            const driversData = response.data;
            setDrivers(driversData);
        } catch (error) {
            console.error("Error fetching driver:", error);
        }
    };

    const fetchVehicles = async () => {
        try {
            const response = await vehiclesIndex({}, authorization);
            const vehiclesArray = response.data;
            setVehicles(vehiclesArray);

            const map = {};
            vehiclesArray.forEach(vehicle => {
                map[vehicle.id] = vehicle;
            });
            setVehiclesMap(map);
        } catch (error) {
            console.error("Error fetching vehicles:", error);
        }
    };

    const mapToApiFormat = (driver) => ({
        first_name: driver.firstName,
        last_name: driver.lastName,
        email: driver.email,
        password: driver.password,
        license_number: driver.license_number,
        vehicle_id: driver.vehicle_id ? parseInt(driver.vehicle_id, 10) : null
    });

    const handleAddDriver = async () => {
        if (!vehicles.length) {
            await fetchVehicles();
        }
        setModalType('add');
        setCurrentDriver({
            id: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            license_number: '',
            vehicle_id: ''
        });
        setIsModalOpen(true);
    };


    const handleUpdateDriver = async (id) => {
        if (!vehicles.length) {
            await fetchVehicles();
        }
        try {
            setModalType('update');
            setCurrentDriver(drivers.find(driver => driver.id === id));
            setIsModalOpen(true);
        } catch (error) {
            console.error("Error fetching driver details:", error);
        }
    };

    const handleConfirm = async () => {
        if (!validateForm()) return;

        try {
            if (modalType === 'add') {
                await driversCreate(mapToApiFormat(currentDriver), authorization);
                setDrivers([...drivers, currentDriver]);
            } else {
                await driverUpdate(currentDriver.id, currentDriver, authorization);
            }
            await fetchDrivers();
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error saving driver:", error);
        }
    };

    const handleDeleteDriver = async (id) => {
        try {
            await driverDelete(id, authorization);
            setDrivers(drivers.filter(driver => driver.id !== id));
        } catch (error) {
            console.error("Error deleting driver:", error);
        }
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setCurrentDriver({...currentDriver, [name]: value});
    };

    const handleSelectVehicle = (vehicle_id) => {
        setCurrentDriver({...currentDriver, vehicle_id});
        setIsSelectVehicleOpen(false);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredDrivers = drivers.filter(driver => {
        const search = searchTerm.toLowerCase();
        const fullName = `${driver.first_name} ${driver.last_name}`.toLowerCase();
        return (
            fullName.includes(search) ||
            driver.email.toLowerCase().includes(search) ||
            driver.license_number.toLowerCase().includes(search) ||
            (driver.vehicle && driver.vehicle.toLowerCase().includes(search)) ||
            (driver.current_delivery && driver.current_delivery.toLowerCase().includes(search))
        );
    });

    const validateForm = () => {
        const errors = {};
        if (!currentDriver.firstName.trim()) errors.firstName = "First name is required";
        if (!currentDriver.lastName.trim()) errors.lastName = "Last name is required";
        if (!currentDriver.email.trim()) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(currentDriver.email)) {
            errors.email = "Invalid email format";
        }
        if (modalType === 'add' && !currentDriver.password) errors.password = "Password is required";
        if (!currentDriver.license_number.trim()) errors.license_number = "License number is required";

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    return (
        <div className="container-fluid py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="mb-0">Drivers</h1>
                <button
                    className="btn btn-success"
                    onClick={handleAddDriver}
                >
                    <i className="bi bi-plus-circle me-2"></i>Add Driver
                </button>
            </div>

            <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange}/>

            <DriversTable
                drivers={filteredDrivers}
                onUpdate={handleUpdateDriver}
                onDelete={handleDeleteDriver}
            />

            <DriverModal
                isOpen={isModalOpen}
                modalType={modalType}
                driver={currentDriver}
                errors={formErrors}
                vehiclesMap={vehiclesMap}
                onInputChange={handleInputChange}
                onSelectVehicle={() => setIsSelectVehicleOpen(true)}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirm}
            />

            <VehicleSelectModal
                isOpen={isSelectVehicleOpen}
                vehicles={vehicles}
                selectedVehicleId={currentDriver.vehicle_id}
                onSelect={handleSelectVehicle}
                onClose={() => setIsSelectVehicleOpen(false)}
            />
        </div>
    );
};

export default DriversIndex;