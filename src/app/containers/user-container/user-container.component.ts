import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from "@angular/router";
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { filter, map, switchMap, tap } from "rxjs/operators";
import { Posts, User } from "src/app/models";
import { AppStateService } from "src/app/state";
import { isNumber } from "util";

/**
 * Container component for a user. Outlines user demographics as well as their recent posts
 */

@Component({
  selector: 'app-user-container',
  templateUrl: './user-container.component.html',
  styleUrls: ['./user-container.component.scss']
})
export class UserContainerComponent {

  user$: Observable<User> = this.route.paramMap.pipe(
      map(paramMap => paramMap.get(USER_PATH_VAR)),
      filter(userId => isNumber(+userId)),
      switchMap(userId => this.store.select(AppStateService.userByUserId(+userId))),
    );

  posts$: Observable<Posts> = this.user$.pipe(
      filter<User>(Boolean),
      switchMap(user => this.store.select(AppStateService.postsByUserId(user.id))),
    );

  constructor(
      private readonly route: ActivatedRoute,
      private readonly store: Store) { }

}

export const USER_PATH: string = "user";
export const USER_PATH_VAR: string = "userId";
export const USER_ROUTE: Route = { path: `${USER_PATH}/:${USER_PATH_VAR}`, component: UserContainerComponent };
