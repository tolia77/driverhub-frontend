import { useEffect, useState } from "react";
import {
    reviewsCreateRequest,
    reviewsDeleteRequest,
    reviewsIndexRequest,
    reviewsUpdateRequest
} from "src/services/backend/reviewsRequests.js";
import { getAccessToken } from "src/utils/auth.js";
import ReviewsTable from "./ReviewsTable";
import ReviewFormModal from "./ReviewFormModal";

const ReviewsIndexAdmin = () => {
    const [reviews, setReviews] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentReview, setCurrentReview] = useState(null);
    const [formData, setFormData] = useState({
        delivery_id: "",
        rating: "",
        text: ""
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = () => {
        reviewsIndexRequest(getAccessToken())
            .then(res => setReviews(res.data))
            .catch(err => console.error("Error fetching reviews:", err));
    };

    const openCreateModal = () => {
        setCurrentReview(null);
        setIsEditing(false);
        setFormData({
            delivery_id: "",
            rating: "",
            text: ""
        });
        setIsModalOpen(true);
    };

    const openUpdateModal = (review) => {
        setCurrentReview(review);
        setIsEditing(true);
        setFormData({
            delivery_id: review.delivery_id,
            rating: review.rating,
            text: review.text || ""
        });
        setIsModalOpen(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmitReview = () => {
        if (!validateForm()) return;

        const submitData = isEditing
            ? {
                rating: parseInt(formData.rating),
                ...(formData.text && { text: formData.text })
            }
            : {
                delivery_id: parseInt(formData.delivery_id),
                rating: parseInt(formData.rating),
                ...(formData.text && { text: formData.text })
            };

        const request = isEditing
            ? reviewsUpdateRequest(getAccessToken(), currentReview.id, submitData)
            : reviewsCreateRequest(getAccessToken(), submitData);

        request
            .then(() => {
                fetchReviews();
                setIsModalOpen(false);
            })
            .catch(error => {
                console.error("Error saving review:", error);
                alert("Failed to save review. Please try again.");
            });
    };

    const handleDeleteReview = (reviewId) => {
        if (window.confirm("Are you sure you want to delete this review?")) {
            reviewsDeleteRequest(getAccessToken(), reviewId)
                .then(() => fetchReviews())
                .catch(err => console.error("Error deleting review:", err));
        }
    };

    const validateForm = () => {
        if (!isEditing && !formData.delivery_id) {
            alert("Delivery ID is required");
            return false;
        }
        if (!formData.rating) {
            alert("Rating is required");
            return false;
        }
        if (formData.rating < 1 || formData.rating > 5) {
            alert("Rating must be between 1 and 5");
            return false;
        }
        return true;
    };

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="mb-0">Керування відгуками</h1>
                <button
                    className="btn btn-primary"
                    onClick={openCreateModal}
                >
                    Add New Відгук
                </button>
            </div>

            <ReviewsTable
                reviews={reviews}
                onEdit={openUpdateModal}
                onDelete={handleDeleteReview}
            />

            <ReviewFormModal
                show={isModalOpen}
                onHide={() => setIsModalOpen(false)}
                onSubmit={handleSubmitReview}
                formData={formData}
                onChange={handleInputChange}
                isEditing={isEditing}
            />
        </div>
    );
};

export default ReviewsIndexAdmin;