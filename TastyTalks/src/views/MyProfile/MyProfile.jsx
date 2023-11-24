import { useContext, useState, useEffect } from 'react';
import AppContext from '../../context/AuthContext';
import { blockUser, getUserByHandle } from '../../services/users.services';
import { useParams, useNavigate,NavLink } from 'react-router-dom';
import { makeAdmin } from '../../services/users.services';
import { unBlockUser } from '../../services/users.services';
import EditProfile from '../../components/EditProfile/EditProfile';
import BackBtn from '../../components/BackBtn/BackBtn';
import { postsFormatDate } from '../../services/comments.services';
import { Flex, Heading, Divider, Box, Text, Button, ButtonGroup, Spacer, Stack, HStack, StackDivider,Card, CardHeader, CardBody, CardFooter} from "@chakra-ui/react"

export default function MyProfile() {
    const { user, userData } = useContext(AppContext)
    const [currentUser, setCurrentUser] = useState("")
    const { profile } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (profile === null) return;

        getUserByHandle(profile)
            .then(snapshot => {
                if (!snapshot.exists()) {
                    throw new Error('Something went wrong!');
                }
                setCurrentUser(snapshot.val())
            })
            .catch(e => console.log(e.message));
    }, []);

    const handleBlock = (handle) => {
        blockUser(handle)
    }
    const handleAdmin = (handle) => {
        makeAdmin(handle);
    }
    const handleUnblock = (handle) => {
        unBlockUser(handle)
    }
    const handleEditProfile = (updatedValues) => {
        setCurrentUser((prevUser) => ({
          ...prevUser,
          ...updatedValues,
        }));
      };

    return (
        <>
            <Flex as="nav" p="10px" mb="60px" alignItems="center" justifyContent={'center'} border="1px solid gray.50" borderRadius="10px"
                boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)">
                <HStack spacing="10px" >
                    <NavLink style={{ color: 'green', fontSize: "1.2em" }} to={`/${(currentUser.handle)}/usersposts`} >Posts</NavLink>
                    <NavLink style={{ color: 'green', fontSize: "1.2em" }} to={`/${(currentUser.handle)}/userscomments`} >Comments</NavLink>
                    {userData.isAdmin && (currentUser.handle === userData.handle) && <NavLink style={{ color: 'green', fontSize: "1.2em" }} to="/adminPanel" >Admin panel</NavLink>}
                </HStack>
            </Flex>

            <Card>
                <CardHeader>
                    <Heading size='md'>Username: {currentUser.handle}</Heading>
                </CardHeader>
                <CardBody >
                    <Stack divider={<StackDivider />} spacing='4' alignItems="center" justifyContent={'center'}>
                        <Box>
                            <Text pt='2' fontSize='sm'>
                                Email:
                            </Text>
                            <Heading size='xs' textTransform='uppercase'>
                                {currentUser.email}
                            </Heading>
                        </Box>
                        <Box>
                            <Text pt='2' fontSize='sm'>
                                Created on:
                            </Text>
                            <Heading size='xs' textTransform='uppercase'>
                                {postsFormatDate(currentUser.createdOn)}
                            </Heading>
                        </Box>
                        <Box>
                            <Text pt='2' fontSize='sm'>
                                First name:
                            </Text>
                            <Heading size='xs' textTransform='uppercase'>
                                {currentUser.firstName}
                            </Heading>
                        </Box>
                        <Box>
                            <Text pt='2' fontSize='sm'>
                                Last name:
                            </Text>
                            <Heading size='xs' textTransform='uppercase'>
                                {currentUser.lastName}
                            </Heading>
                        </Box>
                        {userData.isAdmin && <Box>
                            <Text pt='2' fontSize='sm'>
                                Phone number:  {userData.phoneNumber}
                            </Text>

                        </Box>}
                    </Stack>
                </CardBody>
                <Divider />

                <CardFooter>
                    <ButtonGroup spacing='2'>
                        {currentUser.handle === userData.handle && <EditProfile user={currentUser.handle} originalFirstName={currentUser.firstName} originalLastName={currentUser.lastName} onEditProfile={handleEditProfile} />}
                        {userData.isAdmin && !currentUser.isAdmin && (
                            <><Button variant='solid' colorScheme='blue'
                                onClick={() => handleAdmin(currentUser.handle)}
                            >
                                Make Admin
                            </Button><Button variant='solid' colorScheme='blue'
                                onClick={() => currentUser.isBlocked
                                    ? handleUnblock(currentUser.handle)
                                    : handleBlock(currentUser.handle)}
                            >
                                    {currentUser.isBlocked ? 'Unblock user' : 'Block user'}
                                </Button>
                                <Spacer></Spacer>
                                <BackBtn></BackBtn></>
                        )}
                    </ButtonGroup>

                </CardFooter>
            </Card>
        </>
    )
}