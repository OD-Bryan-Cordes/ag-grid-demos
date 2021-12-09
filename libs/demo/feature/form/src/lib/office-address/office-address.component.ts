import { Component } from '@angular/core';
import { GridOptions, RowNode } from '@ag-grid-community/core';
import {
  FormArray,
  FormBuilder,
  FormGroupDirective,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-office-address',
  templateUrl: './office-address.component.html',
  styleUrls: ['./office-address.component.scss'],
})
export class OfficeAddressComponent {
  people: FormArray;
  relations = ['co-worker', 'friend'];
  gridOptions: GridOptions = {
    columnDefs: [
      {
        type: ['addRemoveColumnType'],
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
        type: ['textEditorColumnType'], // using type instead of Adding duplicate data
      },
      {
        field: 'relations',
        type: ['selectEditorColumnType'],
        cellEditorParams: {
          choices: this.relations,
        },
      },
      {
        field: 'disabled',
        type: ['textEditorColumnType', 'locked'], // added lock type to disable the row on top of the textEditor type
      },
    ],
  };

  constructor(public formGroup: FormGroupDirective, private fb: FormBuilder) {
    this.people = this.formGroup.control.controls['people'] as FormArray;
  }

  addPerson() {
    this.people.push(
      this.fb.group({ name: ['', Validators.required], relations: [''] })
    );
  }

  removePerson(index: number) {
    this.people.removeAt(index);
  }
}
