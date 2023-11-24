import { useState, useContext } from "react";
import { editComment } from "../../services/comments.services";
import AppContext from "../../context/AuthContext";
import PropTypes from "prop-types";
import { Button } from '@chakra-ui/react'

const EditComment = ({ comment, postId, commentId, handleEditSuccess }) => {
    const [isEditing, setIsEditing] = useState(false);
    const originalComment = { ...comment };
    const [editedContent, setEditedContent] = useState(originalComment[1].content);
    const commendNeededId = commentId;
    const {userData} = useContext(AppContext)

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const handleSubmitEdit = () => {
        if(editedContent === "") {
            alert("You cant submit an empty commment");
            return;
        }
        editComment(postId, commendNeededId, userData.handle ,{ content: editedContent })
            .then((updatedComment) => {
                setIsEditing(false);
                handleEditSuccess(updatedComment);
            })
            .catch((error) => {
                console.error("Error editing comment:", error);
            });
    };

    return (
        <div className="edit-container">
            {isEditing ? (
                <div className="edit-parameters-container">
                    <textarea
                        placeholder="Edit content"
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                    />
                    <Button flex='1' variant='ghost' onClick={handleCancel} > Cancel</Button>
                    <Button flex='1' variant='ghost' onClick={handleSubmitEdit} > Submit</Button>
                </div>
            ) : (
                <Button flex='1' variant='ghost' onClick={handleEdit} > Edit</Button>
            )}
        </div>
    );
};
EditComment.propTypes = {
    comment: PropTypes.array,
    postId: PropTypes.string,
    commentId: PropTypes.string,
    handleEditSuccess: PropTypes.func,
  };
export default EditComment;