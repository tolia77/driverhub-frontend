import { useEffect, useState } from "react";
import {
    logBreaksCreateRequest,
    logBreaksDeleteRequest,
    logBreaksIndexRequest,
    logBreaksUpdateRequest
} from "src/services/backend/logBreaksRequests.js";
import LogBreaksTable from "src/pages/admin/log-breaks/LogBreaksTable";
import DeliverySelect from "src/components/log-breaks/DeliverySelect.jsx";
import { deliveriesIndexRequest } from "src/services/backend/deliveriesRequests.js";
import { getAccessToken } from "src/utils/auth.js";
import LogBreakModal from "src/components/log-breaks/LogBreakModal.jsx";

const LogBreaksIndexAdmin = () => {
    const [deliveries, setDeliveries] = useState([]);
    const [selectedDelivery, setSelectedDelivery] = useState(null);
    const [logBreaks, setLogBreaks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentLogBreak, setCurrentLogBreak] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchDeliveries();
    }, []);

    useEffect(() => {
        if (selectedDelivery) {
            fetchLogBreaks();
        }
    }, [selectedDelivery]);

    const fetchDeliveries = () => {
        deliveriesIndexRequest({}, getAccessToken())
            .then(res => setDeliveries(res.data))
            .catch(err => console.error("Error fetching deliveries:", err));
    };

    const fetchLogBreaks = () => {
        logBreaksIndexRequest(getAccessToken(), { delivery_id: selectedDelivery.id })
            .then(res => setLogBreaks(res.data))
            .catch(err => console.error("Error fetching log breaks:", err));
    };

    const openCreateModal = () => {
        setCurrentLogBreak(null);
        setIsEditing(false);
        setIsModalOpen(true);
    };

    const openUpdateModal = (logBreak) => {
        setCurrentLogBreak(logBreak);
        setIsEditing(true);
        setIsModalOpen(true);
    };

    const handleSubmitLogBreak = (logBreakData) => {
        const submitData = {
            ...logBreakData,
            delivery_id: selectedDelivery.id
        };

        const request = isEditing
            ? logBreaksUpdateRequest(currentLogBreak.id, submitData, getAccessToken())
            : logBreaksCreateRequest(submitData, getAccessToken());

        request
            .then(() => {
                fetchLogBreaks();
                setIsModalOpen(false);
            })
            .catch(error => {
                console.error("Error saving log break:", error);
                alert("Помилка при збереженні.");
            });
    };

    const handleDeleteLogBreak = (logBreakId) => {
        if (window.confirm("Ви справді хочете видалити цей запис?")) {
            logBreaksDeleteRequest(logBreakId, getAccessToken())
                .then(() => fetchLogBreaks())
                .catch(err => console.error("Error deleting log break:", err));
        }
    };

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="mb-0">Керування записами про зупинки</h1>
                {selectedDelivery && (
                    <button
                        className="btn btn-primary"
                        onClick={openCreateModal}
                    >
                        Додати запис про перерву
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
                    onEdit={openUpdateModal}
                    onDelete={handleDeleteLogBreak}
                    isAdmin={true}
                />
            )}

            <LogBreakModal
                isOpen={isModalOpen}
                onSubmit={handleSubmitLogBreak}
                onClose={() => setIsModalOpen(false)}
                initialData={currentLogBreak}
            />
        </div>
    );
};

export default LogBreaksIndexAdmin;