import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apollo: Apollo) {}

  login(email: string, password: string): Observable<any> {
    const LOGIN_USER = gql`
      mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password)
      }
    `;
    return this.apollo.mutate({
      mutation: LOGIN_USER,
      variables: {
        email: email,
        password: password
      }
    }).pipe(map((result: any) => result.data.login));
  }

  register(username: string, email: string, password: string): Observable<any> {
    const REGISTER_USER = gql`
      mutation Register($username: String!, $email: String!, $password: String!) {
        register(username: $username, email: $email, password: $password)
      }
    `;
    return this.apollo.mutate({
      mutation: REGISTER_USER,
      variables: {
        username: username,
        email: email,
        password: password
      }
    }).pipe(map((result: any) => result.data.register));
  }

  getUserIdFromToken(): number | null {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.userId;
    }
    return null;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }
}
