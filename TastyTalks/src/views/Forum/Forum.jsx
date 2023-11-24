import AddPost from "../../components/AddPost/AddPost"
import Posts from "../../components/Posts/Posts"
import { useState} from 'react';
import SearchBar from "../../components/SearchBar/SearchBar";
import { useContext } from "react";
import AppContext from "../../context/AuthContext";
import { Select } from '@chakra-ui/react'
export default function Forum() {
    const { posts } = useContext(AppContext);
    const [searchResults, setSearchResults] = useState(null);
    const [postPerP, setPostPerP] = useState(10);
    const [sortingMode, setSortingMode] = useState("newest");

    const handleSearchResults = (results) => {
        setSearchResults(results);
    }

    return (
        <div>
            <div>
                <SearchBar searchingFor={posts}
                    onSearchResults={handleSearchResults}
                    selectedOption='posts' />
            </div>
            <AddPost></AddPost>
            <Select mb={25} mt={5} maxWidth={{ base: '180px', lg: '300px', xl: '400px' }} placeholder='Sort options' value={sortingMode} onChange={(e) => setSortingMode(e.target.value)}>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="mostCommented">Most Commented</option>
                <option value="mostLiked">Most Liked</option>
            </Select>
            {searchResults ? (
                <Posts posts={searchResults} mode={sortingMode} postsPerPage={postPerP} />
            ) : (
                <Posts posts={posts} mode={sortingMode} postsPerPage={postPerP} />
            )}
        </div>
    )
}