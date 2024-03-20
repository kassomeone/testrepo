import { Component } from '@angular/core';

@Component({
  selector: 'app-ic-configuration',
  templateUrl: './ic-configuration.component.html',
  styleUrl: './ic-configuration.component.css'
})
export class IcConfigurationComponent {

  users: any[] = [{
    name: 'dd', id: '1', creation: 'ss', color: 'blue'

  }];

  onDelete(_t9: any) {
    throw new Error('Method not implemented.');
  }

  onEdit(_t9: any) {
    throw new Error('Method not implemented.');
  }

}
