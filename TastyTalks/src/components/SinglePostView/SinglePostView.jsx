import { useContext, useEffect, useState } from "react";
import { likePost, dislikePost, getPostById, removePost } from "../../services/posts.services";
import AppContext from "../../context/AuthContext";
import AddComment from "../AddComment/AddComment";
import { getPostLikesById } from "../../services/posts.services";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CommentsUnderPosts from "../CommentsUnderPosts/CommentsUnderPosts";
import EditPostButton from "../EditPost/EditPost";
import { ViewLikes } from '../ViewLikes/ViewLikes';
import { Card, Spacer, CardHeader, CardBody, CardFooter, Button, Text, Flex, Heading, Divider } from '@chakra-ui/react'

const SinglePostView = () => {
  const { user, userData } = useContext(AppContext);
  const [posts, setPost] = useState([])
  const [comments, setComments] = useState([])
  const [ liked, setLiked ]  = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    getPostById(id)
      .then(res => setPost(res))
      .catch(err => console.error(err))
  }, [id])

  useEffect(() => {
    getPostById(id)
      .then((res) => {
        if (res.comments) {
          const objEntries = Object.entries(res.comments);
          setComments(objEntries);
        } else {
          setComments([])
        }
      })
      .catch(err => console.error(err))
  }, [comments])

  const handleLike = () => {
    likePost(userData.handle, id);
    console.log('like')
  };

  const handleDislike = () => {
    dislikePost(userData.handle, id);
  };
  useEffect(() => {
    getPostById(id)
      .then((res) => {
        if (res.likedBy) {
          setLiked(res.likedBy);
        } else {
          setLiked([]);
        }
      })
      .catch((err) => {
        console.error("failed to fetch LikedBy:", err);
      });
  }, [liked])


  const handleDelete = () => {
    removePost(id, userData.handle)
    navigate(-1)
  }

  return (
    <Card borderTop="8px" borderColor="yellow.400" >
      <CardHeader>

        <Flex flex='1' flexWrap='wrap'>

          <Heading size='sm' paddingLeft={15}>{posts.title}</Heading>
          <Spacer />
          <Text color="green.500" as='b' paddingRight={20} onClick={() => navigate(`/${(posts.author)}`)}>{posts.author}</Text>

        </Flex>

      </CardHeader>

      <CardBody border="1px solid gray.50" borderRadius="10px"
        boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)">
        <Text>
          {posts.content}
        </Text>
      </CardBody>

      <Divider borderColor="gray.200" />
      <CardFooter
        justify='space-between'
        flexWrap='wrap'
        sx={{
          '& > button': {
            minW: '136px',
          },
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <AddComment postId={id}></AddComment>
        <Button flex='1' variant='ghost' onClick={handleLike} > Like</Button>
        <ViewLikes liked={liked} id={id}></ViewLikes>
        <Button flex='1' variant='ghost' onClick={handleDislike}> Dislike</Button>
        {(userData.isAdmin === true || userData.handle === posts.author) && <Button color={'green'} onClick={handleDelete}>Delete</Button>}
        {userData.handle === posts.author && (
        <EditPostButton postId={id} originalTitle={posts.title} originalContent={posts.content} handleEditSuccess={setPost} />)}
      </CardFooter>
      <CommentsUnderPosts comments={comments} postId={id}></CommentsUnderPosts>
    </Card>

  )
}
export default SinglePostView;




