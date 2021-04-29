import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { USER_PATH } from "src/app/containers";
import { FeedPost } from "src/app/models";

/**
 * Component for a single post that shows up in a feed
 */
@Component({
  selector: 'app-feed-post',
  templateUrl: './feed-post.component.html',
  styleUrls: ['./feed-post.component.scss']
})
export class FeedPostComponent implements OnInit {
  userPath: string = `/${USER_PATH}`;

  private _feedPost$: BehaviorSubject<FeedPost> = new BehaviorSubject<FeedPost>(undefined);
  feedPost$: Observable<FeedPost> = this._feedPost$.asObservable();

  @Input()
  set feedPost(newFeedPost: FeedPost) {
    this._feedPost$.next(newFeedPost);
  }

  constructor() { }

  ngOnInit() { }

}
