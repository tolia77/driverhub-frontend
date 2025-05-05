import { format } from "date-fns";
import { useEffect, useState } from "react";
import {
    logBreaksDeleteRequest,
    logBreaksMyRequest,
    logBreaksUpdateRequest
} from "src/services/backend/logBreaksRequests.js";
import LogBreaksTable from "src/pages/driver/log-breaks/LogBreaksTable";
import {getAccessToken} from "src/utils/auth.js";
import LogBreakModal from "src/components/log-breaks/LogBreakModal.jsx";

const LogBreaksIndexDriver = () => {
    const [logBreaks, setLogBreaks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentLogBreak, setCurrentLogBreak] = useState(null);

    useEffect(() => {
        fetchLogBreaks();
    }, []);

    const fetchLogBreaks = () => {
        logBreaksMyRequest(localStorage.getItem("accessToken"))
            .then(res => setLogBreaks(res.data))
            .catch(err => console.error("Error fetching log breaks:", err));
    };

    const openUpdateModal = (logBreak) => {
        setCurrentLogBreak(logBreak);
        setIsModalOpen(true);
    };

    const handleUpdateLogBreak = (updatedData) => {
        logBreaksUpdateRequest(
            currentLogBreak.id,
            updatedData,
            getAccessToken()
        )
            .then(() => {
                fetchLogBreaks();
                setIsModalOpen(false);
            })
            .catch(error => {
                console.error("Error updating log break:", error);
                alert("Failed to update log break. Please try again.");
            });
    };

    const handleDeleteLogBreak = (logBreakId) => {
        if (window.confirm("Are you sure you want to delete this log break?")) {
            logBreaksDeleteRequest(logBreakId, getAccessToken())
                .then(() => fetchLogBreaks())
                .catch(err => console.error("Error deleting log break:", err));
        }
    };

    return (
        <div className="container py-4">
            <LogBreaksTable
                logBreaks={logBreaks}
                onEdit={openUpdateModal}
                onDelete={handleDeleteLogBreak}
            />

            {isModalOpen && currentLogBreak && (
                <LogBreakModal
                    isOpen={isModalOpen}
                    onSubmit={handleUpdateLogBreak}
                    onClose={() => setIsModalOpen(false)}
                    initialData={{
                        location: currentLogBreak.location,
                        start_time: format(new Date(currentLogBreak.start_time), "yyyy-MM-dd'T'HH:mm"),
                        end_time: format(new Date(currentLogBreak.end_time), "yyyy-MM-dd'T'HH:mm"),
                        cost: currentLogBreak.cost.toString()
                    }}
                />
            )}
        </div>
    );
};

export default LogBreaksIndexDriver;