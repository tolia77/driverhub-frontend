import { format } from "date-fns";

const DispatchersTable = ({ dispatchers, onEdit, onDelete }) => {
    if (dispatchers.length === 0) {
        return (
            <div className="alert alert-info">
                No dispatchers found.
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
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Created At</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {dispatchers.map((dispatcher) => (
                            <tr key={dispatcher.id}>
                                <td>{dispatcher.id}</td>
                                <td>{dispatcher.email}</td>
                                <td>{dispatcher.first_name}</td>
                                <td>{dispatcher.last_name}</td>
                                <td>{format(new Date(dispatcher.created_at), "yyyy-MM-dd HH:mm")}</td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-warning me-2"
                                        onClick={() => onEdit(dispatcher)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() => onDelete(dispatcher.id)}
                                    >
                                        Delete
                                    </button>
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

export default DispatchersTable;