import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedUiComponentsModule } from '@ag-grid-bryan/shared/ui/components';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';

const routes: Routes = [
  {
    path: '',
    redirectTo:'compare',
    pathMatch: 'full',
  },
  {
    path: 'add',
    loadChildren: () => import('@ag-grid-bryan/demo/feature/form').then((m) => m.DemoFeatureFormModule),
  },
  {
    path: 'people',
    loadChildren: () => import('@ag-grid-bryan/demo/feature/profiles').then((m) => m.DemoFeatureProfilesModule),
  },
  {
    path: 'address-book',
    loadChildren: () => import('@ag-grid-bryan/demo/feature/address-book').then((m) => m.DemoFeatureAddressBookModule),
  },
  {
    path: 'compare',
    loadChildren: () => import('@ag-grid-bryan/demo/feature/compare').then((m) => m.DemoFeatureCompareModule),
  },
]

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
    SharedUiComponentsModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'outline',
        floatLabel: 'always',
      } as MatFormFieldDefaultOptions
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
