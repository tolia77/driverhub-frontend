import {useEffect, useState} from "react";
import {deliveriesMyClientRequest} from "src/services/backend/deliveriesRequests.js";
import {reviewsCreateRequest, reviewsUpdateRequest, reviewsDeleteRequest} from "src/services/backend/reviewsRequests.js";
import DeliveriesTable from "src/components/deliveries/DeliveriesTable.jsx";
import ReviewModal from "src/components/reviews/ReviewModal.jsx";
import {getAccessToken} from "src/utils/auth.js";

const DeliveriesIndexClient = () => {
    const [deliveries, setDeliveries] = useState([]);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [currentDelivery, setCurrentDelivery] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [actionType, setActionType] = useState('create');
    const [reviewData, setReviewData] = useState({
        text: "",
        rating: 5
    });

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

    const openReviewModal = (delivery, action) => {
        setCurrentDelivery(delivery);
        setActionType(action);

        if (action === 'edit') {
            setReviewData({
                text: delivery.review?.text || "",
                rating: delivery.review?.rating || 5
            });
        } else if (action === 'create') {
            setReviewData({
                text: "",
                rating: 5
            });
        }

        setIsReviewModalOpen(true);
    };

    const handleSubmitReview = async (data) => {
        if (!currentDelivery) return;

        try {
            setIsSubmitting(true);

            if (actionType === 'create') {
                await reviewsCreateRequest(getAccessToken(), {
                    delivery_id: currentDelivery.id,
                    ...data
                });
            } else if (actionType === 'edit') {
                await reviewsUpdateRequest(
                    getAccessToken(),
                    currentDelivery.review.id,
                    data
                );
            } else if (actionType === 'delete') {
                await reviewsDeleteRequest(
                    getAccessToken(),
                    currentDelivery.review.id
                );
            }

            // Refresh deliveries
            const response = await deliveriesMyClientRequest(getAccessToken());
            setDeliveries(response.data);
            setIsReviewModalOpen(false);
        } catch (err) {
            console.error("Error handling review:", err);
            alert(`Error ${actionType === 'delete' ? 'deleting' : actionType === 'edit' ? 'updating' : 'creating'} review`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container-fluid py-4">
            <h1 className="mb-4">Мої Доставки</h1>

            <DeliveriesTable
                deliveries={deliveries}
                onOpenReviewModal={openReviewModal}
                showDriver={true}
                showClient={false}
                showActions={true}
                userRole="client"
            />

            <ReviewModal
                isOpen={isReviewModalOpen && actionType !== 'delete'}
                onClose={() => setIsReviewModalOpen(false)}
                onSubmit={handleSubmitReview}
                isLoading={isSubmitting}
                initialData={reviewData}
                isEdit={actionType === 'edit'}
            />

            {/* Delete Confirmation Modal */}
            {isReviewModalOpen && actionType === 'delete' && (
                <div className="modal fade show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Видалити відгук</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setIsReviewModalOpen(false)}
                                    disabled={isSubmitting}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <p>Ви справді хочете видалити цей відгук?</p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setIsReviewModalOpen(false)}
                                    disabled={isSubmitting}
                                >
                                    Скасувати
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => handleSubmitReview({})}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-1" role="status"
                                                  aria-hidden="true"></span>
                                            Видалення...
                                        </>
                                    ) : (
                                        "Видалити"
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DeliveriesIndexClient;