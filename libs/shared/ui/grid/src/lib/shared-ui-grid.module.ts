import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from '@ag-grid-community/angular';
import { customFrameworkComponents } from './custom-grid/types/renderers';
import {
  DateRendererComponent,
  FormControlAutocompleteEditorComponent,
  FormControlSelectEditorComponent, FormControlTextEditorComponent, MatIconButtonCellRendererComponent
} from './custom-grid/renderers';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomGridComponent } from './custom-grid/custom-grid.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AgGridModule.withComponents(customFrameworkComponents),
    MatAutocompleteModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
  ],
  declarations: [
    CustomGridComponent,
    DateRendererComponent,
    FormControlAutocompleteEditorComponent,
    FormControlSelectEditorComponent,
    FormControlTextEditorComponent,
    MatIconButtonCellRendererComponent,
  ],
  exports: [
    CustomGridComponent,
  ],
})
export class SharedUiGridModule {}
