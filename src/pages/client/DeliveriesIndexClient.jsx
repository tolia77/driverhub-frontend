import { useEffect, useState } from "react";
  import { deliveriesMyClient } from "src/services/backend/deliveriesRequests";
  import DeliveriesTable from "./DeliveriesTable";
import {getAccessToken} from "src/utils/auth.js";

  const DeliveriesIndexClient = () => {
      const [deliveries, setDeliveries] = useState([]);
      const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
      const [currentDelivery, setCurrentDelivery] = useState(null);
      const [review, setReview] = useState("");

      useEffect(() => {
          const fetchDeliveries = async () => {
              try {
                  const response = await deliveriesMyClient(getAccessToken());
                  setDeliveries(response.data.data.deliveries);
              } catch (err) {
                  console.error("Error fetching deliveries:", err);
                  alert("Error fetching deliveries");
              }
          };

          fetchDeliveries();
      }, []);

      const openReviewModal = (delivery) => {
          setCurrentDelivery(delivery);
          setReview("");
          setIsReviewModalOpen(true);
      };

      const handleSubmitReview = async () => {
          try {
              console.log("Submitting review for delivery:", currentDelivery.id, "Review:", review);
              setIsReviewModalOpen(false);
          } catch (err) {
              console.error("Error submitting review:", err);
              alert("Error submitting review");
          }
      };

      return (
          <div className="container-fluid py-4">
              <h1 className="mb-4">My Deliveries</h1>
              <DeliveriesTable deliveries={deliveries} onOpenReviewModal={openReviewModal} />

              {isReviewModalOpen && (
                  <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                      <div className="modal-dialog modal-dialog-centered">
                          <div className="modal-content">
                              <div className="modal-header">
                                  <h5 className="modal-title">Leave Review</h5>
                                  <button type="button" className="btn-close" onClick={() => setIsReviewModalOpen(false)}></button>
                              </div>
                              <div className="modal-body">
                                  <textarea
                                      className="form-control"
                                      rows="4"
                                      value={review}
                                      onChange={(e) => setReview(e.target.value)}
                                      placeholder="Write your review here..."
                                  ></textarea>
                              </div>
                              <div className="modal-footer">
                                  <button
                                      type="button"
                                      className="btn btn-secondary"
                                      onClick={() => setIsReviewModalOpen(false)}
                                  >
                                      Cancel
                                  </button>
                                  <button
                                      type="button"
                                      className="btn btn-primary"
                                      onClick={handleSubmitReview}
                                  >
                                      Submit
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