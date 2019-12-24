import Reducer1 from './reducer1'
import AuthReducer from './auth_reducer';
import PostsReducer from './posts_reducer';
import UserReducer from './user_reducer';
import { combineReducers } from 'redux';


const rootReducer = combineReducers({
  reducer1: Reducer1,
  auth_reducer: AuthReducer,
  posts_reducer: PostsReducer,
  user_reducer: UserReducer
})

export default rootReducer;
