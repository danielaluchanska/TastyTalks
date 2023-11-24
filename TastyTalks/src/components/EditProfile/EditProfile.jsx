import './EditProfile.css';
import { useContext, useState } from 'react';
import { editUser } from '../../services/users.services';
import Button from '../Button/Button';
import AppContext from '../../context/AuthContext';
import PropTypes from "prop-types";

export default function EditProfile({ user, originalFirstName, originalLastName, onEditProfile }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedFirstName, setEditedFirstName] = useState(originalFirstName);
    const [editedLastName, setEditedLastName] = useState(originalLastName);
    const [editedPhoneNumber, setEditedPhoneNumber] = useState('');
    const { userData } = useContext(AppContext);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditedFirstName(originalFirstName);
        setEditedLastName(originalLastName);
    };

    const handleSubmitEdit = () => {
        const updatedUserData = {
            firstName: editedFirstName,
            lastName: editedLastName,
            phoneNumber: editedPhoneNumber, 
        };
        onEditProfile(updatedUserData);
        editUser(user, updatedUserData)
            .then((updatedUser) => {
                setIsEditing(false);
            })
            .catch((error) => {
                console.error("Error editing user:", error);
            });
    };

    return (
        <div className="edit-container">
            {isEditing ? (
                <div className="edit-parameters-container">
                    <input
                        type="text"
                        placeholder="Edit First Name"
                        value={editedFirstName}
                        onChange={(e) => setEditedFirstName(e.target.value)}
                    />
                    <input
                        placeholder="Edit Last Name"
                        value={editedLastName}
                        onChange={(e) => setEditedLastName(e.target.value)}
                    />

                    {userData.isAdmin && (
                        <input
                            placeholder="Edit Phone Number"
                            value={editedPhoneNumber}
                            onChange={(e) => setEditedPhoneNumber(e.target.value)}
                        />
                    )}

                    <Button onclick={handleCancel} label={'Cancel'}></Button>
                    <Button onclick={handleSubmitEdit} label={'Submit'}></Button>
                </div>
            ) : (
                <Button onclick={handleEdit} label={'Edit user'}></Button>
            )}
        </div>
    );
}

EditProfile.propTypes = {
    user: PropTypes.string,
    originalFirstName: PropTypes.string,
    originalLastName: PropTypes.string,
  };