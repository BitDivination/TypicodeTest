import { Component, OnInit } from '@angular/core';
import { Select, Store } from "@ngxs/store";
import { Posts, Users } from "./models";
import { AppStateService } from "./state";
import { GetComments, GetPosts, GetUsers } from "./state/app-state.actions";
import { tap } from "rxjs/operators";
import { BehaviorSubject, Observable } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private readonly store: Store) {}

}
