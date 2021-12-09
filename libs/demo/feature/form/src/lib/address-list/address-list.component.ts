import { Component } from '@angular/core';
import {
  FormArray,
  FormArrayName,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AddressType } from '../types';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.scss'],
})
export class AddressListComponent {
  get addresses(): FormArray {
    return this.formArrayName.control;
  }

  get name(): string {
    return String(this.formArrayName.name);
  }

  get formGroup(): FormGroup {
    return this.formArrayName.formDirective?.control as FormGroup;
  }

  constructor(private formArrayName: FormArrayName, private fb: FormBuilder) {}

  newHomeAddress() {
    this.addresses.push(this.getNewAddress(AddressType.HOME));
  }
  newOfficeAddress() {
    this.addresses.push(this.getNewAddress(AddressType.OFFICE));
  }

  getNewAddress = (type: AddressType) =>
    this.fb.group({
      line1: this.fb.control([], [Validators.required]),
      line2: this.fb.control([]),
      city: this.fb.control([], [Validators.required]),
      zip: this.fb.control([], [Validators.required]),
      state: this.fb.control([], [Validators.required]),
      type: this.fb.control(type),
      people: this.fb.array([]),
    });
}
