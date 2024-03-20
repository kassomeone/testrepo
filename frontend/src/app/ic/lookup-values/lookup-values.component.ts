import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ClrDatagridStateInterface, ClrModal } from '@clr/angular';
import { debounceTime } from 'rxjs';
import { IcService } from '../ic.service';

@Component({
  selector: 'app-lookup-values',
  templateUrl: './lookup-values.component.html',
  styleUrl: './lookup-values.component.css'
})
export class LookupValuesComponent {

  lookups: any[] = [];
  total: number = 0;
  loading: boolean = true;
  pageSize = 15;
  basic: boolean = false;

  // lookupModal?: ClrModal;

  @ViewChild('lookupModal', { static: true }) lookupModal!: ClrModal;


  lookupValueForm = this.fb.group({
    "lookupId": null,
    "companyId": null,
    "field": null,
    "nameEn": null,
    "nameAr": null,
    "descEn": null,
    "descAr": null,
    "sourceId": null,
    "standardId": null,
    "createdAt": null,
    "updatedAt": null,
  },);

  formSaveLoading = false;

  filterForm = this.fb.group({
    "companyId": null,
    "field": null,
  });

  constructor(private icService: IcService, private fb: FormBuilder) { }

  ngOnInit() {


    this.filterForm.get('field')?.valueChanges
      .pipe(debounceTime(300))
      .subscribe(res => {
        this.refresh({ page: { current: 1, size: this.pageSize } })
      });
    this.filterForm.get('companyId')?.valueChanges
      .pipe(debounceTime(300))
      .subscribe(res => {
        this.refresh({ page: { current: 1, size: this.pageSize } })
      });


  }


  refresh(state: ClrDatagridStateInterface) {

    this.loading = true;

    this.filterForm.value

    this.icService.getLookupValues(state.page?.current, state.page?.size, this.filterForm.value).subscribe((res: any) => {
      this.total = res.totalElements;
      // this.lookups = [...this.lookups, ...res.content];
      this.lookups = res.content;
      this.loading = false;
    });


  }


  saveValue(formValue: any) {

    this.formSaveLoading = true;

    this.icService.saveLookupValues(formValue).subscribe((res) => {
      this.lookupModal.close();
      this.formSaveLoading = false;
      this.refresh({ page: { current: 1, size: this.pageSize } })
    }, (e) => this.formSaveLoading = false);

  }

  onDelete(row: any) {
    this.icService.deleteLookupValues(row.lookupId).subscribe(res => {
      this.refresh({ page: { current: 1, size: this.pageSize } })
    })
  }

  onEdit(row: any) {

    this.lookupValueForm.reset();
    this.lookupValueForm.setValue(row);
    this.lookupModal.modalId = row.lookupId;
    this.lookupModal.open();

    const subtn = this.lookupModal._openChanged.subscribe(res => {
      subtn.unsubscribe();
      if (this.lookupValueForm.dirty) {
        Object.assign(row, this.lookupValueForm.value)
      }
    });

  }

}
