import { format } from "date-fns";

const LogBreaksTable = ({ logBreaks }) => {
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