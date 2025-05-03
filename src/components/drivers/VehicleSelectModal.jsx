import {Link} from "react-router";
import {getUserRole} from "src/utils/auth.js";

const VehicleSelectModal = ({
                                isOpen,
                                vehicles,
                                selectedVehicleId,
                                onSelect,
                                onClose
                            }) => {
    if (!isOpen) return null;

    return (
        <div className="modal fade show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Select Vehicle</h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                        ></button>
                    </div>
                    <div className="modal-body">
                        {vehicles.length > 0 ?
                            <div className="list-group">
                                {vehicles.map((vehicle) => (
                                    <button
                                        key={vehicle.id}
                                        type="button"
                                        className={`list-group-item list-group-item-action ${selectedVehicleId === vehicle.id ? 'active' : ''}`}
                                        onClick={() => onSelect(vehicle.id)}
                                    >
                                        {vehicle.model} ({vehicle.license_plate})
                                    </button>
                                ))}
                            </div> :
                            <p>There is no unassigned vehicles left. <Link to={`/${getUserRole()}/vehicles/`}>Add new vehicle</Link>
                            </p>
                        }
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VehicleSelectModal;