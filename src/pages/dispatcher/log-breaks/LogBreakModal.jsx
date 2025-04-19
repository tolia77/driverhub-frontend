import { useState, useEffect } from "react";
import { format, parseISO } from "date-fns";

const LogBreakModal = ({ isOpen, logBreak, onSave, onClose }) => {
    const [location, setLocation] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [cost, setCost] = useState(0);

    useEffect(() => {
        if (logBreak) {
            setLocation(logBreak.location);
            setStartTime(format(parseISO(logBreak.start_time), "yyyy-MM-dd'T'HH:mm"));
            setEndTime(format(parseISO(logBreak.end_time), "yyyy-MM-dd'T'HH:mm"));
            setCost(logBreak.cost);
        }
    }, [logBreak]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            ...logBreak,
            location,
            start_time: new Date(startTime).toISOString(),
            end_time: new Date(endTime).toISOString(),
            cost: parseFloat(cost)
        });
    };

    if (!isOpen) return null;

    return (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            {logBreak.id ? 'Edit Break' : 'Add Break'}
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                        ></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Location</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Start Time</label>
                                <input
                                    type="datetime-local"
                                    className="form-control"
                                    value={startTime}
                                    onChange={(e) => setStartTime(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">End Time</label>
                                <input
                                    type="datetime-local"
                                    className="form-control"
                                    value={endTime}
                                    onChange={(e) => setEndTime(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Cost</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    className="form-control"
                                    value={cost}
                                    onChange={(e) => setCost(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={onClose}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    {logBreak.id ? 'Update' : 'Add'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogBreakModal;