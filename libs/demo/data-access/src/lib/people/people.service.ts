import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Person } from '../models';



@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  private people$ = new BehaviorSubject<Person[]>([]);

  get people() {
    return this.people$.value;
  }

  set people(people: Person[]) {
    this.people$.next(people);
  }

  get peopleObservable(): Observable<Person[]> {
    return this.people$.asObservable();
  }
}
