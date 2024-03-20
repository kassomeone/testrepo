import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ClrModal } from '@clr/angular';
import { switchMap } from 'rxjs';
import { IcService } from '../ic.service';

@Component({
  selector: 'app-ic-api-metadata',
  templateUrl: './ic-api-metadata.component.html',
  styleUrl: './ic-api-metadata.component.css'
})
export class IcApiMetadataComponent {


  @ViewChild('modal', { static: true }) modal!: ClrModal;

  error = null;
  selected = [];


  form = this.fb.group({
    "id": null,
    "icCode": null,
    "requestType": null,
    "subRequestType": null,
    "insuranceCompanyCode": null,
    "insuranceCompanyName": null,
    "isEnabled": true,
    "createdAt": null,
    "updatedAt": null
  });

  formSaveLoading = false;

  constructor(private icService: IcService, private fb: FormBuilder) { }
  data: any = [];

  ngOnInit() {

    this.fetchData();

  }


  fetchData() {
    this.icService.getApiMetadata().subscribe(res => this.data = res);
  }

  onDelete(row: any) {

    var value = confirm("do you want to delete metadata");
    if (value) {
      this.icService.deleteApiMetadata(row.id).subscribe(res => {
        this.fetchData();
      });
    }
  }

  onEdit(item: any) {
    this.form.setValue(item);
    this.modal.open();
  }

  saveValue(row: any) {
    this.formSaveLoading = true;
    this.icService.saveApiMetadata(row)
      .pipe(switchMap(res => this.icService.clearAPIMetadataCache()))
      .subscribe((res => {
        this.fetchData();
        this.formSaveLoading = false;
        this.modal.close();
        this.error = null;
      }), ((e) => {
        this.error = e.error.message;
        this.formSaveLoading = false;
      }));

  }

  toggleActive(status: boolean) {

    this.icService.updateAPIMetadataStatus(this.selected.map((row: any) => row.id), status)
    .pipe(switchMap(res => this.icService.clearAPIMetadataCache()))
    .subscribe(res => {
      this.fetchData();
      this.selected = [];
    });

  }


}
