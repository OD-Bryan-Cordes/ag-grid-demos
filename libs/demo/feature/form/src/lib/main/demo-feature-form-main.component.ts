import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PeopleService } from '@app/demo/data-access';

@Component({
  selector: 'app-main',
  templateUrl: './demo-feature-form-main.component.html',
  styleUrls: ['./demo-feature-form-main.component.scss'],
})
export class DemoFeatureFormMainComponent {
  form = this.fb.group({
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    dob: [null, Validators.required],
    addresses: this.fb.array([]),
  });

  submit(){
    const people = this.peopleService.people;
    people.push(this.form.value);
    this.peopleService.people = people;
    this.router.navigate(['people']);
  }

  constructor(private fb: FormBuilder, private peopleService: PeopleService, private router: Router) {}
}
