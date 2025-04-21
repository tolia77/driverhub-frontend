import { format } from "date-fns";
import { useEffect, useState } from "react";
import {
    logBreaksDelete,
    logBreaksMy,
    logBreaksUpdate
} from "src/services/backend/logBreaksRequests.js";
import LogBreaksTable from "src/pages/driver/log-breaks/LogBreaksTable";

const LogBreaksIndexDriver = () => {
    const [logBreaks, setLogBreaks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentLogBreak, setCurrentLogBreak] = useState(null);
    const [formData, setFormData] = useState({
        location: "",
        start_time: "",
        end_time: "",
        cost: ""
    });

    useEffect(() => {
        fetchLogBreaks();
    }, []);

    const fetchLogBreaks = () => {
        logBreaksMy(localStorage.getItem("accessToken"))
            .then(res => setLogBreaks(res.data.data.log_breaks))
            .catch(err => console.error("Error fetching log breaks:", err));
    };

    const openUpdateModal = (logBreak) => {
        setCurrentLogBreak(logBreak);
        setFormData({
            location: logBreak.location,
            start_time: format(new Date(logBreak.start_time), "yyyy-MM-dd'T'HH:mm"),
            end_time: format(new Date(logBreak.end_time), "yyyy-MM-dd'T'HH:mm"),
            cost: logBreak.cost
        });
        setIsModalOpen(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleUpdateLogBreak = () => {
        if (!validateForm()) return;

        const updatedData = {
            location: formData.location,
            start_time: new Date(formData.start_time).toISOString(),
            end_time: new Date(formData.end_time).toISOString(),
            cost: parseFloat(formData.cost)
        };

        logBreaksUpdate(currentLogBreak.id, updatedData, localStorage.getItem("accessToken"))
            .then(() => {
                fetchLogBreaks();
                setIsModalOpen(false);
            })
            .catch(error => {
                console.error("Error updating log break:", error);
                alert("Failed to update log break. Please try again.");
            });
    };

    const handleDeleteLogBreak = (logBreakId) => {
        if (window.confirm("Are you sure you want to delete this log break?")) {
            logBreaksDelete(logBreakId, localStorage.getItem("accessToken"))
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
            <LogBreaksTable
                logBreaks={logBreaks}
                onEdit={openUpdateModal}
                onDelete={handleDeleteLogBreak}
            />

            {isModalOpen && (
                <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Update Log Break</h5>
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
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Cost</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        className="form-control"
                                        name="cost"
                                        value={formData.cost}
                                        onChange={handleInputChange}
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
                                    onClick={handleUpdateLogBreak}
                                >
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LogBreaksIndexDriver;
