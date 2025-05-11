const ReviewFormModal = ({
                             show,
                             onHide,
                             onSubmit,
                             formData,
                             onChange,
                             isEditing
                         }) => {
    return (
        <div className={`modal fade ${show ? 'show' : ''}`}
             style={{ display: show ? 'block' : 'none', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            {isEditing ? "Оновити" : "Create"} Відгук
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={onHide}
                        ></button>
                    </div>
                    <div className="modal-body">
                        {!isEditing && (
                            <div className="mb-3">
                                <label className="form-label">ID Доставки</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="delivery_id"
                                    value={formData.delivery_id || ''}
                                    onChange={onChange}
                                    required
                                    disabled={isEditing}
                                    min="1"
                                />
                            </div>
                        )}
                        <div className="mb-3">
                            <label className="form-label">Rating (1-5)</label>
                            <select
                                className="form-select"
                                name="rating"
                                value={formData.rating}
                                onChange={onChange}
                                required
                            >
                                <option value="">Оберіть оцінку</option>
                                {[1, 2, 3, 4, 5].map(num => (
                                    <option key={num} value={num}>
                                        {num} ★
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Текст відгуку</label>
                            <textarea
                                className="form-control"
                                name="text"
                                value={formData.text || ''}
                                onChange={onChange}
                                rows="3"
                            />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            className="btn btn-secondary"
                            onClick={onHide}
                        >
                            Скасувати
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={onSubmit}
                        >
                            {isEditing ? "Оновити" : "Create"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewFormModal;