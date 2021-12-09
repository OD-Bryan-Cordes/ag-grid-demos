import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { map, Observable, startWith, withLatestFrom } from 'rxjs';

type NamedModel = { id: number, name: string };

import { FormControlSelectEditorParams } from '../types/cell-params';
import { Choice } from '../types/grid-options';

import { FormControlSelectEditorComponent } from './form-control-select-editor.component';

@Component({
  selector: 'app-form-control-select-editor',
  template: `
    <input
      matInput
      [formControl]="control"
      [matAutocomplete]="ref"
      #trigger="matAutocompleteTrigger"
    />
    <mat-autocomplete
      #ref="matAutocomplete"
      panelWidth="220"
      [displayWith]="displayFn"
      (closed)="onStopEditing()"
    >
      <ng-container *ngIf="filteredChoices | async as choices">
        <mat-option *ngIf="!choices?.length">No choices available.</mat-option>
        <mat-option *ngFor="let choice of choices" [value]="choice.value">
          {{ choice.display }}
        </mat-option>
      </ng-container>
    </mat-autocomplete>
  `,
})
export class FormControlAutocompleteEditorComponent
  extends FormControlSelectEditorComponent
  implements AfterViewInit
{
  @ViewChild('trigger') trigger?: MatAutocompleteTrigger;
  @ViewChild('trigger', { read: ElementRef }) input?: ElementRef;
  filteredChoices: Observable<Choice[]> | undefined;

  agInit(params: FormControlSelectEditorParams) {
    super.agInit(params);

    this.filteredChoices = this.control.valueChanges.pipe(
      startWith(''),
      withLatestFrom(this.choices$),
      map(([value, choices]) => choices.filter((choice) => this._compare(choice, value))),
    );
  }

  displayFn(input: NamedModel | string) {
    return typeof input === 'object' ? input?.name : input;
  }

  ngAfterViewInit() {
    setTimeout(() => this.trigger?.openPanel() || this.input?.nativeElement.focus());
  }

  private _compare(choice: Choice, input: NamedModel | string) {
    return String(choice.value).toLowerCase().includes(String(input).toLowerCase());
  }
}
