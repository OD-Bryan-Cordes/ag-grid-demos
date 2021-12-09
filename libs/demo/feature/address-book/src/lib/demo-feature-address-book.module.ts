import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { AddressBookComponent } from './address-book/address-book.component';

export const demoFeatureAddressBookRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule, RouterModule.forChild([{path:'', component: AddressBookComponent}])],
  declarations:[
    AddressBookComponent
  ]
})
export class DemoFeatureAddressBookModule {}
