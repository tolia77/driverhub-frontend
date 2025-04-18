import { useState, useEffect } from "react";
import {
    driversIndex,
    driverShow,
    driverCreate,
    driverUpdate,
    driverDelete,
} from "../../../services/backend/driversRequests";
import {
    vehiclesIndex,
    vehicleShow
} from "../../../services/backend/vehiclesRequests";

const DriversIndex = () => {
    const [drivers, setDrivers] = useState([]);
    const [vehiclesMap, setVehiclesMap] = useState({});
    const [vehicles, setVehicles] = useState([]);
    const [formErrors, setFormErrors] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('add');
    const [currentDriver, setCurrentDriver] = useState({
        id: '',
        name: '',
        email: '',
        license_number: '',
        vehicle_id: ''
    });
    const [isSelectVehicleOpen, setIsSelectVehicleOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const authorization = localStorage.getItem("accessToken");

    useEffect(() => {
        fetchDrivers();
        fetchVehicles();
    }, []);

    const fetchDrivers = async () => {
        try {
            const response = await driversIndex({}, authorization);
            const driversData = response.data.data.drivers;
            setDrivers(driversData);

            const vehicleData = {};
            await Promise.all(driversData.map(async (driver) => {
                if (driver.vehicle_id) {
                    try {
                        const vehicleResponse = await vehicleShow(driver.vehicle_id, authorization);
                        vehicleData[driver.vehicle_id] = vehicleResponse.data.data;
                    } catch (error) {
                        console.error(`Error in fetching vehicle for driver ${driver.id}:`, error);
                    }
                }
            }));
            setVehiclesMap(vehicleData);
        } catch (error) {
            console.error("Error fetching drivers:", error);
        }
    };

    const fetchVehicles = async () => {
        try {
            const response = await vehiclesIndex({}, authorization);
            setVehicles(response.data.data.vehicles);
        } catch (error) {
            console.error("Error fetching vehicles:", error);
        }
    };

    const handleAddDriver = () => {
        setModalType('add');
        setCurrentDriver({
            id: '',
            name: '',
            email: '',
            license_number: '',
            vehicle_id: ''
        });
        setIsModalOpen(true);
    };

    const handleUpdateDriver = async (id) => {
        try {
            const response = await driverShow(id, authorization);
            setModalType('update');
            setCurrentDriver(response.data.data);
            setIsModalOpen(true);
        } catch (error) {
            console.error("Error fetching driver details:", error);
        }
    };

    const handleConfirm = async () => {
        if (!validateForm()) return;

        try {
            if (modalType === 'add') {
                const response = await driverCreate(currentDriver, authorization);
                setDrivers([...drivers, response.data.data]);
            } else {
                await driverUpdate(currentDriver.id, currentDriver, authorization);
                setDrivers(drivers.map(driver =>
                    driver.id === currentDriver.id ? currentDriver : driver
                ));
            }
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
        const { name, value } = e.target;
        setCurrentDriver({ ...currentDriver, [name]: value });
    };

    const handleSelectVehicle = (vehicle_id) => {
        setCurrentDriver({ ...currentDriver, vehicle_id });
        setIsSelectVehicleOpen(false);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredDrivers = drivers.filter(driver => {
        const search = searchTerm.toLowerCase();
        return (
            driver.name.toLowerCase().includes(search) ||
            driver.email.toLowerCase().includes(search) ||
            driver.license_number.toLowerCase().includes(search) ||
            (driver.vehicle && driver.vehicle.toLowerCase().includes(search)) ||
            (driver.current_delivery && driver.current_delivery.toLowerCase().includes(search))
        );
    });

    const validateForm = () => {
        const errors = {};
        if (!currentDriver.name.trim()) errors.name = "Name is required";
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

            <div className="card mb-4">
                <div className="card-body">
                    <div className="input-group mb-3">
            <span className="input-group-text">
              <i className="bi bi-search"></i>
            </span>
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Search drivers..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>
            </div>

            <div className="card">
                <div className="card-body p-0">
                    <div className="table-responsive" style={{ maxHeight: '500px' }}>
                        <table className="table table-hover table-striped mb-0">
                            <thead className="table-dark sticky-top">
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>License Number</th>
                                <th>Vehicle</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredDrivers.map((driver) => (
                                <tr key={driver.id}>
                                    <td>{driver.name}</td>
                                    <td>{driver.email}</td>
                                    <td>{driver.license_number}</td>
                                    <td>
                                        {driver.vehicle_id && vehiclesMap[driver.vehicle_id]
                                            ? `${vehiclesMap[driver.vehicle_id].model} (${vehiclesMap[driver.vehicle_id].license_plate})`
                                            : "None"}
                                    </td>
                                    <td>
                                        <div className="d-flex gap-2">
                                            <button
                                                className="btn btn-sm btn-warning"
                                                onClick={() => handleUpdateDriver(driver.id)}
                                            >
                                                <i className="bi bi-pencil"></i> Update
                                            </button>
                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() => handleDeleteDriver(driver.id)}
                                            >
                                                <i className="bi bi-trash"></i> Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Add/Edit Driver Modal */}
            {isModalOpen && (
                <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    {modalType === 'add' ? 'Add Driver' : 'Update Driver'}
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setIsModalOpen(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label className="form-label">Name</label>
                                        <input
                                            type="text"
                                            className={`form-control ${formErrors.name ? 'is-invalid' : ''}`}
                                            name="name"
                                            value={currentDriver.name}
                                            onChange={handleInputChange}
                                        />
                                        {formErrors.name && <div className="invalid-feedback">{formErrors.name}</div>}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Email</label>
                                        <input
                                            type="email"
                                            className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
                                            name="email"
                                            value={currentDriver.email}
                                            onChange={handleInputChange}
                                        />
                                        {formErrors.email && <div className="invalid-feedback">{formErrors.email}</div>}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Password</label>
                                        <input
                                            type="password"
                                            className={`form-control ${formErrors.password ? 'is-invalid' : ''}`}
                                            name="password"
                                            value={currentDriver.password}
                                            onChange={handleInputChange}
                                        />
                                        {formErrors.password && <div className="invalid-feedback">{formErrors.password}</div>}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">License Number</label>
                                        <input
                                            type="text"
                                            className={`form-control ${formErrors.license_number ? 'is-invalid' : ''}`}
                                            name="license_number"
                                            value={currentDriver.license_number}
                                            onChange={handleInputChange}
                                        />
                                        {formErrors.license_number && <div className="invalid-feedback">{formErrors.license_number}</div>}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Vehicle</label>
                                        <div
                                            className="form-control d-flex justify-content-between align-items-center"
                                            onClick={() => setIsSelectVehicleOpen(true)}
                                            style={{ cursor: 'pointer' }}
                                        >
                      <span>
                        {currentDriver.vehicle_id && vehiclesMap[currentDriver.vehicle_id]
                            ? `${vehiclesMap[currentDriver.vehicle_id].model} (${vehiclesMap[currentDriver.vehicle_id].license_plate})`
                            : "Choose vehicle..."}
                      </span>
                                            <i className="bi bi-chevron-down"></i>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleConfirm}
                                >
                                    {modalType === 'add' ? 'Confirm' : 'Update'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Vehicle Selection Modal */}
            {isSelectVehicleOpen && (
                <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Select Vehicle</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setIsSelectVehicleOpen(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="list-group">
                                    {vehicles.map((vehicle) => (
                                        <button
                                            key={vehicle.id}
                                            type="button"
                                            className={`list-group-item list-group-item-action ${currentDriver.vehicle_id === vehicle.id ? 'active' : ''}`}
                                            onClick={() => handleSelectVehicle(vehicle.id)}
                                        >
                                            {vehicle.model} ({vehicle.license_plate})
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setIsSelectVehicleOpen(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DriversIndex;