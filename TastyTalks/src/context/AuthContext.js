import { createContext } from 'react';

const AppContext = createContext({
    user: null,
    userData: null,
    setContext() {
      // real implementation comes from App.jsx
    },
    posts: null,
    setPosts(){
    },
    users: null,
    setUsers:() =>{

    },
    comments: null,
    setComments() {},
    
  });
export default AppContext;