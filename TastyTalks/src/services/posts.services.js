import { ref, push, get, query, equalTo, orderByChild, update, remove} from 'firebase/database';
import { db } from '../config/firebase-config';
import formatTimestamp from './comments.services';

const fromPostsDocument = snapshot => {
  const postsDocument = snapshot.val();

  return Object.keys(postsDocument).map(key => {
    const post = postsDocument[key];

    return {
      ...post,
      id: key,
      createdOn: new Date(post.createdOn),
      likedBy: post.likedBy ? Object.keys(post.likedBy) : [],
      commentedBy: post.commentedBy ? Object.keys(post.commentedBy) : [],
    };
  });
}

export const addPost = ( { content,  title}, handle) => {

  return push(
    ref(db, 'posts'),
    {
      content,
      title: title,
      author: handle,
      createdOn: Date.now(),
    },
  )
    .then(result => {
      return getPostById(result.key);
    });
};

export const removePost = ( postId, user) => {

  const removePost = remove(ref(db, `posts/${postId}`))
  const removeComments = remove(ref(db, `users/${user}/commentedPosts/${postId}`))
  const removeCommentsFromCommentsEntity = remove(ref(db, `comments/${postId}`))

  Promise.all([removePost, removeComments, removeCommentsFromCommentsEntity])
    .then((res)=>{})
  .catch((err) => console.error('Error deleting post:', err))
};

export const getPostById = (id) => {
  
  return get(ref(db, `posts/${id}`))
    .then(result => {
      if (!result.exists()) {
        throw new Error(`Post with id ${id} does not exist!`);
      }
      const post = result.val();
      post.id = id;
      post.createdOn = new Date();
      if (!post.likedBy) post.likedBy = [];
      if (!post.commentedBy) post.commentedBy = [];
      return post;
    });
};

export const getLikedPosts = (handle) => {

  return get(ref(db, `users/${handle}`))
    .then(snapshot => {
      if (!snapshot.val()) {
        throw new Error(`User with handle @${handle} does not exist!`);
      }

      const user = snapshot.val();
      if (!user.likedPosts) return [];

      return Promise.all(Object.keys(user.likedPosts).map(key => {

        return get(ref(db, `posts/${key}`))
          .then(snapshot => {
            const post = snapshot.val();

            return {
              ...post,
              createdOn: new Date(),
              id: key,
              likedBy: post.likedBy ? Object.keys(post.likedBy) : [],
            };
          });
      }));
      
    });
};
export const getCommentedPosts = (handle) => {

  return get(ref(db, `users/${handle}`))
    .then(snapshot => {
      if (!snapshot.val()) {
        throw new Error(`User with handle @${handle} does not exist!`);
      }

      const user = snapshot.val();
      if (!user.commentedPosts) return [];

      return Promise.all(Object.keys(user.commentedPosts).map(key => {

        return get(ref(db, `posts/${key}`))
          .then(snapshot => {
            const post = snapshot.val();

            return {
              ...post,
              createdOn: new Date(),
              id: key,
              commentedBy: post.commentedBy ? Object.keys(post.commentedBy) : [],
            };
          });
      }));
      
    });
};

export const getPostsByAuthor = (handle) => {
  return get(query(ref(db, 'posts'), orderByChild('author'), equalTo(handle)))
    .then(snapshot => {
      if (!snapshot.exists()) return [];

      return fromPostsDocument(snapshot);
    });
};

export const getAllPosts = () => {

  return get(ref(db, 'posts'))
    .then(snapshot => {
      if (!snapshot.exists()) {
        return [];
      }

      return fromPostsDocument(snapshot);
    });
};

export const likePost = (handle, postId) => {
  const updateLikes = {};
  updateLikes[`/posts/${postId}/likedBy/${handle}`] = true;
  updateLikes[`/users/${handle}/likedPosts/${postId}`] = true;

  return update(ref(db), updateLikes);
};

export const dislikePost = (handle, postId) => {
  const updateLikes = {};
  updateLikes[`/posts/${postId}/likedBy/${handle}`] = null;
  updateLikes[`/users/${handle}/likedPosts/${postId}`] = null;

  return update(ref(db), updateLikes);
};

export const getPostLikesById = (id) => {

  return get(ref(db, `posts/${id}`))
    .then(result => {
      if (!result.exists()) {
        throw new Error(`Post with id ${id} does not exist!`);
      }
      const post = result.val();
      post.id = id;
      if (!post.likedBy) post.likedBy = [];
      if (!post.commentedBy) post.commentedBy = [];
      return post.likedBy;
    });
};

export const editPost = (postId,  {content, title }) => {
  const postRef = ref(db, `posts/${postId}`);

  return update(postRef, {
    content: content,
    title: title,
    editedOn: formatTimestamp(), 
  })
    .then(() => {
      return getPostById(postId);
    });
};