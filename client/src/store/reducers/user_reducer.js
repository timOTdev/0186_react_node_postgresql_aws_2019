import * as ACTION_TYPES from '../actions/action_types'

const initialState = {
  user_text: '',
  OtherUserDBProfile: null,
  db_other_user_posts: [],
}

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.USER_INPUT:
      return {
        ...state,
        user_text: action.payload
      }
    case ACTION_TYPES.SET_OTHER_USER_DB_PROFILE:
      return {
        ...state,
        OtherUserDBProfile: action.payload
      }
    case ACTION_TYPES.REMOVE_OTHER_USER_DB_PROFILE:
      return {
        ...state,
        OtherUserDBProfile: null
      }
    case ACTION_TYPES.SET_OTHER_USER_DB_POSTS:
      return {
        ...state,
        db_other_user_posts: action.payload
      }
    case ACTION_TYPES.REMOVE_OTHER_USER_DB_POSTS:
      return {
        ...state,
        db_other_user_posts: []
      }
    default:
      return state
  }
}

export default UserReducer;
