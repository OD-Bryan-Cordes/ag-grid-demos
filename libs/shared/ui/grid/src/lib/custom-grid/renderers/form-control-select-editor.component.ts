import { ICellEditorAngularComp } from '@ag-grid-community/angular';
import { GridApi } from '@ag-grid-community/core';
import { Component, ViewChild } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { Observable, map, of, tap } from 'rxjs';

import { FormControlSelectEditorParams } from '../types/cell-params';
import { Choice, ChoiceInputs, isChoice } from '../types/grid-options';

// TODO: Reconsider Choice type implementation. Only `string | number | NamedModel` are ever used here
//       so the abstraction could be greatly simplified.
export function mapToChoices() {
  return function (source: Observable<ChoiceInputs[]>) {
    return source.pipe(
      map(
        (list) =>
          list?.map((option) => (isChoice(option) ? option : { display: option, value: option })) ??
          [],
      ),
    );
  };
}

@Component({
  selector: 'app-form-control-select-editor',
  template: `
    <mat-select
      #ref="matSelect"
      class="ag-select"
      [formControl]="control"
      [multiple]="multiple"
      (closed)="onStopEditing()"
    >
      <ng-container *ngIf="choices$ | async as choices">
        <mat-option *ngIf="!choices?.length">No choices available.</mat-option>
        <mat-option *ngFor="let choice of choices" [value]="choice.value">
          {{ choice.display }}
        </mat-option>
      </ng-container>
    </mat-select>
  `,
})
export class FormControlSelectEditorComponent implements ICellEditorAngularComp {
  private parentFormArray!: FormArray;
  private rowIndex = -1;
  private controlName = '';
  private gridApi: GridApi | null | undefined;
  private _choices: Observable<Choice[]> = of([]);
  multiple = false;

  set choices(choices: Observable<ChoiceInputs[]> | ChoiceInputs[]) {
    choices = Array.isArray(choices) ? of(choices) : choices;
    this._choices = choices.pipe(
      mapToChoices(),
      tap(() => setTimeout(() => this.select?.open())),
    );
  }

  get choices$(): Observable<Choice[]> {
    return this._choices;
  }

  @ViewChild('ref', { read: MatSelect }) select?: MatSelect;

  get control() {
    return this.parentFormArray.get([this.rowIndex, this.controlName]) as FormControl;
  }

  agInit(params: FormControlSelectEditorParams) {
    if (!params.context.formArray) {
      throw new Error(`
        No FormArray provided as Context to CustomGrid. Pass a FormArray input via
        <app-custom-grid [formData]>.
      `);
    }

    if (!params.choices) {
      throw new Error(
        `No choices provided. Pass in choices of the types listed in
        "FormControlSelectEditorParams.choices".`,
      );
    }

    this.parentFormArray = params.context.formArray as FormArray;
    this.rowIndex = params.node.rowIndex ?? -1;
    this.controlName = params.colDef.field ?? '';
    this.gridApi = params.api;
    this.multiple = params.multiple ?? false;

    // Using early returns makes conditionals more readable and allows
    // Typescript to infer correctly.

    // If not a function, assign the value and exit.
    if (typeof params.choices !== 'function') {
      this.choices = params.choices;
      return;
    }

    // If it is a function but requires no arguments, call the function and assign
    // the value, then exit.
    if (params.choices.length === 0) {
      this.choices = params.choices();
      return;
    }

    // If it is a function and it requires an argument, check if the argument is
    // provided; otherwise throw.
    if (params.withField) {
      const siblingValue = params.data[params.withField];
      this.choices = params.choices(siblingValue);
    } else {
      throw new Error(
        `Invalid or no sibling parameter provided. If your function requires an argument
        from a sibling field, pass in the name in "withField".`,
      );
    }
  }

  getValue() {
    return this.control.value;
  }

  onStopEditing() {
    this.gridApi?.stopEditing();
  }
}
