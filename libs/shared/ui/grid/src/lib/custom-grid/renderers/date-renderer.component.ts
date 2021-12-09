import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { Component } from '@angular/core';

import { DateRendererParams } from '../types/cell-params';

@Component({
  selector: 'app-date-renderer',
  template: `<span>{{ dateString | date: format }}</span>`,
})
export class DateRendererComponent implements ICellRendererAngularComp {
  format = 'YYYY-MM-dd HH:mm aa';
  dateString = '';

  agInit(params: DateRendererParams) {
    if (params.format) {
      this.format = params.format;
    }

    if (params.value) {
      this.dateString = params.value;
    }
  }

  refresh() {
    return false;
  }
}
