export default function DeliverySelect({deliveries, selectedDelivery, onSelect}) {
    return (
        <div className="card mb-4">
            <div className="card-body">
                <div className="mb-3">
                    <label className="form-label">Оберіть доставку</label>
                    <select
                        className="form-select"
                        value={selectedDelivery?.id || ""}
                        onChange={(e) => {
                            const selected = deliveries.find(delivery => delivery.id === Number(e.target.value));
                            onSelect(selected);
                        }}
                    >
                        <option value="">-- Оберіть доставку --</option>
                        {deliveries.map(delivery => (
                            <option key={delivery.id} value={delivery.id}>
                                {delivery?.pickup_location?.address || `${delivery.pickup_location.latitude}, ${delivery.pickup_location.longitude}`} - {delivery?.dropoff_location?.address || `${delivery.dropoff_location.latitude}, ${delivery.dropoff_location.longitude}`}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};
