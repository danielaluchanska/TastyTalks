import { List, ListItem, ListIcon } from "@chakra-ui/react"
import { ChatIcon, HamburgerIcon, AtSignIcon } from '@chakra-ui/icons'
import { NavLink } from "react-router-dom"

export default function Sidebar() {

    return (
        <List color="white" fontSize={['0.8em', '1em', '1.2em']} spacing={4} >
            <img className="logo-image" src="assets\logo2.svg" alt="logo" />
            <ListItem>
                <NavLink to="/">
                    <ListIcon as={HamburgerIcon} color="white" />
                    Home
                </NavLink>
            </ListItem>
            <ListItem>
                <NavLink to="forum">
                    <ListIcon as={ChatIcon} color="white" />
                    Discussion
                </NavLink>
            </ListItem>
            <ListItem>
                <NavLink to="about">
                    <ListIcon as={AtSignIcon} color="white" />
                    About
                </NavLink>
            </ListItem>
        </List>
    )
}