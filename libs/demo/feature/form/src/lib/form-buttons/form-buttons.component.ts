import { Component } from '@angular/core';
import { FormArray, FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-form-buttons',
  templateUrl: './form-buttons.component.html',
  styleUrls: ['./form-buttons.component.scss'],
})
export class FormButtonsComponent {
  constructor(private formGroupDirective: FormGroupDirective) {}
  
  get form(): FormGroup {
    return this.formGroupDirective.form;
  }

  onCancel() {
    (this.form.get('addresses') as FormArray).clear();
  }
}
