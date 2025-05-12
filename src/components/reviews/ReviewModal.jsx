import {useState, useEffect} from "react";

const ReviewModal = ({
                         isOpen,
                         onClose,
                         onSubmit,
                         isLoading,
                         initialData = {text: "", rating: 5},
                         isEdit = false
                     }) => {
    const [reviewData, setReviewData] = useState(initialData);

    useEffect(() => {
        if (isOpen) {
            setReviewData(initialData);
        }
    }, [isOpen, initialData]);

    const handleRatingChange = (rating) => {
        setReviewData(prev => ({...prev, rating}));
    };

    const handleTextChange = (e) => {
        setReviewData(prev => ({...prev, text: e.target.value}));
    };

    const handleSubmit = () => {
        onSubmit(reviewData);
    };

    if (!isOpen) return null;

    return (
        <div className="modal fade show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{isEdit ? 'Редагувати відгук' : 'Залишити відгук'}</h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                            disabled={isLoading}
                        ></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label className="form-label">Оцінка</label>
                            <div className="rating-stars">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <i
                                        key={star}
                                        className={`bi ${star <= reviewData.rating ? 'bi-star-fill text-warning' : 'bi-star'}`}
                                        style={{fontSize: '2rem', cursor: 'pointer'}}
                                        onClick={() => handleRatingChange(star)}
                                    ></i>
                                ))}
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Відгук</label>
                            <textarea
                                className="form-control"
                                rows="4"
                                value={reviewData.text}
                                onChange={handleTextChange}
                                placeholder="Write your review here..."
                                disabled={isLoading}
                            ></textarea>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onClose}
                            disabled={isLoading}
                        >
                            Скасувати
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleSubmit}
                            disabled={isLoading || !reviewData.text.trim()}
                        >
                            {isLoading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-1" role="status"
                                          aria-hidden="true"></span>
                                    {isEdit ? 'Оновлення...' : 'Підтвердження...'}
                                </>
                            ) : (
                                isEdit ? 'Оновити' : 'Підтвердити'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewModal;