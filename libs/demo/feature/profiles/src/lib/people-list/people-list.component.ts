import { GridOptions } from '@ag-grid-community/core';
import { Component, Input } from '@angular/core';
import { People } from '@app/demo/data-access';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss']
})
export class PeopleListComponent {
  @Input() people:People[] = []
  gridOptions: GridOptions = {
    columnDefs: [
      { field: 'name' },
    ],
  };
}
