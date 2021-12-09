import { GridOptions } from '@ag-grid-community/core';
import { Component, Input } from '@angular/core';
import { Address } from '@app/demo/data-access';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.scss'],
})
export class AddressListComponent {
  @Input() addresses: Address[] = [];
  selectedAddress?: Address;
  gridOptions: GridOptions = {
    columnDefs: [
      { field: 'line1', headerName: 'Line 1' },
      { field: 'line2', headerName: 'Line 2' },
      { field: 'city', headerName: 'City' },
      { field: 'state', headerName: 'State' },
      { field: 'zip', headerName: 'Zip' },
    ],
    rowSelection: 'single',
    onRowDataChanged: (event) => {
      this.selectedAddress = undefined;
    },
    onRowSelected: (event) => {
      if (event.node.isSelected()) {
        this.selectedAddress = event.node.data;
      } else {
        if (this.selectedAddress === event.node.data) {
          this.selectedAddress = undefined; // to unset Selected on Deselect
        }
      }
    },
  };
}
