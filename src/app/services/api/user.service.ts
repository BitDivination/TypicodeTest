import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { User, Users } from "../../models";
import { API_BASE } from "../constants";

/**
 * API Service for the User Domain, responsible for all users and associated data.
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
      private readonly http: HttpClient,
      @Inject(API_BASE) private readonly apiBase: string) {}

      /**
       * Retrieve all of the users from the API
       * @returns List of users
       */
  public getUsers(): Observable<Users> {
    return this.http.get<User[]>(`${this.apiBase}/users`);
  }
}
