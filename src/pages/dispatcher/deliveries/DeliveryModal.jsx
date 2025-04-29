const DeliveryModal = ({
                           isOpen,
                           modalType,
                           delivery,
                           errors,
                           onInputChange,
                           onClose,
                           onConfirm,
                           drivers,
                           clients
                       }) => {

    if (!isOpen) return null;

    return (
        <div className="modal fade show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
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
                                    <label className="form-label">Driver</label>
                                    <select
                                        className={`form-control ${errors.driver_id ? 'is-invalid' : ''}`}
                                        name="driver_id"
                                        value={delivery.driver_id}
                                        onChange={onInputChange}
                                    >
                                        <option value="">Select a driver</option>
                                        {drivers.map(driver => (
                                            <option key={driver.id} value={driver.id}>
                                                {`${driver.first_name} ${driver.last_name}` || `Driver ${driver.id}`}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.driver_id && <div className="invalid-feedback">{errors.driver_id}</div>}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Client</label>
                                    <select
                                        className={`form-control ${errors.client_id ? 'is-invalid' : ''}`}
                                        name="client_id"
                                        value={delivery.client_id}
                                        onChange={onInputChange}
                                    >
                                        <option value="">Select a client</option>
                                        {clients.map(client => (
                                            <option key={client.id} value={client.id}>
                                                {`${client.first_name} ${client.last_name}` || `Client ${client.id}`}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.client_id && <div className="invalid-feedback">{errors.client_id}</div>}
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
                                    {errors.pickup_location &&
                                        <div className="invalid-feedback">{errors.pickup_location}</div>}
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
                                    {errors.dropoff_location &&
                                        <div className="invalid-feedback">{errors.dropoff_location}</div>}
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
                                {errors.package_details &&
                                    <div className="invalid-feedback">{errors.package_details}</div>}
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