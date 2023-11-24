import Posts from '../../components/Posts/Posts'
import { useContext,useState } from 'react';
import AppContext from '../../context/AuthContext';
import AddPost from '../../components/AddPost/AddPost';;
import DisplayUsersAndPosts from '../../components/DisplayUsersAndPosts/DisplayUsersAndPosts';

export default function Home() {
  const { user, posts } = useContext(AppContext);
  const [postPerP, setPostPerP] = useState(10);

  return (
    <div>
      <DisplayUsersAndPosts />
      <div>
        {user && <AddPost />}
      </div>

      <div>
        <div className='newest-posts'>
          <Posts posts={posts} mode='newest' postsPerPage={postPerP}></Posts>
        </div>
        <div className='commented-posts'>
          <Posts posts={posts} mode='mostCommented' postsPerPage={postPerP}></Posts>
        </div>

      </div>
    </div>
  )
}