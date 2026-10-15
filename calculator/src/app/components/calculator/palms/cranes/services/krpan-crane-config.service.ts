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

  getFrameTypesForTrailerCrane(trailerId: number, craneId: number): Observable<ConfigurationItem[]> {
    return this.httpClient.get<ConfigurationItem[]>(`${this.url}/KrpanCraneConfig/${trailerId}/cranes/${craneId}/availableFrameTypes`).pipe(
      map((frameTypes) => frameTypes.map((frameType) => {
        frameType.namePrice = formatConfigurationPrice(frameType);
        return frameType;
      }))
    );
  }

  getControlBlocks(id: number): Observable<ConfigurationItem[]>{
    return this.httpClient.get<ConfigurationItem[]>(`${this.url}/KrpanCraneConfig/cranes/${id}/controlblocks`).pipe(
      map((controlBlocks: ConfigurationItem[]) => {
        for (const controlBlock of controlBlocks){
          controlBlock.disabledOption = false;
          controlBlock.namePrice = formatConfigurationPrice(controlBlock);
          controlBlock.imgUrl = `../../../../../../assets/KRPAN crane-controlblock-${controlBlock.id}.jpg`;
        }
        return controlBlocks;
      })
    );
  }

  getFrameTypes(id: number): Observable<FrameType[]>{
    return this.httpClient.get<FrameType[]>(`${this.url}/KrpanCraneConfig/cranes/${id}/frametypes`).pipe(
      map((frameTypes: FrameType[]) => {
        for (const frameType of frameTypes){  
          frameType.disabledOption = false;
          frameType.namePrice = formatConfigurationPrice(frameType);

          if (frameType.id === 6 || frameType.id === 9 || frameType.id === 11){       
            frameType.imgUrl = `../../../../../../assets/KRPAN crane-frametype-${frameType.id}.svg`
          } 
          else if (frameType.id === 8){
            frameType.imgUrls = [`../../../../../../assets/KRPAN crane-frametype-${frameType.id}.jpg`, `../../../../../../assets/KRPAN crane-frametype-${frameType.id}-1.jpg`] 
          }
          else {
            frameType.imgUrls = [`../../../../../../assets/KRPAN crane-frametype-${frameType.id}.svg`, `../../../../../../assets/KRPAN crane-frametype-${frameType.id}-1.jpg`] 
          }

        }
        return frameTypes;
      })
    );
  }

  getControlBlocksByCraneFrameType(craneId: number, frameTypeId: number): Observable<ConfigurationItem[]>{
    return this.httpClient.get<ConfigurationItem[]>(`${this.url}/KrpanCraneConfig/cranes/${craneId}/${frameTypeId}/controlblocks`).pipe(
      map((controlBlocks: ConfigurationItem[]) => {
        for (const controlBlock of controlBlocks){
          controlBlock.namePrice = formatConfigurationPrice(controlBlock);
          controlBlock.imgUrl = `../../../../../../assets/KRPAN crane-controlblock-${controlBlock.id}.svg`;
        }
        return controlBlocks;
      })
    );
  }

  getRotators(id: number): Observable<ConfigurationItem[]>{
    return this.httpClient.get<ConfigurationItem[]>(`${this.url}/KrpanCraneConfig/cranes/${id}/rotators`).pipe(
      map((rotators: ConfigurationItem[]) => {
        for (const rotator of rotators){
          rotator.disabledOption = false;
          rotator.namePrice = formatConfigurationPrice(rotator);
          rotator.imgUrls = [`../../../../../../assets/KRPAN crane-rotator-${rotator.id}.svg`, `../../../../../../assets/KRPAN crane-rotator-${rotator.id}-1.jpg`]
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

  getWinches(id: number): Observable<ConfigurationItem[]>{
    return this.httpClient.get<ConfigurationItem[]>(`${this.url}/KrpanCraneConfig/cranes/${id}/winches`).pipe(
      map((winches: ConfigurationItem[]) => {
        for (const winch of winches){
          winch.disabledOption = false;
          winch.namePrice = formatConfigurationPrice(winch);
          winch.imgUrl = `../../../../../../assets/KRPAN crane-grapple-${winch.id}.jpg`;
        }
        return winches;
      })
    );
  }

  getProtectionSleeves(id: number): Observable<ConfigurationItem | null> {
    return this.httpClient.get<ConfigurationItem>(`${this.url}/KrpanCraneConfig/cranes/${id}/protectionsleeves`).pipe(
      map((protectionSleeves: ConfigurationItem | null) => {
        if (protectionSleeves) {
          protectionSleeves.namePrice = formatConfigurationPrice(protectionSleeves);
          return protectionSleeves;
        } else {
          return null;
        }
      })
    );
  }

  getElectricalFloating(id: number): Observable<ConfigurationItem | null> {
    return this.httpClient.get<ConfigurationItem>(`${this.url}/KrpanCraneConfig/cranes/${id}/electricalfloating`).pipe(
      map((electricalFloating: ConfigurationItem | null) => {
        if (electricalFloating) {
          electricalFloating.namePrice = formatConfigurationPrice(electricalFloating);
          return electricalFloating;
        } else {
          return null;
        }
      })
    );
  }

  getValveBlock(id: number): Observable<ConfigurationItem | null> {
    return this.httpClient.get<ConfigurationItem>(`${this.url}/KrpanCraneConfig/cranes/${id}/valveBlock`).pipe(
      map((valveBlock: ConfigurationItem | null) => {
        if (valveBlock) {
          valveBlock.namePrice = formatConfigurationPrice(valveBlock);
          return valveBlock;
        } else {
          return null;
        }
      })
    );
  }

  getDampings(id: number): Observable<ConfigurationItem[]>{
    return this.httpClient.get<ConfigurationItem[]>(`${this.url}/KrpanCraneConfig/cranes/${id}/dampings`).pipe(
      map((dampings: ConfigurationItem[]) => {
        for (const damping of dampings){
          damping.disabledOption = false;
          damping.namePrice = formatConfigurationPrice(damping);
        }
        return dampings;
      })
    );
  }

  getLight(id: number): Observable<ConfigurationItem | null> {
    return this.httpClient.get<ConfigurationItem>(`${this.url}/KrpanCraneConfig/cranes/${id}/light`).pipe(
      map((light: ConfigurationItem | null) => {
        if (light) {
          light.namePrice = formatConfigurationPrice(light);
          return light;
        } else {
          return null;
        }
      })
    );
  }

  getOperatorSeat(id: number): Observable<ConfigurationItem | null> {
    return this.httpClient.get<ConfigurationItem>(`${this.url}/KrpanCraneConfig/cranes/${id}/operatorseat`).pipe(
      map((operatorSeat: ConfigurationItem | null) => {
        if (operatorSeat) {
          operatorSeat.namePrice = formatConfigurationPrice(operatorSeat);
          return operatorSeat;
        } else {
          return null;
        }
      })
    );
  }

  getOilCooler(id: number): Observable<ConfigurationItem | null> {
    return this.httpClient.get<ConfigurationItem>(`${this.url}/KrpanCraneConfig/cranes/${id}/oilcooler`).pipe(
      map((oilcooler: ConfigurationItem | null) => {
        if (oilcooler) {
          oilcooler.namePrice = formatConfigurationPrice(oilcooler);
          return oilcooler;
        } else {
          return null;
        }
      })
    );
  }

  getRotatorBrakes(id: number): Observable<ConfigurationItem[]>{
    return this.httpClient.get<ConfigurationItem[]>(`${this.url}/KrpanCraneConfig/cranes/${id}/rotatorbrakes`).pipe(
      map((rotatorBrakes: ConfigurationItem[]) => {
        for (const rotatorBrake of rotatorBrakes){
          rotatorBrake.disabledOption = false;
          rotatorBrake.namePrice = formatConfigurationPrice(rotatorBrake);
          if (rotatorBrake.id === 2 || rotatorBrake.id === 3) rotatorBrake.imgUrl = `../../../../../../assets/KRPAN crane-rotatorbrake-2.jpg`;
          else if (rotatorBrake.id === 4 || rotatorBrake.id === 5) rotatorBrake.imgUrl = `../../../../../../assets/KRPAN crane-rotatorbrake-3.jpg`;
          
        }
        return rotatorBrakes;
      })
    );
  }

  getJoystickHolder(id: number): Observable<ConfigurationItem | null> {
    return this.httpClient.get<ConfigurationItem>(`${this.url}/KrpanCraneConfig/cranes/${id}/joystickholder`).pipe(
      map((joystickHolder: ConfigurationItem | null) => {
        if (joystickHolder) {
          joystickHolder.namePrice = formatConfigurationPrice(joystickHolder);
          return joystickHolder;
        } else {
          return null;
        }
      })
    );
  }

  getHoseGuards(id: number): Observable<ConfigurationItem[]>{
    return this.httpClient.get<ConfigurationItem[]>(`${this.url}/KrpanCraneConfig/cranes/${id}/hoseguards`).pipe(
      map((hoseGuards: ConfigurationItem[]) => {
        for (const hoseGuard of hoseGuards){
          hoseGuard.disabledOption = false;
          hoseGuard.namePrice = formatConfigurationPrice(hoseGuard);
        }
        return hoseGuards;
      })
    );
  }

  getTurningDeviceCounterPlate(id: number): Observable<ConfigurationItem | null> {
    return this.httpClient.get<ConfigurationItem>(`${this.url}/KrpanCraneConfig/cranes/${id}/turningdevicecounterplate`).pipe(
      map((turningDeviceCounterPlate: ConfigurationItem | null) => {
        if (turningDeviceCounterPlate) {
          turningDeviceCounterPlate.namePrice = formatConfigurationPrice(turningDeviceCounterPlate);
          return turningDeviceCounterPlate;
        } else {
          return null;
        }
      })
    );
  }

  getSupportLegCounterPlate(id: number): Observable<ConfigurationItem | null> {
    return this.httpClient.get<ConfigurationItem>(`${this.url}/KrpanCraneConfig/cranes/${id}/supportlegcounterplate`).pipe(
      map((supportLegCounterPlate: ConfigurationItem | null) => {
        if (supportLegCounterPlate) {
          supportLegCounterPlate.namePrice = formatConfigurationPrice(supportLegCounterPlate);
          return supportLegCounterPlate;
        } else {
          return null;
        }
      })
    );
  }

  getBoomGuard(id: number): Observable<ConfigurationItem | null> {
    return this.httpClient.get<ConfigurationItem>(`${this.url}/KrpanCraneConfig/cranes/${id}/boomguard`).pipe(
      map((boomGuard: ConfigurationItem | null) => {
        if (boomGuard) {
          boomGuard.namePrice = formatConfigurationPrice(boomGuard);
          boomGuard.imgUrl = `../../../../../../assets/KRPAN crane-boomguard-${boomGuard.id}.jpg`;
          return boomGuard;
        } else {
          return null;
        }
      })
    );
  }

  getCover(id: number): Observable<ConfigurationItem | null> {
    return this.httpClient.get<ConfigurationItem>(`${this.url}/KrpanCraneConfig/cranes/${id}/cover`).pipe(
      map((cover: ConfigurationItem | null) => {
        if (cover) {
          cover.namePrice = formatConfigurationPrice(cover);
          return cover;
        } else {
          return null;
        }
      })
    );
  }

  getWoodControl(id: number): Observable<ConfigurationItem | null> {
    return this.httpClient.get<ConfigurationItem>(`${this.url}/KrpanCraneConfig/cranes/${id}/woodcontrol`).pipe(
      map((woodControl: ConfigurationItem | null) => {
        if (woodControl) {
          woodControl.namePrice = formatConfigurationPrice(woodControl);
          return woodControl;
        } else {
          return null;
        }
      })
    );
  }

  getLinkage(id: number): Observable<ConfigurationItem | null> {
    return this.httpClient.get<ConfigurationItem>(`${this.url}/KrpanCraneConfig/cranes/${id}/linkage`).pipe(
      map((linkage: ConfigurationItem | null) => {
        if (linkage) {
          linkage.namePrice = formatConfigurationPrice(linkage);
          return linkage;
        } else {
          return null;
        }
      })
    );
  }

  getShipping(id: number): Observable<ConfigurationItem | null> {
    return this.httpClient.get<ConfigurationItem>(`${this.url}/KrpanCraneConfig/cranes/${id}/shipping`).pipe(
      map((shipping: ConfigurationItem | null) => {
        if (shipping) {
          shipping.namePrice = formatConfigurationPrice(shipping);
          return shipping;
        } else {
          return null;
        }
      })
    );
  }
}
