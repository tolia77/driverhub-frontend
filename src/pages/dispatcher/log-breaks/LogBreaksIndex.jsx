import { useState, useEffect } from "react";
import LogBreaksTable from "src/pages/dispatcher/log-breaks/LogBreaksTable";
import LogBreakModal from "src/pages/dispatcher/log-breaks/LogBreakModal";
import DriverSelect from "src/pages/dispatcher/log-breaks/DriverSelect";

const LogBreaksIndex = () => {
    const [drivers, setDrivers] = useState([]);
    const [selectedDriver, setSelectedDriver] = useState(null);
    const [logBreaks, setLogBreaks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentLogBreak, setCurrentLogBreak] = useState(null);

    // Initialize with mock data (replace with actual API calls)
    useEffect(() => {
        setDrivers([
            { id: '1', name: 'John Doe' },
            { id: '2', name: 'Jane Smith' },
            { id: '3', name: 'Bob Johnson' }
        ]);
    }, []);

    // Load log breaks for selected driver
    useEffect(() => {
        if (selectedDriver) {
            getLogBreaksForDriver(selectedDriver)
                .then((res) => {
                    setLogBreaks(res.data);
                })
                .catch((err) => {
                    console.error(err);
                    alert("Error fetching log breaks");
                });
        }
    }, [selectedDriver]);

    const getLogBreaksForDriver = (driverId) => {
        return new Promise((resolve) => {
            resolve({
                data: [
                    {
                        id: '1',
                        location: 'City A',
                        start_time: '2025-02-10T08:00',
                        end_time: '2025-02-10T10:00',
                        cost: 15.5,
                        driver_id: driverId
                    },
                    {
                        id: '2',
                        location: 'City B',
                        start_time: '2025-02-11T09:00',
                        end_time: '2025-02-11T11:00',
                        cost: 20.0,
                        driver_id: driverId
                    },
                ]
            });
        });
    };

    const handleSelectDriver = (driverId) => {
        setSelectedDriver(driverId);
    };

    const handleOpenModal = (logBreak = null) => {
        setCurrentLogBreak(logBreak || {
            id: '',
            location: '',
            start_time: new Date().toISOString(),
            end_time: new Date().toISOString(),
            cost: 0,
            driver_id: selectedDriver
        });
        setIsModalOpen(true);
    };

    const handleSaveLogBreak = (updatedLogBreak) => {
        if (updatedLogBreak.id) {
            // Update existing
            setLogBreaks(logBreaks.map(logBreak =>
                logBreak.id === updatedLogBreak.id ? updatedLogBreak : logBreak
            ));
        } else {
            // Add new
            setLogBreaks([...logBreaks, {
                ...updatedLogBreak,
                id: `${logBreaks.length + 1}`
            }]);
        }
        setIsModalOpen(false);
    };

    const handleDeleteLogBreak = (logBreakId) => {
        if (window.confirm("Are you sure you want to delete this log break?")) {
            setLogBreaks(logBreaks.filter(logBreak => logBreak.id !== logBreakId));
        }
    };

    return (
        <div className="container-fluid py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="mb-0">Log Breaks Management</h1>
                {selectedDriver && (
                    <button
                        className="btn btn-success"
                        onClick={() => handleOpenModal()}
                    >
                        <i className="bi bi-plus-circle me-2"></i>Add Break
                    </button>
                )}
            </div>

            <DriverSelect
                drivers={drivers}
                selectedDriver={selectedDriver}
                onSelect={handleSelectDriver}
            />

            {selectedDriver && (
                <LogBreaksTable
                    logBreaks={logBreaks}
                    onEdit={handleOpenModal}
                    onDelete={handleDeleteLogBreak}
                />
            )}

            <LogBreakModal
                isOpen={isModalOpen}
                logBreak={currentLogBreak}
                onSave={handleSaveLogBreak}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
};

export default LogBreaksIndex;