import * as types from './actionTypes';
import { findIndex } from 'lodash';

const comments = (state = [], action = {}) => {
  switch (action.type) {
    case types.GET_COMMENTS_BY_POST_DONE:
      const comments = action.comments;
      const parentId = action.postId;

      return [...comments.filter(x => x.parentId !== parentId), ...comments];

    case types.CREATE_COMMENT_DONE:
      return [...state, action.data];

    case types.EDIT_COMMENT_DONE:
      let index = findIndex(state, comment => comment.id === action.data.id);
      return [
        //Slice to keep position
        ...state.slice(0, index),
        { ...action.data },
        ...state.slice(index + 1),
      ];

    case types.DELETE_COMMENT_DONE:
      return [...state.filter(comment => comment.id !== action.data)];

    case types.RATE_COMMENT_DONE:
      let i = findIndex(state, comment => comment.id === action.data.id);
      return [...state.slice(0, i), { ...action.data }, ...state.slice(i + 1)];

    default:
      return state;
  }
};

export default comments;
