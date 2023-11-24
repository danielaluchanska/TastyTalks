import { useState } from "react";
import { Input } from '@chakra-ui/react'
import PropTypes from "prop-types";

const SearchBar = ({ searchingFor, onSearchResults, selectedOption }) => {
    const [search, setSearch] = useState('');

    const handleInputChange = (e) => {
        const searchText = e.target.value;
        setSearch(searchText);
        let searchResults = '';
        if (selectedOption === "username") {
            searchResults = searchByUsername(searchText);
        } else if (selectedOption === "email") {
            searchResults = searchByEmail(searchText);
        } else if (selectedOption === "first-name") {
            searchResults = searchByName(searchText);
        } else if (selectedOption === "posts") {
            searchResults = searchByPosts(searchText);
        }

        onSearchResults(searchResults);
    }

    const searchByUsername = (searchText) => {
        return searchingFor.filter(user => user.handle.includes(searchText));
    }
    const searchByEmail = (searchText) => {
        return searchingFor.filter(user => user.email.includes(searchText));
    }
    const searchByName = (searchText) => {
        return searchingFor.filter(user => user.firstName.includes(searchText));
    }

    const searchByPosts = (searchText) => {
        return searchingFor.filter(post => post.title.includes(searchText));
    }

    return (
        <Input
            type="text"
            color='green'
            placeholder={`Search for ${selectedOption} here...`}
            _placeholder={{ color: 'inherit' }}
            value={search}
            onChange={handleInputChange}
            mb={25}
        />

    );
}

SearchBar.propTypes = {
    searchingFor: PropTypes.array,
    onSearchResults: PropTypes.func,
    selectedOption: PropTypes.string,
  };
  
export default SearchBar;