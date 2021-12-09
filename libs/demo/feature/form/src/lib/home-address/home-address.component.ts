import { Component } from '@angular/core';
import { GridOptions, RowNode } from '@ag-grid-community/core';
import {
  FormArray,
  FormBuilder,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { CellRenderers } from '@ag-grid-bryan/shared/ui/grid';

@Component({
  selector: 'app-home-address',
  templateUrl: './home-address.component.html',
  styleUrls: ['./home-address.component.scss'],
})
export class HomeAddressComponent {
  people: FormArray;
  gridOptions: GridOptions = {
    columnDefs: [
      {
        field: 'add/remove',
        maxWidth: 45,
        cellRenderer: CellRenderers.matIconButtonCell,
        cellClass: 'narrow',
        headerComponent: CellRenderers.matIconButtonCell,
        headerClass: 'narrow',
        sortable: false,
        resizable: false,
        filter: false,
        cellRendererParams: {
          icons: {
            delete: (node: RowNode) => this.removePerson(node.rowIndex ?? 0),
          },
        },
        headerComponentParams: {
          icons: {
            add: () => this.addPerson(),
          },
        },
      },
      {
        field: 'name',
        headerName: 'Name',
        editable: true,
        cellEditor: CellRenderers.formControlTextEditor, // NONE Type way
        flex: 3,
      },
    ],
  };

  constructor(public formGroup: FormGroupDirective, private fb: FormBuilder) {
    this.people = this.formGroup.control.controls['people'] as FormArray;
  }

  addPerson() {
    this.people.push(this.fb.group({ name: ['', Validators.required] }));
  }

  removePerson(index: number) {
    this.people.removeAt(index);
  }
}
