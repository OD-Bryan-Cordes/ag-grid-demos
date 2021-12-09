export interface Person {
    firstName: string;
    lastName: string;
    dob: string | Date;
    addresses: Address[];
  }
  export interface Address {
    line1: string;
    line2: string;
    state: string;
    city: string;
    zip: number;
    people: People[];
  }
  export interface People {
    name: string;
  }