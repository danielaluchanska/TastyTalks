import './App.css'
import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { Grid, GridItem } from "@chakra-ui/react"
import { Route, Routes } from 'react-router-dom'
import Home from './views/Home/Home'
import NavBar from './components/NavBar/NavBar'
import About from './views/About/About'
import Forum from './views/Forum/Forum'
import Footer from './components/Footer/Footer'
import SignUp from './views/SignUp/SignUp'
import SignIn from './views/SignIn/SignIn'
import Error from './views/Error/Error'
import AdminPanel from './views/AdminPanel/AdminPanel'
import Sidebar from './components/SideBar/SideBar'
import {useEffect, useState } from 'react';
import AuthenticatedRoute from './hoc/AuthenticatedRoute';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './config/firebase-config';
import { getUserData } from './services/users.services';
import AppContext from './context/AuthContext'
import { getAllPosts } from './services/posts.services'
import SinglePostView from './components/SinglePostView/SinglePostView'
import MyProfile from './views/MyProfile/MyProfile'
import UsersPost from './views/UsersPostAndComments/UsersPost'
import UsersComments from './views/UsersComments/UsersComments'
import { getAllUserData } from './services/users.services'
import ResetPassword from './components/ResetPassword/ResetPassword'

function App() {
  const [user] = useAuthState(auth);
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([])
  const [appState, setAppState] = useState({
    user,
    userData: null,
  })

  if (appState.user !== user) {
    setAppState({ user });
  }
  useEffect(() => {
    getAllPosts()
      .then(res => setPosts(res))
      .catch(err => console.error('error fetching posts: ', err))
  }, [posts])
  useEffect(() => {
    getAllUserData()
      .then((res) => setUsers(res))
      .catch((err) => console.error(`Problem fetching all users`, err))
  })


  useEffect(() => {
    if (user === null) return;

    getUserData(user.uid)
      .then(snapshot => {
        if (!snapshot.exists()) {
          throw new Error('Something went wrong!');
        }

        setAppState({
          ...appState,
          userData: snapshot.val()[Object.keys(snapshot.val())[0]],
        });
      })
      .catch(e => alert(e.message));
  }, [user]);

  return (
    <div>
      <ChakraProvider>
        <AppContext.Provider value={{ ...appState, setContext: setAppState, posts: posts, users: users, /*comments: comments*/ }}>
          <Grid templateColumns="repeat(6, 1fr)" bg="gray.50">

            <GridItem
              as="aside"
              colSpan={{ base: 6, lg: 1, xl: 0 }}
              bg="green.500"
              minHeight={{ lg: '100vh' }}
              p={{ base: '20px', lg: '30px' }}
            >
              <Sidebar />
            </GridItem>
            <GridItem
              as="main"
              colSpan={{ base: 6, lg: 5, xl: 5 }}
              bg="gray.100"
              p="40px"
            >
              <NavBar></NavBar>
              <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/" element={<Home />} />
                <Route path="/forum" element={<AuthenticatedRoute><Forum /></AuthenticatedRoute>} />

                <Route path="/about" element={<About />} />
                <Route path="/forum/:id" element={<AuthenticatedRoute><SinglePostView /></AuthenticatedRoute>} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/reset" element={<ResetPassword />} />
                <Route path='/:profile' element={<AuthenticatedRoute><MyProfile /></AuthenticatedRoute>} />
                <Route path='/:profile/usersposts' element={<AuthenticatedRoute><UsersPost /></AuthenticatedRoute>} />
                <Route path='/:profile/userscomments' element={<AuthenticatedRoute><UsersComments /></AuthenticatedRoute>} />

                <Route path='/adminPanel' element={<AuthenticatedRoute><AdminPanel /></AuthenticatedRoute>} />
                <Route path="*" element={<Error />} />
              </Routes>
            </GridItem>
          </Grid>

          <Footer></Footer>
        </AppContext.Provider>
      </ChakraProvider>
    </div>
  )
}

export default App
