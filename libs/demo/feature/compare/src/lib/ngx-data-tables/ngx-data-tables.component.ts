import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TableColumn } from '@swimlane/ngx-datatable';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { range } from '../helpers';

@Component({
  selector: 'app-ngx-data-tables',
  templateUrl: './ngx-data-tables.component.html',
  styleUrls: ['./ngx-data-tables.component.scss'],
})
export class NgxDataTablesComponent {
  ngxForm = this.fb.group({ rows: [], columns: [] });
  dataTablesColumns: Observable<TableColumn[]> = of([]);
  dataTablesRows: Observable<unknown[]> = of([]);
  constructor(private fb: FormBuilder) {
    this.dataTablesColumns = this.ngxForm.controls['columns'].valueChanges.pipe(
      map((value) => range(1, value, 1)),
      map((numberArr) =>
        numberArr.map((value) =>
          value % 4
            ? { prop: 'name', name: value.toString() }
            : { prop: 'status', name: value.toString() }
        )
      )
    );

    this.dataTablesRows = this.ngxForm.controls['rows'].valueChanges.pipe(
      map((value) => range(1, value, 1)),
      map((numberArr) =>
        numberArr.map((value) => ({ id: value, name: `row ${value}` }))
      )
    );
  }

  getCellClass({ row, column }: { row: { id: number; name: string }, column: {prop: string} }) {
    let statusColor = {};
    if(
      column.prop === 'status'){
        const status = !!(row.id % 4);
        statusColor = {
          'red': status,
          'green': !status
        }
      }
    return statusColor;
  }
}
