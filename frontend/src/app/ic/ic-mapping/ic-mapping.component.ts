import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IcService } from '../ic.service';

@Component({
  selector: 'app-ic-mapping',
  templateUrl: './ic-mapping.component.html',
  styleUrl: './ic-mapping.component.css'
})
export class IcMappingComponent {

  pdata: any = [];

  mappingType: any = [];

  selectedMap = new FormControl('');
  selectedMapData: any = [];

  constructor(private icService: IcService) { }

  ngOnInit() {

    this.selectedMap.valueChanges.subscribe((item: any) => {

      this.selectedMapData = this.pdata[item];

    })

    this.icService.getMappings().subscribe((mydata: any) => {


      var udata: any = {};

      mydata.forEach((item: any) => {

        item.forEach((item2: any) => {
          if (item2.inputField.length == 0) {
            item2.inputField = item2.inputFieldGroup.field;
          }
        });

      })

      mydata.forEach((item: any) => {

        item.forEach((item2: any) => {

          const inputDocId = item2.inputField[0].docId.substring(item2.inputField[0].docId.lastIndexOf('.') + 1);
          const outputDocId = item2.outputField[0].docId.substring(item2.outputField[0].docId.lastIndexOf('.') + 1);

          if (!udata[inputDocId + '  -->  ' + outputDocId]) {
            udata[inputDocId + '  -->  ' + outputDocId] = new Array();
          }

          udata[inputDocId + '  -->  ' + outputDocId].push(item2);


        });

      });

      this.pdata = udata;
      this.mappingType = Object.keys(udata).sort();

    })




  }

}
