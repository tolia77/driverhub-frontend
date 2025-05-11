import { format } from "date-fns";

const LogBreaksTable = ({ logBreaks, onEdit, onDelete }) => {
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
                            <th>Дії</th>
                        </tr>
                        </thead>
                        <tbody>
                        {logBreaks.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center py-4">
                                    No log breaks found
                                </td>
                            </tr>
                        ) : (
                            logBreaks.map((logBreak) => (
                                <tr key={logBreak.id}>
                                    <td>{logBreak.id}</td>
                                    <td>{logBreak.location.address || `${logBreak.location.latitude}, ${logBreak.location.longitude}`}</td>
                                    <td>{format(new Date(logBreak.start_time), "yyyy-MM-dd HH:mm")}</td>
                                    <td>{format(new Date(logBreak.end_time), "yyyy-MM-dd HH:mm")}</td>
                                    <td>${logBreak.cost.toFixed(2)}</td>
                                    <td>
                                        <div className="d-flex gap-2">
                                            <button
                                                className="btn btn-sm btn-warning"
                                                onClick={() => onEdit(logBreak)}
                                            >
                                                <i className="bi bi-pencil"></i> Редагувати
                                            </button>
                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() => onDelete(logBreak.id)}
                                            >
                                                <i className="bi bi-trash"></i> Видалити
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default LogBreaksTable;
