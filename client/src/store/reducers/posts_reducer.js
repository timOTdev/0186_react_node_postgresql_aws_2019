import * as ACTION_TYPES from '../actions/action_types'

const initialState = {
  posts: [],
  comments: []
}

const PostsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_DB_POSTS:
      return {
        ...state,
        posts: action.payload
      }
    case ACTION_TYPES.REMOVE_DB_POSTS:
      return {
        ...state,
        posts: []
      }
    case ACTION_TYPES.FETCH_POST_COMMENTS:
      return {
        ...state,
        comments: action.payload
      }
    case ACTION_TYPES.REMOVE_POST_COMMENTS:
      return {
        ...state,
        comments: []
      }
    default:
      return state
  }
}

export default PostsReducer;
