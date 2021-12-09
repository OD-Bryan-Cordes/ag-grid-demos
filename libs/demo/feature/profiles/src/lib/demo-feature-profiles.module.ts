import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedUiGridModule } from '@ag-grid-bryan/shared/ui/grid';
import { AddressListComponent } from './address-list/address-list.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { PeopleListComponent } from './people-list/people-list.component';

@NgModule({
  imports: [
    CommonModule,
    SharedUiGridModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: ProfilesComponent,
      },
    ]),
  ],
  declarations: [AddressListComponent, ProfilesComponent, PeopleListComponent],
})
export class DemoFeatureProfilesModule {}
