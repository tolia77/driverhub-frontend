import { useEffect, useState } from "react";
import { deliveriesMyClientRequest } from "src/services/backend/deliveriesRequests";
import { reviewsCreateRequest } from "src/services/backend/reviewsRequests";
import DeliveriesTable from "src/pages/client/DeliveriesTable";
import ReviewModal from "src/pages/client/ReviewModal";
import { getAccessToken } from "src/utils/auth.js";

const DeliveriesIndexClient = () => {
    const [deliveries, setDeliveries] = useState([]);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [currentDelivery, setCurrentDelivery] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchDeliveries = async () => {
            try {
                const response = await deliveriesMyClientRequest(getAccessToken());
                setDeliveries(response.data);
            } catch (err) {
                console.error("Error fetching deliveries:", err);
                alert("Error fetching deliveries");
            }
        };

        fetchDeliveries();
    }, []);

    const openReviewModal = (delivery) => {
        setCurrentDelivery(delivery);
        setIsReviewModalOpen(true);
    };

    const handleSubmitReview = async (reviewData) => {
        if (!currentDelivery) return;

        try {
            setIsSubmitting(true);
            await reviewsCreateRequest(getAccessToken(), {
                delivery_id: currentDelivery.id,
                ...reviewData
            });

            // Refresh deliveries to show the review was added
            const response = await deliveriesMyClientRequest(getAccessToken());
            setDeliveries(response.data);

            setIsReviewModalOpen(false);
        } catch (err) {
            console.error("Error submitting review:", err);
            alert("Error submitting review");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container-fluid py-4">
            <h1 className="mb-4">My Deliveries</h1>
            <DeliveriesTable deliveries={deliveries} onOpenReviewModal={openReviewModal} />

            <ReviewModal
                isOpen={isReviewModalOpen}
                onClose={() => setIsReviewModalOpen(false)}
                onSubmit={handleSubmitReview}
                isLoading={isSubmitting}
            />
        </div>
    );
};

export default DeliveriesIndexClient;