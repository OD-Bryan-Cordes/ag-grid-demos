import { GridOptions } from '@ag-grid-community/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PeopleService, Person } from '@app/demo/data-access';
@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss'],
})
export class ProfilesComponent {
  constructor(private peopleService: PeopleService, private router: Router) {}
  people$ = this.peopleService.peopleObservable;
  selectedPerson?: Person;
  gridOptions: GridOptions = {
    columnDefs: [
      { field: 'firstName', headerName: 'First Name' },
      { field: 'lastName', headerName: 'Last Name' },
      { field: 'dob', headerName: 'Date of Birth' },
    ],
    rowSelection: 'single',
    onRowSelected: (event) => {
      if (event.node.isSelected()) {
        this.selectedPerson = event.node.data;
      } else {
        if (this.selectedPerson === event.node.data) {
          this.selectedPerson = undefined;
        }
      }
    },
  };
}
