import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Comments, Posts } from "./../../models";
import { API_BASE } from "./../constants";

/**
 * API Service for the Posts Domain. Handles all of the different post based objects and communications.
 */
@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(
      private readonly http: HttpClient,
      @Inject(API_BASE) private readonly apiBase: string) { }

  /**
   * Get all of the available posts for all users
   * @returns Total list of posts for all users
   */
  getPosts(): Observable<Posts> {
    return this.http.get<Posts>(`${this.apiBase}/posts`);
  }

  /**
   * Get all Comments for all posts
   * @returns Total list of comments for all users
   */
  getComments(): Observable<Comments> {
    return this.http.get<Comments>(`${this.apiBase}/comments`);
  }
}
