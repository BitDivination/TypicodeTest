import { Component, OnInit } from '@angular/core';
import { Route } from "@angular/router";

/**
 * Container component for a list of posts, intended to be the detail view of a single post for a user
 * TODO :: Implementation
 */
@Component({
  selector: 'app-post-container',
  templateUrl: './post-container.component.html',
  styleUrls: ['./post-container.component.scss']
})
export class PostContainerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

export const POST_PATH: string = "post";
export const POST_PATH_VAR: string = "postId";
export const POST_ROUTE: Route = { path: `${POST_PATH}/:${POST_PATH_VAR}`, component: PostContainerComponent };
