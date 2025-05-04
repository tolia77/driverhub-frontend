import { useEffect, useState } from "react";
import {
    clientsIndexRequest,
    clientDeleteRequest,
    clientUpdateRequest
} from "src/services/backend/clientsRequests.js";
import { getAccessToken } from "src/utils/auth.js";
import ClientsTable from "./ClientsTable";
import ClientFormModal from "./ClientFormModal";

const ClientsIndexAdmin = () => {
    const [clients, setClients] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentClient, setCurrentClient] = useState(null);
    const [formData, setFormData] = useState({
        email: "",
        first_name: "",
        last_name: "",
        phone_number: "",
        password: ""
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = () => {
        clientsIndexRequest(getAccessToken())
            .then(res => setClients(res.data))
            .catch(err => console.error("Error fetching clients:", err));
    };

    const openCreateModal = () => {
        setCurrentClient(null);
        setIsEditing(false);
        setFormData({
            email: "",
            first_name: "",
            last_name: "",
            phone_number: "",
            password: ""
        });
        setIsModalOpen(true);
    };

    const openUpdateModal = (client) => {
        setCurrentClient(client);
        setIsEditing(true);
        setFormData({
            email: client.email,
            first_name: client.first_name,
            last_name: client.last_name,
            phone_number: client.phone_number,
            password: ""
        });
        setIsModalOpen(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmitClient = () => {
        if (!validateForm()) return;

        const submitData = {
            first_name: formData.first_name,
            last_name: formData.last_name,
            phone_number: formData.phone_number,
            ...(formData.password && { password: formData.password })
        };

        const request = isEditing
            ? clientUpdateRequest(currentClient.id, submitData, getAccessToken())
            : null; // Create not implemented as per requirements

        request
            ?.then(() => {
                fetchClients();
                setIsModalOpen(false);
            })
            .catch(error => {
                console.error("Error saving client:", error);
                alert("Failed to save client. Please try again.");
            });
    };

    const handleDeleteClient = (clientId) => {
        if (window.confirm("Are you sure you want to delete this client?")) {
            clientDeleteRequest(clientId, getAccessToken())
                .then(() => fetchClients())
                .catch(err => console.error("Error deleting client:", err));
        }
    };

    const validateForm = () => {
        if (!formData.first_name.trim()) {
            alert("First name is required");
            return false;
        }
        if (!formData.last_name.trim()) {
            alert("Last name is required");
            return false;
        }
        if (!formData.phone_number.trim()) {
            alert("Phone number is required");
            return false;
        }
        if (!isEditing && !formData.password.trim()) {
            alert("Password is required for new clients");
            return false;
        }
        return true;
    };

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="mb-0">Clients Management</h1>
            </div>

            <ClientsTable
                clients={clients}
                onEdit={openUpdateModal}
                onDelete={handleDeleteClient}
            />

            <ClientFormModal
                show={isModalOpen}
                onHide={() => setIsModalOpen(false)}
                onSubmit={handleSubmitClient}
                formData={formData}
                onChange={handleInputChange}
                isEditing={isEditing}
            />
        </div>
    );
};

export default ClientsIndexAdmin;