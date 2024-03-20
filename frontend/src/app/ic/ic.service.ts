import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IcService {

  // IC_SERVICE_PATH: string = 'http://localhost:8080/api/lookup-values';
  IC_LOOKUP_SERVICE_PATH: string = '/api/lookup-values';
  IC_API_SERVICE_PATH: string = '/api/ic-api-metadata';

  constructor(private http: HttpClient, private keycloakService: KeycloakService) { }

  getLookupValues(page: any, size: any, filter: any) {
    const icAPIKey = (this.keycloakService.getKeycloakInstance().tokenParsed as any)['ica-api-key'];
    return this.http.get(
      this.IC_LOOKUP_SERVICE_PATH,
      {
        params: { page: page, size: size, ...this.removeNullUndefinedValues(filter) },
        headers: { apiKey: icAPIKey }
      }
    );
  }


  saveLookupValues(lookupValue: any) {
    return this.http.post(
      this.IC_LOOKUP_SERVICE_PATH,
      lookupValue
    );
  }

  deleteLookupValues(id: any) {
    return this.http.delete(this.IC_LOOKUP_SERVICE_PATH + "/" + id);
  }


  getApiMetadata() {
    return this.http.get(
      this.IC_API_SERVICE_PATH
    );
  }


  saveApiMetadata(lookupValue: any) {
    return this.http.post(
      this.IC_API_SERVICE_PATH,
      lookupValue
    );
  }

  deleteApiMetadata(id: any) {
    return this.http.delete(this.IC_API_SERVICE_PATH + "/" + id);
  }

  updateAPIMetadataStatus(ids: any[], status: any) {
    return this.http.post(this.IC_API_SERVICE_PATH + "/toggle-status/" + status, ids);
  }

  clearAPIMetadataCache() {
    return this.http.post(environment.icaAPIURL + "/api-manager/ic-apimetadata-clear", {});
  }

  private removeNullUndefinedValues(obj: any) {
    return Object.fromEntries(
      Object.entries(obj).filter(([key, value]) => value != '' && value !== null && value !== undefined)
    );
  }



  getMappings() {

    const icAPIKey = (this.keycloakService.getKeycloakInstance().tokenParsed as any)['ica-api-key'];
    return this.http.post(environment.icaAPIURL + "/api/mappings", {}, { headers: { apiKey: icAPIKey } });

  }

}
