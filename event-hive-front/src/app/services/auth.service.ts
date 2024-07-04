import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apollo: Apollo) {}

  login(email: string, password: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation Login($email: String!, $password: String!) {
          login(email: $email, password: $password) {
            token
          }
        }
      `,
      variables: {
        email,
        password,
      },
    }).pipe(
      tap((result: any) => {
        const token = result?.data?.login?.token;
        if (token) {
          localStorage.setItem('token', token);
        }
      })
    );
  }

  register(username: string, email: string, password: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation Register($username: String!, $email: String!, $password: String!) {
          register(username: $username, email: $email, password: $password) {
            token
          }
        }
      `,
      variables: {
        username,
        email,
        password,
      },
    });
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
