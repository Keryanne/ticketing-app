import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  constructor(private apollo: Apollo) {}

  getAllEvents(): Observable<any> {
    const GET_EVENTS = gql`
      query GetEvents {
        events {
          id
          title
          description
          date
          price
          ticketsAvailable
          ticketsSold
        }
      }
    `;
    return this.apollo.query({ query: GET_EVENTS }).pipe(map((result: any) => result.data.events));
  }

  getEventById(id: number): Observable<any> {
    const GET_EVENT = gql`
      query GetEvent($id: Int!) {
        event(id: $id) {
          id
          title
          description
          date
          price
          ticketsAvailable
          ticketsSold
        }
      }
    `;
    return this.apollo.query({ query: GET_EVENT, variables: { id } }).pipe(map((result: any) => result.data.event));
  }

  getUserEvents(): Observable<any> {
    const GET_USER_EVENTS = gql`
      query Me {
        me {
          id
          username
          email
          events {
            id
            title
            description
            date
            price
            ticketsAvailable
            ticketsSold
          }
        }
      }
    `;
    return this.apollo.query({ query: GET_USER_EVENTS }).pipe(map((result: any) => result.data.me.events));
  }

  createEvent(event: any): Observable<any> {
    const CREATE_EVENT = gql`
      mutation CreateEvent($title: String!, $description: String!, $date: String!, $price: Int!, $ticketsAvailable: Int!) {
        createEvent(title: $title, description: $description, date: $date, price: $price, ticketsAvailable: $ticketsAvailable) {
          id
          title
          description
          date
          price
          ticketsAvailable
          ticketsSold
        }
      }
    `;
    return this.apollo.mutate({ 
      mutation: CREATE_EVENT, 
      variables: {
        title: event.title,
        description: event.description,
        date: event.date,
        price: event.price,
        ticketsAvailable: event.ticketsAvailable
      }
    }).pipe(map((result: any) => result.data.createEvent));
  }

  buyTicket(eventId: number): Observable<any> {
    const BUY_TICKET = gql`
      mutation BuyTicket($eventId: Int!) {
        buyTicket(eventId: $eventId) {
          id
          buyer {
            id
            username
            email
          }
          event {
            id
            title
            description
            date
            price
            ticketsAvailable
            ticketsSold
          }
        }
      }
    `;
    return this.apollo.mutate({ 
      mutation: BUY_TICKET, 
      variables: { eventId } 
    }).pipe(map((result: any) => result.data.buyTicket));
  }
}
