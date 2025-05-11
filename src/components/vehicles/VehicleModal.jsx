const VehicleModal = ({
                          isOpen,
                          modalType,
                          vehicle,
                          errors,
                          onInputChange,
                          onClose,
                          onConfirm
                      }) => {
    if (!isOpen) return null;

    return (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            {modalType === 'add' ? 'Додати Транспортний засіб' : 'Оновити Транспортний засіб'}
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                        ></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label className="form-label">Модель</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.model ? 'is-invalid' : ''}`}
                                    name="model"
                                    value={vehicle.model}
                                    onChange={onInputChange}
                                />
                                {errors.model && <div className="invalid-feedback">{errors.model}</div>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Номерний знак</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.license_plate ? 'is-invalid' : ''}`}
                                    name="license_plate"
                                    value={vehicle.license_plate}
                                    onChange={onInputChange}
                                />
                                {errors.license_plate && <div className="invalid-feedback">{errors.license_plate}</div>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Вантажопідйомність</label>
                                <input
                                    type="number"
                                    className={`form-control ${errors.capacity ? 'is-invalid' : ''}`}
                                    name="capacity"
                                    value={vehicle.capacity}
                                    onChange={onInputChange}
                                />
                                {errors.capacity && <div className="invalid-feedback">{errors.capacity}</div>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Пробіг</label>
                                <input
                                    type="number"
                                    className={`form-control ${errors.mileage ? 'is-invalid' : ''}`}
                                    name="mileage"
                                    value={vehicle.mileage}
                                    onChange={onInputChange}
                                />
                                {errors.mileage && <div className="invalid-feedback">{errors.mileage}</div>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Наступний техогляд</label>
                                <input
                                    type="date"
                                    className={`form-control ${errors.maintenance_due_date ? 'is-invalid' : ''}`}
                                    name="maintenance_due_date"
                                    value={vehicle.maintenance_due_date}
                                    onChange={onInputChange}
                                />
                                {errors.maintenance_due_date && <div className="invalid-feedback">{errors.maintenance_due_date}</div>}
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={onConfirm}
                        >
                            {modalType === 'add' ? 'Додати' : 'Оновити'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VehicleModal;