import './NavBar.css';
import { Flex, Heading, Button, Spacer, HStack } from "@chakra-ui/react"
import { Drawer, DrawerOverlay, DrawerContent, useDisclosure } from '@chakra-ui/react'
import { useContext, useState, useRef } from 'react';
import { logoutUser } from '../../services/auth.services';
import AppContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
export default function NavBar() {
    const { user, userData, setContext } = useContext(AppContext);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()
    const navigate = useNavigate();
    const onLogout = () => {
        logoutUser()
            .then(() => {
                setContext({
                    user: null,
                    userData: null,
                });
            });
        navigate('/home');
        onClose();
    };


    return (
        <Flex as="nav" p="10px" mb="60px" alignItems="center" border="1px solid gray.50" borderRadius="10px"
            boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)">
            <Heading as="h1" fontSize="2em">Tasty Talks</Heading>
            <Spacer />

            <HStack spacing="10px">

                {user === null && (
                    <>
                        <Button variant='solid' color='green' fontSize="1.5em" onClick={() => navigate('/signin')}>
                            Sign In
                        </Button>
                        <Button variant='solid' color='yellow.500' fontSize="1.5em" onClick={() => navigate('/signup')}>
                            Sign Up
                        </Button>

                    </>
                )}
                {user !== null && (
                    <>
                        <Button ref={btnRef} colorScheme="green" onClick={onOpen}>
                            {userData ? userData.firstName + " " + userData.lastName : 'My profile'}
                        </Button>

                        <Drawer
                            isOpen={isOpen}
                            placement='right'
                            onClose={onClose}
                            finalFocusRef={btnRef}
                            closeOnEsc='true'
                        >
                            <DrawerOverlay />
                            <DrawerContent>
                                <Button marginTop={20} color='green' variant='solid' mr={3} onClick={() => navigate(`/${(userData.handle)}`)}>My Profile</Button>

                                <Button color='green' variant='outline' mr={3} onClick={onLogout}>Log Out</Button>

                            </DrawerContent>
                        </Drawer>
                    </>
                )}
            </HStack>
        </Flex>
    );
}