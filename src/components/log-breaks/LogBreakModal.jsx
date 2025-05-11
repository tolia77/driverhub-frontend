import {useState, useEffect} from "react";
import {MapContainer, TileLayer, Marker, Popup, useMapEvents} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

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

const LogBreakModal = ({isOpen, onSubmit, onClose, initialData}) => {
    const [position, setPosition] = useState(null);
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [cost, setCost] = useState("");
    const [mapCenter, setMapCenter] = useState(
        [initialData?.location?.latitude || 50.455050, initialData?.location?.longitude || 30.533405]
    );

    useEffect(() => {
        if (initialData) {
            setStartTime(initialData.start_time || "");
            setEndTime(initialData.end_time || "");
            setCost(initialData.cost || "");
            if (initialData.location) {
                const newPosition = {
                    lat: initialData.location.latitude,
                    lng: initialData.location.longitude
                };
                setPosition(newPosition);
                setMapCenter([newPosition.lat, newPosition.lng]);
            }
        } else {
            setStartTime(new Date().toISOString().slice(0, 16));
        }
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!position) {
            alert("Please select a location on the map");
            return;
        }

        onSubmit({
            location: {
                latitude: position.lat,
                longitude: position.lng
            },
            start_time: new Date(startTime).toISOString(),
            end_time: new Date(endTime).toISOString(),
            cost: parseFloat(cost)
        });
    };

    if (!isOpen) return null;

    return (
        <div className="modal fade show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{initialData ? "Оновити" : "Log"} Break</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label">Виберіть Location (click on map)</label>
                                <div style={{height: '300px', width: '100%'}}>
                                    <MapContainer
                                        center={mapCenter}
                                        zoom={13}
                                        style={{height: '100%', width: '100%'}}
                                    >
                                        <TileLayer
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        />
                                        <LocationMarker
                                            position={position}
                                            setPosition={setPosition}
                                        />
                                    </MapContainer>
                                </div>
                                {position && (
                                    <div className="mt-2">
                                        <small className="text-muted">
                                            Selected coordinates: {position.lat.toFixed(6)}, {position.lng.toFixed(6)}
                                        </small>
                                    </div>
                                )}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Start Time</label>
                                <input
                                    type="datetime-local"
                                    className="form-control"
                                    value={startTime}
                                    onChange={(e) => setStartTime(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">End Time</label>
                                <input
                                    type="datetime-local"
                                    className="form-control"
                                    value={endTime}
                                    onChange={(e) => setEndTime(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Cost</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    className="form-control"
                                    value={cost}
                                    onChange={(e) => setCost(e.target.value)}
                                    required
                                />
                            </div>
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
                                type="submit"
                                className="btn btn-primary"
                            >
                                {initialData ? "Оновити" : "Submit"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LogBreakModal;