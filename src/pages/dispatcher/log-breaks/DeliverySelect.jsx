export default function DeliverySelect({deliveries, selectedDelivery, onSelect}) {
    return (
        <div className="card mb-4">
            <div className="card-body">
                <div className="mb-3">
                    <label className="form-label">Select Delivery</label>
                    <select
                        className="form-select"
                        value={selectedDelivery?.id || ""}
                        onChange={(e) => {
                            const selected = deliveries.find(delivery => delivery.id === Number(e.target.value));
                            onSelect(selected);
                        }}
                    >
                        <option value="">-- Select a Delivery --</option>
                        {deliveries.map(delivery => (
                            <option key={delivery.id} value={delivery.id}>
                                {delivery.pickup_location} - {delivery.dropoff_location}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};
