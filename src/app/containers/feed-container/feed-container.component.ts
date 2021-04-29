import { Component, OnInit } from '@angular/core';
import { Route } from "@angular/router";
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { FeedPost, Post, User } from "src/app/models";
import { AppStateService } from "src/app/state";

const FEED_LENGTH: number = 10;

/**
 * Container component that shows a list of feed posts
 */
@Component({
  selector: 'app-feed-container',
  templateUrl: './feed-container.component.html',
  styleUrls: ['./feed-container.component.scss']
})
export class FeedContainerComponent {

  // Create a list of "Feed" display objects (post and the user responsible for it)
  feed$: Observable<FeedPost[]> = this.store.select(AppStateService.posts).pipe(
      // Limit to top ten posts
      map(posts => posts.slice(0, posts.length > FEED_LENGTH ? FEED_LENGTH : posts.length)),
      // Get the users...
      switchMap(posts => this.store.select(AppStateService.users).pipe(
          // ...and map them to the post if available
          map(users => posts.map(post => {
              const feedPost: FeedPost = { post: post };
              const user: User = users.find(userTemp => userTemp.id === post.id);
              if(user) {
                feedPost.user = user;
              }
              return feedPost;
            }))
        )),
    );

  constructor(private readonly store: Store) { }

}

export const FEED_PATH: string = "feed";
export const FEED_ROUTE: Route = { path: FEED_PATH, component: FeedContainerComponent };
