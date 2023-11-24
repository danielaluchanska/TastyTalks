import { useState } from 'react';
import AppContext from '../../context/AuthContext';
import { useContext } from 'react';
import { addComment } from '../../services/comments.services';
import PropTypes from "prop-types";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, FormLabel, Input, Textarea, FormControl, Button, } from '@chakra-ui/react';

const AddComment = ({ postId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [comment, setComment] = useState('');
  const {userData } = useContext(AppContext);

  const handleOpen = () => {
    if (!userData || !userData.isBlocked) {
      onOpen();
    }
  };

  const handleInputChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addComment(comment, userData.handle, postId);
    setComment('');
    onClose();
  };

  return (
    <>
      {userData && userData.isBlocked ? (
        <p className="blocked-user-message">User is blocked and cannot comment.</p>
      ) : (
        <div className='comment-button'>
          <button colorscheme="yellow" mr={3} onClick={handleOpen}> Add Comment </button>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Comment</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <form className="comment-container" onSubmit={handleSubmit}>
                  <FormControl>
                    <FormLabel>Write a comment...</FormLabel>
                    <Textarea
                      type="text"
                      placeholder="Write a comment..."
                      value={comment}
                      onChange={handleInputChange}
                      rows={15}
                      cols={15}
                    />
                  </FormControl>
                  <button type="submit" >
                    Submit
                  </button>
                </form>
              </ModalBody>
            </ModalContent>
          </Modal>
        </div>
      )}
    </>
  );
};

AddComment.propTypes = {
  postId: PropTypes.string,
};

export default AddComment;