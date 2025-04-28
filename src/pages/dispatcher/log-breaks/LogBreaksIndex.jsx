import {useState, useEffect} from "react";
import LogBreaksTable from "src/pages/dispatcher/log-breaks/LogBreaksTable";
import LogBreakModal from "src/pages/dispatcher/log-breaks/LogBreakModal";
import DeliverySelect from "src/pages/dispatcher/log-breaks/DeliverySelect.jsx";
import {deliveriesIndex} from "src/services/backend/deliveriesRequests.js";
import {getAccessToken} from "src/utils/auth.js";
import {logBreaksIndex} from "src/services/backend/logBreaksRequests.js";

const LogBreaksIndex = () => {
    const [deliveries, setDeliveries] = useState([]);
    const [selectedDelivery, setSelectedDelivery] = useState(null);
    const [logBreaks, setLogBreaks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentLogBreak, setCurrentLogBreak] = useState(null);

    useEffect(() => {
        deliveriesIndex({}, getAccessToken()).then(res => {
            setDeliveries(res.data);
        });
    }, []);

    useEffect(() => {
        if (selectedDelivery) {
            logBreaksIndex(getAccessToken(), { delivery_id: selectedDelivery.id }).then(res => {
                setLogBreaks(res.data);
            });
        }
    }, [selectedDelivery]);

    const handleOpenModal = (logBreak = null) => {
        setCurrentLogBreak(logBreak || {
            id: '',
            location: '',
            start_time: new Date().toISOString(),
            end_time: new Date().toISOString(),
            cost: 0,
            driver_id: selectedDelivery
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
                {selectedDelivery && (
                    <button
                        className="btn btn-success"
                        onClick={() => handleOpenModal()}
                    >
                        <i className="bi bi-plus-circle me-2"></i>Add Break
                    </button>
                )}
            </div>

            <DeliverySelect
                deliveries={deliveries}
                selectedDelivery={selectedDelivery}
                onSelect={setSelectedDelivery}
            />

            {selectedDelivery && (
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