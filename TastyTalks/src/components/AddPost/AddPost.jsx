import { useState, useContext, useRef } from 'react';
import { addPost } from '../../services/posts.services';
import './AddPost.css'
import AppContext from '../../context/AuthContext';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, FormLabel, Input, FormControl, Button, Textarea,} from '@chakra-ui/react'
export default function AddPost() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = useRef(null)
  const finalRef = useRef(null)

  const [post, setPost] = useState({
    title: "",
    content: ""
  });

  const { user, userData } = useContext(AppContext);

  const updateForm = (field) => (e) => {
    setPost({
      ...post,
      [field]: e.target.value,
    });
  }
  const handleFormToggle = () => {
    onOpen();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!post.title) {
      alert(`You need to provide title `);
      return;
    }
    if (post.title.length < 16) {
      alert(`Tittle should be more than 16 characters. Your title is ${post.title.length}`);
      return;
    }
    if (post.title.length > 64) {
      alert(`Tittle should be less than 64 characters. Your title is ${post.title.length}`);
      return;
    }
    if (post.content.length < 32) {
      alert(`Content length should be more than 32 characters. Your content is ${post.content.length}`);
      return;
    }
    if (post.content.length > 8192) {
      alert(`Content length should be less than 8192 characters. Your content is ${post.content.length}`);
      return;
    }
    addPost(post, userData.handle)
    setPost({
      title: '',
      content: '',
    });

    onClose()
  };

  return (

    <>
      {!userData || !userData.isBlocked && (
        <Button colorScheme="yellow" mb={15} onClick={onOpen} > Create Post</Button>
      )}
      {userData && userData.isBlocked ? (
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>You are blocked and cannot post.</ModalHeader>
            <ModalCloseButton />
          </ModalContent>
        </Modal>
      ) : (
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create your post</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel htmlFor="title"></FormLabel>
                <Input
                  type="text"
                  name="title"
                  placeholder='Title:'
                  id="title"
                  value={post.title}
                  onChange={updateForm('title')}
                  className="title-box"
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel htmlFor="content"></FormLabel>
                <Textarea
                  name="content"
                  placeholder='Text:'
                  id="content"
                  value={post.content}
                  onChange={updateForm('content')}
                  className="content-box"
                  rows={50}
                  cols={50}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='yellow' mr={3} onClick={handleSubmit}> Submit</Button>
              <Button onClick={onClose} > Cancel </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );


}