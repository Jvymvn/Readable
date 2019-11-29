import { v4 } from 'uuid';

const API = 'https://jc-readable.herokuapp.com';
let token = localStorage.token;

if (!token)
  token = localStorage.token = Math.random()
    .toString(36)
    .substr(-8);

const HEADERS = {
  Accept: 'application/json',
  Authorization: token,
  'Content-Type': 'application/json',
};


/**
 * @return {Array} categories
 */
const getAllCategories = () => {
  return fetch(`${API}/categories`, { headers: HEADERS })
    .then(results => results.json())
    .then(data => data.categories)
    .catch(err => console.error(err));
};

/**
 * @param {String} postId
 * @return {Array} posts
 */
const getAllPosts = () => {
  return fetch(`${API}/posts`, { headers: HEADERS })
    .then(results => results.json())
    .then(data => data)
    .catch(err => console.error(err));
};

const getPostContent = postId => {
  return fetch(`${API}/posts/${postId}`, { headers: HEADERS })
    .then(results => results.json())
    .then(data => data)
    .catch(err => console.error(err));
};

const getCommentsByPost = postId => {
  return fetch(`${API}/posts/${postId}/comments`, { headers: HEADERS })
    .then(results => results.json())
    .then(data => data)
    .catch(err => console.error(err));
};

/**
 * @param {Obj} postData {title, body, category, author}
 */
const createPost = postData => {
  return fetch(`${API}/posts`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({
      ...postData,
      id: v4(),
      timestamp: Date.now()
    })
  }).then(results => results.json())
  .catch(err => console.error(err));
};

const updatePost = (id, postData) => {
  const editedPost = { ...postData, timestamp: Date.now() };
  return fetch(`${API}/posts/${id}`, {
    method: 'PUT',
    headers: HEADERS,
    body: JSON.stringify(editedPost)
  }).then(results => results.json())
  .catch(err => console.error(err));
};


const removePost = postId => {
  return fetch(`${API}/posts/${postId}`, {
    method: 'DELETE',
    headers: HEADERS
  }).then(results => results.json())
  .catch(err => console.error(err));
};

/**
 * @param {string} postId
 * @param {string} vote
 */
const ratePostApi = (postId, vote) => {
  return fetch(`${API}/posts/${postId}`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({
      option: vote,
    })
  }).then(results => results.json())
  .catch(err => console.error(err));
};

/**
 * @param {Obj} commentData
 */
const createComment = (postId, commentData) => {
  return fetch(`${API}/comments`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({
      ...commentData,
      parentId: postId,
      id: v4(),
      timestamp: Date.now()
    })
  }).then(results => results.json())
  .catch(err => console.error(err));
};

/**
 * @param {Obj} commentData
 */
const updateComment = (id, commentData) => {
  const editedComment = { ...commentData, timestamp: Date.now() };
  return fetch(`${API}/comments/${id}`, {
    method: 'PUT',
    headers: HEADERS,
    body: JSON.stringify(editedComment)
  }).then(results => results.json())
  .catch(err => console.error(err));
};

const removeComment = commentId => {
  return fetch(`${API}/comments/${commentId}`, {
    method: 'DELETE',
    headers: HEADERS
  })
    .then(results => results.json())
    .then(data => data)
    .catch(err => console.error(err));
};

const rateCommentApi = (commentId, vote) => {
  return fetch(`${API}/comments/${commentId}`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({
      option: vote
    })
  }).then(results => results.json())
  .catch(err => console.error(err));
};

export default {
  getAllCategories,
  getAllPosts,
  getPostContent,
  getCommentsByPost,
  createPost,
  updatePost,
  removePost,
  ratePostApi,
  createComment,
  updateComment,
  removeComment,
  rateCommentApi
};
