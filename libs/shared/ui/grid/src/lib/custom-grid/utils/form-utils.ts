import { FormArray } from '@angular/forms';
import { CellClassParams } from '@ag-grid-community/core';

export function invalidRowCellClassFn(params: CellClassParams): boolean {
  const formArray = params.context.formArray as FormArray;
  const rowIndex = params.rowIndex;
  const fieldName = params.colDef?.field ?? '';

  const formControl = formArray?.get([rowIndex, fieldName]);

  if (!formArray || !formControl) {
    return false;
  }

  return formArray && !formControl.valid;
}
