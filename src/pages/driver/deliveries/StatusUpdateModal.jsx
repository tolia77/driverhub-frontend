const StatusUpdateModal = ({ isOpen, currentStatus, onStatusChange, onConfirm, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Оновити статус доставки</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <select
                            className="form-select"
                            value={currentStatus}
                            onChange={(e) => onStatusChange(e.target.value)}
                        >
                            <option value="Pending">Очікує</option>
                            <option value="In-Transit">В процесі</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Failed">Невдала</option>
                        </select>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onClose}
                        >
                            Скасувати
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={onConfirm}
                        >
                            Оновити
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatusUpdateModal;