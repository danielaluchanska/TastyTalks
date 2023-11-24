import './ListUsers.css';
import { useNavigate } from 'react-router-dom';
import { postsFormatDate } from '../../services/comments.services';
import PropTypes from "prop-types";
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/react'

export default function ListUsers({ users, selectedOption }) {
    const navigate = useNavigate();

    return (
        <TableContainer>
            <Table>
                <Thead>
                    <Tr>
                        {selectedOption === 'username' && (
                            <>
                                <Th style={{ textAlign: 'left', color: 'green' }}>Username</Th>
                                <Th isNumeric style={{ textAlign: 'center', color: 'green' }}>Created On</Th>
                                <Th isNumeric style={{ textAlign: 'center', color: 'green' }}>Comments</Th>
                            </>
                        )}

                        {selectedOption === 'email' && (
                            <>
                                <Th style={{ textAlign: 'left', color: 'green' }}>Email</Th>
                                <Th isNumeric style={{ textAlign: 'center', color: 'green' }}>Created On</Th>
                                <Th isNumeric style={{ textAlign: 'center', color: 'green' }}>Comments</Th>
                            </>
                        )}

                        {selectedOption === 'first-name' && (
                            <>
                                <Th style={{ textAlign: 'left', color: 'green' }}>First Name</Th>
                                <Th isNumeric style={{ textAlign: 'center', color: 'green' }}>Created On</Th>
                                <Th isNumeric style={{ textAlign: 'center', color: 'green' }}>Comments</Th>
                            </>
                        )}
                    </Tr>
                </Thead>
                <Tbody>
                    {users.map((user) => (
                        <Tr key={user.handle} onClick={() => navigate(`/${user.handle}`)}>
                            <Td style={{ width: '500px' }}>{selectedOption === 'username' ? user.handle : (selectedOption === 'email' ? user.email : user.firstName)}</Td>
                            <Td style={{ width: '500px', textAlign: 'center', color: 'green' }}>{postsFormatDate(user.createdOn)}</Td>
                            <Td style={{ textAlign: 'center', color: 'green' }}>{user.commentedPosts ? Object.keys(user.commentedPosts).length : 0}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
}

ListUsers.propTypes = {
    users: PropTypes.array,
};
