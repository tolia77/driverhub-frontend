import { format } from "date-fns";

const ReviewsTable = ({ reviews, onEdit, onDelete }) => {
    if (reviews.length === 0) {
        return (
            <div className="alert alert-info">
                You haven't left any reviews yet.
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
                            <th>Delivery ID</th>
                            <th>Rating</th>
                            <th>Review</th>
                            <th>Created At</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {reviews.map((review) => (
                            <tr key={review.id}>
                                <td>{review.delivery_id}</td>
                                <td>
                                        <span className={`badge bg-${review.rating >= 4 ? 'success' : review.rating >= 3 ? 'warning' : 'danger'}`}>
                                            {review.rating} ★
                                        </span>
                                </td>
                                <td>{review.text || '-'}</td>
                                <td>{format(new Date(review.created_at), "yyyy-MM-dd HH:mm")}</td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-warning me-2"
                                        onClick={() => onEdit(review)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() => onDelete(review.id)}
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

export default ReviewsTable;