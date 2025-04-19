const DeliveryModal = ({
                           isOpen,
                           modalType,
                           delivery,
                           errors,
                           onInputChange,
                           onClose,
                           onConfirm
                       }) => {
    if (!isOpen) return null;

    return (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            {modalType === 'add' ? 'Add Delivery' : 'Update Delivery'}
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
                                    <label className="form-label">Driver ID</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.driver_id ? 'is-invalid' : ''}`}
                                        name="driver_id"
                                        value={delivery.driver_id}
                                        onChange={onInputChange}
                                    />
                                    {errors.driver_id && <div className="invalid-feedback">{errors.driver_id}</div>}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Status</label>
                                    <select
                                        className={`form-control ${errors.status ? 'is-invalid' : ''}`}
                                        name="status"
                                        value={delivery.status}
                                        onChange={onInputChange}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Delivered">Delivered</option>
                                    </select>
                                    {errors.status && <div className="invalid-feedback">{errors.status}</div>}
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Pickup Location</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.pickup_location ? 'is-invalid' : ''}`}
                                        name="pickup_location"
                                        value={delivery.pickup_location}
                                        onChange={onInputChange}
                                    />
                                    {errors.pickup_location && <div className="invalid-feedback">{errors.pickup_location}</div>}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Dropoff Location</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.dropoff_location ? 'is-invalid' : ''}`}
                                        name="dropoff_location"
                                        value={delivery.dropoff_location}
                                        onChange={onInputChange}
                                    />
                                    {errors.dropoff_location && <div className="invalid-feedback">{errors.dropoff_location}</div>}
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Delivery Window</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.delivery_window ? 'is-invalid' : ''}`}
                                        name="delivery_window"
                                        value={delivery.delivery_window}
                                        onChange={onInputChange}
                                    />
                                    {errors.delivery_window && <div className="invalid-feedback">{errors.delivery_window}</div>}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Created At</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="created_at"
                                        value={delivery.created_at}
                                        onChange={onInputChange}
                                        disabled
                                    />
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Package Details</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.package_details ? 'is-invalid' : ''}`}
                                    name="package_details"
                                    value={delivery.package_details}
                                    onChange={onInputChange}
                                />
                                {errors.package_details && <div className="invalid-feedback">{errors.package_details}</div>}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Delivery Notes</label>
                                <textarea
                                    className="form-control"
                                    name="delivery_notes"
                                    value={delivery.delivery_notes}
                                    onChange={onInputChange}
                                    rows="3"
                                />
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
                            {modalType === 'add' ? 'Add' : 'Update'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeliveryModal;