import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    useDisclosure,
    Box,
    FormControl,
    FormLabel,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { getPostLikesById } from "../../services/posts.services";

export const ViewLikes = ({ liked, id }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [countLikes, setCountLikes] = useState(0);
    useEffect(() => {
        getPostLikesById(id)
          .then((res) => {
            if (res) {
              setCountLikes(Object.keys(res).length);
            } else {
              setCountLikes(0);
            }
          })
          .catch((err) => {
            console.error("failed to fetch LikedBy:", err);
          });
      }, [liked])
  
    return (
      <>
        <Button marginTop='14px' colorScheme="yellow" mb={15} onClick={onOpen}>
          Likes {countLikes}
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Likes</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl mt={4}>
                <Box>
                  {Object.keys(liked).map((userKey) => (
                    <p key={userKey}>{userKey}</p>
                  ))}
                </Box>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };