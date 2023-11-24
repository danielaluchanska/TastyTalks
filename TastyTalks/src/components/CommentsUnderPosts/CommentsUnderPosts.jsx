import { useEffect, useState } from "react";
import EditComment from "../EditComments/EditComments";
import { getPostById, postsFormatDate } from "../../services/comments.services";
import { useContext } from "react";
import AppContext from "../../context/AuthContext";
import { removeComment } from "../../services/comments.services";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { Card, CardHeader, Spacer, CardBody, CardFooter, Button, Text, Flex, SimpleGrid } from '@chakra-ui/react'


export default function CommentsUnderPosts({ comments, postId }) {
  const [commt, setComment] = useState()
  const { userData } = useContext(AppContext);
  const navigate = useNavigate();
  useEffect(() => {
    getPostById(postId)
      .then((res) => setComment(res))
      .catch((err) => console.error("Problem fetching id for single comment", err));
  }, [commt])

  const handleDelete = (commentId) => {
    removeComment(postId, commentId, userData.handle)
  }


  return (
    <SimpleGrid spacing={5} margin="1px" minWidth={'100%'}>
      {comments.map((comment) => (
        <Card key={comment[0]} borderTop="8px" borderColor="green.400" border="1px solid gray.50" borderRadius="10px"
          boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)">
          <CardHeader>

            <Flex flex='1' gap='4' alignItems={'center'} flexWrap='wrap'>
              <Text paddingLeft={'20px'} as='b' onClick={() => navigate(`/${comment[1].user}`)}>{comment[1].user}</Text>
              <Spacer />
              <Text paddingRight={'20px'}>{postsFormatDate(comment[1].timestamp)}</Text>
              {(comment[1].editedOn && <Text>Updated on: {comment[1].editedOn}</Text>)}
            </Flex>
          </CardHeader>
          <CardBody >
            <Text>
              {comment[1].content}
            </Text>
          </CardBody>
          <CardFooter
            justify='space-between'
            flexWrap='wrap'
            sx={{
              '& > button': {
                minW: '136px',
              },
            }}
          >
            {userData && (userData.handle === comment[1].user
              && (<EditComment comment={comment} postId={postId} commentId={comment[0]} handleEditSuccess={setComment} />))}
            {userData && (userData.handle === comment[1].user
              && (<Button color={'green'} onClick={() => handleDelete(comment[0])}> Delete </Button>))}
          </CardFooter>

        </Card>
      ))}
    </SimpleGrid>
  )
}

CommentsUnderPosts.propTypes = {
  comments: PropTypes.array,
  postId: PropTypes.string,
};