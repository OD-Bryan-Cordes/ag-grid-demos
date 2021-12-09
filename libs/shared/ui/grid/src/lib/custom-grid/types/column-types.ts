import { CellRenderers } from './renderers';
import { ColDef } from '@ag-grid-community/core';

export const addRemoveColumnType: ColDef = {
  field: 'add/remove',
  maxWidth: 45,
  cellRenderer: CellRenderers.matIconButtonCell,
  cellClass: 'narrow',
  headerComponent: CellRenderers.matIconButtonCell,
  headerClass: 'narrow',
};

export const textEditorColumnType: ColDef = {
  cellEditor: CellRenderers.formControlTextEditor,
  editable: true,
}

export const selectEditorColumnType: ColDef = {
  cellEditor: CellRenderers.formControlSelectEditor,
  editable: true,
}

export const nonEditable: ColDef = {
  editable: false,
}

export const locked: ColDef = {
  editable: false,
  sortable: false,
  filter: false,
  resizable: false,
}
