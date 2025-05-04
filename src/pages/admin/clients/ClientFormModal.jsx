const ClientFormModal = ({
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
                            {isEditing ? "Update" : "Create"} Client
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={onHide}
                        ></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                value={formData.email || ''}
                                onChange={onChange}
                                required
                                disabled={isEditing}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="first_name"
                                value={formData.first_name || ''}
                                onChange={onChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="last_name"
                                value={formData.last_name || ''}
                                onChange={onChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Phone Number</label>
                            <input
                                type="tel"
                                className="form-control"
                                name="phone_number"
                                value={formData.phone_number || ''}
                                onChange={onChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">
                                {isEditing ? "New Password (leave blank to keep current)" : "Password"}
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                value={formData.password || ''}
                                onChange={onChange}
                                required={!isEditing}
                            />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            className="btn btn-secondary"
                            onClick={onHide}
                        >
                            Cancel
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={onSubmit}
                        >
                            {isEditing ? "Update" : "Create"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientFormModal;