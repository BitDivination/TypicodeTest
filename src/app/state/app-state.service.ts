import { Injectable } from '@angular/core';
import { Action, createSelector, Selector, State, StateContext } from "@ngxs/store";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Comments, Posts, User, Users } from "../models";
import { PostsService, UserService } from "../services";
import { GetComments, GetPosts, GetUsers } from "./app-state.actions";
import { AppStateModel, DEFAULT_APP_STATE } from "./app-state.model";

/**
 * Default application state, handle all persistent data like users and their associated posts and comments
 */
@State({
    name: "appState",
    defaults: DEFAULT_APP_STATE
  })
@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  constructor(
      private readonly userService: UserService,
      private readonly postService: PostsService) { }

  /**
   * Selector to pull the users from state
   * @param state Current state
   * @returns List of users in memory
   */
  @Selector()
  static users(state: AppStateModel): Users {
    return state.users;
  }

  /**
   * Selector to pull all the posts from state
   * @param state Current state
   * @returns List of posts in memory
   */
  @Selector()
  static posts(state: AppStateModel): Posts {
    return state.posts;
  }

  /**
   * Selector to find a single user by their ID
   * @param userId The ID of the user
   * @returns Selector to return user
   */
  static userByUserId(userId: number): (state: AppStateModel) => User {
    return createSelector(
        [AppStateService],
        (state: AppStateModel) => state.users.find(innerUser => innerUser.id === userId) || undefined
      );
  }

  /**
   * Selector to find all of the different posts that a user has made in the store
   * @param userId The ID of the user to fetch the posts for
   * @returns Selector to return post by given user
   */
  static postsByUserId(userId: number): (state: AppStateModel) => Posts {
    return createSelector(
        [AppStateService],
        (state: AppStateModel) => state.posts.filter(post => post.userId === userId)
      );
  }

  /**
   * Selector to find all of the different comments related to a given post
   * @param postId The ID of the post to fetch all the comments for
   * @returns Selector to return comments by given post
   */
  static commentsByPostId(postId: number): (state: AppStateModel) => Comments {
    return createSelector(
        [AppStateService],
        (state: AppStateModel) => state.comments.filter(comment => comment.postId === postId)
      );
  }

  /**
   * Action handler for fetching the users from the API and storing it into the application state
   * @param context Current state context
   * @returns API users response
   */
  @Action(GetUsers)
  getUsers(context: StateContext<AppStateModel>): Observable<Users> {
    return this.userService.getUsers().pipe(
        tap(response => context.patchState({ users: response }))
      );
  }

  /**
   * Action handler for fetching the posts from the API and storing it into the application state
   * @param context Current state context
   * @returns API posts response
   */
  @Action(GetPosts)
  getPosts(context: StateContext<AppStateModel>): Observable<Posts> {
    return this.postService.getPosts().pipe(
        tap(response => context.patchState({ posts: response }))
      );
  }

  /**
   * Action handler for fetching the comments from the API and storing it into the application state
   * @param context Current state context
   * @returns API comments response
   */
  @Action(GetComments)
  getComments(context: StateContext<AppStateModel>): Observable<Comments> {
    return this.postService.getComments().pipe(
        tap(response => context.patchState({ comments: response }))
      );
  }
}
