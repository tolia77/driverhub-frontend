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
                            {modalType === 'add' ? 'Add Driver' : 'Update Driver'}
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
                                    <label className="form-label">First Name</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                        name="firstName"
                                        value={driver.firstName}
                                        onChange={onInputChange}
                                    />
                                    {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Last Name</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                        name="lastName"
                                        value={driver.lastName}
                                        onChange={onInputChange}
                                    />
                                    {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
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
                                    <label className="form-label">Password</label>
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
                                <label className="form-label">License Number</label>
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
                                <label className="form-label">Vehicle</label>
                                <div
                                    className="form-control d-flex justify-content-between align-items-center"
                                    onClick={onSelectVehicle}
                                    style={{ cursor: 'pointer' }}
                                >
                  <span>
                    {driver.vehicle_id && vehiclesMap[driver.vehicle_id]
                        ? `${vehiclesMap[driver.vehicle_id].model} (${vehiclesMap[driver.vehicle_id].license_plate})`
                        : "Choose vehicle..."}
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
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={onConfirm}
                        >
                            {modalType === 'add' ? 'Confirm' : 'Update'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DriverModal;