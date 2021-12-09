import { Component } from '@angular/core';
import { FormArray, FormGroupName } from '@angular/forms';
import { AddressType } from '../types';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent {
  AddressType = AddressType;

  get type(): AddressType {
    return this.formGroup.control.controls['type'].value;
  }

  get index() {
    return this.formGroup.name as number;
  }

  onDelete(index: number) {
    (this.formGroup.control.parent as FormArray).removeAt(index);
  }

  constructor(public formGroup: FormGroupName) {}
}
