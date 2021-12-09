import { ICellEditorAngularComp } from '@ag-grid-community/angular';
import { ICellEditorParams } from '@ag-grid-community/core';
import { AfterViewInit, Component, ElementRef, HostBinding, ViewChild } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-control-editor',
  template: `
    <div class="ag-wrapper ag-input-wrapper ag-text-field-input-wrapper">
      <input
        #ref
        type="text"
        class="ag-input-field-input ag-text-field-input"
        [formControl]="control"
      />
    </div>
  `,
})
export class FormControlTextEditorComponent implements ICellEditorAngularComp, AfterViewInit {
  private parentFormArray: FormArray | undefined;
  private rowIndex = -1;
  private controlName = '';

  @HostBinding('class') class = 'ag-cell-edit-wrapper';
  @ViewChild('ref') input?: ElementRef;

  get control() {
    return this.parentFormArray?.get([this.rowIndex, this.controlName]) as FormControl;
  }

  agInit(params: ICellEditorParams) {
    if (!params.context.formArray) {
      throw new Error(`
        No FormArray provided as Context to CustomGrid. Pass a FormArray input via
        <app-custom-grid [formData]>.
      `);
    }

    this.parentFormArray = params.context.formArray as FormArray;
    this.rowIndex = params.node.rowIndex ?? -1;
    this.controlName = params.colDef.field ?? '';
  }

  ngAfterViewInit() {
    const el = this.input?.nativeElement;
    setTimeout(() => el?.select() && el.focus());
  }

  getValue() {
    return this.control?.value;
  }
}
