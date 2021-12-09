// Custom framework component definitions and enumeration.
import {
  DateRendererComponent,
  FormControlAutocompleteEditorComponent,
  FormControlSelectEditorComponent,
  FormControlTextEditorComponent,
  MatIconButtonCellRendererComponent,
} from '../renderers';

export const customFrameworkComponents = {
  formControlAutocompleteEditor: FormControlAutocompleteEditorComponent,
  formControlSelectEditor: FormControlSelectEditorComponent,
  formControlTextEditor: FormControlTextEditorComponent,
  matIconButtonCell: MatIconButtonCellRendererComponent,
  dateRenderer: DateRendererComponent,
};

export const CellRenderers = {
  formControlAutocompleteEditor: 'formControlAutocompleteEditor',
  formControlSelectEditor: 'formControlSelectEditor',
  formControlTextEditor: 'formControlTextEditor',
  matIconButtonCell: 'matIconButtonCell',
  dateRenderer: 'dateRenderer',
};
