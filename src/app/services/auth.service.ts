import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

const REGISTER = gql`
  mutation register($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      token
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private apollo: Apollo) {}

  login(email: string, password: string): Observable<any> {
    return this.apollo.mutate({
      mutation: LOGIN,
      variables: { email, password }
    }).pipe(map(result => result.data.login.token));
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.apollo.mutate({
      mutation: REGISTER,
      variables: { username, email, password }
    }).pipe(map(result => result.data.register.token));
  }

  saveToken(token: string) {
    localStorage.setItem('auth-token', token);
  }

  getToken(): string {
    return localStorage.getItem('auth-token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem('auth-token');
  }
}
