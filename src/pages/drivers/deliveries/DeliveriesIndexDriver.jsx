import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getMyDeliveries, updateDeliveryStatus } from "src/services/backend/deliveriesRequests";
import { logBreaksCreate } from "src/services/backend/logBreaksRequests";
import DeliveriesTable from "src/pages/drivers/deliveries/DeliveriesTable";
import StatusUpdateModal from "src/pages/drivers/deliveries/StatusUpdateModal";
import LogBreakModal from "src/pages/drivers/deliveries/LogBreakModal";

const DeliveriesIndexDriver = () => {
    const navigate = useNavigate();
    const [deliveries, setDeliveries] = useState([]);
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
    const [isLogBreakModalOpen, setIsLogBreakModalOpen] = useState(false);
    const [currentDelivery, setCurrentDelivery] = useState(null);
    const [newStatus, setNewStatus] = useState("");

    // Redirect if not driver
    useEffect(() => {
        if (localStorage.getItem("accountType") !== "driver") {
            navigate("/");
        }
    }, [navigate]);

    // Fetch deliveries
    useEffect(() => {
        const fetchDeliveries = async () => {
            try {
                const response = await getMyDeliveries(localStorage.getItem("accessToken"));
                setDeliveries(response.data.data.deliveries);
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
            await updateDeliveryStatus(
                currentDelivery.id,
                newStatus,
                localStorage.getItem("accessToken")
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
            await logBreaksCreate(
                {
                    ...logBreakData,
                    delivery_id: currentDelivery.id
                },
                localStorage.getItem("accessToken")
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
                <h1 className="mb-0">My Deliveries</h1>
            </div>

            <DeliveriesTable
                deliveries={deliveries}
                onUpdateStatus={openStatusModal}
                onLogBreak={openLogBreakModal}
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