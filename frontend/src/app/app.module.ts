import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityIcons, cogIcon, eyeHideIcon, eyeIcon, flameIcon, homeIcon, logoutIcon, plusCircleIcon, vmBugIcon } from '@cds/core/icon';
import '@cds/core/icon/register.js';
import { ClarityModule } from '@clr/angular';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IcApiMetadataComponent } from './ic/ic-api-metadata/ic-api-metadata.component';
import { IcConfigurationComponent } from './ic/ic-configuration/ic-configuration.component';
import { IcMappingComponent } from './ic/ic-mapping/ic-mapping.component';
import { LookupValuesComponent } from './ic/lookup-values/lookup-values.component';
import { ProfileComponent } from './profile.component';
import { UserService } from './services/user.service';

ClarityIcons.addIcons(flameIcon, homeIcon, vmBugIcon, cogIcon, logoutIcon, plusCircleIcon, eyeIcon, eyeHideIcon);

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://company-apis.offer.sa:8001/auth/',
        realm: 'offersa',
        clientId: 'offersa-client'
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html'
      }
    });
}

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    DashboardComponent,
    IcConfigurationComponent,
    LookupValuesComponent,
    IcMappingComponent,
    IcApiMetadataComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ClarityModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    KeycloakAngularModule
  ],
  providers: [UserService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
