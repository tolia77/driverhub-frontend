import { useEffect, useState } from "react";
import { deliveriesMyDriverRequest, deliveriesUpdateStatusRequest } from "src/services/backend/deliveriesRequests";
import { logBreaksCreateRequest } from "src/services/backend/logBreaksRequests";
import DeliveriesTable from "src/components/deliveries/DeliveriesTable";
import StatusUpdateModal from "src/pages/driver/deliveries/StatusUpdateModal";
import LogBreakModal from "src/components/log-breaks/LogBreakModal.jsx";
import { getAccessToken } from "src/utils/auth.js";

const DeliveriesIndexDriver = () => {
    const [deliveries, setDeliveries] = useState([]);
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
    const [isLogBreakModalOpen, setIsLogBreakModalOpen] = useState(false);
    const [currentDelivery, setCurrentDelivery] = useState(null);
    const [newStatus, setNewStatus] = useState("");

    useEffect(() => {
        const fetchDeliveries = async () => {
            try {
                const response = await deliveriesMyDriverRequest(getAccessToken());
                setDeliveries(response.data);
            } catch (err) {
                console.error("Error fetching deliveries:", err);
                alert("Error fetching deliveries");
            }
        };

        fetchDeliveries();
    }, []);

    const openStatusModal = (delivery) => {
        setCurrentDelivery(delivery);
        setNewStatus(delivery.status);
        setIsStatusModalOpen(true);
    };

    const openLogBreakModal = (delivery) => {
        setCurrentDelivery(delivery);
        setIsLogBreakModalOpen(true);
    };

    const handleUpdateStatus = async () => {
        try {
            await deliveriesUpdateStatusRequest(
                currentDelivery.id,
                newStatus,
                getAccessToken()
            );
            setDeliveries(deliveries.map(delivery =>
                delivery.id === currentDelivery.id
                    ? { ...delivery, status: newStatus }
                    : delivery
            ));
            setIsStatusModalOpen(false);
        } catch (err) {
            console.error("Error updating status:", err);
            alert("Error updating status");
        }
    };

    const handleLogBreak = async (logBreakData) => {
        try {
            await logBreaksCreateRequest(
                {
                    ...logBreakData,
                    delivery_id: currentDelivery.id
                },
                getAccessToken()
            );
            setIsLogBreakModalOpen(false);
        } catch (err) {
            console.error("Error logging break:", err);
            alert("Error logging break");
        }
    };

    return (
        <div className="container-fluid py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="mb-0">Мої Доставки</h1>
            </div>

            <DeliveriesTable
                deliveries={deliveries}
                onUpdateStatus={openStatusModal}
                onLogBreak={openLogBreakModal}
                showDriver={false}
                showClient={true}
                showActions={true}
                userRole="driver"
            />

            <StatusUpdateModal
                isOpen={isStatusModalOpen}
                currentStatus={newStatus}
                onStatusChange={setNewStatus}
                onConfirm={handleUpdateStatus}
                onClose={() => setIsStatusModalOpen(false)}
            />

            <LogBreakModal
                isOpen={isLogBreakModalOpen}
                onSubmit={handleLogBreak}
                onClose={() => setIsLogBreakModalOpen(false)}
            />
        </div>
    );
};

export default DeliveriesIndexDriver;