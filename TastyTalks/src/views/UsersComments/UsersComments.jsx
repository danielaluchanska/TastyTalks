import {  useState, useEffect } from 'react'
import './UsersComments.css'
import Comments from '../../components/Comments/Comments'
import BackBtn from '../../components/BackBtn/BackBtn';
import { getCommentedPosts } from '../../services/posts.services';
import { useParams } from 'react-router-dom';
import { Button, Stack, } from '@chakra-ui/react';
import { ArrowForwardIcon, ArrowBackIcon } from '@chakra-ui/icons'
export default function UsersComments() {
    const [ownComments, setOwnComments] = useState([]);
    const [sortingMode, setSortingMode] = useState('newest')
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerP, setPostPerP] = useState(10);
    const { profile } = useParams();
    const indexOfLastPost = currentPage * postPerP;
    const indexOfFirstPost = indexOfLastPost - postPerP;
    const currentPosts = ownComments.slice(indexOfFirstPost, indexOfLastPost);
    useEffect(() => {
        getCommentedPosts(profile)
            .then(res => setOwnComments(res))
            .catch(err => console.error('error fetching posts: ', err))
    }, [profile])

    return (
        <>
            <Comments posts={ownComments} mode={sortingMode}></Comments>
            <Stack direction={{ base: 'column', lg: 'row' }} spacing={4}  >
                <Button size="sm" leftIcon={<ArrowBackIcon />} colorScheme='green' variant='solid' onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous Page</Button>
                <Button size="sm" rightIcon={<ArrowForwardIcon />} colorScheme='green' variant='solid' onClick={() => setCurrentPage(currentPage + 1)} disabled={indexOfLastPost >= currentPosts.length}>Next Page</Button>
            </Stack>
            <BackBtn />
        </>
    )
}