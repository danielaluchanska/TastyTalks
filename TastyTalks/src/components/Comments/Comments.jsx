import { useEffect } from 'react';
import './Comments.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import PropTypes from "prop-types";
import { Card, CardHeader, Spacer, CardBody, Text, Box, Flex, SimpleGrid } from '@chakra-ui/react'
import { postsFormatDate } from '../../services/comments.services';


export default function Comments({ posts, mode }) {
  const { profile } = useParams();
  const navigate = useNavigate();
  const [sortedPosts, setSortedPosts] = useState([]);

  useEffect(() => {
    const findNewestCommentTimestamp = (post) => {
      const comments = Object.values(post.comments);
      if (comments.length > 0) {
        const sortedComments = comments.sort((a, b) => b.timestamp - a.timestamp);
        return sortedComments[0].timestamp;
      }
      return 0;
    };

    const findOldestCommentTimestamp = (post) => {
      const comments = Object.values(post.comments);
      if (comments.length > 0) {
        const sortedComments = comments.sort((a, b) => a.timestamp - b.timestamp);
        return sortedComments[0].timestamp;
      }
      return 0;
    };

    const sortPosts = (a, b) => {
      const timestampA = mode === 'newest' ? findNewestCommentTimestamp(a) : findOldestCommentTimestamp(a);
      const timestampB = mode === 'newest' ? findNewestCommentTimestamp(b) : findOldestCommentTimestamp(b);
      return timestampB - timestampA;
    };

    const sorted = [...posts].sort(sortPosts);
    setSortedPosts(sorted);
  }, [posts, mode]);

  const renderMyComments = (post) => {
    const myComments = Object.entries(post.comments).filter(([key, comment]) => {
      return comment.user === profile;
    });

    let sorted = [...myComments];
    if (mode === 'newest') {
      sorted = sorted.sort((a, b) => b[1].timestamp - a[1].timestamp);
    } else if (mode === 'oldest') {
      sorted = sorted.sort((a, b) => a[1].timestamp - b[1].timestamp);
    }

    return (
      <SimpleGrid spacing={10} margin="1px" minWidth={'100%'}>
        {sorted.map((myComment) => {
          return (
            <Card key={myComment[0]} borderTop="8px" borderColor="green.400">
              <CardHeader>

                <Flex flex='1' gap='4' alignItems={'center'} flexWrap='wrap'>
                  <Box paddingLeft={'20px'} as='b' onClick={() => navigate(`/${profile}`)}>{profile}</Box>
                  <Spacer />
                  <Box paddingRight={'20px'}>{postsFormatDate(myComment[1].timestamp)}</Box>
                  {(myComment[1].editedOn && <Text>Edited on: {myComment[1].editedOn}</Text>)}
                </Flex>
              </CardHeader>

              <CardBody >
                <Box>{myComment[1].content}</Box>
              </CardBody>
            </Card>
          );
        })}
      </SimpleGrid>
    )
  }
  return (
    <SimpleGrid spacing={10} margin="1px" minWidth={'100%'}>
      {sortedPosts.map((post) => (
        <Card key={post.id} borderTop="8px" borderColor="yellow.400" onClick={() => navigate(`/forum/${post.id}`)} border="1px solid gray.50" borderRadius="10px"
          boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)">
          <CardHeader> {post.title}</CardHeader>
          <Box >{renderMyComments(post)}</Box>
        </Card>
      ))}
    </SimpleGrid>
  );
}
Comments.propTypes = {
  posts: PropTypes.array,
  mode: PropTypes.oneOf(['newest', 'oldest']),
};