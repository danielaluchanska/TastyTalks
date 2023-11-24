import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { postsFormatDate } from "../../services/comments.services";
import { Table, Thead, Tbody, Th, Tr, Td, TableCaption, TableContainer, Button, Stack } from '@chakra-ui/react'
import { ArrowForwardIcon, ArrowBackIcon } from '@chakra-ui/icons'
export default function Posts({ posts, mode, postsPerPage }) {
  const [sortedPosts, setSortedPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

  useEffect(() => {
    let sorted = [...posts];
    if (mode === 'newest') {
      sorted = sorted.sort((a, b) => b.createdOn - a.createdOn);
    } else if (mode === 'mostCommented') {
      sorted = sorted.sort((a, b) => {
        const aCommentsLength = a.comments ? Object.keys(a.comments).length : 0;
        const bCommentsLength = b.comments ? Object.keys(b.comments).length : 0;
        return bCommentsLength - aCommentsLength;
      });
    } else if (mode === 'oldest') {
      sorted = sorted.sort((a, b) => a.createdOn - b.createdOn);
    } else if (mode === 'mostLiked') {
      sorted = sorted.sort((a, b) => {
        const aLikedByLength = a.likedBy ? Object.keys(a.likedBy).length : 0;
        const bLikedByLength = b.likedBy ? Object.keys(b.likedBy).length : 0;
        return bLikedByLength - aLikedByLength;
      });
    }
    setSortedPosts(sorted);
  }, [posts, mode]);


  const numColumns = 5;
  const cardWidth = `calc((100% - ${(numColumns - 1) * 5}px) / ${numColumns})`;


  return (<>
    <TableContainer>
      <Table variant='simple'>
        <TableCaption placement="top" color="yellow.500" fontSize="1.5em"> {mode === 'newest' ? 'Newest Posts' :
          mode === 'mostCommented' ? 'Most Commented Posts' :
            mode === 'oldest' ? 'Oldest Posts' :
              'Most Liked Posts'}</TableCaption>
        <Thead>
          <Tr >
            <Th style={{ textAlign: 'left', color: 'green' }}>Title</Th>
            <Th style={{ textAlign: 'center', color: 'green' }}>Author</Th>
            <Th isNumeric style={{ textAlign: 'center', color: 'green' }}>Comments</Th>
            <Th isNumeric style={{ textAlign: 'center', color: 'green' }}>Likes</Th>
            <Th style={{ textAlign: 'center', color: 'green' }} isNumeric>Date</Th>
          </Tr>
        </Thead>
        <Tbody >
          {currentPosts.map((post) => (
            <Tr key={post.id} >
              <Td style={{ textAlign: 'left', color: 'green', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} onClick={() => navigate(`/forum/${post.id}`)}>
                {post.title}
              </Td>
              <Td onClick={() => navigate(`/${post.author}`)}>{post.author}</Td>
              <Td style={{ textAlign: 'center' }} onClick={() => navigate(`/forum/${post.id}`)}>{post.comments ? Object.keys(post.comments).length : 0}</Td>
              <Td style={{ textAlign: 'center' }} onClick={() => navigate(`/forum/${post.id}`)}>{post.likedBy ? Object.keys(post.likedBy).length : 0}</Td>
              <Td onClick={() => navigate(`/forum/${post.id}`)}>{postsFormatDate(post.createdOn)}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>

    <Stack direction={{ base: 'column', lg: 'row' }} spacing={4}  >
      <Button size="sm" leftIcon={<ArrowBackIcon />} colorScheme='green' variant='solid' onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous Page</Button>
      <Button size="sm" rightIcon={<ArrowForwardIcon />} colorScheme='green' variant='solid' onClick={() => setCurrentPage(currentPage + 1)} disabled={indexOfLastPost >= sortedPosts.length}>Next Page</Button>
    </Stack>
  </>
  );
}

Posts.propTypes = {
  posts: PropTypes.array,
  mode: PropTypes.oneOf(['newest', 'mostCommented', 'oldest', 'mostLiked']),
  postsPerPage: PropTypes.number,
};