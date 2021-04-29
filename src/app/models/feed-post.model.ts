import { Post, User } from ".";

export interface FeedPost {
  post: Post;
  user?: User;
}