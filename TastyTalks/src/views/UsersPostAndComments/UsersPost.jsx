import { useState, useEffect } from 'react'
import { getPostsByAuthor } from '../../services/posts.services';
import Posts from '../../components/Posts/Posts'
import { useParams } from 'react-router-dom';
import BackBtn from '../../components/BackBtn/BackBtn';
import { Select } from '@chakra-ui/react'
export default function UsersPost() {

    const { profile } = useParams();
    const [ownedPosts, setOwnedPosts] = useState([]);
    const [postPerP, setPostPerP] = useState(10);
    const [sortingMode, setSortingMode] = useState("newest");
    useEffect(() => {
        getPostsByAuthor(profile)
            .then(res => setOwnedPosts(res))
            .catch(err => console.error('error fetching posts: ', err))
    }, [profile])


    return (
        <div>
            <Select mb={25} mt={5} maxWidth={{ base: '180px', lg: '300px', xl: '400px' }} placeholder='Sort options' value={sortingMode} onChange={(e) => setSortingMode(e.target.value)}>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="mostCommented">Most Commented</option>
                <option value="mostLiked">Most Liked</option>
            </Select>
            <Posts posts={ownedPosts} mode={sortingMode} postsPerPage={postPerP} ></Posts>
            <BackBtn />
        </div>
    )
}