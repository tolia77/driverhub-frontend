import { format } from "date-fns";

const LogBreaksTable = ({ logBreaks }) => {
    if (logBreaks.length === 0) {
        return (
            <div className="alert alert-info">
                Не знайдено жодного запису про перерву.
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
                            <th>Адреса</th>
                            <th>Час початку</th>
                            <th>Час завершення</th>
                            <th>Вартість</th>
                        </tr>
                        </thead>
                        <tbody>
                        {logBreaks.map((logBreak) => (
                            <tr key={logBreak.id}>
                                <td>{logBreak.location.address || `${logBreak.location.latitude}, ${logBreak.location.longitude}`}</td>
                                <td>{format(new Date(logBreak.start_time), "yyyy-MM-dd HH:mm")}</td>
                                <td>{format(new Date(logBreak.end_time), "yyyy-MM-dd HH:mm")}</td>
                                <td>${logBreak.cost.toFixed(2)}</td>
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