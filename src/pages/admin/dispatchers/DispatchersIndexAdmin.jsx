import { useEffect, useState } from "react";
import {
    dispatchersCreateRequest,
    dispatchersDeleteRequest,
    dispatchersIndexRequest,
    dispatchersUpdateRequest
} from "src/services/backend/dispatchersRequests.js";
import { getAccessToken } from "src/utils/auth.js";
import DispatchersTable from "src/pages/admin/dispatchers/DispatchersTable";
import DispatcherModal from "src/pages/admin/dispatchers/DispatcherModal.jsx";

const DispatchersIndexAdmin = () => {
    const [dispatchers, setDispatchers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentDispatcher, setCurrentDispatcher] = useState(null);
    const [formData, setFormData] = useState({
        email: "",
        first_name: "",
        last_name: "",
        password: ""
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchDispatchers();
    }, []);

    const fetchDispatchers = () => {
        dispatchersIndexRequest(getAccessToken())
            .then(res => setDispatchers(res.data))
            .catch(err => console.error("Error fetching dispatchers:", err));
    };

    const openCreateModal = () => {
        setCurrentDispatcher(null);
        setIsEditing(false);
        setFormData({
            email: "",
            first_name: "",
            last_name: "",
            password: ""
        });
        setIsModalOpen(true);
    };

    const openUpdateModal = (dispatcher) => {
        setCurrentDispatcher(dispatcher);
        setIsEditing(true);
        setFormData({
            email: dispatcher.email,
            first_name: dispatcher.first_name,
            last_name: dispatcher.last_name,
            password: ""
        });
        setIsModalOpen(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmitDispatcher = () => {
        if (!validateForm()) return;

        const submitData = isEditing
            ? {
                first_name: formData.first_name,
                last_name: formData.last_name,
                ...(formData.password && { password: formData.password })
            }
            : {
                email: formData.email,
                first_name: formData.first_name,
                last_name: formData.last_name,
                password: formData.password
            };

        const request = isEditing
            ? dispatchersUpdateRequest(currentDispatcher.id, submitData, getAccessToken())
            : dispatchersCreateRequest(submitData, getAccessToken());

        request
            .then(() => {
                fetchDispatchers();
                setIsModalOpen(false);
            })
            .catch(error => {
                console.error("Error saving dispatcher:", error);
                alert("Failed to save dispatcher. Please try again.");
            });
    };

    const handleDeleteDispatcher = (dispatcherId) => {
        if (window.confirm("Are you sure you want to delete this dispatcher?")) {
            dispatchersDeleteRequest(dispatcherId, getAccessToken())
                .then(() => fetchDispatchers())
                .catch(err => console.error("Error deleting dispatcher:", err));
        }
    };

    const validateForm = () => {
        if (!formData.first_name.trim()) {
            alert("Ім'я is required");
            return false;
        }
        if (!formData.last_name.trim()) {
            alert("Прізвище is required");
            return false;
        }
        if (!isEditing && !formData.email.trim()) {
            alert("Email is required");
            return false;
        }
        if (!isEditing && !formData.password.trim()) {
            alert("Password is required");
            return false;
        }
        return true;
    };

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="mb-0">Керування Диспетчерами</h1>
                <button
                    className="btn btn-primary"
                    onClick={openCreateModal}
                >
                    Add New Dispatcher
                </button>
            </div>

            <DispatchersTable
                dispatchers={dispatchers}
                onEdit={openUpdateModal}
                onDelete={handleDeleteDispatcher}
            />

            <DispatcherModal
                show={isModalOpen}
                onHide={() => setIsModalOpen(false)}
                onSubmit={handleSubmitDispatcher}
                formData={formData}
                onChange={handleInputChange}
                isEditing={isEditing}
            />
        </div>
    );
};

export default DispatchersIndexAdmin;