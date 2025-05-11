import {useState, useEffect} from "react";
import {MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const RecenterMap = ({center}) => {
    const map = useMap();
    useEffect(() => {
        if (center) {
            map.setView(center, map.getZoom());
        }
    }, [center, map]);
    return null;
};

const LocationMarker = ({position, setPosition}) => {
    useMapEvents({
        click(e) {
            setPosition(e.latlng);
        },
    });

    return position === null ? null : (
        <Marker position={position}>
            <Popup>Selected location</Popup>
        </Marker>
    );
};

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
    const [pickupPosition, setPickupPosition] = useState(null);
    const [dropoffPosition, setDropoffPosition] = useState(null);
    const [pickupMapCenter, setPickupMapCenter] = useState([50.455050, 30.533405]);
    const [dropoffMapCenter, setDropoffMapCenter] = useState([50.455050, 30.533405]);

    useEffect(() => {
        if (delivery?.pickup_location) {
            const pos = {
                lat: parseFloat(delivery.pickup_location.latitude),
                lng: parseFloat(delivery.pickup_location.longitude)
            };
            setPickupPosition(pos);
            setPickupMapCenter([pos.lat, pos.lng]);
        }

        if (delivery?.dropoff_location) {
            const pos = {
                lat: parseFloat(delivery.dropoff_location.latitude),
                lng: parseFloat(delivery.dropoff_location.longitude)
            };
            setDropoffPosition(pos);
            setDropoffMapCenter([pos.lat, pos.lng]);
        }
    }, [delivery]);

    const handlePickupLocationChange = (position) => {
        setPickupPosition(position);
        onInputChange({
            target: {
                name: "pickup_location",
                value: {
                    latitude: position.lat,
                    longitude: position.lng,
                    address: `Location at ${position.lat.toFixed(6)}, ${position.lng.toFixed(6)}`
                }
            }
        });
    };

    const handleDropoffLocationChange = (position) => {
        setDropoffPosition(position);
        onInputChange({
            target: {
                name: "dropoff_location",
                value: {
                    latitude: position.lat,
                    longitude: position.lng,
                    address: `Location at ${position.lat.toFixed(6)}, ${position.lng.toFixed(6)}`
                }
            }
        });
    };

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
                                    <label className="form-label">Водій</label>
                                    <select
                                        className={`form-control ${errors.driver_id ? 'is-invalid' : ''}`}
                                        name="driver_id"
                                        value={delivery.driver_id}
                                        onChange={onInputChange}
                                    >
                                        <option value="">Select a driver</option>
                                        {drivers.map(driver => (
                                            <option key={driver.id} value={driver.id}>
                                                {`${driver.first_name} ${driver.last_name}` || `Водій ${driver.id}`}
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
                                    <div style={{height: '300px', width: '100%', marginBottom: '10px'}}>
                                        <MapContainer center={pickupMapCenter} zoom={13}
                                                      style={{height: '100%', width: '100%'}}>
                                            <TileLayer
                                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                            />
                                            <RecenterMap center={pickupMapCenter}/>
                                            <LocationMarker
                                                position={pickupPosition}
                                                setPosition={handlePickupLocationChange}
                                            />
                                        </MapContainer>
                                    </div>
                                    {pickupPosition && (
                                        <div className="text-center">
                                            <small className="text-muted">
                                                Selected
                                                coordinates: {pickupPosition.lat.toFixed(6)}, {pickupPosition.lng.toFixed(6)}
                                            </small>
                                        </div>
                                    )}
                                    {errors.pickup_location &&
                                        <div className="invalid-feedback d-block">{errors.pickup_location}</div>}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Dropoff Location</label>
                                    <div style={{height: '300px', width: '100%', marginBottom: '10px'}}>
                                        <MapContainer center={dropoffMapCenter} zoom={13}
                                                      style={{height: '100%', width: '100%'}}>
                                            <TileLayer
                                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                            />
                                            <RecenterMap center={dropoffMapCenter}/>
                                            <LocationMarker
                                                position={dropoffPosition}
                                                setPosition={handleDropoffLocationChange}
                                            />
                                        </MapContainer>
                                    </div>
                                    {dropoffPosition && (
                                        <div className="text-center">
                                            <small className="text-muted">
                                                Selected
                                                coordinates: {dropoffPosition.lat.toFixed(6)}, {dropoffPosition.lng.toFixed(6)}
                                            </small>
                                        </div>
                                    )}
                                    {errors.dropoff_location &&
                                        <div className="invalid-feedback d-block">{errors.dropoff_location}</div>}
                                </div>
                            </div>

                            {/* Package Details & Notes */}
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
