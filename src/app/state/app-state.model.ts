import { Comments, Posts, Users } from "../models";

export interface AppStateModel {
  users: Users;
  posts: Posts;
  comments: Comments;
}

export const DEFAULT_APP_STATE: AppStateModel = {
    users: [],
    posts: [],
    comments: []
  };