import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { RowNode } from '@ag-grid-community/core';
import { Component } from '@angular/core';

import { ButtonIconClickHandlers, MatIconButtonCellRendererParams } from '../../types/cell-params';

@Component({
  selector: 'app-mat-icon-button-cell',
  templateUrl: './mat-icon-button-cell-renderer.component.html',
  styleUrls: ['./mat-icon-button-cell-renderer.component.scss'],
})
export class MatIconButtonCellRendererComponent implements ICellRendererAngularComp {
  icons: ButtonIconClickHandlers = {};
  node: RowNode = {} as RowNode;

  agInit(params: MatIconButtonCellRendererParams) {
    this.icons = params.icons;
    this.node = params.node;
  }

  refresh() {
    return false;
  }
}
