import React, { useState } from "react";
import { editPost } from "../../services/posts.services";
import Button from "../Button/Button";
import PropTypes from "prop-types";

const EditPostButton = ({ postId, handleEditSuccess, originalTitle, originalContent, }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(originalTitle);
  const [editedContent, setEditedContent] = useState(originalContent);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedTitle(originalTitle);
    setEditedContent(originalContent);
  };

  const handleSubmitEdit = () => {
    editPost(postId, { title: editedTitle, content: editedContent })
      .then((updatedPost) => {
        setIsEditing(false);
        handleEditSuccess(updatedPost);
      })
      .catch((error) => {
        console.error("Error editing post:", error);
      });
  };

  return (
    <div className="edit-container">
      {isEditing ? (
        <div className="edit-parameters-container">
          <input
            type="text"
            placeholder="Edit title"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <textarea

            type='text'
            placeholder="Edit content"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            rows={10}
            cols={15}
          />
          <Button onclick={handleCancel} label={'Cancel'}></Button>
          <Button onclick={handleSubmitEdit} label={'Submit'}></Button>
        </div>
      ) : (
        <Button onclick={handleEdit} label={'Edit post'}></Button>
      )}
    </div>
  );
};

EditPostButton.propTypes = {
  postId: PropTypes.string,
  handleEditSuccess: PropTypes.func,
  originalTitle: PropTypes.string,
  originalContent: PropTypes.string,
};

export default EditPostButton;