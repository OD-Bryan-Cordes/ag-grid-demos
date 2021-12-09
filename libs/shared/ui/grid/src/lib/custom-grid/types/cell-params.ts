import { ICellEditorParams, ICellRendererParams, RowNode } from '@ag-grid-community/core';
import { Observable } from 'rxjs';

import { ChoiceInputs } from './grid-options';

export type ButtonIconClickHandlers = Record<string, (node: RowNode) => void>;

// ICellParams extensions for assignment in Component implementations and custom ColDefs
export interface MatIconButtonCellRendererParams extends ICellRendererParams {
  icons: ButtonIconClickHandlers;
  isIconButton: boolean;
}

export interface DateRendererParams extends ICellRendererParams {
  format: string;
}
export interface FormControlSelectEditorParams extends ICellEditorParams {
  choices:
    | ChoiceInputs[]
    | Observable<ChoiceInputs[]>
    | ((param?: string) => ChoiceInputs[] | Observable<ChoiceInputs[]>);
  multiple?: boolean;
  withField?: string;
}
