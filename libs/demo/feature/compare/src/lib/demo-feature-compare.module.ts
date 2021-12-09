import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CompareComponent } from './compare/compare.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxDataTablesComponent } from './ngx-data-tables/ngx-data-tables.component';
import { SharedUiGridModule } from '@ag-grid-bryan/shared/ui/grid';
import { SharedUiMaterialModule } from '@ag-grid-bryan/shared/ui/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridComponent } from './ag-grid/ag-grid.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: CompareComponent },
    ]),
    NgxDatatableModule.forRoot({
      messages: {
        emptyMessage: 'No data to display', // Message to show when array is presented, but contains no values
        totalMessage: 'total', // Footer total message
        selectedMessage: 'selected', // Footer selected message
      },
    }),
    SharedUiGridModule,
    SharedUiMaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [CompareComponent, NgxDataTablesComponent, AgGridComponent],
})
export class DemoFeatureCompareModule {}
