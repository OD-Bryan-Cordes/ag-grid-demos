import { ColDef, GridOptions } from '@ag-grid-community/core';

import { FormControlSelectEditorParams, MatIconButtonCellRendererParams } from './cell-params';
import { CellRenderers } from './renderers';

// GridOptions extensions. (Currently only includes custom ColDefs)
export interface CustomGridOptions extends GridOptions {
  columnDefs: Array<CustomColDefs>;
}

// ColDef implementations with stricter type definitions for custom cell renderers.
export type CustomColDefs = MatIconButtonCellColDef | FormControlSelectEditorColDef | GenericColDef;

export interface MatIconButtonCellColDef extends ColDef {
  cellRenderer: typeof CellRenderers.matIconButtonCell;
  cellRendererParams: Partial<MatIconButtonCellRendererParams>;
}

export interface FormControlSelectEditorColDef extends ColDef {
  cellRenderer: typeof CellRenderers.formControlSelectEditor;
  cellRendererParams: Partial<FormControlSelectEditorParams>;
}

// This is necessary to prevent the default ColDef from catching the default
// `string` implementation which would map the Params back to `any`.
export interface GenericColDef extends ColDef {
  cellRenderer?: undefined;
}

export interface Choice {
  display: string | number;
  value: string | number;
}
export type ChoiceInputs = string | number | Choice;

export function isChoice(object: ChoiceInputs): object is Choice {
  if (typeof object === 'string' || typeof object === 'number') {
    return false;
  }

  return 'display' in object && 'value' in object;
}
