import { format } from "date-fns";

const LogBreaksTable = ({ logBreaks, onDelete, onEdit, isAdmin = false }) => {
    if (logBreaks.length === 0) {
        return (
            <div className="alert alert-info">
                No log breaks found for this delivery.
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
                            <th>Адреса</th>
                            <th>Час початку</th>
                            <th>Час завершення</th>
                            <th>Вартість</th>
                            {isAdmin && <th>Дії</th>}
                        </tr>
                        </thead>
                        <tbody>
                        {logBreaks.map((logBreak) => (
                            <tr key={logBreak.id}>
                                <td>{logBreak.id}</td>
                                <td>{logBreak.location.address || `${logBreak.location.latitude}, ${logBreak.location.longitude}`}</td>
                                <td>{format(new Date(logBreak.start_time), "yyyy-MM-dd HH:mm")}</td>
                                <td>{format(new Date(logBreak.end_time), "yyyy-MM-dd HH:mm")}</td>
                                <td>${logBreak.cost.toFixed(2)}</td>
                                {isAdmin && (
                                    <td>
                                        <button
                                            className="btn btn-sm btn-warning me-2"
                                            onClick={() => onEdit(logBreak)}
                                        >
                                            Редагувати
                                        </button>
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() => onDelete(logBreak.id)}
                                        >
                                            Видалити
                                        </button>
                                    </td>
                                )}
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