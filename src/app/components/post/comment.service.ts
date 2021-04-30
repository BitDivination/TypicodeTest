import { Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { Comments } from "src/app/models";
import { AppStateService } from "src/app/state";


@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private readonly store: Store) { }

  commentsByPost(postId: number): Observable<Comments> {
    return this.store.select(AppStateService.commentsByPostId(postId));
  }
}
