const DriverModal = ({
                         isOpen,
                         modalType,
                         driver,
                         errors,
                         vehiclesMap,
                         onInputChange,
                         onSelectVehicle,
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
                            {modalType === 'add' ? 'Додати водія' : 'Оновити водія'}
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                        ></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Ім'я</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.first_name ? 'is-invalid' : ''}`}
                                        name="first_name"
                                        value={driver.first_name}
                                        onChange={onInputChange}
                                    />
                                    {errors.first_name && <div className="invalid-feedback">{errors.first_name}</div>}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Прізвище</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.last_name ? 'is-invalid' : ''}`}
                                        name="last_name"
                                        value={driver.last_name}
                                        onChange={onInputChange}
                                    />
                                    {errors.last_name && <div className="invalid-feedback">{errors.last_name}</div>}
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    name="email"
                                    value={driver.email}
                                    onChange={onInputChange}
                                />
                                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                            </div>
                            {modalType === 'add' && (
                                <div className="mb-3">
                                    <label className="form-label">Пароль</label>
                                    <input
                                        type="password"
                                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                        name="password"
                                        value={driver.password || ''}
                                        onChange={onInputChange}
                                    />
                                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                                </div>
                            )}
                            <div className="mb-3">
                                <label className="form-label">Номер водійського посвідчення</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.license_number ? 'is-invalid' : ''}`}
                                    name="license_number"
                                    value={driver.license_number}
                                    onChange={onInputChange}
                                />
                                {errors.license_number && <div className="invalid-feedback">{errors.license_number}</div>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Транспортний засіб</label>
                                <div
                                    className="form-control d-flex justify-content-between align-items-center"
                                    onClick={onSelectVehicle}
                                    style={{ cursor: 'pointer' }}
                                >
                  <span>
                    {driver.vehicle_id && vehiclesMap[driver.vehicle_id]
                        ? `${vehiclesMap[driver.vehicle_id].model} (${vehiclesMap[driver.vehicle_id].license_plate})`
                        : "Обрати транспортний засіб..."}
                  </span>
                                    <i className="bi bi-chevron-down"></i>
                                </div>
                            </div>
                        </form>
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
                            {modalType === 'add' ? 'Додати' : 'Оновити'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DriverModal;