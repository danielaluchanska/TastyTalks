import { ref, push, get, query, equalTo, orderByChild, update ,set, remove} from 'firebase/database';
import { db } from '../config/firebase-config';


export const addComment = (content, handle, postId) => {
  
  const commentsRef = ref(db, `/comments/${postId}`);
  const newCommentKey = push(commentsRef).key;

  const newComment = {
    content: content,
    timestamp: Date.now(), 
    user: handle,
  };

  const commentPath = `/comments/${postId}/${newCommentKey}`;
  const postCommentPath = `/posts/${postId}/comments/${newCommentKey}`;
  const userCommentPath = `/users/${handle}/commentedPosts/${postId}/${newCommentKey}`;
 

  const updates = {};
  updates[commentPath] = newComment;
  updates[postCommentPath] = newComment;
  updates[userCommentPath] = content;
  

  return update(ref(db), updates)
    .then(() => {})
    .catch((error) => {
      console.error('Error adding comment:', error);
    });
};
export const postComments = (content, handle, postId) => {
  
  const commentsRef = ref(db, `/posts/${postId}/comments`);
  const newCommentKey = push(commentsRef).key;

  const newComment = {
    content: content,
    timestamp: formatTimestamp(), 
    user: handle,
  };

  const commentPath = `/posts/${postId}/comments/${newCommentKey}`;
  const userCommentPath = `/users/${handle}/commentedPosts/${postId}/${newCommentKey}`;

  const updates = {};
  updates[commentPath] = newComment;
  updates[userCommentPath] = newComment;

  return update(ref(db), updates)
    .then(() => {})
    .catch((error) => {
      console.error('Error adding comment:', error);
    });
};

const formatTimestamp = () => {
  const now = new Date();
  const options = {
    hour: '2-digit',
    minute: '2-digit',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };
  return now.toLocaleString(undefined, options);
};
export default formatTimestamp;

export const postsFormatDate = (timestamp) => {
  const dateObj = new Date(timestamp);

  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true, // Use 12-hour format
  };

  const formattedDate = dateObj.toLocaleString(undefined, options);

  return formattedDate;
};


export const getCommentsById = (id) => {

  return get(ref(db, `comments/${id}`))
    .then(result => {
      if (!result.exists()) {
        throw new Error(`Post with id ${id} does not exist!`);
      }
      const comment = result.val();
      comment.id = id;
      return comment;
    });
};

export const getPostById = (id) => {

  return get(ref(db, `posts/${id}`))
    .then(result => {
      if (!result.exists()) {
        throw new Error(`Post with id ${id} does not exist!`);
      }
      const post = result.val();
      post.id = id;
      if (!post.likedBy) post.likedBy = [];
      if (!post.commentedBy) post.commentedBy = [];
      return post;
    });
};


export const getCommentsByAuthor = (handle) => {
  return get(query(ref(db, 'comments'), orderByChild('author'), equalTo(handle)))
    .then(snapshot => {
      if (!snapshot.exists()) return [];
      return fromCommentsDocument(snapshot);
    })
    .catch(err => console.error('error fetching posts: ', err))
};

const fromCommentsDocument = snapshot => {
  const commentsDocument = snapshot.val();
  return Object.keys(commentsDocument).map(key => {
    const comment = commentsDocument[key];

    return {
      ...comment,
      id: key,
    };
  });
}
export const editComment = (postId, commentId, handle , { content }) => {
  const postRef = update(ref(db, `posts/${postId}/comments/${commentId}`),{
    content: content,
    editedOn: formatTimestamp(), 
  });
  const commentPath = update(ref(db,`/comments/${postId}/${commentId}`),{
    content: content,
    editedOn: formatTimestamp(), 
  });
  const userCommentPath = update(ref(db,`/users/${handle}/commentedPosts/${postId}/${commentId}`),{
    content: content,
    editedOn: formatTimestamp(), 
  });

  return Promise.all([postRef, commentPath, userCommentPath])
  .then((res)=> {})
  .catch((err)=> console.error('Error with', err))
};

export const removeComment = ( postId,commentId ,handle) => {

  const removeComment = remove(ref(db, `/comments/${postId}/${commentId}`))
  const removeFromUser = remove(ref(db, `users/${handle}/commentedPosts/${postId}/${commentId}`))
  const removeCommentsFromPosts = remove(ref(db, `posts/${postId}/comments/${commentId}`))

  Promise.all([removeComment, removeFromUser, removeCommentsFromPosts])
    .then((res)=>{})
  .catch((err) => console.error('Error deleting post:', err))
};