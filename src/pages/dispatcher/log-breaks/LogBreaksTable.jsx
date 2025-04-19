import { format } from "date-fns";

const LogBreaksTable = ({ logBreaks, onEdit, onDelete }) => {
    if (logBreaks.length === 0) {
        return (
            <div className="alert alert-info">
                No log breaks found for this driver.
            </div>
        );
    }

    return (
        <div className="card">
            <div className="card-body p-0">
                <div className="table-responsive" style={{ maxHeight: '500px' }}>
                    <table className="table table-hover table-striped mb-0">
                        <thead className="table-dark sticky-top">
                        <tr>
                            <th>ID</th>
                            <th>Location</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Cost</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {logBreaks.map((logBreak) => (
                            <tr key={logBreak.id}>
                                <td>{logBreak.id}</td>
                                <td>{logBreak.location}</td>
                                <td>{format(new Date(logBreak.start_time), "yyyy-MM-dd HH:mm")}</td>
                                <td>{format(new Date(logBreak.end_time), "yyyy-MM-dd HH:mm")}</td>
                                <td>${logBreak.cost.toFixed(2)}</td>
                                <td>
                                    <div className="d-flex gap-2">
                                        <button
                                            className="btn btn-sm btn-warning"
                                            onClick={() => onEdit(logBreak)}
                                        >
                                            <i className="bi bi-pencil"></i> Edit
                                        </button>
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() => onDelete(logBreak.id)}
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
    );
};

export default LogBreaksTable;