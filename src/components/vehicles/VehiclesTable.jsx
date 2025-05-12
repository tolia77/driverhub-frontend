const VehiclesTable = ({ vehicles, onUpdate, onDelete }) => {
    return (
        <div className="card">
            <div className="card-body p-0">
                <div className="table-responsive" style={{ maxHeight: '500px' }}>
                    <table className="table table-hover table-striped mb-0">
                        <thead className="table-dark sticky-top">
                        <tr>
                            <th>Модель</th>
                            <th>Номерний знак</th>
                            <th>Вантажопідйомність</th>
                            <th>Пробіг</th>
                            <th>Наступний техогляд</th>
                            <th>Дії</th>
                        </tr>
                        </thead>
                        <tbody>
                        {vehicles.map(vehicle => (
                            <tr key={vehicle.id}>
                                <td>{vehicle.model}</td>
                                <td>{vehicle.license_plate}</td>
                                <td>{vehicle.capacity}</td>
                                <td>{vehicle.mileage}</td>
                                <td>{vehicle.maintenance_due_date || "Не вказано"}</td>
                                <td>
                                    <div className="d-flex gap-2">
                                        <button
                                            className="btn btn-sm btn-warning"
                                            onClick={() => onUpdate(vehicle.id)}
                                        >
                                            <i className="bi bi-pencil"></i> Оновити
                                        </button>
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() => onDelete(vehicle.id)}
                                        >
                                            <i className="bi bi-trash"></i> Видалити
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

export default VehiclesTable;