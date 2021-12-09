import { ElementRef } from '@angular/core';
import { fakeAsync, tick } from '@angular/core/testing';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { skip } from 'rxjs';

import { FormControlSelectEditorParams } from '../types/cell-params';

import { FormControlAutocompleteEditorComponent } from './form-control-autocomplete-editor.component';

describe('FormControlAutocompleteEditorComponent', () => {
  const fb = new FormBuilder();
  let component: FormControlAutocompleteEditorComponent;

  beforeEach(() => {
    component = new FormControlAutocompleteEditorComponent();
  });

  it('should run init logic', () => {
    const params = {
      context: { formArray: fb.array([fb.group({ name: '' })]) },
      node: { rowIndex: 0 },
      colDef: { field: 'name' },
      choices: [1, 2, 3],
    };

    component.agInit(params as FormControlSelectEditorParams);
  });

  it('should filter choices', fakeAsync(() => {
    const control = new FormControl();
    const params = {
      context: { formArray: fb.array([fb.group({ control })]) },
      node: { rowIndex: 0 },
      colDef: { field: 'control' },
      choices: [1, 2, 3],
    };

    component.agInit(params as FormControlSelectEditorParams);
    control.setValue(2);

    component.filteredChoices
      ?.pipe(skip(1))
      .subscribe((choices) => expect(choices).toEqual([{ display: 2, value: 2 }]));
    tick();
  }));

  it('should call `trigger.open` and `input.focus` on AfterViewInit', () => {
    component.trigger = { openPanel: jest.fn() } as unknown as MatAutocompleteTrigger;
    component.input = { nativeElement: { focus: jest.fn() } } as ElementRef;

    jest.useFakeTimers();
    component.ngAfterViewInit();
    jest.runAllTimers();

    expect(component.trigger.openPanel).toHaveBeenCalled();
    expect(component.input.nativeElement.focus).toHaveBeenCalled();
  });

  it('should compare choices with input, case insensitively', () => {
    const result = component['_compare']({ display: 'Hi', value: 'Hi' }, 'h');

    expect(result).toBeTruthy();
  });


  it('should fail silently if uninitialized references are accessed', fakeAsync(() => {
    expect(() => {
      component.ngAfterViewInit();
      tick();
    }).not.toThrow();
  }));
});
