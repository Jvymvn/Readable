import api from '../../services/ReadableAPI';
import * as types from './actionTypes';

//get comments by post
export const getCommentsByPost = postId => dispatch => {
  api
    .getCommentsByPost(postId)
    .then(comments => dispatch(getCommentsByPostDone(comments, postId)));
};

const getCommentsByPostDone = (comments, postId) => {
  return {
    type: types.GET_COMMENTS_BY_POST_DONE,
    comments,
    postId
  };
};

// Create new comment
export const createNewComment = (postId, comment) => dispatch => {
  api
    .createComment(postId, comment)
    .then(data => dispatch(createCommentWithSuccess(data)));
};

const createCommentWithSuccess = data => {
  return {
    type: types.CREATE_COMMENT_DONE,
    data
  };
};

//edit comment
export const editComment = (id, comment) => dispatch => {
  api
    .updateComment(id, comment)
    .then(data => dispatch(editCommentWithSuccess(data)));
};

const editCommentWithSuccess = data => {
  return {
    type: types.EDIT_COMMENT_DONE,
    data
  };
};

// delete comment
export const deleteComment = commentId => dispatch => {
  api
    .removeComment(commentId)
    .then(() => dispatch(deleteCommentDone(commentId)));
};

const deleteCommentDone = data => {
  return {
    type: types.DELETE_COMMENT_DONE,
    data
  };
};

// vote
export const ratingComment = (commentId, vote) => dispatch => {
  api
    .rateCommentApi(commentId, vote)
    .then(data => dispatch(rateCommentDone(data)));
};

const rateCommentDone = data => {
  return {
    type: types.RATE_COMMENT_DONE,
    data
  };
};
