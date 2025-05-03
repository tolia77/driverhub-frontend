import { format } from "date-fns";
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

const LogBreaksIndexAdmin = () => {
    const [deliveries, setDeliveries] = useState([]);
    const [selectedDelivery, setSelectedDelivery] = useState(null);
    const [logBreaks, setLogBreaks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentLogBreak, setCurrentLogBreak] = useState(null);
    const [formData, setFormData] = useState({
        location: "",
        start_time: "",
        end_time: "",
        cost: "",
        delivery_id: ""
    });
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
        setFormData({
            location: "",
            start_time: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
            end_time: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
            cost: "0",
            delivery_id: selectedDelivery.id
        });
        setIsModalOpen(true);
    };

    const openUpdateModal = (logBreak) => {
        setCurrentLogBreak(logBreak);
        setIsEditing(true);
        setFormData({
            location: logBreak.location,
            start_time: format(new Date(logBreak.start_time), "yyyy-MM-dd'T'HH:mm"),
            end_time: format(new Date(logBreak.end_time), "yyyy-MM-dd'T'HH:mm"),
            cost: logBreak.cost.toString(),
            delivery_id: logBreak.delivery_id
        });
        setIsModalOpen(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmitLogBreak = () => {
        if (!validateForm()) return;

        const submitData = {
            location: formData.location,
            start_time: new Date(formData.start_time).toISOString(),
            end_time: new Date(formData.end_time).toISOString(),
            cost: parseFloat(formData.cost),
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
                alert("Failed to save log break. Please try again.");
            });
    };

    const handleDeleteLogBreak = (logBreakId) => {
        if (window.confirm("Are you sure you want to delete this log break?")) {
            logBreaksDeleteRequest(logBreakId, getAccessToken())
                .then(() => fetchLogBreaks())
                .catch(err => console.error("Error deleting log break:", err));
        }
    };

    const validateForm = () => {
        if (!formData.location.trim()) {
            alert("Location is required");
            return false;
        }
        if (!formData.start_time || !formData.end_time) {
            alert("Both start and end times are required");
            return false;
        }
        if (new Date(formData.end_time) <= new Date(formData.start_time)) {
            alert("End time must be after start time");
            return false;
        }
        if (isNaN(parseFloat(formData.cost)) || parseFloat(formData.cost) < 0) {
            alert("Cost must be a positive number");
            return false;
        }
        return true;
    };

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="mb-0">Admin Log Breaks Management</h1>
                {selectedDelivery && (
                    <button
                        className="btn btn-primary"
                        onClick={openCreateModal}
                    >
                        Add New Log Break
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

            {isModalOpen && (
                <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    {isEditing ? "Update" : "Create"} Log Break
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setIsModalOpen(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">Location</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Start Time</label>
                                    <input
                                        type="datetime-local"
                                        className="form-control"
                                        name="start_time"
                                        value={formData.start_time}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">End Time</label>
                                    <input
                                        type="datetime-local"
                                        className="form-control"
                                        name="end_time"
                                        value={formData.end_time}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Cost</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        className="form-control"
                                        name="cost"
                                        value={formData.cost}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="btn btn-primary"
                                    onClick={handleSubmitLogBreak}
                                >
                                    {isEditing ? "Update" : "Create"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LogBreaksIndexAdmin;