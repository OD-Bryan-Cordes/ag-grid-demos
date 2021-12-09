import { ElementRef } from '@angular/core';
import { fakeAsync, tick } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { FormControlSelectEditorParams } from '../types/cell-params';

import { FormControlTextEditorComponent } from './form-control-text-editor.component';

describe(FormControlTextEditorComponent.name, () => {
  const fb = new FormBuilder();
  let component: FormControlTextEditorComponent;

  beforeEach(() => {
    component = new FormControlTextEditorComponent();
  });

  it('should run init logic', () => {
    const params = {
      context: {
        formArray: fb.array([
          fb.group({
            message: ['Hello'],
          }),
        ]),
      },
      node: { rowIndex: 0 },
      colDef: { field: 'message' },
    };

    component.agInit(params as FormControlSelectEditorParams);

    expect(component['rowIndex']).toEqual(params.node.rowIndex);
  });

  it('should call `nativeElement` methods on AfterViewInit', () => {
    component.input = {
      nativeElement: {
        // Have to return a truthy value here for the expression to complete.
        select: jest.fn().mockReturnValue(true),
        focus: jest.fn(),
      },
    } as unknown as ElementRef;

    jest.useFakeTimers();
    component.ngAfterViewInit();
    jest.runAllTimers();

    expect(component.input.nativeElement.select).toHaveBeenCalled();
    expect(component.input.nativeElement.focus).toHaveBeenCalled();
  });

  it('should throw if no FormArray is passed through params.context', () => {
    expect(() =>
      component.agInit({
        context: {},
      } as FormControlSelectEditorParams),
    ).toThrow();
  });

  it('should provide `control` getter', () => {
    const params = {
      context: {
        formArray: fb.array([
          fb.group({
            message: ['Hello'],
          }),
        ]),
      },
      node: { rowIndex: 0 },
      colDef: { field: 'message' },
      choices: ['A', 'B', 'C'],
    };

    component.agInit(params as FormControlSelectEditorParams);

    expect(component.control).toEqual(params.context.formArray.get([0, 'message']));
    expect(component.getValue()).toEqual(component.control.value);
  });

  it('should set default values', () => {
    const params = {
      context: {
        formArray: fb.array([]),
      },
      node: {},
      colDef: {},
    };

    component.agInit(params as FormControlSelectEditorParams);

    expect(component['rowIndex']).toEqual(-1);
    expect(component['controlName']).toEqual('');
  });

  it('should fail silently if uninitialized references are accessed', fakeAsync(() => {
    expect(component.getValue()).toBeUndefined();

    expect(() => {
      component.ngAfterViewInit();
      tick();
    }).not.toThrow();
  }));
});
