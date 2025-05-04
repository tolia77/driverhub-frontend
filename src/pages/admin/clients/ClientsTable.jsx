import { format } from "date-fns";

const ClientsTable = ({ clients, onEdit, onDelete }) => {
    if (clients.length === 0) {
        return (
            <div className="alert alert-info">
                No clients found.
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
                            <th>Phone</th>
                            <th>Created At</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {clients.map((client) => (
                            <tr key={client.id}>
                                <td>{client.id}</td>
                                <td>{client.email}</td>
                                <td>{client.first_name}</td>
                                <td>{client.last_name}</td>
                                <td>{client.phone_number}</td>
                                <td>{format(new Date(client.created_at), "yyyy-MM-dd HH:mm")}</td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-warning me-2"
                                        onClick={() => onEdit(client)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() => onDelete(client.id)}
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

export default ClientsTable;