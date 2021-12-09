import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DemoFeatureFormMainComponent } from './main/demo-feature-form-main.component';
import { SharedUiGridModule } from '@ag-grid-bryan/shared/ui/grid';
import { AddressComponent } from './address/address.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { AddressListComponent } from './address-list/address-list.component';
import { FormButtonsComponent } from './form-buttons/form-buttons.component';
import { MatButtonModule } from "@angular/material/button";
import { ReactiveFormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { MatExpansionModule } from "@angular/material/expansion";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { HomeAddressComponent } from './home-address/home-address.component';
import { OfficeAddressComponent } from './office-address/office-address.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

const routes: Routes = [
  {
    path: '',
    component: DemoFeatureFormMainComponent,
  }
]

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedUiGridModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatExpansionModule,
    MatIconModule,
    MatMenuModule,
    DragDropModule
  ],
  declarations: [
    DemoFeatureFormMainComponent,
    AddressComponent,
    AddressListComponent,
    FormButtonsComponent,
    HomeAddressComponent,
    OfficeAddressComponent
  ],
})
export class DemoFeatureFormModule {}
