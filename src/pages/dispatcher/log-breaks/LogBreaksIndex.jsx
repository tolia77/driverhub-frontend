import {useState, useEffect} from "react";
import LogBreaksTable from "src/pages/dispatcher/log-breaks/LogBreaksTable";
import DeliverySelect from "src/components/log-breaks/DeliverySelect.jsx";
import {deliveriesIndexRequest} from "src/services/backend/deliveriesRequests.js";
import {getAccessToken} from "src/utils/auth.js";
import {logBreaksIndexRequest} from "src/services/backend/logBreaksRequests.js";

const LogBreaksIndex = () => {
    const [deliveries, setDeliveries] = useState([]);
    const [selectedDelivery, setSelectedDelivery] = useState(null);
    const [logBreaks, setLogBreaks] = useState([]);

    useEffect(() => {
        deliveriesIndexRequest({}, getAccessToken()).then(res => {
            setDeliveries(res.data);
        });
    }, []);

    useEffect(() => {
        if (selectedDelivery) {
            logBreaksIndexRequest(getAccessToken(), {delivery_id: selectedDelivery.id}).then(res => {
                setLogBreaks(res.data);
            });
        }
    }, [selectedDelivery]);

    return (
        <div className="container-fluid py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="mb-0">Log Breaks Management</h1>

            </div>

            <DeliverySelect
                deliveries={deliveries}
                selectedDelivery={selectedDelivery}
                onSelect={setSelectedDelivery}
            />

            {selectedDelivery && (
                <LogBreaksTable
                    logBreaks={logBreaks}
                />
            )}
        </div>
    );
};

export default LogBreaksIndex;