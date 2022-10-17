import {configureStore} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { adminReducer } from "./admin/useAdminReducer";

const middleware = [thunk];

const store = configureStore({
    reducer:{
        admin: adminReducer
    },
    middleware
})

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch