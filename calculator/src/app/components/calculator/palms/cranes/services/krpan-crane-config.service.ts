import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ConfigurationItem } from '../../../../../models/configuration-item';
import { FrameType } from '../models/frame-type';
import { formatConfigurationPrice } from '../../../../../utils/price.utils';

@Injectable({
  providedIn: 'root'
})
export class KrpanCraneConfigService {
  //private url = 'http://localhost:5140';
  private url = 'https://calculator-app-api.azurewebsites.net';

  constructor(private httpClient: HttpClient) { }

  getSlewingDrive(id: number): Observable<ConfigurationItem | null> {
    return this.httpClient.get<ConfigurationItem>(`${this.url}/KrpanCraneConfig/cranes/${id}/slewingdrive`).pipe(
      map((slewingDrive: ConfigurationItem | null) => {
        if (slewingDrive) {
          slewingDrive.namePrice = formatConfigurationPrice(slewingDrive);
          return slewingDrive;
        } else {
          return null;
        }
      })
    );
  }

  getCraneControls(id: number): Observable<ConfigurationItem[]>{
    return this.httpClient.get<ConfigurationItem[]>(`${this.url}/KrpanCraneConfig/cranes/${id}/cranecontrols`).pipe(
      map((craneControls: ConfigurationItem[]) => {
        for (const controlBlock of craneControls){
          controlBlock.disabledOption = false;
          controlBlock.namePrice = formatConfigurationPrice(controlBlock);
          controlBlock.imgUrl = `../../../../../../assets/KRPAN crane-controlblock-${controlBlock.id}.jpg`;
        }
        return craneControls;
      })
    );
  }

  getControlLevelProtection(id: number): Observable<ConfigurationItem | null> {
    return this.httpClient.get<ConfigurationItem>(`${this.url}/KrpanCraneConfig/cranes/${id}/controllevelprotection`).pipe(
      map((controlLevelProtection: ConfigurationItem | null) => {
        if (controlLevelProtection) {
          controlLevelProtection.namePrice = formatConfigurationPrice(controlLevelProtection);
          return controlLevelProtection;
        } else {
          return null;
        }
      })
    );
  }

  getTractorHydraulics(id: number): Observable<ConfigurationItem | null> {
    return this.httpClient.get<ConfigurationItem>(`${this.url}/KrpanCraneConfig/cranes/${id}/tractorhydraulics`).pipe(
      map((tractorHydraulics: ConfigurationItem | null) => {
        if (tractorHydraulics) {
          tractorHydraulics.namePrice = formatConfigurationPrice(tractorHydraulics);
          return tractorHydraulics;
        } else {
          return null;
        }
      })
    );
  }

  getRotators(id: number): Observable<ConfigurationItem[]>{
    return this.httpClient.get<ConfigurationItem[]>(`${this.url}/KrpanCraneConfig/cranes/${id}/rotators`).pipe(
      map((rotators: ConfigurationItem[]) => {
        for (const rotator of rotators){
          rotator.disabledOption = false;
          rotator.namePrice = formatConfigurationPrice(rotator);
          rotator.imgUrl = `../../../../../../assets/KRPAN crane-rotator-${rotator.id}.jpg`;
        }
        return rotators;
      })
    );
  }

  getGrapples(id: number): Observable<ConfigurationItem[]>{
    return this.httpClient.get<ConfigurationItem[]>(`${this.url}/KrpanCraneConfig/cranes/${id}/grapples`).pipe(
      map((grapples: ConfigurationItem[]) => {
        for (const grapple of grapples){
          grapple.disabledOption = false;
          grapple.namePrice = formatConfigurationPrice(grapple);
          grapple.imgUrl = `../../../../../../assets/KRPAN crane-grapple-${grapple.id}.jpg`;
        }
        return grapples;
      })
    );
  }
}
