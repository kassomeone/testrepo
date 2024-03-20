import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { UserProfile } from './model/user-profile';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'User profile';

  userProfile?: UserProfile;

  constructor(private keycloakService: KeycloakService) {
  }

  logout() {

    this.keycloakService.logout(window.location.protocol + "//" + window.location.host).then(res => {
      console.log('hello')
    });
  }
}
