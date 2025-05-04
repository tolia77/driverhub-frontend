import { useState, useEffect } from "react";
import {
    reviewsCreateRequest,
    reviewsUpdateRequest,
    reviewsDeleteRequest, reviewsMyRequest
} from "src/services/backend/reviewsRequests.js";
import { getAccessToken } from "src/utils/auth.js";
import ReviewsTable from "./ReviewsTable";
import ReviewModal from "src/components/reviews/ReviewModal";

const ClientReviewsIndex = () => {
    const [reviews, setReviews] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentReview, setCurrentReview] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = () => {
        setIsLoading(true);
        reviewsMyRequest(getAccessToken())
            .then(res => {
                setReviews(res.data);
                setIsLoading(false);
            })
            .catch(err => {
                console.error("Error fetching reviews:", err);
                setIsLoading(false);
            });
    };

    const openEditModal = (review) => {
        setCurrentReview(review);
        setIsEditing(true);
        setIsModalOpen(true);
    };

    const handleSubmitReview = (reviewData) => {
        setIsLoading(true);
        const request = reviewsUpdateRequest(getAccessToken(), currentReview.id, reviewData)

        request
            .then(() => {
                fetchReviews();
                setIsModalOpen(false);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error saving review:", error);
                setIsLoading(false);
                alert("Failed to save review. Please try again.");
            });
    };

    const handleDeleteReview = (reviewId) => {
        if (window.confirm("Are you sure you want to delete this review?")) {
            setIsLoading(true);
            reviewsDeleteRequest(getAccessToken(), reviewId)
                .then(() => fetchReviews())
                .catch(err => {
                    console.error("Error deleting review:", err);
                    setIsLoading(false);
                });
        }
    };

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="mb-0">My Reviews</h1>
            </div>

            {isLoading && !isModalOpen ? (
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <ReviewsTable
                    reviews={reviews}
                    onEdit={openEditModal}
                    onDelete={handleDeleteReview}
                />
            )}

            <ReviewModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmitReview}
                initialData={currentReview || { text: "", rating: 5, delivery_id: null }}
                isEdit={isEditing}
                isLoading={isLoading}
            />
        </div>
    );
};

export default ClientReviewsIndex;